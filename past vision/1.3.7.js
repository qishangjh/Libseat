// ==UserScript==
// @name         QIshan今天抢到座位了吗 - V1.3.7 (快捷时间段版)
// @namespace    http://tampermonkey.net/
// @version      1.3.7
// @description  为吉林大学图书馆座位预约系统 (libseat.jlu.edu.cn) 创建的 Tampermonkey 用户脚本。新增快捷时间段选择，修复预约提交失败、优化按钮点击逻辑，确保稳定抢座。
// @author       QIshan
// @match        https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2*
// @grant        GM_log
// @grant        GM.info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const TARGET_COMPONENT_NAME = "SeatChooseV2";
    let vm = null;
    let 抢座核心逻辑Timer = null;
    let vmDiscoveryInterval = null;
    let uiInitialized = false;
    let reservationAttempts = 0;
    const MAX_RESERVATION_ATTEMPTS = 5;
    const FETCH_SEAT_RETRY_DELAY = 1000;
    const FETCH_SEAT_MAX_RETRIES = 3;

    // --- 默认配置 ---
    const defaultConfig = {
        autoStartAtSpecificTime: true,
        startHour: 21,
        startMinute: 0,
        startSecond: 1,
        targetDate: "",
        targetStartTime: "08:00",
        targetEndTime: "22:00",
        seatPreferences: {
            "3F": [
                { type: "靠边", rule: "剩余的", priority: 1 },
                { type: "大理石", rule: "29-59", priority: 2 },
                { type: "中间", rule: "61+3n, n<12", priority: 3 }
            ],
            "2F": [
                { type: "靠边", rule: "37-84", priority: 1 },
                { type: "大理石", rule: "85-102", priority: 2 },
                { type: "中间", rule: "2+3n, n<12", priority: 3 }
            ]
        },
        globalBlacklistKeywords: ["设备损坏", "禁"],
        autoReserve: true,
        autoConfirmReservation: true,
        retryInterval: 2000,
        randomizeDelay: 500,
        maxRetriesForSeatFetch: 200,
        modalButtonFindDelay: 800,
        postClickDelay: 1200,
        floorPageMap: {
            "3F": "https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2?id=1",
            "2F": "https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2?id=2"
        },
        uiSelectedFloor: "3F",
        uiSelectedPreference: "auto",
        uiPreferredSeatNumber: "",
        uiPanelMinimized: false
    };

    let config = { ...defaultConfig };
    const GM_CONFIG_KEY = 'libseat_auto_reserve_config_v1_3_7'; // 更新配置键名

    // --- 快捷时间段配置（新增）---
    const quickTimeRanges = [
        { name: "全天", start: "08:15", end: "21:45" },
        { name: "上午", start: "08:15", end: "12:00" },
        { name: "下午1", start: "12:20", end: "15:20" },
        { name: "下午2", start: "15:00", end: "18:00" },
        { name: "晚上", start: "18:00", end: "21:45" }
    ];

    // --- 日志函数 ---
    function log(...args) { GM_log(`[${GM.info.script.name}]`, ...args); }
    function error(...args) { console.error(`[${GM.info.script.name} ERROR]`, ...args); GM_log(`[${GM.info.script.name} ERROR]`, ...args); }

    // --- 工具函数 ---
    function parseSeatNumberFromName(seatName) {
        if (!seatName) return NaN;
        const matches = seatName.match(/\d+/g);
        return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : NaN;
    }

    function matchesPreferenceRule(ruleString, seatNumber) {
        if (!ruleString || isNaN(seatNumber)) return false;
        const patternMatch = ruleString.match(/(\d+)\+(\d+)n,\s*n<(\d+)/);
        if (patternMatch) {
            const A = parseInt(patternMatch[1], 10);
            const B = parseInt(patternMatch[2], 10);
            const M = parseInt(patternMatch[3], 10);
            for (let n = 0; n < M; n++) {
                if (seatNumber === A + B * n) return true;
            }
            return false;
        }
        const rangeMatch = ruleString.match(/(\d+)-(\d+)/);
        if (rangeMatch) {
            const start = parseInt(rangeMatch[1], 10);
            const end = parseInt(rangeMatch[2], 10);
            return seatNumber >= start && seatNumber <= end;
        }
        return false;
    }

    function getFloorIdentifier(readingRoom) {
        if (!readingRoom) {
            log('getFloorIdentifier: vm.readingRoom is null or undefined.');
            return null;
        }
        if (readingRoom.parentNamePath) {
            const match = readingRoom.parentNamePath.match(/(\d+F)/);
            if (match) {
                log(`getFloorIdentifier: Found floor '${match[1]}' from parentNamePath.`);
                return match[1];
            }
        }
        if (readingRoom.name) {
            const match = readingRoom.name.match(/(\d+F)/);
            if (match) {
                log(`getFloorIdentifier: Found floor '${match[1]}' from name.`);
                return match[1];
            }
        }
        if (readingRoom.id) {
            for (const floorId in config.floorPageMap) {
                const url = config.floorPageMap[floorId];
                const urlMatch = url.match(/id=(\d+)/);
                if (urlMatch && parseInt(urlMatch[1], 10) === readingRoom.id) {
                    log(`getFloorIdentifier: Found floor '${floorId}' by matching readingRoom.id with floorPageMap.`);
                    return floorId;
                }
            }
        }
        log('getFloorIdentifier: Could not find floor identifier from vm.readingRoom.');
        return null;
    }

    function getCurrentFormattedDate() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    function getTomorrowFormattedDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    async function safeFetch(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 8000
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        } catch (err) {
            error('Fetch failed:', err.message);
            return null;
        }
    }

    function findVueInstance(rootVm, componentName) {
        if (!rootVm) return null;
        if (rootVm.$options.name === componentName || rootVm.$options._componentTag === componentName) {
            return rootVm;
        }
        if (rootVm.$children && rootVm.$children.length > 0) {
            for (const child of rootVm.$children) {
                const found = findVueInstance(child, componentName);
                if (found) return found;
            }
        }
        if (rootVm.$refs) {
            for (const refKey in rootVm.$refs) {
                const refValue = rootVm.$refs[refKey];
                if (Array.isArray(refValue)) {
                    for (const item of refValue) {
                        const found = findVueInstance(item, componentName);
                        if (found) return found;
                    }
                } else {
                    const found = findVueInstance(refValue, componentName);
                    if (found) return found;
                }
            }
        }
        return null;
    }

    // --- GM 函数异步处理 ---
    async function safeGMGetValue(key, defaultValue) {
        try {
            const value = await GM_getValue(key, defaultValue);
            return value;
        } catch (e) {
            error(`GM_getValue 失败 (key: ${key}):`, e);
            return defaultValue;
        }
    }

    async function safeGMSetValue(key, value) {
        try {
            await GM_setValue(key, value);
            log(`Configuration saved to storage (key: ${key})`);
            return true;
        } catch (e) {
            error(`GM_setValue 失败 (key: ${key}):`, e);
            return false;
        }
    }

    async function loadConfig() {
        try {
            const storedConfig = await safeGMGetValue(GM_CONFIG_KEY, null);
            if (storedConfig) {
                if (storedConfig.seatPreferences) {
                    storedConfig.seatPreferences = { ...defaultConfig.seatPreferences, ...storedConfig.seatPreferences };
                }
                if (storedConfig.floorPageMap) {
                    storedConfig.floorPageMap = { ...defaultConfig.floorPageMap, ...storedConfig.floorPageMap };
                }
                config = { ...defaultConfig, ...storedConfig };
                log("Loaded configuration from storage:", config);
            } else {
                log("No stored configuration found, using default config.");
            }
        } catch (e) {
            error("Failed to load configuration from storage:", e);
            config = { ...defaultConfig };
        }
    }

    async function saveConfig() {
        try {
            const configToSave = {
                autoStartAtSpecificTime: config.autoStartAtSpecificTime,
                startHour: config.startHour,
                startMinute: config.startMinute,
                startSecond: config.startSecond,
                targetDate: config.targetDate,
                targetStartTime: config.targetStartTime,
                targetEndTime: config.targetEndTime,
                globalBlacklistKeywords: config.globalBlacklistKeywords,
                autoReserve: config.autoReserve,
                autoConfirmReservation: config.autoConfirmReservation,
                retryInterval: config.retryInterval,
                randomizeDelay: config.randomizeDelay,
                maxRetriesForSeatFetch: config.maxRetriesForSeatFetch,
                modalButtonFindDelay: config.modalButtonFindDelay,
                postClickDelay: config.postClickDelay,
                uiSelectedFloor: config.uiSelectedFloor,
                uiSelectedPreference: config.uiSelectedPreference,
                uiPreferredSeatNumber: config.uiPreferredSeatNumber,
                uiPanelMinimized: config.uiPanelMinimized
            };
            await safeGMSetValue(GM_CONFIG_KEY, configToSave);
        } catch (e) {
            error("Failed to save configuration to storage:", e);
        }
    }

    async function waitForUniAppPageVm() {
        log('Attempting to find UniApp Vue instance...');
        return new Promise((resolve) => {
            let retryCount = 0;
            const maxRetriesForVm = 180;

            vmDiscoveryInterval = setInterval(() => {
                retryCount++;
                if (retryCount > maxRetriesForVm) {
                    clearInterval(vmDiscoveryInterval);
                    error('Max retries reached for finding root Vue instance. Script cannot proceed.');
                    resolve(null);
                    return;
                }

                let rootVm = null;
                if (typeof getCurrentPages === 'function') {
                    try {
                        const pages = getCurrentPages();
                        if (pages && pages.length > 0) {
                            const currentPage = pages[pages.length - 1];
                            if (currentPage && currentPage.$vm) {
                                rootVm = currentPage.$vm;
                            } else if (currentPage && currentPage.vm) {
                                rootVm = currentPage.vm;
                            } else if (currentPage && currentPage.$children && currentPage.$children.length > 0) {
                                rootVm = currentPage.$children[0];
                            }
                        }
                    } catch (e) {
                        error('Error getting current pages:', e);
                    }
                }

                if (!rootVm) {
                    try {
                        const vueInstances = document.querySelectorAll('[data-vue-app], [vue-app], [data-vue]');
                        if (vueInstances.length > 0) {
                            const appEl = vueInstances[0];
                            rootVm = appEl.__vue__ || appEl._vue || appEl.vue;
                        }
                    } catch (e) {
                        error('Error finding Vue instance from DOM:', e);
                    }
                }

                if (rootVm) {
                    const rootVmName = rootVm.$options.name || rootVm.$options._componentTag || 'N/A';
                    if (rootVmName === TARGET_COMPONENT_NAME) {
                        clearInterval(vmDiscoveryInterval);
                        log(`Successfully found target component (root VM): "${TARGET_COMPONENT_NAME}".`);
                        resolve(rootVm);
                    } else {
                        const foundVm = findVueInstance(rootVm, TARGET_COMPONENT_NAME);
                        if (foundVm) {
                            clearInterval(vmDiscoveryInterval);
                            log('Successfully found SeatChooseV2 VM via child components.');
                            resolve(foundVm);
                        }
                    }
                }
            }, 500);
        });
    }

    // --- 核心抢座逻辑 ---
    async function setTimeRange(vmInstance, date, startTime, endTime) {
        log(`Setting time range to: Date=${date}, Start=${startTime}, End=${endTime}`);
        try {
            const [startHour, startMin] = startTime.split(':').map(Number);
            const [endHour, endMin] = endTime.split(':').map(Number);
            if (isNaN(startHour) || isNaN(startMin) || isNaN(endHour) || isNaN(endMin) ||
                startHour < 0 || startHour > 23 || startMin < 0 || startMin > 59 ||
                endHour < 0 || endHour > 23 || endMin < 0 || endMin > 59) {
                throw new Error(`Invalid time format: ${startTime} - ${endTime}`);
            }

            if (vmInstance.timeRange) {
                vmInstance.timeRange.date = date;
                vmInstance.timeRange.startTime = startTime;
                vmInstance.timeRange.endTime = endTime;
                
                if (typeof vmInstance.$set === 'function') {
                    vmInstance.$set(vmInstance, 'timeRange', JSON.parse(JSON.stringify(vmInstance.timeRange)));
                } else if (typeof vmInstance.$forceUpdate === 'function') {
                    vmInstance.$forceUpdate();
                }
                
                await new Promise(r => setTimeout(r, 500));
                log('timeRange updated in VM and applied.');
            } else {
                error('vmInstance.timeRange is not available. Cannot set time range.');
            }
        } catch (e) {
            error('Error setting time range:', e);
            throw e;
        }
    }

    function safeClick(element) {
        if (!element) return false;
        try {
            element.click();
            return true;
        } catch (e1) {
            try {
                const downEvent = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    clientX: element.getBoundingClientRect().left + 10,
                    clientY: element.getBoundingClientRect().top + 10,
                    button: 0
                });
                const upEvent = new MouseEvent('mouseup', {
                    bubbles: true,
                    cancelable: true,
                    clientX: element.getBoundingClientRect().left + 10,
                    clientY: element.getBoundingClientRect().top + 10,
                    button: 0
                });
                const clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    clientX: element.getBoundingClientRect().left + 10,
                    clientY: element.getBoundingClientRect().top + 10,
                    button: 0
                });
                element.dispatchEvent(downEvent);
                element.dispatchEvent(upEvent);
                element.dispatchEvent(clickEvent);
                return true;
            } catch (e2) {
                try {
                    const event = document.createEvent('MouseEvents');
                    event.initMouseEvent(
                        'click',
                        true, true, null, 0,
                        0, 0,
                        element.getBoundingClientRect().left + 10,
                        element.getBoundingClientRect().top + 10,
                        false, false, false, false, 0, null
                    );
                    element.dispatchEvent(event);
                    return true;
                } catch (e3) {
                    error('All click methods failed:', e3);
                    return false;
                }
            }
        }
    }

    async function isSeatStillAvailable(vmInstance, seatId) {
        try {
            if (typeof vmInstance.getSeats === 'function') {
                await vmInstance.getSeats();
                await new Promise(r => setTimeout(r, 300));
            }
            const seat = vmInstance.seatList.find(s => s.id === seatId);
            return seat && seat.status === 'FREE' && seat.enabled;
        } catch (e) {
            error('Error checking seat availability:', e);
            return false;
        }
    }

    async function selectAndReserveSeat(vmInstance, seat) {
        if (!seat || !seat.id) {
            error('Invalid seat object provided for selection.');
            return false;
        }
        
        log(`Attempting to select seat: ${seat.name} (ID: ${seat.id})`);
        
        try {
            const isAvailable = await isSeatStillAvailable(vmInstance, seat.id);
            if (!isAvailable) {
                error(`Seat ${seat.name} is no longer available (rechecked).`);
                return false;
            }

            let seatSelected = false;
            if (typeof vmInstance.selectSeat === 'function') {
                log(`Calling vm.selectSeat with seat ID: ${seat.id}`);
                await vmInstance.selectSeat({ seat: seat, index: vmInstance.seatList.findIndex(s => s.id === seat.id) });
                seatSelected = true;
            } else if (typeof vmInstance.handleSeatClick === 'function') {
                log(`Calling vm.handleSeatClick with seat ID: ${seat.id}`);
                await vmInstance.handleSeatClick(seat);
                seatSelected = true;
            } else {
                error('No seat selection method found on VM. Trying direct DOM click...');
                const seatElement = document.querySelector(`[data-seat-id="${seat.id}"]`) || 
                                   document.querySelector(`.seat-item[data-id="${seat.id}"]`) ||
                                   document.querySelector(`.seat[data-seatid="${seat.id}"]`) ||
                                   document.querySelector(`[id*="seat-${seat.id}"]`);
                if (seatElement) {
                    log(`Found seat DOM element: ${seatElement.tagName}`);
                    safeClick(seatElement);
                    seatSelected = true;
                } else {
                    error('No seat DOM element found.');
                    return false;
                }
            }
            
            if (!seatSelected) {
                error('Seat selection failed.');
                return false;
            }
            
            log(`Seat ${seat.name} selected. Waiting for reservation modal...`);
            await new Promise(r => setTimeout(r, 500));

            let modalVisibleCheckRetries = 0;
            const maxModalVisibleChecks = 40;
            while (!vmInstance.seatReserveVisible && modalVisibleCheckRetries < maxModalVisibleChecks) {
                await new Promise(r => setTimeout(r, 500));
                modalVisibleCheckRetries++;
                if (typeof vmInstance.openReservationModal === 'function' && modalVisibleCheckRetries > 5) {
                    log('Force opening reservation modal...');
                    await vmInstance.openReservationModal(seat);
                }
            }

            if (vmInstance.seatReserveVisible) {
                log('Reservation modal is visible.');
                
                if (config.autoConfirmReservation) {
                    log('Auto-confirm is ON. Looking for "预约" button...');
                    await new Promise(r => setTimeout(r, config.modalButtonFindDelay));
                    
                    let confirmButton = document.querySelector('.seat-btn.seat-btn-primary') ||
                                       document.querySelector('.btn-primary') ||
                                       document.querySelector('[data-action="reserve"]') ||
                                       document.querySelector('button.primary') ||
                                       document.querySelector('.modal-footer button:first-child') ||
                                       document.querySelector('.modal-btn-confirm') ||
                                       document.querySelector('button[data-type="primary"]') ||
                                       document.querySelector('.btn-success') ||
                                       document.querySelector('button:contains("预约")') ||
                                       document.querySelector('div[role="button"].primary') ||
                                       document.querySelector('[class*="reserve-btn"]');

                    if (!confirmButton) {
                        const allButtons = document.querySelectorAll('button, [role="button"], .btn');
                        for (const btn of allButtons) {
                            const text = btn.textContent.trim() || btn.innerText.trim();
                            if (text.includes('预约') || text.includes('确认') || text.includes('提交')) {
                                confirmButton = btn;
                                log(`Found confirm button by text: "${text}"`);
                                break;
                            }
                        }
                    }

                    if (confirmButton) {
                        log(`Found confirm button: ${confirmButton.tagName} ${confirmButton.className}`);
                        confirmButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        await new Promise(r => setTimeout(r, 300));
                        
                        const clickSuccess1 = safeClick(confirmButton);
                        await new Promise(r => setTimeout(r, 200));
                        const clickSuccess2 = safeClick(confirmButton);

                        if (clickSuccess1 || clickSuccess2) {
                            log('Clicked the "预约" button (2x for safety).');
                            await new Promise(r => setTimeout(r, config.postClickDelay));
                            
                            const successMsg = document.querySelector('.success-message, .toast-success, [class*="success"]') ||
                                             document.querySelector('[text*="成功"]') ||
                                             document.querySelector('[class*="toast"]:contains("成功")');
                            
                            if (successMsg) {
                                log(`Reservation success confirmed: ${successMsg.textContent.trim()}`);
                                return true;
                            } else {
                                if (typeof vmInstance.reservationSuccess === 'function') {
                                    await vmInstance.reservationSuccess();
                                    return true;
                                }
                                await new Promise(r => setTimeout(r, 2000));
                                const successMsg2 = document.querySelector('.success-message, .toast-success');
                                if (successMsg2) {
                                    log(`Reservation success confirmed after delay: ${successMsg2.textContent.trim()}`);
                                    return true;
                                }
                                log('Reservation button clicked, but no success message found. Assuming success (fallback).');
                                return true;
                            }
                        } else {
                            error('Failed to click the "预约" button. Trying VM method...');
                            return await triggerVmReservation(vmInstance, seat);
                        }
                    } else {
                        error('Could not find the "预约" button. Trying VM method...');
                        return await triggerVmReservation(vmInstance, seat);
                    }
                } else {
                    log('Auto-confirm is OFF. Please manually confirm.');
                    return true;
                }
            } else {
                error('Reservation modal did not appear. Trying to force open...');
                if (typeof vmInstance.openReservationModal === 'function') {
                    await vmInstance.openReservationModal(seat);
                    await new Promise(r => setTimeout(r, 1000));
                    return await selectAndReserveSeat(vmInstance, seat);
                }
                return false;
            }
        } catch (e) {
            error('Error during seat selection/confirmation:', e);
            return false;
        }
    }

    async function triggerVmReservation(vmInstance, seat) {
        try {
            log('Trying to trigger reservation via VM methods...');
            if (typeof vmInstance.confirmReservation === 'function') {
                log('Calling vm.confirmReservation()');
                await vmInstance.confirmReservation(seat);
                await new Promise(r => setTimeout(r, 1000));
                return true;
            } else if (typeof vmInstance.submitReservation === 'function') {
                log('Calling vm.submitReservation()');
                await vmInstance.submitReservation(seat);
                await new Promise(r => setTimeout(r, 1000));
                return true;
            } else if (typeof vmInstance.reserveSeat === 'function') {
                log('Calling vm.reserveSeat()');
                await vmInstance.reserveSeat(seat.id, vmInstance.timeRange);
                await new Promise(r => setTimeout(r, 1000));
                return true;
            } else if (vmInstance.$emit) {
                log('Emitting "reserve" event via VM');
                vmInstance.$emit('reserve', seat);
                await new Promise(r => setTimeout(r, 1000));
                return true;
            } else if (window.app && typeof window.app.reserve === 'function') {
                log('Calling window.app.reserve()');
                await window.app.reserve(seat.id, vmInstance.timeRange);
                await new Promise(r => setTimeout(r, 1000));
                return true;
            }
            error('No VM reservation method found.');
            return false;
        } catch (e) {
            error('Error triggering VM reservation:', e);
            return false;
        }
    }

    function getDistanceFrom50(seatNumber) {
        return Math.abs(seatNumber - 50);
    }

    function filterAndSortSeats(seatList, floorId, preferredSeatNumber) {
        const preferences = config.seatPreferences[floorId] || [];
        const validSeats = [];

        seatList.forEach(seat => {
            if (seat.type !== 'SEAT' || !seat.enabled) return;
            const isBlacklisted = config.globalBlacklistKeywords.some(keyword => 
                seat.name && seat.name.includes(keyword)
            );
            if (isBlacklisted || seat.status !== 'FREE') return;

            const seatNumber = parseSeatNumberFromName(seat.name);
            if (isNaN(seatNumber)) return;

            let matchedPriority = Infinity;
            let matchedType = "未分类";
            
            const uiSelectedPreference = document.getElementById('preference-select').value;
            if (uiSelectedPreference !== 'auto') {
                const selectedPref = preferences.find(p => p.type === uiSelectedPreference);
                if (selectedPref) {
                    if (selectedPref.rule === "剩余的" || matchesPreferenceRule(selectedPref.rule, seatNumber)) {
                        matchedPriority = selectedPref.priority;
                        matchedType = selectedPref.type;
                    }
                }
            } else {
                preferences.forEach(pref => {
                    if ((pref.rule === "剩余的" || matchesPreferenceRule(pref.rule, seatNumber)) && 
                        pref.priority < matchedPriority) {
                        matchedPriority = pref.priority;
                        matchedType = pref.type;
                    }
                });
            }

            const distancePenalty = getDistanceFrom50(seatNumber) / 100;
            const finalPriority = matchedPriority + distancePenalty;

            validSeats.push({
                ...seat,
                seatNumber,
                category: matchedType,
                categoryPriority: matchedPriority,
                distanceFrom50: getDistanceFrom50(seatNumber),
                finalPriority: finalPriority,
                isPreferred: !isNaN(preferredSeatNumber) && seatNumber === preferredSeatNumber
            });
        });

        return validSeats.sort((a, b) => {
            if (a.isPreferred !== b.isPreferred) {
                return a.isPreferred ? -1 : 1;
            }
            if (a.finalPriority !== b.finalPriority) {
                return a.finalPriority - b.finalPriority;
            }
            return a.distanceFrom50 - b.distanceFrom50;
        });
    }

    async function fetchSeatListSafely(vmInstance) {
        let retries = 0;
        while (retries < FETCH_SEAT_MAX_RETRIES) {
            try {
                log(`Fetching seats (attempt ${retries + 1}/${FETCH_SEAT_MAX_RETRIES})`);
                if (typeof vmInstance.getSeats === 'function') {
                    await vmInstance.getSeats();
                } else if (typeof vmInstance.getSeatList === 'function') {
                    await vmInstance.getSeatList();
                } else if (typeof vmInstance.refreshSeats === 'function') {
                    await vmInstance.refreshSeats();
                } else if (typeof vmInstance.loadSeats === 'function') {
                    await vmInstance.loadSeats();
                } else {
                    throw new Error('No seat fetch method found on VM.');
                }

                await new Promise(r => setTimeout(r, 500));
                if (vmInstance.seatList && vmInstance.seatList.length > 0) {
                    log(`Fetched ${vmInstance.seatList.length} seats successfully.`);
                    return true;
                } else {
                    retries++;
                    log(`Seat list is empty. Retrying (${retries}/${FETCH_SEAT_MAX_RETRIES})...`);
                    await new Promise(r => setTimeout(r, FETCH_SEAT_RETRY_DELAY));
                }
            } catch (e) {
                retries++;
                error(`Error fetching seats (${retries}/${FETCH_SEAT_MAX_RETRIES}):`, e.message);
                await new Promise(r => setTimeout(r, FETCH_SEAT_RETRY_DELAY));
            }
        }
        return false;
    }

    async function startReservationProcess(manualTrigger = false) {
        log(`Starting reservation process (Manual: ${manualTrigger})...`);
        if (vmDiscoveryInterval) {
            clearInterval(vmDiscoveryInterval);
        }

        reservationAttempts = 0;
        await reservationLoop();
    }

    async function reservationLoop() {
        if (reservationAttempts >= MAX_RESERVATION_ATTEMPTS) {
            updateUIStatus(`已达到最大抢座尝试次数(${MAX_RESERVATION_ATTEMPTS}次)，停止抢座`);
            log(`Reached maximum reservation attempts (${MAX_RESERVATION_ATTEMPTS}), stopping`);
            
            const startBtn = document.getElementById('start-reserve-btn');
            const resetBtn = document.getElementById('reset-reserve-btn');
            if (startBtn && resetBtn) {
                startBtn.style.display = 'inline-block';
                resetBtn.style.display = 'none';
            }
            
            抢座核心逻辑Timer = null;
            return;
        }

        reservationAttempts++;
        updateUIStatus(`正在进行第 ${reservationAttempts}/${MAX_RESERVATION_ATTEMPTS} 次抢座尝试`);

        if (!vm) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：查找Vue实例...`);
            vm = await waitForUniAppPageVm();
            if (!vm) {
                updateUIStatus('错误: 无法找到UniApp Vue实例，重试...');
                error('Failed to find UniApp Vue instance.');
                scheduleNextReservationAttempt();
                return;
            }
            updateUIStatus(`第 ${reservationAttempts} 次尝试：Vue实例已找到`);
        }

        const uiTargetDate = document.getElementById('res-date-input').value;
        const uiStartTime = document.getElementById('res-start-time').value;
        const uiEndTime = document.getElementById('res-end-time').value;
        const uiPreferredSeatNumber = parseInt(document.getElementById('preferred-seat-number').value, 10);

        if (!uiTargetDate || !/^\d{4}-\d{2}-\d{2}$/.test(uiTargetDate)) {
            updateUIStatus('错误: 预约日期格式无效 (YYYY-MM-DD)');
            error('Invalid reservation date format.');
            return;
        }
        if (!uiStartTime || !/^\d{2}:\d{2}$/.test(uiStartTime) || !uiEndTime || !/^\d{2}:\d{2}$/.test(uiEndTime)) {
            updateUIStatus('错误: 预约时间格式无效');
            error('Invalid reservation time format.');
            return;
        }

        const startMoment = new Date(`${uiTargetDate} ${uiStartTime}`);
        const endMoment = new Date(`${uiTargetDate} ${uiEndTime}`);
        if (endMoment.getTime() <= startMoment.getTime()) {
             endMoment.setDate(endMoment.getDate() + 1);
             if (endMoment.getTime() <= startMoment.getTime()) {
                 updateUIStatus('错误: 结束时间必须晚于开始时间');
                 error('Reservation end time must be after start time.');
                 return;
             }
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：设置时间范围...`);
        try {
            await setTimeRange(vm, uiTargetDate, uiStartTime, uiEndTime);
        } catch (e) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：设置时间范围失败`);
            scheduleNextReservationAttempt();
            return;
        }

        let currentFloorIdForLogic = document.getElementById('floor-select').value;
        const actualDetectedFloor = getFloorIdentifier(vm.readingRoom);

        if (currentFloorIdForLogic === 'auto') {
            if (actualDetectedFloor) {
                currentFloorIdForLogic = actualDetectedFloor;
                log(`Auto-detected floor: ${actualDetectedFloor}`);
                const floorSelect = document.getElementById('floor-select');
                if (floorSelect && floorSelect.value !== currentFloorIdForLogic) {
                    floorSelect.value = currentFloorIdForLogic;
                    config.uiSelectedFloor = currentFloorIdForLogic;
                    saveConfig();
                }
            } else {
                currentFloorIdForLogic = defaultConfig.uiSelectedFloor;
                updateUIStatus(`警告: 无法自动检测楼层，使用默认楼层: ${currentFloorIdForLogic}`);
                log(`Auto-detection failed, using default floor: ${currentFloorIdForLogic}`);
            }
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：刷新座位列表...`);
        const fetchSuccess = await fetchSeatListSafely(vm);
        if (!fetchSuccess) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：座位刷新失败`);
            scheduleNextReservationAttempt();
            return;
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：筛选最优座位...`);
        const sortedSeats = filterAndSortSeats(vm.seatList || [], currentFloorIdForLogic, uiPreferredSeatNumber);

        if (sortedSeats.length === 0) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：未找到可用座位`);
            log('No available seats found.');
            scheduleNextReservationAttempt();
            return;
        }

        for (let i = 0; i < Math.min(5, sortedSeats.length); i++) {
            const targetSeat = sortedSeats[i];
            updateUIStatus(`第 ${reservationAttempts} 次尝试：尝试预约座位 ${targetSeat.name}（距离50号: ${targetSeat.distanceFrom50}）`);
            const reservationSuccess = await selectAndReserveSeat(vm, targetSeat);

            if (reservationSuccess) {
                updateUIStatus(`🎉 成功预约座位 ${targetSeat.name}!`);
                log(`Successfully reserved seat ${targetSeat.name}`);
                
                const startBtn = document.getElementById('start-reserve-btn');
                const resetBtn = document.getElementById('reset-reserve-btn');
                if (startBtn && resetBtn) {
                    startBtn.style.display = 'inline-block';
                    resetBtn.style.display = 'none';
                }
                
                抢座核心逻辑Timer = null;
                return;
            } else {
                updateUIStatus(`座位 ${targetSeat.name} 预约失败，尝试下一个...`);
                await new Promise(r => setTimeout(r, 800));
            }
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：优质座位预约失败，准备重试...`);
        scheduleNextReservationAttempt();
    }

    function scheduleNextReservationAttempt() {
        if (抢座核心逻辑Timer) clearTimeout(抢座核心逻辑Timer);
        const delay = config.retryInterval + Math.floor(Math.random() * config.randomizeDelay);
        log(`Scheduling next reservation attempt in ${delay}ms`);
        抢座核心逻辑Timer = setTimeout(reservationLoop, delay);
    }

    // --- UI 相关函数 ---
    function scheduleAutoStart() {
        const statusDiv = document.getElementById('status');
        if (!statusDiv) return;

        if (!config.autoStartAtSpecificTime) {
            statusDiv.textContent = '准备就绪。定时抢座功能已关闭。';
            if (抢座核心逻辑Timer) {
                clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = null;
            }
            return;
        }

        const now = new Date();
        let scriptWakeUpTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                                             config.startHour, config.startMinute, config.startSecond, 0);

        let delay = scriptWakeUpTime.getTime() - now.getTime();

        if (delay < 0) {
            scriptWakeUpTime.setDate(scriptWakeUpTime.getDate() + 1);
            delay = scriptWakeUpTime.getTime() - now.getTime();
            while (delay < 0 && scriptWakeUpTime.getTime() < now.getTime() + 7 * 24 * 60 * 60 * 1000) {
                scriptWakeUpTime.setDate(scriptWakeUpTime.getDate() + 1);
                delay = scriptWakeUpTime.getTime() - now.getTime();
            }
        }

        if (delay > 0) {
            const timeString = scriptWakeUpTime.toLocaleTimeString();
            updateUIStatus(`等待 ${Math.ceil(delay / 1000)} 秒，将于 ${timeString} 自动开始抢座...`);
            if (抢座核心逻辑Timer) {
                clearTimeout(抢座核心逻辑Timer);
            }
            抢座核心逻辑Timer = setTimeout(startReservationProcess, delay);
        } else {
            updateUIStatus('定时启动时间已过，立即执行抢座...');
            startReservationProcess();
        }
    }

    // --- 新增：快捷时间段按钮点击事件处理 ---
    function handleQuickTimeRangeClick(startTime, endTime) {
        const resStartTimeInput = document.getElementById('res-start-time');
        const resEndTimeInput = document.getElementById('res-end-time');
        
        if (resStartTimeInput && resEndTimeInput) {
            resStartTimeInput.value = startTime;
            resEndTimeInput.value = endTime;
            
            // 同步更新配置
            config.targetStartTime = startTime;
            config.targetEndTime = endTime;
            saveConfig();
            
            updateUIStatus(`已选择快捷时间段：${startTime} - ${endTime}`);
            log(`Quick time range selected: ${startTime} - ${endTime}`);
        }
    }

    function createUI() {
        const uiContainer = document.createElement('div');
        uiContainer.id = 'libseat-auto-reserve-ui';
        uiContainer.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 340px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            color: #333;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            resize: both;
            overflow: auto;
        `;

        // --- UI 结构修改：添加快捷时间段按钮区域 ---
        uiContainer.innerHTML = `
            <style>
                #libseat-auto-reserve-ui * { box-sizing: border-box; }
                #libseat-auto-reserve-ui .header {
                    background-color: #65cafd;
                    color: white;
                    padding: 8px 12px;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    cursor: grab;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: bold;
                    user-select: none;
                }
                #libseat-auto-reserve-ui .header.dragging { cursor: grabbing; }
                #libseat-auto-reserve-ui .header button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 0 5px;
                }
                #libseat-auto-reserve-ui .content {
                    padding: 12px;
                    display: ${config.uiPanelMinimized ? 'none' : 'block'};
                }
                #libseat-auto-reserve-ui .form-group {
                    margin-bottom: 10px;
                }
                #libseat-auto-reserve-ui .form-group-row {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 10px;
                }
                #libseat-auto-reserve-ui .form-group-item {
                    flex: 1;
                }
                #libseat-auto-reserve-ui .form-group-item label {
                    display: block;
                    margin-bottom: 4px;
                    font-weight: bold;
                }
                #libseat-auto-reserve-ui label {
                    display: block;
                    margin-bottom: 4px;
                    font-weight: bold;
                }
                #libseat-auto-reserve-ui select,
                #libseat-auto-reserve-ui input[type="text"],
                #libseat-auto-reserve-ui input[type="number"],
                #libseat-auto-reserve-ui input[type="time"],
                #libseat-auto-reserve-ui input[type="date"] {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }
                #libseat-auto-reserve-ui .button-group {
                    display: flex;
                    gap: 8px;
                    margin-top: 15px;
                }
                #libseat-auto-reserve-ui .button-group button {
                    flex: 1;
                    padding: 10px;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: bold;
                }
                #libseat-auto-reserve-ui #start-reserve-btn {
                    background-color: #0ebf9d;
                    color: white;
                }
                #libseat-auto-reserve-ui #reset-reserve-btn {
                    background-color: #ffc107;
                    color: black;
                }
                 #libseat-auto-reserve-ui #refresh-seats-btn {
                    background-color: #ff9800;
                    color: white;
                }
                #libseat-auto-reserve-ui #status {
                    margin-top: 15px;
                    padding: 10px;
                    background-color: #f0f0f0;
                    border-radius: 4px;
                    min-height: 40px;
                    overflow: auto;
                }
                #libseat-auto-reserve-ui .checkbox-group {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
                #libseat-auto-reserve-ui .checkbox-group input[type="checkbox"] {
                    margin-right: 8px;
                    width: auto;
                }
                #libseat-auto-reserve-ui .note {
                    font-size: 12px;
                    color: #666;
                    margin-top: 4px;
                }
                #libseat-auto-reserve-ui .version {
                    font-size: 11px;
                    color: #999;
                    text-align: center;
                    padding: 5px 0;
                    border-top: 1px solid #eee;
                }
                /* 快捷时间段按钮样式（新增） */
                #libseat-auto-reserve-ui .quick-time-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin: 10px 0;
                }
                #libseat-auto-reserve-ui .quick-time-btn {
                    padding: 6px 10px;
                    border: none;
                    border-radius: 4px;
                    background-color: #e8f4f8;
                    color: #2d3748;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                #libseat-auto-reserve-ui .quick-time-btn:hover {
                    background-color: #65cafd;
                    color: white;
                }
                #libseat-auto-reserve-ui .quick-time-btn.active {
                    background-color: #4299e1;
                    color: white;
                }
            </style>
            <div class="header">
                <span>QIshan今天抢到座位了吗</span>
                <div>
                    <button id="minimize-btn">${config.uiPanelMinimized ? '+' : '-'}</button>
                    <button id="close-btn">x</button>
                </div>
            </div>
            <div class="content">
                <div class="form-group-row">
                    <div class="form-group-item">
                        <label for="floor-select">当前楼层:</label>
                        <select id="floor-select"></select>
                    </div>
                    <div class="form-group-item">
                        <label for="preference-select">地段偏好:</label>
                        <select id="preference-select"></select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="res-date-input">预约日期 (YYYY-MM-DD):</label>
                    <input type="date" id="res-date-input">
                    <div class="note">默认预约明天</div>
                </div>
                <div class="form-group">
                    <label>预约时间:</label>
                    <div class="form-group-row">
                        <div class="form-group-item">
                            <input type="time" id="res-start-time" placeholder="开始时间">
                        </div>
                        <div class="form-group-item">
                            <input type="time" id="res-end-time" placeholder="结束时间">
                        </div>
                    </div>
                    <!-- 快捷时间段按钮区域（新增） -->
                    <div class="quick-time-buttons" id="quick-time-buttons">
                        <!-- 按钮将通过JS动态生成 -->
                    </div>
                </div>
                <div class="form-group">
                    <label for="preferred-seat-number">优先座位号 (选填):</label>
                    <input type="number" id="preferred-seat-number" placeholder="例如: 50">
                    <div class="note">未填写时优先选择靠近50号的座位</div>
                </div>
                <div class="checkbox-group">
                    <input type="checkbox" id="auto-start-toggle" ${config.autoStartAtSpecificTime ? 'checked' : ''}>
                    <label for="auto-start-toggle">定时自动抢座</label>
                </div>
                <div class="form-group-row">
                    <div class="form-group-item">
                        <label for="start-hour">时:</label>
                        <input type="number" id="start-hour" min="0" max="23" value="${config.startHour}">
                    </div>
                    <div class="form-group-item">
                        <label for="start-minute">分:</label>
                        <input type="number" id="start-minute" min="0" max="59" value="${config.startMinute}">
                    </div>
                    <div class="form-group-item">
                        <label for="start-second">秒:</label>
                        <input type="number" id="start-second" min="0" max="59" value="${config.startSecond}">
                    </div>
                </div>
                <div class="button-group">
                    <button id="start-reserve-btn">立即开始抢座</button>
                    <button id="refresh-seats-btn">刷新座位</button>
                    <button id="reset-reserve-btn" style="display:none;">重置抢座</button>
                </div>
                <div class="form-group">
                    <label>抢座状态:</label>
                    <div id="status">准备就绪。</div>
                </div>
            </div>
            <div class="version">v1.3.7 - 新增快捷时间段选择</div>
        `;
        document.body.appendChild(uiContainer);
        setupUIDragging(uiContainer);
        setupUIEvents();
        updateFloorAndPreferenceOptions();
        // 生成快捷时间段按钮（新增）
        generateQuickTimeButtons();
        applyStoredUIState();
        uiInitialized = true;
        scheduleAutoStart();
    }

    // --- 新增：生成快捷时间段按钮 ---
    function generateQuickTimeButtons() {
        const buttonContainer = document.getElementById('quick-time-buttons');
        if (!buttonContainer) return;

        quickTimeRanges.forEach(range => {
            const button = document.createElement('button');
            button.className = 'quick-time-btn';
            button.textContent = range.name;
            button.title = `${range.start} - ${range.end}`;

            // 点击事件绑定
            button.addEventListener('click', () => {
                handleQuickTimeRangeClick(range.start, range.end);
                
                // 高亮当前选中的按钮
                document.querySelectorAll('.quick-time-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            });

            buttonContainer.appendChild(button);
        });
    }

    function setupUIDragging(uiContainer) {
        const header = uiContainer.querySelector('.header');
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            header.classList.add('dragging');
            offset = {
                x: e.clientX - uiContainer.getBoundingClientRect().left,
                y: e.clientY - uiContainer.getBoundingClientRect().top
            };
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            uiContainer.style.left = `${e.clientX - offset.x}px`;
            uiContainer.style.top = `${e.clientY - offset.y}px`;
            uiContainer.style.right = 'auto';
            uiContainer.style.bottom = 'auto';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            header.classList.remove('dragging');
        });
    }

    function setupUIEvents() {
        const uiContainer = document.getElementById('libseat-auto-reserve-ui');
        if (!uiContainer) return;

        const floorSelect = document.getElementById('floor-select');
        const preferenceSelect = document.getElementById('preference-select');
        const resDateInput = document.getElementById('res-date-input');
        const resStartTimeInput = document.getElementById('res-start-time');
        const resEndTimeInput = document.getElementById('res-end-time');
        const preferredSeatNumberInput = document.getElementById('preferred-seat-number');
        const startBtn = document.getElementById('start-reserve-btn');
        const resetBtn = document.getElementById('reset-reserve-btn');
        const refreshBtn = document.getElementById('refresh-seats-btn');
        const minimizeBtn = document.getElementById('minimize-btn');
        const closeBtn = document.getElementById('close-btn');
        const contentDiv = uiContainer.querySelector('.content');

        const autoStartToggle = document.getElementById('auto-start-toggle');
        const startHourInput = document.getElementById('start-hour');
        const startMinuteInput = document.getElementById('start-minute');
        const startSecondInput = document.getElementById('start-second');

        if (!resDateInput.value) {
            resDateInput.value = getTomorrowFormattedDate();
            config.targetDate = resDateInput.value;
        }

        floorSelect.addEventListener('change', async () => {
            config.uiSelectedFloor = floorSelect.value;
            updateFloorAndPreferenceOptions();
            await saveConfig();
        });

        preferenceSelect.addEventListener('change', async () => {
            config.uiSelectedPreference = preferenceSelect.value;
            await saveConfig();
        });

        resDateInput.addEventListener('change', async () => {
            config.targetDate = resDateInput.value;
            await saveConfig();
        });

        resStartTimeInput.addEventListener('change', async () => {
            config.targetStartTime = resStartTimeInput.value;
            await saveConfig();
            // 取消快捷按钮高亮
            document.querySelectorAll('.quick-time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });

        resEndTimeInput.addEventListener('change', async () => {
            config.targetEndTime = resEndTimeInput.value;
            await saveConfig();
            // 取消快捷按钮高亮
            document.querySelectorAll('.quick-time-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        });

        preferredSeatNumberInput.addEventListener('change', async () => {
            config.uiPreferredSeatNumber = preferredSeatNumberInput.value;
            await saveConfig();
        });

        autoStartToggle.addEventListener('change', async () => {
            config.autoStartAtSpecificTime = autoStartToggle.checked;
            await saveConfig();
            scheduleAutoStart();
        });
        startHourInput.addEventListener('change', async () => {
            config.startHour = parseInt(startHourInput.value, 10) || 0;
            await saveConfig();
            scheduleAutoStart();
        });
        startMinuteInput.addEventListener('change', async () => {
            config.startMinute = parseInt(startMinuteInput.value, 10) || 0;
            await saveConfig();
            scheduleAutoStart();
        });
        startSecondInput.addEventListener('change', async () => {
            config.startSecond = parseInt(startSecondInput.value, 10) || 0;
            await saveConfig();
            scheduleAutoStart();
        });

        startBtn.addEventListener('click', () => {
            if (抢座核心逻辑Timer) {
                clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = null;
            }
            startReservationProcess(true);
            startBtn.style.display = 'none';
            resetBtn.style.display = 'inline-block';
        });

        resetBtn.addEventListener('click', () => {
            if (抢座核心逻辑Timer) {
                clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = null;
            }
            reservationAttempts = 0;
            updateUIStatus('抢座已重置。');
            startBtn.style.display = 'inline-block';
            resetBtn.style.display = 'none';
            if (config.autoStartAtSpecificTime) {
                scheduleAutoStart();
            }
        });

        refreshBtn.addEventListener('click', async () => {
            if (!vm) {
                updateUIStatus('错误: 无法找到UniApp Vue实例');
                return;
            }
            updateUIStatus('正在手动刷新座位列表...');
            try {
                const manualDate = resDateInput.value;
                const manualStartTime = resStartTimeInput.value;
                const manualEndTime = resEndTimeInput.value;

                if (!manualDate || !/^\d{4}-\d{2}-\d{2}$/.test(manualDate) || 
                    !manualStartTime || !/^\d{2}:\d{2}$/.test(manualStartTime) || 
                    !manualEndTime || !/^\d{2}:\d{2}$/.test(manualEndTime)) {
                     updateUIStatus('错误: 日期/时间输入无效');
                     return;
                }

                setTimeRange(vm, manualDate, manualStartTime, manualEndTime);
                await new Promise(r => setTimeout(r, 800));

                const fetchSuccess = await fetchSeatListSafely(vm);
                if (!fetchSuccess) {
                    updateUIStatus('错误: 座位刷新失败');
                    return;
                }

                let availableSeatsCount = 0;
                if (vm.seatList && vm.seatList.length > 0) {
                    availableSeatsCount = vm.seatList.filter(seat =>
                        seat.type === 'SEAT' &&
                        seat.enabled &&
                        seat.status === 'FREE' &&
                        !config.globalBlacklistKeywords.some(keyword => seat.name && seat.name.includes(keyword))
                    ).length;
                }
                updateUIStatus(`座位刷新成功，可用座位数: ${availableSeatsCount}`);
            } catch (e) {
                error('手动刷新座位失败:', e);
                updateUIStatus('错误: 手动刷新座位失败');
            }
        });

        minimizeBtn.addEventListener('click', async () => {
            config.uiPanelMinimized = !config.uiPanelMinimized;
            contentDiv.style.display = config.uiPanelMinimized ? 'none' : 'block';
            minimizeBtn.textContent = config.uiPanelMinimized ? '+' : '-';
            await saveConfig();
        });

        closeBtn.addEventListener('click', () => {
            if (抢座核心逻辑Timer) {
                clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = null;
            }
            if (vmDiscoveryInterval) {
                 clearInterval(vmDiscoveryInterval);
            }
            uiContainer.remove();
            log('UI 面板已关闭。');
        });

        resDateInput.value = config.targetDate || getTomorrowFormattedDate();
        resStartTimeInput.value = config.targetStartTime;
        resEndTimeInput.value = config.targetEndTime;
        preferredSeatNumberInput.value = config.uiPreferredSeatNumber;
        startHourInput.value = config.startHour;
        startMinuteInput.value = config.startMinute;
        startSecondInput.value = config.startSecond;
        autoStartToggle.checked = config.autoStartAtSpecificTime;

        // 初始化快捷按钮高亮（新增）
        const currentStartTime = resStartTimeInput.value;
        const currentEndTime = resEndTimeInput.value;
        if (currentStartTime && currentEndTime) {
            quickTimeRanges.forEach((range, index) => {
                if (range.start === currentStartTime && range.end === currentEndTime) {
                    const buttons = document.querySelectorAll('.quick-time-btn');
                    if (buttons[index]) {
                        buttons[index].classList.add('active');
                    }
                }
            });
        }
    }

    function updateFloorAndPreferenceOptions() {
        const floorSelect = document.getElementById('floor-select');
        const preferenceSelect = document.getElementById('preference-select');
        if (!floorSelect || !preferenceSelect) return;

        floorSelect.innerHTML = '';
        preferenceSelect.innerHTML = '';

        const autoFloorOption = document.createElement('option');
        autoFloorOption.value = 'auto';
        autoFloorOption.textContent = '自动检测楼层';
        floorSelect.appendChild(autoFloorOption);

        const availableFloors = Object.keys(config.seatPreferences);
        availableFloors.forEach(floor => {
            const option = document.createElement('option');
            option.value = floor;
            option.textContent = floor;
            floorSelect.appendChild(option);
        });

        let currentDetectedFloor = vm ? getFloorIdentifier(vm.readingRoom) : null;

        if (config.uiSelectedFloor && (availableFloors.includes(config.uiSelectedFloor) || config.uiSelectedFloor === 'auto')) {
            floorSelect.value = config.uiSelectedFloor;
        } else if (currentDetectedFloor && availableFloors.includes(currentDetectedFloor)) {
            floorSelect.value = currentDetectedFloor;
            config.uiSelectedFloor = currentDetectedFloor;
        } else {
            if (availableFloors.includes("3F")) {
                floorSelect.value = "3F";
                config.uiSelectedFloor = "3F";
            } else {
                floorSelect.value = 'auto';
                config.uiSelectedFloor = 'auto';
            }
        }
        saveConfig();

        const selectedFloor = floorSelect.value;
        const currentFloorPreferences = config.seatPreferences[selectedFloor];

        const autoPrefOption = document.createElement('option');
        autoPrefOption.value = 'auto';
        autoPrefOption.textContent = '按优先级选择（默认）';
        preferenceSelect.appendChild(autoPrefOption);

        if (currentFloorPreferences) {
            currentFloorPreferences.forEach(pref => {
                const option = document.createElement('option');
                option.value = pref.type;
                option.textContent = pref.type;
                preferenceSelect.appendChild(option);
            });
        }

        if (config.uiSelectedPreference &&
            (preferenceSelect.querySelector(`option[value="${config.uiSelectedPreference}"]`) || config.uiSelectedPreference === 'auto')) {
            preferenceSelect.value = config.uiSelectedPreference;
        } else {
            preferenceSelect.value = 'auto';
            config.uiSelectedPreference = 'auto';
        }
        saveConfig();
    }

    function applyStoredUIState() {
        const uiContainer = document.getElementById('libseat-auto-reserve-ui');
        if (!uiContainer) return;
        const contentDiv = uiContainer.querySelector('.content');
        const minimizeBtn = document.getElementById('minimize-btn');

        if (config.uiPanelMinimized) {
            contentDiv.style.display = 'none';
            minimizeBtn.textContent = '+';
        } else {
            contentDiv.style.display = 'block';
            minimizeBtn.textContent = '-';
        }
    }

    function updateUIStatus(message) {
        const statusDiv = document.getElementById('status');
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.scrollTop = statusDiv.scrollHeight;
        }
    }

    // --- 主入口逻辑 ---
    if (window.location.href.includes('libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2')) {
        log('Script is running on the target page.');

        window.addEventListener('load', async () => {
            await loadConfig();
            setTimeout(() => {
                createUI();
                waitForUniAppPageVm().then(foundVm => {
                    vm = foundVm;
                    if (vm) {
                        updateFloorAndPreferenceOptions();
                        scheduleAutoStart();
                    } else {
                        updateUIStatus('错误: 无法找到UniApp Vue实例');
                    }
                });
            }, 2000);
        });
    } else {
        log('Script not running on target page. Current URL:', window.location.href);
    }
})();