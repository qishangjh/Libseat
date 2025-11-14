---
tags:
---
# QIshan今天抢到座位了吗 - 吉林大学图书馆自动抢座脚本

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Required-orange)](https://www.tampermonkey.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-V1.4.4-blue)](https://github.com/qishangjh/libseat)

## 项目简介

本项目是一个为**吉林大学图书馆座位预约系统 (libseat.jlu.edu.cn)** 量身定制的 Tampermonkey 用户脚本。旨在帮助用户实现全自动、智能化、高效率的图书馆座位预约。脚本提供了直观的用户界面 (UI)，支持精确定时启动、多重偏好筛选、喜欢座位号优先选择等高级功能，大幅提升预约成功率和便利性。

**请注意：** 本脚本仅用于学习和技术交流，自动化操作可能带来潜在风险。使用前请务必仔细阅读免责声明，并谨慎使用。

## 核心功能

*   **全自动抢座：** 可根据预设时间自动启动抢座流程，无需人工值守。
*   **可视化用户界面 (UI)：**
    *   **可拖拽与最小化：** UI面板可自由拖拽位置，并支持最小化/最大化，不干扰页面浏览。
    *   **实时状态显示：** 显示脚本当前运行状态、下次定时抢座时间等。
    *   **便捷参数配置：** 通过UI直接选择预约日期、开始/结束时间、楼层、地段偏好、设置定时启动时间。
*   **智能偏好筛选：**
    *   **多层级排序：** 支持根据楼层、地段偏好（如靠边、大理石、中间）进行座位筛选和优先级排序。
    *   **距离偏好：** 优先选择距离目标座位号（默认为40号）更近的座位。
    *   **喜欢座位号优先：** 支持输入**多个以逗号分隔的座位号**作为最高优先级，脚本将优先尝试预约这些座位。
*   **精确定时启动：** 可设定具体的年/月/日/时/分/秒，精确控制脚本启动抢座。
*   **快速重试机制：** 遇到抢座失败或无可用座位时，能快速、智能地进行多次重试。
*   **自动确认预约：** 可选自动点击预约弹窗的确认按钮，进一步实现全自动化。
*   **安全提示：** 脚本启动时提供浏览器通知，确保用户知晓脚本已运行。

## 安装指南

1.  **安装 Tampermonkey 浏览器扩展：**
    *   Chrome 浏览器：[Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    *   Firefox 浏览器：[Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
    *   Edge 浏览器：[Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpbldmmepgdkmfapfmhelnlilb)
    *   其他浏览器请自行搜索安装 Tampermonkey。

2.  **创建新脚本：**
    *   安装 Tampermonkey 后，点击浏览器工具栏的 Tampermonkey 图标。
    *   选择 **“创建新脚本...”**。

3.  **粘贴脚本代码：**
    *   清空 Tampermonkey 默认的代码模板。
    *   将本 README 文件末尾提供的 **最新版本脚本代码** 完整复制并粘贴到 Tampermonkey 编辑器中。

4.  **保存并启用：**
    *   点击文件菜单中的 **“文件” -> “保存”**。
    *   Tampermonkey 会自动启用新脚本。您可以在 Tampermonkey 的“管理面板”中确认脚本状态。

## 使用方法

1.  **打开图书馆预约页面：**
    *   前往吉林大学图书馆座位预约系统：`https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2*`。
    *   页面加载后，脚本会自动运行并弹出UI面板。

2.  **配置预约参数：**
    *   **预约日期：** 默认填充“明天”的日期，以符合系统在晚上开放次日预约的规则。请勿选择当天日期。
    *   **时间段：** 选择您希望预约的开始和结束时间。可使用快捷时间按钮（全天、上午、下午、晚上）快速设置。
    *   **楼层：** 选择目标楼层。推荐选择“自动检测楼层”。
    *   **地段偏好：** 选择您的地段偏好（如“靠边”、“大理石”、“中间”），或保持“按优先级选择（默认）”。
    *   **喜欢座位号：** 在输入框中填写您偏爱的座位号，多个座位号请用逗号 `,` 分隔，例如 `38, 40, 26`。脚本会优先抢占这些座位。
    *   **定时自动抢座：** 勾选此项并设置精确的启动时间（时、分、秒）。例如，设为 `21:00:01` 抢座明天的座位。
    *   **自动确认预约：** 勾选后，脚本会在弹出预约确认框时自动点击确认。

3.  **启动抢座：**
    *   **手动抢座：** 点击 UI 下方的 **“开始抢座”** 按钮，脚本会立即开始尝试预约。
    *   **定时抢座：** 勾选“定时自动抢座”并设置好时间后，脚本会在指定时间自动启动。UI面板下方会显示下一次启动时间。
    *   **刷新：** 点击 **“刷新”** 按钮可以手动刷新当前时间段下的座位列表。
    *   **重置抢座：** 在抢座过程中，点击 **“重置抢座”** 可以停止当前的抢座循环。

4.  **监控状态：**
    *   UI面板底部的状态栏会实时显示脚本的运行情况和提示信息。
    *   您也可以打开浏览器开发者工具 (F12)，查看“Console”（控制台）标签页获取详细日志。

## 配置项 (通过UI设置并自动保存)

所有配置项均通过脚本UI进行设置，并会自动保存到浏览器本地存储，下次打开页面时会自动加载。

## 更新日志

---

### V1.4.4 - 精准复合排序版 (2025-11-14)

*   **优化：重构座位分类逻辑，精准实现复合优先级排序。** 解决了在“按优先级选择”模式下，所有座位都被归类为“靠边”而导致地段偏好失效的问题。现在，脚本会优先将座位分类到“大理石”、“中间”等更具体的偏好类型，然后才考虑“靠边”作为通用类型。
*   **改进：精确的复合排序。** 排序逻辑严格遵循：
    1.  **是否是“喜欢座位号”（`isPreferred`：最高优先级）。**
    2.  **被分类的“地段偏好类型”的优先级（`categoryPriority`：例如 靠边 P1 > 大理石 P2 > 中间 P3）。**
    3.  **距离目标座位号 `40` 的远近（`distanceFromTarget`：越近越优先）。**
*   **维护：** `GM_CONFIG_KEY` 更新至 `v1_4_4`。

### V1.4.3 - 定位与多选增强版 (2025-11-14)

*   **新功能：喜欢座位号支持多选。** “指定座位号”输入框改为文本类型，允许用户输入多个以逗号分隔的座位号，脚本将这些座位视为最高优先级进行选择。
*   **优化：靠近目标座位号40的优先级。** 将距离排序的目标座位号从 `50` 调整为 `40`。
*   **修复：UI面板显示Bug。** 增大了UI面板展开时的默认宽度（从320px调整为350px），并略微增大了最小化时的宽度，以解决楼层下拉框文本显示不完整的问题。
*   **优化：`updateFloorAndPreferenceOptions` 鲁棒性。** 将函数声明为 `async`，确保内部 `getFloorIdentifier` 和 `saveConfig` 调用正确 `await`，提高异步处理的稳定性。
*   **维护：** `GM_CONFIG_KEY` 更新至 `v1_4_3`。

### V1.4.2 - UI稳定加强版 (2025-11-14)

*   **新功能：脚本启动通知。** 脚本启动时会通过浏览器通知用户脚本已运行，增强用户感知。
*   **优化：UI注入重试机制。** 引入 `ensureUIPresentAndInitialized` 包装函数，在UI面板首次注入DOM失败或被移除时，会进行多次重试以确保UI最终能稳定显示。
*   **优化：UI元素引用。** 将所有UI元素引用集中管理在 `uiElements` 对象中，避免重复DOM查询，提升效率和稳定性。
*   **优化：UI面板最小宽度。** 为UI面板设置 `min-width`，确保即使在最小化状态下也能完整显示标题和迷你按钮。
*   **优化：核心UI函数鲁棒性。** `updateTimerDisplay` 和 `scheduleAutoStart` 函数在执行前会检查UI是否已就绪 (`uiReady` 状态)，避免操作不存在的元素。
*   **维护：** 彻底移除所有楼层跳转相关代码，遵循用户要求。`GM_CONFIG_KEY` 更新至 `v1_4_2`。

### V1.4.1 (用户提供版本，具体更新日志未知，描述中提及UI状态显示错误修复与精确性提高)

*   **修复：** UI状态显示错误。
*   **优化：** 提高精确性。

### V1.3.10 - UI加载终极修复版 (2025-11-13)

*   **优化：`@run-at` 修改为 `document-end`。** 确保DOM完全加载后才执行脚本，提供更稳定的UI注入环境。
*   **优化：`createUI` 函数定义前置。** 将UI创建函数移动到顶层作用域，解决可能出现的 `ReferenceError`。
*   **优化：UI初始化流程。** 调整UI创建和VM发现顺序，先创建基本UI，再根据VM数据更新UI。
*   **维护：** 彻底移除所有链接映射跳转相关代码。

### V1.2.x 系列 - 交互式UI与定时抢座 (2025-11-12)

*   **新功能：** 在页面上添加可拖拽、最小化的UI面板，实现用户交互配置。
*   **功能：** 用户可通过UI选择楼层、地段偏好、预约日期、开始/结束时间。
*   **功能：** 集成定时自动抢座的开关和时间设置，并显示下一次启动时间。
*   **修复：** UI加载时可能出现的 `SyntaxError` 和 `scheduleAutoStart` 的 `ReferenceError`。
*   **优化：** 预约日期输入框默认值为“明天”，以符合系统预约次日座位的规则，避免 `400 Bad Request` 错误。

### V1.1.0 - 智能偏好筛选 (2025-11-11)

*   **新功能：** 引入智能偏好筛选机制，支持根据楼层、座位号模式和优先级进行座位筛选和排序。

### V1.0.9 - 抢座优化 (2025-11-10)

*   **优化：** 引入精确定时启动和快速重试机制，提高抢座成功率。

### V1.0.8 - 初始版本 (2025-11-09)

*   **核心功能：** 实现基本的图书馆座位自动预约功能。

---

## 免责声明

本脚本为自动化工具，仅供学习、研究和个人便利使用。作者不对因使用本脚本而导致的任何直接或间接后果承担责任。

**使用本脚本意味着您理解并同意：**
1.  **风险自担：** 自动化操作可能违反网站的使用条款，存在被封禁账号的风险。请自行评估并承担所有风险。
2.  **谨慎使用：** 强烈建议您在充分了解其功能和潜在风险后谨慎使用，并保持对操作过程的监控。
3.  **遵守规则：** 请遵守图书馆的预约规定和网站的使用政策。

请确保您有权使用此类自动化工具，并在合法合规的前提下使用本脚本。

---

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

---

## 最新版本脚本代码

请将以下代码复制并粘贴到您的 Tampermonkey 新脚本中：

```javascript
// ==UserScript==
// @name         QIshan今天抢到座位了吗 - V1.4.4 (精准复合排序版)
// @namespace    http://tampermonkey.net/
// @version      1.4.4
// @description  为吉林大学图书馆座位预约系统 (libseat.jlu.edu.cn) 创建的 Tampermonkey 用户脚本。精准实现复合优先级排序：喜欢座位号 > 地段偏好 (靠边/大理石/中间) > 距离目标座位。
// @author       QIshan
// @match        https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2*
// @grant        GM_log
// @grant        GM.info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const TARGET_COMPONENT_NAME = "SeatChooseV2";
    let vm = null;
    let 抢座核心逻辑Timer = null;
    let isReservationLoopActive = false; // 新增状态变量，标识抢座核心逻辑是否正在主动执行
    let vmDiscoveryInterval = null;
    let reservationAttempts = 0;
    const MAX_RESERVATION_ATTEMPTS = 5;
    const FETCH_SEAT_RETRY_DELAY = 1000;
    const FETCH_SEAT_MAX_RETRIES = 3;
    const seatCheckCache = new Map(); // 座位可用性检查缓存

    const DISTANCE_SORT_TARGET_SEAT = 40; // 距离排序的目标座位号

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
                { type: "靠边", rule: "剩余的", priority: 1 }, // 靠边 > 大理石 > 中间
                { type: "大理石", rule: "29-59", priority: 2 },
                { type: "中间", rule: "61+3n, n<12", priority: 3 }
            ],
            "2F": [
                { type: "靠边", rule: "37-84", priority: 1 }, // 这里需要明确，如果靠边有具体规则，应写出来，否则会被视为通用规则
                { type: "大理石", rule: "85-102", priority: 2 },
                { type: "中间", rule: "2+3n, n<12", priority: 3 }
            ]
        },
        globalBlacklistKeywords: ["设备损坏", "禁"],
        autoConfirmReservation: true,
        retryInterval: 2000,
        randomizeDelay: 500,
        modalButtonFindDelay: 800,
        postActionInitialWait: 100, // Initial brief wait after a click or VM action to allow synchronous UI updates
        postActionMaxWait: 5000,    // Max total wait for reservation outcome detection (e.g., for page redirect)
        postActionMinDelay: 200,    // Minimal delay after an action BEFORE checkReservationOutcome starts polling.
        uiSelectedFloor: "3F",
        uiSelectedPreference: "auto",
        uiPreferredSeatNumber: "", // 现在存储字符串，逗号分隔
        uiPanelMinimized: true // 默认折叠，显示迷你UI
    };

    let config = { ...defaultConfig };
    const GM_CONFIG_KEY = 'libseat_auto_reserve_config_v1_4_4'; // 更新配置键名

    // --- 快捷时间段配置 ---
    const quickTimeRanges = [
        { name: "全天", start: "08:15", end: "21:45" },
        { name: "上午", start: "08:15", end: "12:00" },
        { name: "下午1", start: "12:20", end: "15:20" },
        { name: "下午2", start: "15:00", end: "18:00" },
        { name: "晚上", start: "18:00", end: "21:45" }
    ];

    // --- 预编译规则正则缓存 ---
    const ruleRegexCache = new Map();

    // --- 日志函数 ---
    async function log(...args) {
        console.log(`[${GM.info.script.name}]`, ...args);
        try {
            await GM_log(`[${GM.info.script.name}]`, ...args);
        } catch (e) { /* silent catch for GM_log if context is closing */ }
    }
    async function error(...args) {
        console.error(`[${GM.info.script.name} ERROR]`, ...args);
        try {
            await GM_log(`[${GM.info.script.name} ERROR]`, ...args);
        } catch (e) { /* silent catch for GM_log if context is closing */ }
    }

    // --- UI 状态更新函数 (提前定义，确保UI加载前可用) ---
    // 此函数可能在同步上下文被调用，因此内部的 GM_log 不 await，以避免影响UI响应
    function updateUIStatus(message) {
        if (!uiReady || !uiElements.statusEl) {
            console.log(`[${GM.info.script.name} Status]`, message);
            try { GM_log(`[${GM.info.script.name} Status]`, message); } catch (e) {}
            return;
        }
        uiElements.statusEl.textContent = message;
    }

    // --- 工具函数 ---
    function parseSeatNumberFromName(seatName) {
        if (!seatName) return NaN;
        const matches = seatName.match(/\d+/g);
        return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : NaN;
    }

    function compileRule(ruleString) {
        if (ruleRegexCache.has(ruleString)) {
            return ruleRegexCache.get(ruleString);
        }

        let rule;
        if (ruleString === "剩余的") {
            rule = { type: "remaining" };
        } else {
            const patternMatch = ruleString.match(/(\d+)\+(\d+)n,\s*n<(\d+)/);
            if (patternMatch) {
                rule = {
                    type: "series",
                    a: parseInt(patternMatch[1], 10),
                    b: parseInt(patternMatch[2], 10),
                    m: parseInt(patternMatch[3], 10)
                };
            } else {
                const rangeMatch = ruleString.match(/(\d+)-(\d+)/);
                if (rangeMatch) {
                    rule = {
                        type: "range",
                        start: parseInt(rangeMatch[1], 10),
                        end: parseInt(rangeMatch[2], 10)
                    };
                } else {
                    rule = { type: "unknown" };
                }
            }
        }

        ruleRegexCache.set(ruleString, rule);
        return rule;
    }

    function matchesPreferenceRule(ruleString, seatNumber) {
        if (!ruleString || isNaN(seatNumber)) return false;
        const rule = compileRule(ruleString);

        switch (rule.type) {
            case "remaining":
                return true;
            case "series":
                for (let n = 0; n < rule.m; n++) {
                    if (seatNumber === rule.a + rule.b * n) return true;
                }
                return false;
            case "range":
                return seatNumber >= rule.start && seatNumber <= rule.end;
            default:
                return false;
        }
    }

    /**
     * Helper to recursively find a Vue instance by its component name within a component tree.
     */
    function findVueInstance(rootVm, componentName) {
        if (!rootVm) return null;
        const vueInstance = rootVm.$vm || rootVm; // Try to get the actual Vue instance if rootVm is a UniApp page object
        if (!vueInstance || typeof vueInstance !== 'object') return null;

        const name = vueInstance.$options?.name || vueInstance.$options?._componentTag;
        if (name === componentName) {
            return vueInstance;
        }

        if (vueInstance.$children && vueInstance.$children.length > 0) {
            for (let i = 0; i < vueInstance.$children.length; i++) {
                const childVm = findVueInstance(vueInstance.$children[i], componentName);
                if (childVm) {
                    return childVm;
                }
            }
        }
        return null;
    }

    async function getFloorIdentifier(readingRoom) { // Made async for awaited log
        if (!readingRoom) {
            await log('getFloorIdentifier: vm.readingRoom is null or undefined.');
            return null;
        }

        if (readingRoom.parentNamePath) {
            const match = readingRoom.parentNamePath.match(/(\d+F)/);
            if (match) {
                await log(`getFloorIdentifier: Found floor '${match[1]}' from parentNamePath.`);
                return match[1];
            }
        }

        if (readingRoom.name) {
            const match = readingRoom.name.match(/(\d+F)/);
            if (match) {
                await log(`getFloorIdentifier: Found floor '${match[1]}' from name.`);
                return match[1];
            }
        }
        
        await log('getFloorIdentifier: Could not find floor identifier from vm.readingRoom.');
        return null;
    }

    function getTomorrowFormattedDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // --- GM 函数异步处理 ---
    async function safeGMGetValue(key, defaultValue) {
        try {
            const value = await GM_getValue(key, defaultValue);
            return value;
        } catch (e) {
            await error(`GM_getValue 失败 (key: ${key}):`, e);
            return defaultValue;
        }
    }

    async function safeGMSetValue(key, value) {
        try {
            await GM_setValue(key, value);
            await log(`Configuration saved to storage (key: ${key})`);
            return true;
        } catch (e) {
            await error(`GM_setValue 失败 (key: ${key}):`, e);
            return false;
        }
    }

    async function loadConfig() {
        try {
            const storedConfig = await safeGMGetValue(GM_CONFIG_KEY, null);
            if (storedConfig) {
                const mergedSeatPreferences = { ...defaultConfig.seatPreferences, ...storedConfig.seatPreferences };
                storedConfig.seatPreferences = mergedSeatPreferences;
                config = { ...defaultConfig, ...storedConfig };
                // Ensure targetDate is always set to tomorrow if empty or invalid
                if (!config.targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(config.targetDate)) {
                    config.targetDate = getTomorrowFormattedDate();
                }
                await log("Loaded configuration from storage:", config);
            } else {
                await log("No stored configuration found, using default config.");
                config.targetDate = getTomorrowFormattedDate(); // Default tomorrow
            }
        } catch (e) {
            await error("Failed to load configuration from storage:", e);
            config = { ...defaultConfig };
            config.targetDate = getTomorrowFormattedDate(); // Default tomorrow
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
                uiSelectedFloor: config.uiSelectedFloor,
                uiSelectedPreference: config.uiSelectedPreference,
                uiPreferredSeatNumber: config.uiPreferredSeatNumber,
                uiPanelMinimized: config.uiPanelMinimized,
                autoConfirmReservation: config.autoConfirmReservation,
            };
            await safeGMSetValue(GM_CONFIG_KEY, configToSave);
        } catch (e) {
            await error("Failed to save configuration to storage:", e);
        }
    }

    async function waitForUniAppPageVm() {
        await log('Attempting to find UniApp Vue instance...');
        return new Promise((resolve) => {
            let retryCount = 0;
            const maxRetriesForVm = 180; // 180 retries * 200ms = 36 seconds

            vmDiscoveryInterval = setInterval(async () => {
                retryCount++;
                if (retryCount > maxRetriesForVm) {
                    clearInterval(vmDiscoveryInterval);
                    await error('Max retries reached for finding root Vue instance. Script cannot proceed.');
                    resolve(null);
                    return;
                }

                let rootVm = null;
                if (typeof getCurrentPages === 'function') {
                    try {
                        const pages = getCurrentPages();
                        if (pages && pages.length > 0) {
                            const currentPage = pages[pages.length - 1];
                            rootVm = currentPage && (currentPage.$vm || currentPage.vm || (currentPage.$children && currentPage.$children[0]));
                        }
                    } catch (e) { /* ignore, try other methods */ }
                }

                if (!rootVm) {
                    try {
                        const vueInstances = document.querySelectorAll('[data-vue-app], [vue-app], [data-vue], #app');
                        if (vueInstances.length > 0) {
                            const appEl = vueInstances[0];
                            rootVm = appEl.__vue__ || appEl._vue || appEl.vue;
                        }
                    } catch (e) { /* ignore */ }
                }

                if (rootVm) {
                    const rootVmName = rootVm.$options?.name || rootVm.$options?._componentTag || 'N/A';
                    if (rootVmName === TARGET_COMPONENT_NAME) {
                        clearInterval(vmDiscoveryInterval);
                        await log(`Successfully found target component (root VM itself): "${TARGET_COMPONENT_NAME}".`);
                        resolve(rootVm);
                    } else {
                        const foundVm = findVueInstance(rootVm, TARGET_COMPONENT_NAME);
                        if (foundVm) {
                            clearInterval(vmDiscoveryInterval);
                            await log(`Successfully found "${TARGET_COMPONENT_NAME}" VM via child components.`);
                            resolve(foundVm);
                        }
                    }
                }
            }, 200);
        });
    }

    // --- 核心抢座逻辑 ---

    async function setTimeRange(vmInstance, date, startTime, endTime) {
        await log(`Setting time range to: Date=${date}, Start=${startTime}, End=${endTime}`);
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
                    vmInstance.$set(vmInstance.timeRange, 'date', date);
                    vmInstance.$set(vmInstance.timeRange, 'startTime', startTime);
                    vmInstance.$set(vmInstance.timeRange, 'endTime', endTime);
                } else if (typeof vmInstance.$forceUpdate === 'function') {
                    vmInstance.$forceUpdate();
                } else {
                    await log('Warning: $set or $forceUpdate not found, relying on direct assignment for timeRange which might not be reactive.');
                }
                
                await new Promise(r => setTimeout(r, config.postActionMinDelay));
                await log('timeRange updated in VM and applied.');
            } else {
                await error('vmInstance.timeRange is not available. Cannot set time range.');
            }
        } catch (e) {
            await error('Error setting time range:', e);
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
                const rect = element.getBoundingClientRect();
                const clientX = rect.left + rect.width / 2;
                const clientY = rect.top + rect.height / 2;

                const downEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: clientX, clientY: clientY, button: 0 });
                const upEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true, clientX: clientX, clientY: clientY, button: 0 });
                const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, clientX: clientX, clientY: clientY, button: 0 });
                element.dispatchEvent(downEvent);
                element.dispatchEvent(upEvent);
                element.dispatchEvent(clickEvent);
                return true;
            } catch (e2) {
                try {
                    const rect = element.getBoundingClientRect();
                    const clientX = rect.left + rect.width / 2;
                    const clientY = rect.top + rect.height / 2;

                    const event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, true, null, 0, 0, 0,
                        clientX, clientY, false, false, false, false, 0, null);
                    element.dispatchEvent(event);
                    return true;
                } catch (e3) {
                    error('All click methods failed:', e3); // `error` is async, but not awaited here as safeClick is sync.
                    return false;
                }
            }
        }
    }

    async function isSeatStillAvailable(vmInstance, seatId) {
        const now = Date.now();
        const cached = seatCheckCache.get(seatId);
        if (cached && now - cached.time < 3000) { // Cache validity: 3 seconds
            await log(`Seat ${seatId} status from cache: ${cached.available}`);
            return cached.available;
        }
        
        try {
            if (typeof vmInstance.getSeats === 'function' && 
                (!vmInstance.lastSeatFetchTime || now - vmInstance.lastSeatFetchTime > 5000)) {
                await log('Refreshing seat list before availability check...');
                await vmInstance.getSeats();
                vmInstance.lastSeatFetchTime = now;
                await new Promise(r => setTimeout(r, 300));
            }
            const seat = vmInstance.seatList?.find(s => s.id === seatId);
            const available = !!seat && seat.status === 'FREE' && seat.enabled;
            seatCheckCache.set(seatId, { available, time: now });
            await log(`Seat ${seatId} availability rechecked: ${available}`);
            return available;
        } catch (e) {
            await error('Error checking seat availability:', e);
            return false;
        }
    }

    async function checkReservationOutcome(vmInstance, initialUrl) {
        const MAX_WAIT_TIME = config.postActionMaxWait;
        const INTERVAL_CHECK = 100;

        let elapsedTime = 0;
        let lastReservationResult = null;

        await new Promise(r => setTimeout(r, config.postActionMinDelay));
        await log(`[Outcome Check] Started polling after ${config.postActionMinDelay}ms delay. Max wait: ${MAX_WAIT_TIME}ms.`);

        return new Promise(resolve => {
            const checkInterval = setInterval(async () => {
                elapsedTime += INTERVAL_CHECK;

                if (window.location.href !== initialUrl) {
                    clearInterval(checkInterval);
                    await log(`[Outcome Check] Page redirected to: ${window.location.href}`);
                    if (window.location.href.includes('/pages/user/reservation/reservation') ||
                        window.location.href.includes('/pages/user/index') ||
                        window.location.href.includes('/pages/reserve/seat-reserve/seat-history') ||
                        window.location.href.includes('/pages/reserve/my-reserve/my-reserve')
                    ) {
                        return resolve({ status: 'success', message: '页面已跳转至预约成功页面或用户相关页面。' });
                    }
                    return resolve({ status: 'failure', message: `页面跳转到非预期地址: ${window.location.href}` });
                }

                if (vmInstance.reservationResult && vmInstance.reservationResult !== lastReservationResult) {
                    await log(`[Outcome Check] vm.reservationResult changed:`, vmInstance.reservationResult);
                    lastReservationResult = vmInstance.reservationResult;

                    const res = vmInstance.reservationResult;
                    if (res.statusCode === 200 || (res.data && (res.data.code === 0 || res.data.code === 'SUCCESS'))) {
                        clearInterval(checkInterval);
                        return resolve({ status: 'success', message: `VM API报告成功: ${res.data?.message || ''}` });
                    } 
                    else if (res.statusCode === 400 && res.data?.code === 'reservation.user_has_other_reservation') {
                        clearInterval(checkInterval);
                        return resolve({ status: 'failure_existing_reservation', message: res.data.message || '您已有其他申请或预约。' });
                    } 
                    else if (res.statusCode && res.data?.message) {
                        clearInterval(checkInterval);
                        return resolve({ status: 'failure', message: `VM API报告错误: ${res.data.message} (Code: ${res.statusCode})` });
                    }
                }

                const successMsg = document.querySelector('.success-message, .toast-success, [class*="success"], [class*="el-message--success"]');
                if (successMsg && successMsg.offsetParent !== null) {
                    clearInterval(checkInterval);
                    return resolve({ status: 'success', message: `检测到DOM成功消息: ${successMsg.textContent.trim()}` });
                }

                const errorMsgEl = document.querySelector('.error-message, .toast-error, [class*="error"], [class*="el-message--error"], .uni-toast-content, .uni-modal-content, .uni-dialog-content');
                if (errorMsgEl && errorMsgEl.offsetParent !== null) {
                    const fullErrorText = errorMsgEl.textContent.trim();
                    if (fullErrorText.includes('已有其他申请或预约')) {
                        clearInterval(checkInterval);
                        return resolve({ status: 'failure_existing_reservation', message: `检测到DOM错误消息: ${fullErrorText}` });
                    } else if (fullErrorText.includes('失败') || fullErrorText.includes('错误') || fullErrorText.includes('不可预约') || fullErrorText.includes('已存在') || fullErrorText.includes('被占用')) {
                        clearInterval(checkInterval);
                        return resolve({ status: 'failure', message: `检测到DOM错误消息: ${fullErrorText.substring(0, Math.min(fullErrorText.length, 100))}` });
                    }
                }

                if (!vmInstance.seatReserveVisible && !document.querySelector('.uni-modal-mask') && elapsedTime > config.postActionMinDelay + 500) {
                    clearInterval(checkInterval);
                    return resolve({ status: 'failure', message: '预约模态框已关闭，但未检测到成功或错误消息，也未跳转。' });
                }

                if (elapsedTime >= MAX_WAIT_TIME) {
                    clearInterval(checkInterval);
                    return resolve({ status: 'timeout', message: '等待预约结果超时。' });
                }
            }, INTERVAL_CHECK);
        });
    }

    function findConfirmButton() {
        const primaryButtons = document.querySelectorAll('.seat-btn.seat-btn-primary, .btn-primary, [data-action="reserve"], button.primary, .modal-footer button:first-child, .modal-btn-confirm, button[data-type="primary"], .btn-success, [class*="reserve-btn"], [class*="confirm-btn"]');
        for (const btn of primaryButtons) {
            if (btn.offsetParent !== null) { // Check if button is visible
                return btn;
            }
        }
        
        const allButtons = document.querySelectorAll('button, [role="button"], .btn, div[role="button"]');
        for (const btn of allButtons) {
            if (btn.offsetParent !== null) { // Check if button is visible
                const text = btn.textContent.trim() || btn.innerText.trim();
                if (text.includes('预约') || text.includes('确认') || text.includes('提交')) {
                    return btn;
                }
            }
        }
        return null;
    }

    async function stopReservationLoopDueToCriticalError() {
        if (抢座核心逻辑Timer) {
            clearTimeout(抢座核心逻辑Timer);
            抢座核心逻辑Timer = null;
        }
        isReservationLoopActive = false; // 重置状态

        if (uiReady) {
            uiElements.startBtn.style.display = 'inline-block';
            uiElements.resetBtn.style.display = 'none';
        }
        await log('Reservation loop stopped due to critical error.');
        updateUIStatus('抢座已停止，检测到不可恢复错误。请检查控制台。');
        updateTimerDisplay(); // Ensure minimized UI buttons are updated
    }

    async function triggerVmReservation(vmInstance, seat) {
        try {
            await log('Trying to trigger reservation via VM methods...');
            const initialUrl = window.location.href;
            let vmMethodExecuted = false;
            let directPromiseResult = null;

            vmInstance.reservationResult = null;
            await log('Cleared vm.reservationResult for a fresh check.');

            if (typeof vmInstance.confirmReservation === 'function') {
                await log('Calling vm.confirmReservation()');
                vmMethodExecuted = true;
                directPromiseResult = vmInstance.confirmReservation(seat)
                    .then(res => ({ status: 'resolved', data: res }))
                    .catch(err => ({ status: 'rejected', error: err }));
            } else if (typeof vmInstance.submitReservation === 'function') {
                await log('Calling vm.submitReservation()');
                vmMethodExecuted = true;
                directPromiseResult = vmInstance.submitReservation(seat)
                    .then(res => ({ status: 'resolved', data: res }))
                    .catch(err => ({ status: 'rejected', error: err }));
            } else if (typeof vmInstance.reserveSeat === 'function') {
                await log('Calling vm.reserveSeat()');
                vmMethodExecuted = true;
                directPromiseResult = vmInstance.reserveSeat(seat.id, vmInstance.timeRange)
                    .then(res => ({ status: 'resolved', data: res }))
                    .catch(err => ({ status: 'rejected', error: err }));
            } else if (vmInstance.$emit) {
                await log('Emitting "reserve" event via VM (no direct promise expected, relying on outcome check)');
                vmInstance.$emit('reserve', seat);
                vmMethodExecuted = true;
            } else if (window.app && typeof window.app.reserve === 'function') {
                await log('Calling window.app.reserve()');
                vmMethodExecuted = true;
                directPromiseResult = window.app.reserve(seat.id, vmInstance.timeRange)
                    .then(res => ({ status: 'resolved', data: res }))
                    .catch(err => ({ status: 'rejected', error: err }));
            }

            if (!vmMethodExecuted) {
                await error('No known VM reservation method found or triggered successfully.');
                return false;
            }

            const outcomePromise = checkReservationOutcome(vmInstance, initialUrl);
            
            if (directPromiseResult) {
                const raceResult = await Promise.race([
                    directPromiseResult.then(res => ({ type: 'direct_response', result: res })),
                    outcomePromise.then(res => ({ type: 'outcome_check', result: res })),
                    new Promise(r => setTimeout(() => r({ type: 'timeout_for_direct_response' }), config.postActionMaxWait))
                ]);

                if (raceResult.type === 'direct_response' && raceResult.result.status === 'rejected') {
                    const errorData = raceResult.result.error?.data || raceResult.result.error;
                    if (errorData?.code === 'reservation.user_has_other_reservation') {
                        await error(`Direct VM promise rejected (critical): ${errorData.message}`);
                        updateUIStatus(`预约失败: ${errorData.message} (已停止抢座)`);
                        await stopReservationLoopDueToCriticalError();
                        return false;
                    } else {
                        await log(`Direct VM promise rejected with general error:`, raceResult.result.error);
                    }
                }
            }

            const finalOutcome = await outcomePromise;

            if (finalOutcome.status === 'success') {
                await log(`VM triggered reservation success: ${finalOutcome.message}`);
                return true;
            } else if (finalOutcome.status === 'failure_existing_reservation') {
                await error(`VM triggered reservation failed (critical): ${finalOutcome.message}`);
                updateUIStatus(`预约失败: ${finalOutcome.message} (已停止抢座)`);
                await stopReservationLoopDueToCriticalError();
                return false;
            } else {
                await error(`VM triggered reservation failed: ${finalOutcome.message}`);
                updateUIStatus(`VM预约失败: ${finalOutcome.message}`);
                return false;
            }
        } catch (e) {
            await error('Unexpected error during VM reservation trigger:', e);
            updateUIStatus(`VM预约方法调用中发生意外错误: ${e.message}`);
            return false;
        }
    }

    async function selectAndReserveSeat(vmInstance, seat) {
        if (!seat || !seat.id) {
            await error('Invalid seat object provided for selection.');
            return false;
        }
        
        await log(`Attempting to select seat: ${seat.name} (ID: ${seat.id})`);
        
        try {
            const isAvailable = await isSeatStillAvailable(vmInstance, seat.id);
            if (!isAvailable) {
                await error(`Seat ${seat.name} (ID: ${seat.id}) is no longer available (rechecked).`);
                return false;
            }

            let seatSelected = false;
            if (typeof vmInstance.selectSeat === 'function') {
                await log(`Calling vm.selectSeat with seat: ${seat.id}`);
                await vmInstance.selectSeat({ seat: seat, index: vmInstance.seatList.findIndex(s => s.id === seat.id) });
                seatSelected = true;
            } else if (typeof vmInstance.handleSeatClick === 'function') {
                await log(`Calling vm.handleSeatClick with seat: ${seat.id}`);
                await vmInstance.handleSeatClick(seat);
                seatSelected = true;
            } else {
                await error('No direct seat selection method found on VM. Trying direct DOM click...');
                const seatElement = document.querySelector(`[data-seat-id="${seat.id}"]`) || 
                                   document.querySelector(`.seat-item[data-id="${seat.id}"]`) ||
                                   document.querySelector(`.seat[data-seatid="${seat.id}"]`) ||
                                   document.querySelector(`[id*="seat-${seat.id}"]`);

                if (seatElement) {
                    await log(`Found seat DOM element: ${seatElement.tagName}`);
                    safeClick(seatElement);
                    seatSelected = true;
                } else {
                    await error(`No seat DOM element found for seat ID: ${seat.id}.`);
                    return false;
                }
            }
            
            if (!seatSelected) {
                await error('Seat selection failed by all methods.');
                return false;
            }
            
            await log(`Seat ${seat.name} selected. Waiting for reservation modal...`);
            await new Promise(r => setTimeout(r, config.postActionMinDelay));

            let modalVisibleCheckRetries = 0;
            const maxModalVisibleChecks = 20;
            while (!vmInstance.seatReserveVisible && modalVisibleCheckRetries < maxModalVisibleChecks) {
                await new Promise(r => setTimeout(r, 500));
                modalVisibleCheckRetries++;
                if (typeof vmInstance.openReservationModal === 'function' && modalVisibleCheckRetries === 3) {
                    await log('Modal not visible, force opening reservation modal...');
                    await vmInstance.openReservationModal(seat);
                    await new Promise(r => setTimeout(r, config.postActionMinDelay));
                }
            }

            if (vmInstance.seatReserveVisible) {
                await log('Reservation modal is visible.');
                
                if (config.autoConfirmReservation) {
                    await log('Auto-confirm is ON. Attempting VM reservation method directly...');
                    
                    const vmReservationSuccess = await triggerVmReservation(vmInstance, seat);
                    if (vmReservationSuccess) {
                        return true;
                    } else {
                        if (抢座核心逻辑Timer === null) { 
                            await log('VM reservation method failed critically or stopped by existing reservation. Exiting selectAndReserveSeat.');
                            return false;
                        }
                        await log(`VM reservation method failed for seat ${seat.name}. Trying DOM click fallback...`);

                        let confirmButton = findConfirmButton();
                        if (confirmButton) {
                            await log(`Found confirm button for DOM click fallback: ${confirmButton.tagName} ${confirmButton.className || ''}`);
                            confirmButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            await new Promise(r => setTimeout(r, config.postActionMinDelay));
                            
                            const initialUrl = window.location.href;
                            vmInstance.reservationResult = null;
                            await log('Cleared vm.reservationResult for DOM click fallback.');

                            safeClick(confirmButton);
                            await new Promise(r => setTimeout(r, config.postActionInitialWait));
                            safeClick(confirmButton);
                            await new Promise(r => setTimeout(r, config.postActionInitialWait));

                            await log('Clicked the "预约/确认" button (DOM fallback). Waiting for reservation outcome...');
                            const outcome = await checkReservationOutcome(vmInstance, initialUrl);

                            if (outcome.status === 'success') {
                                await log(`Reservation success (DOM click): ${outcome.message}`);
                                updateUIStatus(`成功预约座位: ${seat.name}! (${outcome.message})`);
                                return true;
                            } else if (outcome.status === 'failure_existing_reservation') {
                                await error(`Reservation failed (critical, DOM click): ${outcome.message}`);
                                updateUIStatus(`预约失败: ${outcome.message} (已停止抢座)`);
                                await stopReservationLoopDueToCriticalError();
                                return false;
                            } else {
                                await error(`Reservation failed for seat ${seat.name} (DOM click): ${outcome.message}`);
                                updateUIStatus(`座位 ${seat.name} 预约失败: ${outcome.message}`);
                                return false;
                            }
                        } else {
                            await error('Could not find the "预约/确认" button for DOM click fallback.');
                            updateUIStatus(`错误: 无法找到预约按钮进行 DOM 点击。`);
                            return false;
                        }
                    }
                } else {
                    await log('Auto-confirm is OFF. Reservation modal is open, please manually confirm.');
                    updateUIStatus('自动确认已关闭。预约模态框已弹出，请手动确认。');
                    return true;
                }
            } else {
                await error('Reservation modal did not appear or vm.seatReserveVisible is false after multiple checks. Retrying is handled by reservationLoop.');
                updateUIStatus(`错误: 预约模态框未弹出或超时。`);
                return false;
            }
        } catch (e) {
            await error('Error during seat selection/confirmation:', e);
            updateUIStatus(`预约过程中发生意外错误: ${e.message}`);
            return false;
        }
    }
    
    // 计算座位与目标座位号的距离
    function getDistanceFromTargetSeat(seatNumber, target) {
        return Math.abs(seatNumber - target);
    }

    // 解析逗号分隔的座位号字符串为数字数组
    function parsePreferredSeatNumbers(inputString) {
        if (!inputString) return [];
        return inputString.split(',')
                         .map(s => parseInt(s.trim(), 10))
                         .filter(n => !isNaN(n) && n > 0); // 过滤掉无效数字和0
    }

    function filterAndSortSeats(seatList, floorId, preferredSeatNumbers) {
        const preferences = config.seatPreferences[floorId] || [];
        const validSeats = [];
        const uiSelectedPreference = uiElements.preferenceSelect.value;
        const isAutoMode = uiSelectedPreference === 'auto';

        // 将偏好定义映射成Map，方便查找
        const prefDefs = new Map(preferences.map(p => [p.type, p]));

        // 定义分类的优先级顺序，这个顺序决定了座位被归类到哪个“类型”
        // 用户期望的是 靠边 > 大理石 > 中间，这里的P1, P2, P3是实际分类后，用于排序的优先级
        // 如果靠边是“剩余的”，那么它应该是最后被考虑分类的。
        // 但由于用户期望“靠边”的优先级最高，这里的策略是：
        // 1. 先尝试将座位分类到“大理石”或“中间”等具体偏好。
        // 2. 如果不符合任何具体偏好，再将其分类为“靠边”（作为通用类型）。
        // 3. 最后，根据这些分类类型对应的优先级（P1靠边，P2大理石，P3中间）进行排序。
        const specificCategoryAssignmentOrder = ["大理石", "中间"]; // 先尝试具体分类

        for (let i = 0; i < seatList.length; i++) {
            const seat = seatList[i];
            if (seat.type !== 'SEAT' || !seat.enabled || seat.status !== 'FREE') continue;
            
            let isBlacklisted = false;
            for (let j = 0; j < config.globalBlacklistKeywords.length; j++) {
                if (seat.name?.includes(config.globalBlacklistKeywords[j])) {
                    isBlacklisted = true;
                    break;
                }
            }
            if (isBlacklisted) continue;

            const seatNumber = parseSeatNumberFromName(seat.name);
            if (isNaN(seatNumber)) continue;

            let assignedCategoryType = "未分类";
            let assignedCategoryPriority = Infinity; // 默认为最低优先级

            if (isAutoMode) {
                let specificTypeAssigned = false;
                // 优先尝试将座位分类到具体的、非“剩余的”偏好类型
                for (const typeName of specificCategoryAssignmentOrder) {
                    const prefDef = prefDefs.get(typeName);
                    if (prefDef && prefDef.rule !== "剩余的" && matchesPreferenceRule(prefDef.rule, seatNumber)) {
                        assignedCategoryType = prefDef.type;
                        assignedCategoryPriority = prefDef.priority;
                        specificTypeAssigned = true;
                        break; // 找到最具体的分类，跳出
                    }
                }

                // 如果没有匹配到任何具体偏好，则尝试将其分类为“靠边”（如果定义为“剩余的”）
                if (!specificTypeAssigned) {
                    const byTheSidePref = prefDefs.get("靠边");
                    if (byTheSidePref && byTheSidePref.rule === "剩余的") {
                        assignedCategoryType = byTheSidePref.type;
                        assignedCategoryPriority = byTheSidePref.priority;
                    }
                    // 如果“靠边”也有具体规则且未匹配，或者未定义，则保持“未分类”
                }

            } else { // 用户显式选择了某个地段偏好
                const targetPrefDef = prefDefs.get(uiSelectedPreference);
                if (targetPrefDef) {
                    if (targetPrefDef.rule === "剩余的" || matchesPreferenceRule(targetPrefDef.rule, seatNumber)) {
                        assignedCategoryType = targetPrefDef.type;
                        assignedCategoryPriority = targetPrefDef.priority;
                    }
                }
            }

            const distanceFromTarget = getDistanceFromTargetSeat(seatNumber, DISTANCE_SORT_TARGET_SEAT);
            validSeats.push({
                ...seat,
                seatNumber,
                category: assignedCategoryType,
                categoryPriority: assignedCategoryPriority,
                distanceFromTarget,
                isPreferred: preferredSeatNumbers.includes(seatNumber)
            });
        }

        // 严格按照用户指定的优先级进行多重排序
        return validSeats.sort((a, b) => {
            // 1. 首先，优先选择用户明确指定的喜欢座位号 (true在前)
            if (a.isPreferred !== b.isPreferred) {
                return a.isPreferred ? -1 : 1;
            }

            // 2. 其次，在是否喜欢相同的情况下，根据被分配的“地段偏好类型”的优先级排序 (数字越小优先级越高)
            if (a.categoryPriority !== b.categoryPriority) {
                return a.categoryPriority - b.categoryPriority;
            }

            // 3. 最后，在地段偏好优先级也相同的情况下，根据距离目标座位号的远近排序 (距离越小优先级越高)
            return a.distanceFromTarget - b.distanceFromTarget;
        });
    }

    async function fetchSeatListSafely(vmInstance) {
        let retries = 0;
        while (retries < FETCH_SEAT_MAX_RETRIES) {
            try {
                await log(`Fetching seats (attempt ${retries + 1}/${FETCH_SEAT_MAX_RETRIES})`);
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
                    await log(`Fetched ${vmInstance.seatList.length} seats successfully.`);
                    return true;
                } else {
                    retries++;
                    await log(`Seat list is empty after fetch. Retrying (${retries}/${FETCH_SEAT_MAX_RETRIES})...`);
                    await new Promise(r => setTimeout(r, FETCH_SEAT_RETRY_DELAY));
                }
            } catch (e) {
                retries++;
                await error(`Error fetching seats (${retries}/${FETCH_SEAT_MAX_RETRIES}):`, e.message);
                await new Promise(r => setTimeout(r, FETCH_SEAT_RETRY_DELAY));
            }
        }
        return false;
    }

    async function scheduleNextReservationAttempt() {
        // 如果因为 critical error 而停止，则不再调度
        if (抢座核心逻辑Timer === null && uiReady && uiElements.startBtn?.style.display === 'inline-block') {
             await log('Reservation loop stopped by critical error, not rescheduling.');
             updateTimerDisplay(); // 确保UI反映此状态
             return;
        }

        if (抢座核心逻辑Timer) clearTimeout(抢座核心逻辑Timer);
        
        const delay = config.retryInterval + (Math.random() * config.randomizeDelay * 2 - config.randomizeDelay);
        updateUIStatus(`等待 ${Math.round(delay / 1000)} 秒后进行下一次尝试...`);
        await log(`Scheduling next reservation attempt in ${delay / 1000} seconds.`);
        
        isReservationLoopActive = false; // 在调度下一轮任务时，核心循环是非活动状态
        updateTimerDisplay(); // 更新UI，显示“等待下一次尝试”或“将于 XX:XX 自动抢座”

        抢座核心逻辑Timer = setTimeout(() => {
            reservationAttempts = 0;
            reservationLoop(); // reservationLoop 会在开始时设置 isReservationLoopActive = true
        }, delay);
    }

    async function reservationLoop() {
        isReservationLoopActive = true; // 抢座核心逻辑开始执行
        updateTimerDisplay(); // 立即更新UI为“正在抢座中...”
        await log('Reservation loop started.');

        // 抢座循环中的退出条件检查 (已有的逻辑)
        if (抢座核心逻辑Timer === null && uiReady && uiElements.startBtn?.style.display === 'inline-block') {
            await log('Reservation loop manually stopped or stopped by critical error. Exiting.');
            isReservationLoopActive = false; // 重置状态
            updateTimerDisplay();
            return;
        }

        if (reservationAttempts >= MAX_RESERVATION_ATTEMPTS) {
            updateUIStatus(`已达到最大抢座尝试次数(${MAX_RESERVATION_ATTEMPTS}次)，停止抢座`);
            await log(`Reached maximum reservation attempts (${MAX_RESERVATION_ATTEMPTS}), stopping`);
            
            if (uiReady) {
                uiElements.startBtn.style.display = 'inline-block';
                uiElements.resetBtn.style.display = 'none';
            }
            
            clearTimeout(抢座核心逻辑Timer);
            抢座核心逻辑Timer = null;
            isReservationLoopActive = false; // 重置状态
            updateTimerDisplay();
            return;
        }

        reservationAttempts++;
        updateUIStatus(`正在进行第 ${reservationAttempts}/${MAX_RESERVATION_ATTEMPTS} 次抢座尝试`);
        updateTimerDisplay(); // 再次确保所有UI元素更新，包括迷你UI的计数

        if (!vm) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：查找Vue实例...`);
            vm = await waitForUniAppPageVm();
            if (!vm) {
                updateUIStatus('错误: 无法找到UniApp Vue实例，重试...');
                await error('Failed to find UniApp Vue instance.');
                isReservationLoopActive = false; // 重置状态
                await scheduleNextReservationAttempt();
                return;
            }
            updateUIStatus(`第 ${reservationAttempts} 次尝试：Vue实例已找到`);
        }

        const uiTargetDate = uiElements.resDateInput.value;
        const uiStartTime = uiElements.resStartTimeInput.value;
        const uiEndTime = uiElements.resEndTimeInput.value;
        const preferredSeatNumbers = parsePreferredSeatNumbers(uiElements.preferredSeatNumberInput.value); // 解析多选座位号

        if (!uiTargetDate || !/^\d{4}-\d{2}-\d{2}$/.test(uiTargetDate)) {
            updateUIStatus('错误: 预约日期格式无效 (YYYY-MM-DD)');
            await error('Invalid reservation date format.');
            isReservationLoopActive = false; // 重置状态
            await stopReservationLoopDueToCriticalError(); // Critical error, stop loop entirely
            return;
        }
        if (!uiStartTime || !/^\d{2}:\d{2}$/.test(uiStartTime) || !uiEndTime || !/^\d{2}:\d{2}$/.test(uiEndTime)) {
            updateUIStatus('错误: 预约时间格式无效 (HH:MM)');
            await error('Invalid reservation time format.');
            isReservationLoopActive = false; // 重置状态
            await stopReservationLoopDueToCriticalError(); // Critical error, stop loop entirely
            return;
        }

        const startMoment = new Date(`${uiTargetDate} ${uiStartTime}`);
        let endMoment = new Date(`${uiTargetDate} ${uiEndTime}`);
        if (endMoment.getTime() <= startMoment.getTime()) {
             endMoment.setDate(endMoment.getDate() + 1);
             if (endMoment.getTime() <= startMoment.getTime()) {
                 updateUIStatus('错误: 结束时间必须晚于开始时间，请检查日期和时间设置。');
                 await error('Reservation end time must be after start time, even with day increment.');
                 isReservationLoopActive = false; // 重置状态
                 await stopReservationLoopDueToCriticalError(); // Critical error, stop loop entirely
                 return;
             }
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：设置时间范围 ${uiTargetDate} ${uiStartTime}-${uiEndTime}...`);
        try {
            await setTimeRange(vm, uiTargetDate, uiStartTime, uiEndTime);
        } catch (e) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：设置时间范围失败`);
            await error('Failed to set time range:', e);
            isReservationLoopActive = false; // 重置状态
            await scheduleNextReservationAttempt();
            return;
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：获取座位列表...`);
        const fetchSuccess = await fetchSeatListSafely(vm);
        if (!fetchSuccess) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：获取座位列表失败或为空`);
            isReservationLoopActive = false; // 重置状态
            await scheduleNextReservationAttempt();
            return;
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：筛选并排序座位...`);

        let actualFloorIdForSorting = uiElements.floorSelect.value;
        if (actualFloorIdForSorting === 'auto') {
            const detectedFloor = await getFloorIdentifier(vm.readingRoom); // Await here
            if (detectedFloor) {
                actualFloorIdForSorting = detectedFloor;
                await log(`Detected floor: ${detectedFloor}, using for preferences.`);
            } else {
                actualFloorIdForSorting = defaultConfig.uiSelectedFloor;
                updateUIStatus(`警告: 无法自动检测楼层，已使用默认楼层 (${actualFloorIdForSorting}) 进行偏好筛选。`);
            }
        }

        const sortedSeats = filterAndSortSeats(vm.seatList, actualFloorIdForSorting, preferredSeatNumbers);

        if (sortedSeats.length === 0) {
            updateUIStatus(`第 ${reservationAttempts} 次尝试：没有找到符合条件的座位`);
            await log('No suitable seats found after filtering.');
            isReservationLoopActive = false; // 重置状态
            await scheduleNextReservationAttempt();
            return;
        }

        updateUIStatus(`第 ${reservationAttempts} 次尝试：找到 ${sortedSeats.length} 个符合条件的座位，尝试预约最优座位...`);
        await log(`Found ${sortedSeats.length} valid seats. Trying top candidates.`);

        const maxAttemptsPerRound = Math.min(3, sortedSeats.length);
        for (let i = 0; i < maxAttemptsPerRound; i++) {
            const targetSeat = sortedSeats[i];
            await log(`Attempting to reserve seat #${i+1}: ${targetSeat.name} (ID: ${targetSeat.id}, Category: ${targetSeat.category}, Priority: ${targetSeat.categoryPriority}, DistanceFrom${DISTANCE_SORT_TARGET_SEAT}: ${targetSeat.distanceFromTarget}, IsPreferred: ${targetSeat.isPreferred})`);
            updateUIStatus(`尝试预约座位 ${targetSeat.name} (类型: ${targetSeat.category}, 优先级: ${targetSeat.categoryPriority}, 距离${DISTANCE_SORT_TARGET_SEAT}: ${targetSeat.distanceFromTarget})`);
            
            const reservationSuccess = await selectAndReserveSeat(vm, targetSeat);
            if (reservationSuccess) {
                updateUIStatus(`成功预约座位: ${targetSeat.name}!`);
                await log(`Successfully reserved seat: ${targetSeat.name}`);
                
                if (uiReady) {
                    uiElements.startBtn.style.display = 'inline-block';
                    uiElements.resetBtn.style.display = 'none';
                }
                
                clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = null;
                isReservationLoopActive = false; // 重置状态
                updateTimerDisplay();
                return;
            } else {
                if (抢座核心逻辑Timer === null) { // 已被 critical error 停止
                    await log('Reservation loop stopped by critical error during seat selection.');
                    isReservationLoopActive = false; // 重置状态
                    return;
                }
                await log(`Failed to reserve seat ${targetSeat.name}, trying next preferred seat if available.`);
                updateUIStatus(`座位 ${targetSeat.name} 预约失败，尝试下一个...`);
            }
        }

        // 如果本轮所有候选座位都预约失败
        updateUIStatus(`第 ${reservationAttempts} 次尝试：所有候选座位预约失败`);
        isReservationLoopActive = false; // 重置状态
        await scheduleNextReservationAttempt(); // 调度下一次尝试
    }


    // --- UI 相关函数 ---
    let uiElements = {}; // 存储所有UI元素的引用
    let uiReady = false; // 标记UI是否已成功创建并初始化

    function createUI() {
        if (document.getElementById('libseat-reservation-panel')) {
            // UI已经存在，只重新初始化其状态和事件监听（防止重复添加）
            log('UI面板元素已存在，重新初始化状态和事件监听。');
            initializeUIElementsAndState();
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'libseat-reservation-panel';
        panel.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 9999;
            background: white; padding: 10px; border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif; font-size: 14px;
            color: #333; transition: all 0.3s ease-in-out;
            max-height: 90vh; overflow-y: auto;
            min-width: 220px; /* 确保最小宽度，防止在迷你模式下完全折叠 */
        `;

        panel.innerHTML = `
            <style>
                #libseat-reservation-panel * { box-sizing: border-box; }
                #libseat-reservation-panel .header {
                    display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;
                    padding-bottom: 5px; border-bottom: 1px solid #eee;
                }
                #libseat-reservation-panel h3 { margin: 0; color: #333; font-size: 16px; white-space: nowrap; }
                #libseat-reservation-panel button {
                    background: none; border: none; cursor: pointer; font-size: 16px;
                    color: #666; transition: color 0.2s;
                }
                #libseat-reservation-panel button:hover { color: #000; }
                #libseat-reservation-panel label {
                    display: block; margin-bottom: 5px; font-weight: bold; color: #555;
                }
                #libseat-reservation-panel select,
                #libseat-reservation-panel input[type="date"],
                #libseat-reservation-panel input[type="time"],
                #libseat-reservation-panel input[type="text"], /* New: for preferred seat numbers */
                #libseat-reservation-panel input[type="number"] {
                    width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px;
                    font-size: 14px; color: #333;
                }
                #libseat-reservation-panel .input-group-row {
                    display: flex; gap: 8px; margin-bottom: 10px;
                    align-items: center;
                }
                #libseat-reservation-panel .input-group-row > span {
                    margin-top: -15px; /* Adjust vertical alignment for '-' */
                }
                #libseat-reservation-panel .input-group-item {
                    flex: 1;
                }
                #libseat-reservation-panel .quick-time-ranges {
                    display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px;
                }
                #libseat-reservation-panel .quick-time-btn {
                    padding: 5px 10px; font-size: 12px; background: #e0e0e0; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;
                    color: #555; transition: background 0.2s, color 0.2s, border-color 0.2s;
                }
                #libseat-reservation-panel .quick-time-btn:hover {
                    background: #d0d0d0; border-color: #bbb; color: #333;
                }
                #libseat-reservation-panel .checkbox-group {
                    display: flex; align-items: center; margin-bottom: 10px;
                }
                #libseat-reservation-panel .checkbox-group input[type="checkbox"] {
                    margin-right: 8px; width: auto; transform: scale(1.1);
                }
                #libseat-reservation-panel #start-reserve-btn,
                #libseat-reservation-panel #reset-reserve-btn,
                #libseat-reservation-panel #refresh-seats-btn {
                    padding: 10px; border: none; border-radius: 4px; color: white; font-weight: bold; cursor: pointer;
                    font-size: 15px; transition: background 0.2s;
                }
                #libseat-reservation-panel #start-reserve-btn { background: #4CAF50; }
                #libseat-reservation-panel #start-reserve-btn:hover { background: #43A047; }
                #libseat-reservation-panel #reset-reserve-btn { background: #FF9800; color: white; }
                #libseat-reservation-panel #reset-reserve-btn:hover { background: #FB8C00; }
                #libseat-reservation-panel #refresh-seats-btn { background: #2196F3; }
                #libseat-reservation-panel #refresh-seats-btn:hover { background: #1976D2; }
                #libseat-reservation-panel #reservation-status {
                    padding: 10px; background: #e8f5e9; border-radius: 4px; min-height: 20px; color: #2e7d32; margin-top: 15px;
                    font-size: 13px; text-align: center; border: 1px solid #c8e6c9;
                }
                #libseat-reservation-panel #minimized-panel-content {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 5px;
                }
                #libseat-reservation-panel #minimized-panel-content button {
                    background-color: #f8f8f8;
                    border: 1px solid #e0e0e0;
                    color: #333;
                    font-weight: normal;
                    padding: 8px 10px;
                    font-size: 13px;
                    border-radius: 4px;
                    width: 100%;
                    text-align: center;
                    transition: background-color 0.2s, opacity 0.2s;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                #libseat-reservation-panel #minimized-panel-content button:hover:not(:disabled) {
                    background-color: #f0f0f0;
                }
                #libseat-reservation-panel #minimized-panel-content button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
            </style>
            <div class="header">
                <h3>QIshan今天抢到座位了吗</h3>
                <button id="minimize-panel">▾</button>
            </div>
            
            <div id="minimized-panel-content">
                <button id="minimized-start-reserve-btn" title="点击立即开始抢座">
                    手动立刻抢座
                </button>
                <button id="minimized-show-time-btn" title="点击展开设置面板，查看和修改预约时间">
                    预约时间: 就绪
                </button>
            </div>

            <div id="panel-content">
                <div class="input-group-row">
                    <div class="input-group-item">
                        <label for="floor-select">楼层:</label>
                        <select id="floor-select"></select>
                    </div>
                    <div class="input-group-item">
                        <label for="preference-select">地段偏好:</label>
                        <select id="preference-select"></select>
                    </div>
                </div>
                
                <div>
                    <label for="res-date-input">预约日期:</label>
                    <input type="date" id="res-date-input">
                </div>
                
                <div>
                    <label>时间段:</label>
                    <div class="input-group-row">
                        <input type="time" id="res-start-time" class="input-group-item">
                        <span>-</span>
                        <input type="time" id="res-end-time" class="input-group-item">
                    </div>
                    <div class="quick-time-ranges">
                        ${quickTimeRanges.map(range => `
                            <button class="quick-time-btn" data-start="${range.start}" data-end="${range.end}">${range.name}</button>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <label for="preferred-seat-number">喜欢座位号 (多个以逗号分隔，优先选择):</label>
                    <input type="text" id="preferred-seat-number" placeholder="如: 40, 41, 42">
                </div>
                
                <div class="checkbox-group">
                    <input type="checkbox" id="auto-start-toggle" ${config.autoStartAtSpecificTime ? 'checked' : ''}>
                    <label for="auto-start-toggle">定时自动抢座</label>
                </div>
                <div class="input-group-row">
                    <div class="input-group-item">
                        <label for="start-hour">时:</label>
                        <input type="number" id="start-hour" min="0" max="23">
                    </div>
                    <div class="input-group-item">
                        <label for="start-minute">分:</label>
                        <input type="number" id="start-minute" min="0" max="59">
                    </div>
                    <div class="input-group-item">
                        <label for="start-second">秒:</label>
                        <input type="number" id="start-second" min="0" max="59">
                    </div>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="auto-confirm" ${config.autoConfirmReservation ? 'checked' : ''}>
                    <label for="auto-confirm">自动确认预约</label>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button id="start-reserve-btn" style="flex: 2;">开始抢座</button>
                    <button id="refresh-seats-btn" style="flex: 1;">刷新</button>
                    <button id="reset-reserve-btn" style="flex: 2; display: none;">重置抢座</button>
                </div>
                
                <div id="reservation-status">就绪，请设置参数并点击开始</div>
            </div>
        `;

        document.body.appendChild(panel);
        log('尝试将UI面板附加到document.body。');
        initializeUIElementsAndState(); // 初始化UI元素引用和状态
        uiReady = true; // 标记UI已就绪
    }

    function initializeUIElementsAndState() {
        uiElements.panel = document.getElementById('libseat-reservation-panel');
        if (!uiElements.panel) {
            log('警告: 在初始化期间未找到UI面板元素。');
            uiReady = false;
            return;
        }

        uiElements.floorSelect = document.getElementById('floor-select');
        uiElements.preferenceSelect = document.getElementById('preference-select');
        uiElements.resDateInput = document.getElementById('res-date-input');
        uiElements.resStartTimeInput = document.getElementById('res-start-time');
        uiElements.resEndTimeInput = document.getElementById('res-end-time');
        uiElements.preferredSeatNumberInput = document.getElementById('preferred-seat-number');
        uiElements.autoConfirmToggle = document.getElementById('auto-confirm');
        uiElements.autoStartToggle = document.getElementById('auto-start-toggle');
        uiElements.startHourInput = document.getElementById('start-hour');
        uiElements.startMinuteInput = document.getElementById('start-minute');
        uiElements.startSecondInput = document.getElementById('start-second');
        uiElements.startBtn = document.getElementById('start-reserve-btn');
        uiElements.resetBtn = document.getElementById('reset-reserve-btn');
        uiElements.refreshBtn = document.getElementById('refresh-seats-btn');
        uiElements.minimizeBtn = document.getElementById('minimize-panel');
        uiElements.minimizedStartReserveBtn = document.getElementById('minimized-start-reserve-btn');
        uiElements.minimizedShowTimeBtn = document.getElementById('minimized-show-time-btn');
        uiElements.panelContent = document.getElementById('panel-content');
        uiElements.minimizedPanelContent = document.getElementById('minimized-panel-content');
        uiElements.statusEl = document.getElementById('reservation-status'); // 新增状态元素引用

        // 应用配置中的初始值
        uiElements.floorSelect.value = config.uiSelectedFloor;
        uiElements.preferenceSelect.value = config.uiSelectedPreference;
        uiElements.preferredSeatNumberInput.value = config.uiPreferredSeatNumber || ''; // 保持为字符串
        uiElements.autoConfirmToggle.checked = config.autoConfirmReservation;
        uiElements.resDateInput.value = config.targetDate; // 确保使用从config加载的值（已默认明天）
        uiElements.resStartTimeInput.value = config.targetStartTime;
        uiElements.resEndTimeInput.value = config.targetEndTime;
        uiElements.autoStartToggle.checked = config.autoStartAtSpecificTime;
        uiElements.startHourInput.value = config.startHour;
        uiElements.startMinuteInput.value = config.startMinute;
        uiElements.startSecondInput.value = config.startSecond;

        // 确保事件监听器只添加一次
        if (!uiElements.panel.dataset.listenersAdded) {
            setupEventListeners();
            uiElements.panel.dataset.listenersAdded = 'true';
        }
        
        // 应用初始面板状态 (最小化/展开)
        togglePanelVisibility(config.uiPanelMinimized, true); // 传递 true 跳过保存配置
        updateTimerDisplay(); // 刷新显示
    }

    // 设置所有事件监听器
    function setupEventListeners() {
        uiElements.minimizeBtn.addEventListener('click', async () => {
            await togglePanelVisibility(!config.uiPanelMinimized);
        });

        if (uiElements.minimizedStartReserveBtn) {
            uiElements.minimizedStartReserveBtn.addEventListener('click', async () => {
                if (uiElements.minimizedStartReserveBtn.disabled) {
                    await log('迷你抢座按钮已禁用。');
                    return; 
                }
                reservationAttempts = 0;
                if (抢座核心逻辑Timer) clearTimeout(抢座核心逻辑Timer);
                抢座核心逻辑Timer = setTimeout(() => reservationLoop(), 100);
                updateUIStatus('开始抢座...');
                updateTimerDisplay(); // 立即更新UI状态为“抢座中...”
            });
        }

        if (uiElements.minimizedShowTimeBtn) {
            uiElements.minimizedShowTimeBtn.addEventListener('click', async () => {
                await togglePanelVisibility(false);
            });
        }

        const updateAndSaveConfig = async (prop, value) => {
            config[prop] = value;
            await saveConfig();
            updateTimerDisplay(); // Update time display if time config changes
        };

        uiElements.floorSelect.addEventListener('change', async () => {
            await updateAndSaveConfig('uiSelectedFloor', uiElements.floorSelect.value);
            await updateFloorAndPreferenceOptions(); // Re-populate preferences based on new floor and await it
        });
        uiElements.preferenceSelect.addEventListener('change', async () => {
            await updateAndSaveConfig('uiSelectedPreference', uiElements.preferenceSelect.value);
        });
        uiElements.resDateInput.addEventListener('change', async () => {
            await updateAndSaveConfig('targetDate', uiElements.resDateInput.value);
        });
        uiElements.resStartTimeInput.addEventListener('change', async () => {
            await updateAndSaveConfig('targetStartTime', uiElements.resStartTimeInput.value);
        });
        uiElements.resEndTimeInput.addEventListener('change', async () => {
            await updateAndSaveConfig('targetEndTime', uiElements.resEndTimeInput.value);
        });
        uiElements.preferredSeatNumberInput.addEventListener('change', async () => {
            await updateAndSaveConfig('uiPreferredSeatNumber', uiElements.preferredSeatNumberInput.value.trim()); // 保存为字符串
        });
        uiElements.autoConfirmToggle.addEventListener('change', async () => {
            await updateAndSaveConfig('autoConfirmReservation', uiElements.autoConfirmToggle.checked);
        });

        uiElements.autoStartToggle.addEventListener('change', async () => {
            await updateAndSaveConfig('autoStartAtSpecificTime', uiElements.autoStartToggle.checked);
            await scheduleAutoStart();
        });
        uiElements.startHourInput.addEventListener('change', async () => {
            await updateAndSaveConfig('startHour', parseInt(uiElements.startHourInput.value, 10));
            await scheduleAutoStart();
        });
        uiElements.startMinuteInput.addEventListener('change', async () => {
            await updateAndSaveConfig('startMinute', parseInt(uiElements.startMinuteInput.value, 10));
            await scheduleAutoStart();
        });
        uiElements.startSecondInput.addEventListener('change', async () => {
            await updateAndSaveConfig('startSecond', parseInt(uiElements.startSecondInput.value, 10));
            await scheduleAutoStart();
        });

        uiElements.startBtn.addEventListener('click', () => {
            reservationAttempts = 0;
            if (抢座核心逻辑Timer) clearTimeout(抢座核心逻辑Timer);
            抢座核心逻辑Timer = setTimeout(() => reservationLoop(), 100);
            updateUIStatus('开始抢座...');
            updateTimerDisplay();
        });

        uiElements.resetBtn.addEventListener('click', () => {
            if (抢座核心逻辑Timer) clearTimeout(抢座核心逻辑Timer);
            抢座核心逻辑Timer = null;
            isReservationLoopActive = false; // 重置状态
            updateUIStatus('抢座已重置。');
            if (config.autoStartAtSpecificTime) {
                scheduleAutoStart();
            }
            updateTimerDisplay();
        });

        uiElements.refreshBtn.addEventListener('click', async () => {
            if (!vm) {
                updateUIStatus('错误: 无法找到 UniApp Vue 实例。请先启动抢座或等待页面加载。');
                return;
            }
            updateUIStatus('正在手动刷新座位列表...');
            try {
                const manualDate = uiElements.resDateInput.value;
                const manualStartTime = uiElements.resStartTimeInput.value;
                const manualEndTime = uiElements.resEndTimeInput.value;

                if (!manualDate || !/^\d{4}-\d{2}-\d{2}$/.test(manualDate) || 
                    !manualStartTime || !/^\d{2}:\d{2}$/.test(manualStartTime) || 
                    !manualEndTime || !/^\d{2}:\d{2}$/.test(manualEndTime)) {
                     updateUIStatus('错误: 日期/时间输入无效，无法刷新座位。请检查输入格式。');
                     return;
                }
                
                await setTimeRange(vm, manualDate, manualStartTime, manualEndTime);
                await fetchSeatListSafely(vm);

                let availableSeatsCount = 0;
                if (vm.seatList && vm.seatList.length > 0) {
                    availableSeatsCount = vm.seatList.filter(seat =>
                        seat.type === 'SEAT' &&
                        seat.enabled &&
                        seat.status === 'FREE' &&
                        !config.globalBlacklistKeywords.some(keyword => seat.name?.includes(keyword))
                    ).length;
                }
                updateUIStatus(`座位刷新成功。目前可选座位数: ${availableSeatsCount}`);
            } catch (e) {
                await error('手动刷新座位失败:', e);
                updateUIStatus('错误: 手动刷新座位失败。请检查控制台获取更多信息。');
            }
        });

        document.querySelectorAll('.quick-time-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                uiElements.resStartTimeInput.value = btn.dataset.start;
                uiElements.resEndTimeInput.value = btn.dataset.end;
                uiElements.resStartTimeInput.dispatchEvent(new Event('change'));
                uiElements.resEndTimeInput.dispatchEvent(new Event('change'));
            });
        });
    }

    async function togglePanelVisibility(isMinimized, skipSave = false) {
        if (!uiReady || !uiElements.panel) return;

        config.uiPanelMinimized = isMinimized;
        uiElements.panelContent.style.display = config.uiPanelMinimized ? 'none' : 'block';
        uiElements.minimizedPanelContent.style.display = config.uiPanelMinimized ? 'flex' : 'none';
        uiElements.minimizeBtn.textContent = config.uiPanelMinimized ? '▾' : '▴';
        setPanelWidth(config.uiPanelMinimized);
        
        if (!config.uiPanelMinimized) { // 展开视图
            if (isReservationLoopActive) { // 如果抢座正在进行，则隐藏“开始”，显示“重置”
                uiElements.startBtn.style.display = 'none';
                uiElements.resetBtn.style.display = 'inline-block';
            } else { // 否则显示“开始”
                uiElements.startBtn.style.display = 'inline-block';
                uiElements.resetBtn.style.display = 'none';
            }
        } else { // 最小化视图，确保主按钮隐藏
            uiElements.startBtn.style.display = 'none';
            uiElements.resetBtn.style.display = 'none';
        }

        if (!skipSave) await saveConfig();
        updateTimerDisplay(); // 刷新显示
    }

    const setPanelWidth = (isMinimized) => {
        if (uiElements.panel) {
            // 调整展开时的宽度以适应下拉框，并调整最小化宽度
            uiElements.panel.style.width = isMinimized ? '220px' : '350px'; 
            uiElements.panel.style.padding = isMinimized ? '10px' : '15px';
        }
    };

    async function updateFloorAndPreferenceOptions() { // 声明为async
        if (!uiReady || !uiElements.floorSelect || !uiElements.preferenceSelect) {
            log('警告: UI元素未就绪，无法更新楼层和偏好选项。');
            return;
        }

        uiElements.floorSelect.innerHTML = '';
        uiElements.preferenceSelect.innerHTML = '';

        const autoFloorOption = document.createElement('option');
        autoFloorOption.value = 'auto';
        autoFloorOption.textContent = '自动检测楼层 (推荐)';
        uiElements.floorSelect.appendChild(autoFloorOption);

        const availableFloors = Object.keys(config.seatPreferences);
        availableFloors.forEach(floor => {
            const option = document.createElement('option');
            option.value = floor;
            option.textContent = floor;
            uiElements.floorSelect.appendChild(option);
        });

        let currentDetectedFloor = vm ? await getFloorIdentifier(vm.readingRoom) : null; // await
        if (config.uiSelectedFloor && (availableFloors.includes(config.uiSelectedFloor) || config.uiSelectedFloor === 'auto')) {
            uiElements.floorSelect.value = config.uiSelectedFloor;
        } else if (currentDetectedFloor && availableFloors.includes(currentDetectedFloor)) {
            uiElements.floorSelect.value = currentDetectedFloor;
            config.uiSelectedFloor = currentDetectedFloor;
        } else {
            if (availableFloors.includes("3F")) {
                uiElements.floorSelect.value = "3F";
                config.uiSelectedFloor = "3F";
            } else {
                uiElements.floorSelect.value = 'auto';
                config.uiSelectedFloor = 'auto';
            }
        }
        await saveConfig(); // await

        const selectedFloorForPreferences = (uiElements.floorSelect.value === 'auto' && currentDetectedFloor) ? currentDetectedFloor : uiElements.floorSelect.value;
        const currentFloorPreferences = config.seatPreferences[selectedFloorForPreferences] || [];

        const autoPrefOption = document.createElement('option');
        autoPrefOption.value = 'auto';
        autoPrefOption.textContent = '按优先级选择（默认）';
        uiElements.preferenceSelect.appendChild(autoPrefOption);

        currentFloorPreferences.forEach(pref => {
            const option = document.createElement('option');
            option.value = pref.type;
            option.textContent = pref.type;
            uiElements.preferenceSelect.appendChild(option);
        });

        if (config.uiSelectedPreference && 
            (uiElements.preferenceSelect.querySelector(`option[value="${config.uiSelectedPreference}"]`) || config.uiSelectedPreference === 'auto')) {
            uiElements.preferenceSelect.value = config.uiSelectedPreference;
        } else {
            uiElements.preferenceSelect.value = 'auto';
            config.uiSelectedPreference = 'auto';
        }
        await saveConfig(); // await
    }

    let nextAutoStartTime = null; // To store next scheduled time
    let autoStartTimer = null; // For the scheduled timeout

    function updateTimerDisplay() {
        if (!uiReady || !uiElements.panel) {
            // UI not ready or panel not found, cannot update display.
            return;
        }

        const { startBtn, resetBtn, autoStartToggle, minimizedStartReserveBtn, minimizedShowTimeBtn, statusEl } = uiElements;

        if (isReservationLoopActive) { // If actively trying to reserve
            if (!config.uiPanelMinimized) {
                startBtn.style.display = 'none';
                resetBtn.style.display = 'inline-block';
            }
            if (minimizedStartReserveBtn) { // Ensure element exists before accessing
                minimizedStartReserveBtn.disabled = true;
                minimizedStartReserveBtn.textContent = '抢座中...';
            }
            if (minimizedShowTimeBtn) { // Ensure element exists before accessing
                minimizedShowTimeBtn.disabled = true;
            }
            if (!statusEl.textContent.startsWith('正在进行第') && !statusEl.textContent.includes('错误') && !statusEl.textContent.includes('停止')) {
                statusEl.textContent = '正在抢座中...';
            }
        } else { // Not actively reserving
            if (!config.uiPanelMinimized) {
                startBtn.style.display = 'inline-block';
                resetBtn.style.display = 'none';
            }
            if (minimizedStartReserveBtn) { // Ensure element exists before accessing
                minimizedStartReserveBtn.disabled = false;
                minimizedStartReserveBtn.textContent = '手动立刻抢座';
            }
            if (minimizedShowTimeBtn) { // Ensure element exists before accessing
                minimizedShowTimeBtn.disabled = false;
            }

            if (autoStartToggle && autoStartToggle.checked && nextAutoStartTime) {
                const now = new Date();
                const diff = nextAutoStartTime.getTime() - now.getTime();
                if (diff > 0) {
                    const totalSeconds = Math.floor(diff / 1000);
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    statusEl.textContent = `将于 ${nextAutoStartTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} 自动抢座 (${timeString}后)`;
                    if (minimizedShowTimeBtn) {
                        minimizedShowTimeBtn.textContent = `下次自动: ${nextAutoStartTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`; // Show HH:MM
                    }
                } else {
                    statusEl.textContent = '定时任务已过期或即将开始。';
                    if (minimizedShowTimeBtn) {
                        minimizedShowTimeBtn.textContent = '定时任务就绪';
                    }
                }
            } else {
                if (!statusEl.textContent.includes('错误') && !statusEl.textContent.includes('停止') && !statusEl.textContent.includes('成功')) {
                    statusEl.textContent = '就绪，请设置参数并点击开始';
                }
                if (minimizedShowTimeBtn) {
                    minimizedShowTimeBtn.textContent = '预约时间: 就绪';
                }
            }
        }

        // Apply display changes for collapsed/expanded state
        if (config.uiPanelMinimized) {
            if (startBtn) startBtn.style.display = 'none';
            if (resetBtn) resetBtn.style.display = 'none';
        } else {
            if (isReservationLoopActive) {
                if (startBtn) startBtn.style.display = 'none';
                if (resetBtn) resetBtn.style.display = 'inline-block';
            } else {
                if (startBtn) startBtn.style.display = 'inline-block';
                if (resetBtn) resetBtn.style.display = 'none';
            }
        }
    }

    async function scheduleAutoStart() {
        if (autoStartTimer) {
            clearTimeout(autoStartTimer);
            autoStartTimer = null;
        }
        nextAutoStartTime = null; // Clear previous next auto start time

        if (!uiReady || !uiElements.autoStartToggle || !uiElements.autoStartToggle.checked) {
            updateUIStatus('定时抢座功能未启用或UI未就绪。');
            updateTimerDisplay(); // Update display to reflect no scheduled task
            return;
        }

        const now = new Date();
        const startHour = config.startHour;
        const startMinute = config.startMinute;
        const startSecond = config.startSecond;

        // Calculate today's target time
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

        // If today's target time has already passed, schedule for tomorrow
        if (targetTime.getTime() <= now.getTime()) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const delay = targetTime.getTime() - now.getTime();

        if (delay > 0) {
            nextAutoStartTime = targetTime;
            updateUIStatus(`已设定定时任务，将于 ${targetTime.toLocaleString('zh-CN')} 自动启动抢座。`);
            await log(`Scheduling auto-start in ${delay / 1000} seconds at ${targetTime.toLocaleString()}`);
            
            autoStartTimer = setTimeout(() => {
                reservationAttempts = 0; // Reset attempts for timed start
                reservationLoop();
            }, delay);
        } else {
            updateUIStatus('定时任务时间设置有误，请检查。');
            await error('Auto-start time is in the past or invalid, not scheduling.');
        }
        updateTimerDisplay(); // Update UI immediately after scheduling/descheduling
    }

    // 包装UI创建，增加重试机制和稳定性检查
    async function ensureUIPresentAndInitialized() {
        let retries = 0;
        const maxUIRetries = 10;
        const retryDelay = 500; // ms

        while (retries < maxUIRetries && !uiReady) {
            log(`尝试创建/初始化UI面板 (第 ${retries + 1}/${maxUIRetries} 次尝试)...`);
            try {
                createUI(); // 调用实际创建UI的函数
                // 再次检查UI元素是否存在于DOM中，并确保uiReady标志被正确设置
                if (document.getElementById('libseat-reservation-panel') && uiReady) {
                    log('UI面板成功创建并初始化。');
                    return true;
                }
            } catch (e) {
                error(`UI创建尝试中发生错误:`, e);
            }
            retries++;
            await new Promise(r => setTimeout(r, retryDelay));
        }
        if (!uiReady) {
            error('多次尝试后仍无法创建UI面板。');
            GM_notification({
                title: GM.info.script.name,
                text: 'UI面板无法显示，请检查控制台错误。',
                image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg', // JLU logo
                timeout: 5000
            });
        }
        return uiReady;
    }


    // --- 主入口逻辑 ---
    if (window.location.href.includes('libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2')) {
        log('脚本正在目标页面运行。');
        GM_notification({
            title: GM.info.script.name,
            text: '脚本已启动，正在加载配置和UI...',
            image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg', // JLU logo
            timeout: 3000
        });

        (async () => {
            await loadConfig();
            
            const uiLoaded = await ensureUIPresentAndInitialized();

            if (uiLoaded) {
                updateUIStatus('UI已初始化。正在查找UniApp Vue实例...');
                vm = await waitForUniAppPageVm();
                if (vm) {
                    updateUIStatus('UniApp Vue实例已找到。');
                    await updateFloorAndPreferenceOptions(); // 确保这里是 await
                    await scheduleAutoStart();
                } else {
                    updateUIStatus('错误: 无法找到 UniApp Vue 实例。抢座功能可能受限。请尝试刷新页面。');
                    await error('多次尝试后未能找到 UniApp Vue 实例。');
                }
            } else {
                 updateUIStatus('错误: UI面板无法正常加载。抢座功能可能受限。');
                 await error('UI面板在多次尝试后加载失败。');
            }
        })();
    } else {
        log('脚本未在目标页面运行。当前URL:', window.location.href);
    }
})();
```