---
tags: [jlu, library, automation, tampermonkey]
aliases: QIshan今天抢到座位了吗
linter-yaml-title-alias: QIshan今天抢到座位了吗
---

# QIshan今天抢到座位了吗

[![Tampermonkey|156x20](https://img.shields.io/badge/Tampermonkey-Required-orange)](https://www.tampermonkey.net/)
[![License: MIT|82x20](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version|98x20](https://img.shields.io/badge/Version-V2.2.0-brightgreen)](https://github.com/qishangjh/libseat)

## 项目简介

本项目是一个为**吉林大学图书馆座位预约系统 (libseat.jlu.edu.cn)** 量身定制的 Tampermonkey 用户脚本。旨在帮助用户实现全自动、智能化、高效率的图书馆座位预约。脚本提供了直观的用户界面 (UI)，支持精确定时启动、高级速度调优，并搭载了**全新的智能动态优先级排序引擎**，能够根据用户的实时选择动态调整最佳选座策略，大幅提升预约成功率和便利性。

**请注意：** 本脚本仅用于学习和技术交流，自动化操作可能带来潜在风险。使用前请务必仔细阅读免责声明，并谨慎使用。

## 核心功能

*   **全自动抢座：** 可根据预设时间自动启动抢座流程，无需人工值守。
*   **可视化用户界面 (UI)：**
    *   **可拖拽与最小化：** UI面板可自由拖拽位置，并支持最小化，不干扰页面浏览。
    *   **实时状态显示：** 清晰显示脚本当前运行状态、下次定时抢座倒计时等。
    *   **便捷参数配置：** 通过UI直接配置所有预约参数，设置自动保存，下次打开即用。
*   **智能动态优先级排序 (核心升级)：**
    *   **默认最优策略：** 在"按优先级自动选择"模式下，严格按照 `靠边 > 大理石 > 中间` 的公认最佳顺序进行筛选。
    *   **动态优先级提升：** 当您在UI中明确选择某个地段偏好（如"大理石"）时，该地段会被**动态提升为最高优先级**，排序策略智能调整为 `大理石 > 靠边 > 中间`，同时保留其他地段作为备选，确保在首选无座时仍能抢到座位。
    *   **智能排序喜欢座位：** 当您输入多个"喜欢座位号"时，脚本同样会运用上述动态优先级逻辑，对这些座位进行智能的内部排序，确保首先尝试您最偏好地段的"喜欢座位"。
*   **高级速度设置：**
    *   UI内建"刷新间隔"、"选座后延迟"、"结果超时"等核心速度参数，允许用户根据自身网络环境微调，追求极限抢座速度。
*   **精准定时与快速重试：**
    *   可设定精确到秒的启动时间，并内置快速、智能的重试机制，应对抢座失败或暂时无座的状况。
*   **修复与优化：**
    *   彻底修复了旧版本中座位地段分类不准确的逻辑Bug，确保脚本的每一次决策都基于精确的数据。

---
## 安装指南

1.  **安装 Tampermonkey 浏览器扩展：**
    *   Chrome 浏览器：[Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
    *   Firefox 浏览器：[Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)
    *   Edge 浏览器：[Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpbldmmepgdkmfapfmhelnlilb)
    *   其他浏览器请自行搜索安装 Tampermonkey。

2.  **创建新脚本：**
    *   安装 Tampermonkey 后，点击浏览器工具栏的 Tampermonkey 图标。
    *   选择 **"创建新脚本…"**。

3.  **粘贴脚本代码：**
    *   清空 Tampermonkey 默认的代码模板。
    *   将本 README 文件末尾提供的 **最新版本脚本代码** 完整复制并粘贴到 Tampermonkey 编辑器中。

4.  **保存并启用：**
    *   点击文件菜单中的 **"文件" -> "保存"**。
    *   Tampermonkey 会自动启用新脚本。您可以在 Tampermonkey 的"管理面板"中确认脚本状态。

## 使用方法

1.  **打开图书馆预约页面：**
    *   前往吉林大学图书馆座位预约系统：`https://libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2*`。
    *   页面加载后，脚本会自动运行并弹出UI面板。

2.  **配置预约参数：**
    *   **预约日期与时间段：** 选择您希望预约的日期和时间。可使用快捷按钮（全天、上午等）快速设置。
    *   **楼层：** 选择目标楼层或保持"自动检测"。
    *   **地段偏好：**
        *   **按优先级选择（默认）：** 脚本将按 `靠边 > 大理石 > 中间` 的顺序抢座。
        *   **选择特定地段（如"大理石"）：** 脚本会将"大理石"的优先级动态提升至最高，优先抢占大理石区域的座位，然后再尝试其他区域。
    *   **喜欢座位号：** 填写您最爱的座位号，多个请用逗号 `,` 分隔。这些座位会被赋予最高优先级，并同样遵循智能地段排序。
    *   **定时自动抢座：** 勾选并设置精确的启动时间（时、分、秒）。
    *   **自动确认预约：** 勾选后，脚本会自动点击确认按钮，实现完全无人值守。
    *   **(可选) 调整速度：** 点击"展开设置…"可微调速度参数，建议在充分理解后再进行修改。

3.  **启动抢座：**
    *   **手动抢座：** 点击 **"开始抢座"** 按钮立即开始。
    *   **定时抢座：** 设置好时间后，脚本会在指定时间自动启动。
    *   **重置抢座：** 在抢座过程中，点击 **"重置抢座"** 可随时停止。

4.  **监控状态：**
    *   UI面板底部的状态栏会实时显示脚本的运行情况。
    *   按 F12 打开浏览器开发者工具，在"Console"（控制台）中可查看详细日志。

---
## 更新日志
### **V2.2.0 - 性能与体验Pro版 (2025-12-04)**
#### **🚀 新增 (Features)**

1.  **【性能】抢占式快速失败引擎 (Preemptive Fast-Fail Engine)**
    *   引入了全新的预约结果判断机制。在抢座高峰期，当脚本尝试预约的座位被他人以毫秒级优势抢先时，新引擎不再傻等5-7秒才宣告失败，而是能在**百分之一秒内**通过多维检查（DOM提示、URL跳转、VM状态）识别出"已被占用"等失败信息。
    *   **效果**: 脚本能**闪电般地放弃已失败的目标，立即转向下一个最佳候选座位**，极大地提升了在激烈竞争中的换座攻击速度，为您争取到决定成败的关键几秒钟。

2.  **【健壮性】启动时预检 (Pre-flight Check)**
    *   在每次定时或手动任务启动的瞬间，脚本会首先对自身和当前网站环境进行一次快速的"健康检查"。
    *   它会验证核心Vue实例是否存在、关键函数是否可用、预约参数是否合法。如果发现因网站更新或配置错误导致的兼容性问题，脚本会**立即停止无效的抢座尝试，并通过UI和系统通知发出明确预警**，避免用户在不知情的情况下错失良机。

3.  **【体验】专业级UI与交互升级**
    *   **实时日志面板**: 在UI中新增了可展开的"实时日志"面板。脚本的每一个关键决策，从"找到多少个座位"到"下一个目标是哪个"，都会被清晰地记录下来，让整个抢座过程完全透明化。
    *   **配置预设系统**: 新增"预设1"和"预设2"的加载/保存功能。您可以将常用的抢座配置（如"工作日全天"、"周末上午"）保存起来，下次使用时**一键加载**，无需重复设置繁琐的参数。
    *   **UI视觉革新**: 对UI面板进行了全面的视觉升级，采用了更现代的渐变背景、圆角、阴影和色彩体系，交互体验更友好。

#### **✨ 优化 (Improvements)**

1.  **终极Vue实例查找策略**
    *   重写了 `waitForUniAppPageVm` 函数，集成了一套多策略、高容错的查找算法。它会依次尝试 `getCurrentPages`、DOM遍历 (`__vue__`) 和 `Vue DevTools Hook` 等多种手段，极大地提升了在各种复杂或非标准页面环境下的初始化成功率，彻底解决了偶发的"找不到Vue实例"问题。
2.  **更智能的定时器管理**
    *   优化了定时任务的调度逻辑，确保在用户切换"定时抢座"开关或停止任务时，所有相关的定时器都能被干净地清除和重新调度，杜绝了潜在的内存泄漏和逻辑冲突。
3.  **代码结构精简与现代化**
#### **🛠️ 修复 (Fixes)**

1.  **修复了预设加载时数据类型不匹配的潜在问题**
    *   在加载预设配置时，增加了对布尔值和数值的强制类型转换，确保从存储中读取的字符串能被正确地解析为程序所需的数据类型，增强了预设功能的稳定性。

### **V1.7.0 - 动态优先级增强版 (2025-11-18)**
#### **🚀 新增 (Features)**
1.  **智能动态优先级排序系统 (核心升级)**
    *   **默认最优策略**: 当地段偏好为"按优先级自动选择"时，严格遵循 `靠边(P1) > 大理石(P2) > 中间(P3)` 的最佳抢座顺序。
    *   **用户选择优先**: 当用户明确选择一个地段（如"大理石"）时，该地段的优先级会被**动态提升至最高**，抢座策略智能切换为 `大理石(P0) > 靠边(P2) > 中间(P3)`，确保优先满足用户选择，同时保留其他区域作为备选。
2.  **智能排序"喜欢座位号"**
    *   当输入多个"喜欢座位号"时，脚本不再是简单地按顺序尝试，而是会运用上述动态优先级逻辑，对这些座位进行**智能内部排序**，确保优先尝试其中地段最好的座位。

#### **🛠️ 修复 (Fixes)**
1.  **修复了座位地段分类的根本性逻辑错误**
    *   通过重构分类逻辑与配置文件，彻底解决了旧版本中所有座位可能被错误归类为"靠边"的严重Bug。现在脚本可以精确识别每个座位号所属的正确地段（如42号被正确识别为"大理石"），为动态排序提供了准确的数据基础。

### **V1.6.0 - 高级速度设置与UI优化版 (2025-11-16)**
#### **🚀 新增 (Features)**
*   **高级速度设置**: 新增"刷新间隔"、"选座后延迟"、"结果超时"三个核心速度参数，允许用户根据网络情况精细调整，追求极限速度。
#### **✨ 优化 (Improvements)**
*   **UI 终极紧凑布局**: 重新设计UI，将高级设置折叠，默认界面更简洁。
*   **智能无座处理**: 当无座时，会自动刷新最多3次再放弃，并实时反馈状态。
#### **🛠️ 修复 (Fixes)**
*   修复了"无座提示"被状态信息覆盖的Bug。

*(V1.5.1 及更早版本的日志已省略)*

---
## 免责声明

本脚本为自动化工具，仅供学习、研究和个人便利使用。作者不对因使用本脚本而导致的任何直接或间接后果承担责任。

**使用本脚本意味着您理解并同意：**
1.  **风险自担：** 自动化操作可能违反网站的使用条款，存在被封禁账号的风险。请自行评估并承担所有风险。
2.  **谨慎使用：** 强烈建议您在充分了解其功能和潜在风险后谨慎使用，并保持对操作过程的监控。
3.  **遵守规则：** 请遵守图书馆的预约规定和网站的使用政策。

---
## 许可证

本项目采用 MIT 许可证。

---
## 最新版本脚本代码
```js
// ==UserScript==
// @name         QIshan今天抢到座位了吗 - V2.2.2
// @namespace    https://github.com/qishangjh/Libseat
// @version      2.2.2
// @description  Pro版升级：集成抢占式快速失败、启动预检、实时日志和配置预设等高级功能。Vue实例查找已优化，并精简代码。
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

    const Utils = {
        ruleRegexCache: new Map(),
        DISTANCE_SORT_TARGET_SEAT: 40,
        TARGET_COMPONENT_NAME: "SeatChooseV2",

        async log(...args) {
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
            console.log(`%c[${GM.info.script.name}]%c`, 'color: #198754; font-weight: bold;', 'color: #333;', ...args);
            Logger.log(message);
            try { await GM_log(`[${GM.info.script.name}] ${message}`); } catch (e) { /* silent */ }
        },
        async error(...args) {
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
            console.error(`%c[${GM.info.script.name} ERROR]%c`, 'color: #dc3545; font-weight: bold;', 'color: #333;', ...args);
            Logger.log(`[ERROR] ${message}`);
            try { await GM_log(`[${GM.info.script.name} ERROR] ${message}`); } catch (e) { /* silent */ }
        },

        _getActualVueInstance(vm) {
            if (!vm || typeof vm !== 'object') return null;
            let instance = vm;
            if (instance.$vm && typeof instance.$vm === 'object') {
                instance = instance.$vm;
            }
            if (instance.__ob__ && instance.__ob__.value && typeof instance.__ob__.value === 'object') {
                instance = instance.__ob__.value;
            }
            if (instance.__vue_app__ && instance.__vue_app__._instance && instance.__vue_app__._instance.proxy) {
                instance = instance.__vue_app__._instance.proxy;
            }
            if (instance && typeof instance === 'object' && (instance.$options || instance.$children)) {
                return instance;
            }
            return null;
        },

        findVueInstance(rootVm, componentName) {
            const vueInstance = this._getActualVueInstance(rootVm);
            if (!vueInstance) return null;

            const name = vueInstance.$options?.name || vueInstance.$options?._componentTag || 'Anonymous';
            if (name === componentName) {
                return vueInstance;
            }

            if (vueInstance.$children && vueInstance.$children.length > 0) {
                for (const child of vueInstance.$children) {
                    const childVm = this.findVueInstance(child, componentName);
                    if (childVm) return childVm;
                }
            }
            return null;
        },

        async waitForUniAppPageVm() {
            await this.log('正在使用[终极版]查找策略寻找页面实例 (Vue VM)...');
            return new Promise((resolve) => {
                let retryCount = 0;
                const maxRetries = 180; // 36 seconds (180 * 200ms)
                const interval = setInterval(async () => {
                    if (retryCount++ > maxRetries) {
                        clearInterval(interval);
                        await this.error('查找页面实例超时，脚本可能无法运行。');
                        return resolve(null);
                    }

                    let foundTargetVm = null;

                    if (typeof getCurrentPages === 'function') {
                        const pages = getCurrentPages();
                        if (pages && pages.length > 0) {
                            const pageVmCandidate = pages[pages.length - 1];
                            const actualPageVm = this._getActualVueInstance(pageVmCandidate);

                            if (actualPageVm) {
                                foundTargetVm = this.findVueInstance(actualPageVm, this.TARGET_COMPONENT_NAME);
                                if (foundTargetVm) {
                                    clearInterval(interval);
                                    await this.log('成功通过 getCurrentPages 找到页面实例!');
                                    return resolve(foundTargetVm);
                                }
                            }
                        }
                    }

                    const allElements = document.querySelectorAll('*');
                    for (const el of allElements) {
                        let potentialVm = null;
                        if (el.__vue__) {
                            potentialVm = el.__vue__;
                        } else if (el.__vue_app__ && el.__vue_app__._instance) {
                            potentialVm = el.__vue_app__._instance.proxy;
                        }

                        if (potentialVm) {
                            const actualVm = this._getActualVueInstance(potentialVm);
                            if (actualVm) {
                                foundTargetVm = this.findVueInstance(actualVm, this.TARGET_COMPONENT_NAME);
                                if (foundTargetVm) {
                                    clearInterval(interval);
                                    await this.log(`成功通过DOM遍历在 <${el.tagName}> 元素上找到目标页面实例!`);
                                    return resolve(foundTargetVm);
                                }
                            }
                        }
                    }

                    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.applications && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.applications.length > 0) {
                        for (const app of window.__VUE_DEVTOOLS_GLOBAL_HOOK__.applications) {
                            const actualAppVm = this._getActualVueInstance(app.vm);
                            if (actualAppVm) {
                                foundTargetVm = this.findVueInstance(actualAppVm, this.TARGET_COMPONENT_NAME);
                                if (foundTargetVm) {
                                    clearInterval(interval);
                                    await this.log('成功通过Vue DevTools Hook找到目标页面实例!');
                                    return resolve(foundTargetVm);
                                }
                            }
                        }
                    }
                }, 200);
            });
        },

        parseSeatNumberFromName(seatName) {
            if (!seatName) return NaN;
            const matches = seatName.match(/\d+/g);
            return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : NaN;
        },

        compileRule(ruleString) {
            if (this.ruleRegexCache.has(ruleString)) return this.ruleRegexCache.get(ruleString);
            let rule;
            if (ruleString === "剩余的") {
                rule = { type: "remaining" };
            } else if (ruleString.match(/(\d+)\+(\d+)n,\s*n<(\d+)/)) {
                const p = ruleString.match(/(\d+)\+(\d+)n,\s*n<(\d+)/);
                rule = { type: "series", a: parseInt(p[1], 10), b: parseInt(p[2], 10), m: parseInt(p[3], 10) };
            } else if (ruleString.match(/(\d+)-(\d+)/)) {
                const p = ruleString.match(/(\d+)-(\d+)/);
                rule = { type: "range", start: parseInt(p[1], 10), end: parseInt(p[2], 10) };
            } else {
                rule = { type: "unknown" };
            }
            this.ruleRegexCache.set(ruleString, rule);
            return rule;
        },

        matchesPreferenceRule(ruleString, seatNumber) {
            if (!ruleString || isNaN(seatNumber)) return false;
            const rule = this.compileRule(ruleString);
            switch (rule.type) {
                case "remaining": return true;
                case "series": return Array.from({ length: rule.m }, (_, n) => rule.a + rule.b * n).includes(seatNumber);
                case "range": return seatNumber >= rule.start && seatNumber <= rule.end;
                default: return false;
            }
        },

        getTomorrowFormattedDate() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const yyyy = tomorrow.getFullYear();
            const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
            const dd = String(tomorrow.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        },

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        safeClick(element) {
            if (!element) return false;
            try {
                element.click();
                return true;
            } catch (e) {
                Utils.error('Click failed:', e);
                return false;
            }
        },
    };

    const Logger = {
        textarea: null,
        init(logTextarea) {
            this.textarea = logTextarea;
            this.log('日志模块初始化成功。');
        },
        log(message) {
            if (!this.textarea) return;
            const timestamp = new Date().toLocaleTimeString('it-IT');
            this.textarea.value += `[${timestamp}] ${message}\n`;
            this.textarea.scrollTop = this.textarea.scrollHeight;
        }
    };

    const ConfigManager = {
        key: 'libseat_auto_reserve_config_v2_2_2',
        config: {},
        defaultConfig: {
            autoStartAtSpecificTime: true,
            startHour: 21, startMinute: 0, startSecond: 2,
            targetDate: "", targetStartTime: "08:00", targetEndTime: "22:00",
            seatPreferences: {
                "3F": [
                    { type: "大理石", rule: "38-59", priority: 2 },
                    { type: "中间", rule: "61+3n, n<12", priority: 3 },
                    { type: "靠边", rule: "剩余的", priority: 1 }
                ],
                "2F": [
                    { type: "大理石", rule: "85-102", priority: 2 },
                    { type: "中间", rule: "2+3n, n<12", priority: 3 },
                    { type: "靠边", rule: "37-84", priority: 1 }
                ]
            },
            globalBlacklistKeywords: ["设备损坏", "禁"],
            autoConfirmReservation: true,
            retryInterval: 2000, randomizeDelay: 500,
            postActionMaxWait: 7000,
            postActionMinDelay: 200,
            uiSelectedFloor: "3F", uiSelectedPreference: "auto",
            uiPreferredSeatNumber: "", uiPanelMinimized: true,
            refreshInterval: 1500,
            postSelectionDelay: 200,
        },

        async load() {
            try {
                const storedConfig = await GM_getValue(this.key, null);
                this.config = { ...this.defaultConfig, ...storedConfig };
                if (!this.config.targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(this.config.targetDate)) {
                    this.config.targetDate = Utils.getTomorrowFormattedDate();
                }
                Utils.log("主配置已加载。");
            } catch (e) {
                await Utils.error("加载主配置失败:", e);
                this.config = { ...this.defaultConfig };
                this.config.targetDate = Utils.getTomorrowFormattedDate();
            }
        },

        async save() {
            try {
                const configToSave = {
                    autoStartAtSpecificTime: this.config.autoStartAtSpecificTime,
                    startHour: this.config.startHour, startMinute: this.config.startMinute, startSecond: this.config.startSecond,
                    targetDate: this.config.targetDate, targetStartTime: this.config.targetStartTime, targetEndTime: this.config.targetEndTime,
                    uiSelectedFloor: this.config.uiSelectedFloor, uiSelectedPreference: this.config.uiSelectedPreference,
                    uiPreferredSeatNumber: this.config.uiPreferredSeatNumber, uiPanelMinimized: this.config.uiPanelMinimized,
                    autoConfirmReservation: this.config.autoConfirmReservation,
                    refreshInterval: this.config.refreshInterval,
                    postSelectionDelay: this.config.postSelectionDelay,
                    postActionMaxWait: this.config.postActionMaxWait,
                };
                await GM_setValue(this.key, configToSave);
                Utils.log("主配置已保存。");
            } catch (e) {
                await Utils.error("保存主配置失败:", e);
            }
        },
        debouncedSave: Utils.debounce(() => ConfigManager.save(), 500),

        get(key) { return this.config[key]; },
        set(key, value, shouldSave = true) {
            this.config[key] = value;
            if (shouldSave) {
                this.debouncedSave();
            }
        }
    };

    const ProfileManager = {
        getKey: (profileId) => `libseat_profile_${profileId}_v2_2_2`,

        async save(profileId) {
            Utils.log(`正在保存预设 ${profileId}...`);
            const profileData = {
                targetDate: UIManager.elements.resDateInput.value,
                targetStartTime: UIManager.elements.resStartTime.value,
                targetEndTime: UIManager.elements.resEndTime.value,
                uiSelectedFloor: UIManager.elements.floorSelect.value,
                uiSelectedPreference: UIManager.elements.preferenceSelect.value,
                uiPreferredSeatNumber: UIManager.elements.preferredSeatNumber.value,
                autoConfirmReservation: UIManager.elements.autoConfirm.checked,
                autoStartAtSpecificTime: UIManager.elements.autoStartToggle.checked,
                startHour: UIManager.elements.startHour.value,
                startMinute: UIManager.elements.startMinute.value,
                startSecond: UIManager.elements.startSecond.value,
                refreshInterval: UIManager.elements.rsRefreshInterval.value,
                postSelectionDelay: UIManager.elements.rsPostSelectionDelay.value,
                postActionMaxWait: UIManager.elements.rsOutcomeTimeout.value,
            };
            try {
                await GM_setValue(this.getKey(profileId), profileData);
                UIManager.updateStatus(`预设 ${profileId} 已保存。`, 'success');
                Utils.log(`预设 ${profileId} 已保存。`);
            } catch (e) {
                UIManager.updateStatus(`保存预设 ${profileId} 失败！`, 'error');
                await Utils.error(`保存预设 ${profileId} 失败:`, e);
            }
        },

        async load(profileId) {
            Utils.log(`正在加载预设 ${profileId}...`);
            try {
                const profileData = await GM_getValue(this.getKey(profileId), null);
                if (profileData) {
                    for (const [key, value] of Object.entries(profileData)) {
                        let parsedValue = value;
                        if (['startHour', 'startMinute', 'startSecond', 'refreshInterval', 'postSelectionDelay', 'postActionMaxWait'].includes(key)) {
                            parsedValue = parseInt(value, 10);
                        } else if (['autoConfirmReservation', 'autoStartAtSpecificTime', 'uiPanelMinimized'].includes(key)) {
                             parsedValue = (value === 'true' || value === true);
                        }
                        ConfigManager.set(key, parsedValue, false);
                    }
                    await UIManager.applyConfigToUI();
                    await ConfigManager.save();
                    UIManager.updateStatus(`预设 ${profileId} 已加载。`, 'success');
                    Utils.log(`预设 ${profileId} 已加载。`);
                } else {
                    UIManager.updateStatus(`未找到预设 ${profileId}。`, 'error');
                    Utils.log(`未找到预设 ${profileId}。`);
                }
            } catch (e) {
                UIManager.updateStatus(`加载预设 ${profileId} 失败！`, 'error');
                await Utils.error(`加载预设 ${profileId} 失败:`, e);
            }
        }
    };

    const VueAdapter = {
        vm: null,
        init(vueInstance) { this.vm = vueInstance; },
        _callVmMethod(methodNames, ...args) {
            for (const name of methodNames) {
                if (typeof this.vm[name] === 'function') {
                    Utils.log(`调用VM方法: ${name}`);
                    return this.vm[name](...args);
                }
            }
            throw new Error(`Vue方法未找到: [${methodNames.join(', ')}]`);
        },
        async getSeats() { return this._callVmMethod(['getSeats', 'getSeatList', 'refreshSeats', 'loadSeats']); },
        async selectSeat(seat) {
            if (typeof this.vm.selectSeat === 'function') {
                return this.vm.selectSeat({ seat, index: this.vm.seatList.findIndex(s => s.id === seat.id) });
            }
            return this._callVmMethod(['handleSeatClick'], seat);
        },
        async confirmReservation(seat) {
            return this._callVmMethod(['submit', 'confirmReservation', 'submitReservation', 'reserveSeat'], seat);
        },
        async setTimeRange(date, startTime, endTime) {
            if (!this.vm.timeRange) throw new Error('vm.timeRange不可用');
            this.vm.timeRange.date = date;
            this.vm.timeRange.startTime = startTime;
            this.vm.timeRange.endTime = endTime;
            if (typeof this.vm.$set === 'function') {
                this.vm.$set(this.vm.timeRange, 'date', date);
                this.vm.$set(this.vm.timeRange, 'startTime', startTime);
                this.vm.$set(this.vm.timeRange, 'endTime', endTime);
            }
            await new Promise(r => setTimeout(r, ConfigManager.get('postActionMinDelay')));
            Utils.log(`时间范围已更新为: ${date} ${startTime}-${endTime}`);
        }
    };

    const UIManager = {
        elements: {},
        isReady: false,
        quickTimeRanges: [{ name: "全天", start: "08:30", end: "22:00" }, { name: "上午", start: "08:15", end: "12:00" }, { name: "下午1", start: "12:20", end: "15:20" }, { name: "下午2", start: "15:00", end: "18:00" }, { name: "晚上", start: "18:00", end: "21:45" }],

        create() {
            if (document.getElementById('libseat-reservation-panel')) {
                Utils.log('UI面板已存在，重新初始化。');
                this.initialize();
                return;
            }
            const panel = document.createElement('div');
            panel.id = 'libseat-reservation-panel';
            panel.innerHTML = `
                <style>
                    #libseat-reservation-panel{position:fixed;top:20px;right:20px;z-index:9999;background:linear-gradient(135deg,#f8f9fa,#e9ecef);padding:15px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.2);font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:14px;color:#333;transition:all .3s ease-in-out;width:350px;border:1px solid #dee2e6;max-height:90vh;overflow-y:auto;}
                    #libseat-reservation-panel *{box-sizing:border-box}
                    #libseat-reservation-panel .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #ced4da}
                    #libseat-reservation-panel h3{margin:0;font-size:18px;color:#0056b3;font-weight:600}
                    #libseat-reservation-panel button#minimize-panel{background:0 0;border:0;cursor:pointer;font-size:20px;color:#6c757d;transition:color .2s ease;padding:0 5px;line-height:1}
                    #libseat-reservation-panel button#minimize-panel:hover{color:#212529}
                    #libseat-reservation-panel label{display:block;margin-bottom:5px;font-weight:700;color:#495057}
                    #libseat-reservation-panel select,#libseat-reservation-panel input[type=date],#libseat-reservation-panel input[type=time],#libseat-reservation-panel input[type=text],#libseat-reservation-panel input[type=number]{width:100%;padding:10px;margin-bottom:10px;border:1px solid #ced4da;border-radius:6px;font-size:14px;background-color:#fff;transition:border-color .2s ease}
                    #libseat-reservation-panel select:focus,#libseat-reservation-panel input:focus{border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}
                    #libseat-reservation-panel .input-group-row{display:flex;gap:10px;align-items:center;margin-bottom:10px}
                    #libseat-reservation-panel .input-group-row>div{flex:1}
                    #libseat-reservation-panel .quick-time-ranges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:15px}
                    #libseat-reservation-panel .quick-time-btn{padding:6px 12px;font-size:13px;background-color:#e9ecef;border:1px solid #ced4da;border-radius:5px;color:#495057;cursor:pointer;transition:all .2s ease}
                    #libseat-reservation-panel .quick-time-btn:hover{background-color:#dee2e6;border-color:#adb5bd;color:#212529}
                    #libseat-reservation-panel .action-btn{padding:12px;border:0;border-radius:6px;color:#fff;font-weight:700;cursor:pointer;font-size:16px;transition:background .2s ease}
                    #libseat-reservation-panel #start-reserve-btn{background-color:#28a745}
                    #libseat-reservation-panel #start-reserve-btn:hover{background-color:#218838}
                    #libseat-reservation-panel #reset-reserve-btn{background-color:#dc3545}
                    #libseat-reservation-panel #reset-reserve-btn:hover{background-color:#c82333}
                    #libseat-reservation-panel #refresh-seats-btn{background-color:#007bff}
                    #libseat-reservation-panel #refresh-seats-btn:hover{background-color:#0069d9}
                    #libseat-reservation-panel #reservation-status{padding:12px;border-radius:8px;min-height:40px;margin-top:20px;font-size:14px;text-align:center;transition:all .3s ease;font-weight:600}
                    #libseat-reservation-panel #reservation-status.info{background-color:#e2f3ff;border:1px solid #b6e0ff;color:#004085}
                    #libseat-reservation-panel #reservation-status.working{background-color:#fff3cd;border:1px solid #ffeeba;color:#856404}
                    #libseat-reservation-panel #reservation-status.success{background-color:#d4edda;border:1px solid #c3e6cb;color:#155724}
                    #libseat-reservation-panel #reservation-status.error{background-color:#f8d7da;border:1px solid #f5c6cb;color:#721c24}
                    #libseat-reservation-panel #minimized-panel-content{display:none;flex-direction:column;gap:8px;margin-top:10px}
                    #libseat-reservation-panel #minimized-panel-content button{background-color:#f8f9fa;border:1px solid #dee2e6;padding:10px 12px;font-size:13px;border-radius:6px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:background-color .2s ease}
                    #libseat-reservation-panel #minimized-panel-content button:hover{background-color:#e9ecef}
                    .settings-container,.log-container{border-top:1px solid #dee2e6;margin-top:15px;padding-top:15px;display:none}
                    #toggle-all-settings,#toggle-log-panel{font-size:13px;color:#007bff;text-decoration:none;cursor:pointer;float:right;margin-top:5px;margin-bottom:10px;clear:both;transition:color .2s ease}
                    #toggle-all-settings:hover,#toggle-log-panel:hover{color:#0056b3}
                    .settings-header{font-weight:700;margin-bottom:10px;font-size:14px;color:#343a40}
                    .profile-container{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:15px;border-bottom:1px solid #dee2e6;padding-bottom:10px}
                    .profile-btn{flex:1 1 calc(50% - 4px);padding:8px 10px;font-size:13px;background-color:#eaf6ff;border:1px solid #a6d9ff;border-radius:5px;color:#0056b3;cursor:pointer;transition:background-color .2s ease}
                    .profile-btn:hover{background-color:#d4edff}
                    #log-output{width:100%;height:150px;resize:vertical;background-color:#fff;border:1px solid #ced4da;border-radius:6px;font-family:'Consolas','Monaco',monospace;font-size:12px;padding:10px;line-height:1.4;color:#343a40;box-shadow:inset 0 1px 3px rgba(0,0,0,.1)}
                </style>
                <div class="header"><h3>QIshan今天抢到座位了吗 V2.2.2</h3><button id="minimize-panel">▴</button></div>
                <div id="minimized-panel-content">
                    <button id="minimized-start-reserve-btn" title="点击立即开始抢座">手动立刻抢座</button>
                    <button id="minimized-show-time-btn" title="点击展开设置面板">预约时间: 就绪</button>
                </div>
                <div id="panel-content">
                    <div class="profile-container">
                        <button class="profile-btn" id="profile-load-1">加载预设1</button>
                        <button class="profile-btn" id="profile-save-1">保存预设1</button>
                        <button class="profile-btn" id="profile-load-2">加载预设2</button>
                        <button class="profile-btn" id="profile-save-2">保存预设2</button>
                    </div>

                    <div class="input-group-row">
                        <div style="flex:1"><label for="floor-select">楼层:</label><select id="floor-select"></select></div>
                        <div style="flex:1"><label for="preference-select">地段偏好:</label><select id="preference-select"></select></div>
                    </div>
                    <div class="input-group-row">
                        <div style="flex: 1 1 40%;"><label for="res-date-input">预约日期:</label><input type="date" id="res-date-input"></div>
                        <div style="flex: 1 1 60%;"><label>时间段:</label><div class="input-group-row" style="margin-bottom:0"><input type="time" id="res-start-time" style="flex:1;"><span>-</span><input type="time" id="res-end-time" style="flex:1;"></div></div>
                    </div>
                    <div class="quick-time-ranges">
                        ${this.quickTimeRanges.map(r=>`<button class="quick-time-btn" data-start="${r.start}" data-end="${r.end}">${r.name}</button>`).join('')}
                    </div>
                    <div><label for="preferred-seat-number">喜欢座位号:</label><input type="text" id="preferred-seat-number" placeholder="如: 40, 41 (逗号分隔)"></div>

                    <a href="#" id="toggle-all-settings">展开设置...</a>
                    <div id="all-settings-container" class="settings-container">
                        <div class="settings-header">自动化设置</div>
                        <div class="input-group-row" style="margin-bottom:10px;">
                           <label style="margin-bottom:0;flex:1" for="auto-start-toggle"><input type="checkbox" id="auto-start-toggle" style="width:auto;margin-right:5px;">定时抢座</label>
                           <label style="margin-bottom:0;flex:1" for="auto-confirm"><input type="checkbox" id="auto-confirm" style="width:auto;margin-right:5px;">自动确认</label>
                        </div>
                        <div id="auto-start-time-inputs" style="display:none;">
                            <div class="input-group-row">
                                <div style="flex:1"><label for="start-hour">时:</label><input type="number" id="start-hour" min="0" max="23"></div>
                                <div style="flex:1"><label for="start-minute">分:</label><input type="number" id="start-minute" min="0" max="59"></div>
                                <div style="flex:1"><label for="start-second">秒:</label><input type="number" id="start-second" min="0" max="59"></div>
                            </div>
                        </div>
                        <div class="settings-header">高级速度设置 (谨慎修改)</div>
                        <div class="input-group-row">
                            <div style="flex:1"><label for="rs-refresh-interval" title="每次刷新座位列表之间的等待时间。过低可能被服务器拒绝。">刷新(ms):</label><input type="number" id="rs-refresh-interval" min="100" step="100"></div>
                            <div style="flex:1"><label for="rs-post-selection-delay" title="点击座位后，等待确认弹窗出现的延迟。">延迟(ms):</label><input type="number" id="rs-post-selection-delay" min="50" step="50"></div>
                            <div style="flex:1"><label for="rs-outcome-timeout" title="点击确认后，等待成功/失败结果的最长时间。">超时(ms):</label><input type="number" id="rs-outcome-timeout" min="1000" step="500"></div>
                        </div>
                    </div>
                    <div style="display:flex;gap:10px;margin-top:15px">
                        <button id="start-reserve-btn" class="action-btn" style="flex:2">开始抢座</button>
                        <button id="refresh-seats-btn" class="action-btn" style="flex:1">刷新</button>
                        <button id="reset-reserve-btn" class="action-btn" style="flex:2;display:none">重置抢座</button>
                    </div>
                    <div id="reservation-status" class="info">就绪，请设置参数并点击开始</div>

                    <a href="#" id="toggle-log-panel" class="log-toggle">显示日志...</a>
                    <div id="log-panel" class="log-container">
                        <textarea id="log-output" readonly></textarea>
                    </div>
                </div>
            `;
            document.body.appendChild(panel);
            Utils.log('UI面板已创建并添加到页面。');
            this.initialize();
        },

        initialize() {
            const ids = [
                'libseat-reservation-panel', 'floor-select', 'preference-select',
                'res-date-input', 'res-start-time', 'res-end-time', 'preferred-seat-number',
                'auto-confirm', 'auto-start-toggle', 'start-hour', 'start-minute', 'start-second',
                'start-reserve-btn', 'reset-reserve-btn', 'refresh-seats-btn', 'minimize-panel',
                'minimized-start-reserve-btn', 'minimized-show-time-btn', 'panel-content',
                'minimized-panel-content', 'reservation-status',
                'rs-refresh-interval', 'rs-post-selection-delay', 'rs-outcome-timeout',
                'toggle-all-settings', 'all-settings-container', 'auto-start-time-inputs',
                'profile-load-1', 'profile-save-1', 'profile-load-2', 'profile-save-2',
                'toggle-log-panel', 'log-panel', 'log-output'
            ];
            this.elements = ids.reduce((acc, id) => {
                const camelCaseKey = id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
                acc[camelCaseKey] = document.getElementById(id);
                return acc;
            }, {});
            this.elements.statusEl = this.elements.reservationStatus;

            if (this.elements.logOutput) {
                Logger.init(this.elements.logOutput);
            }

            this.applyConfigToUI();
            if (!this.elements.libseatReservationPanel.dataset.listenersAdded) {
                this.setupEventListeners();
                this.elements.libseatReservationPanel.dataset.listenersAdded = 'true';
            }
            this.togglePanelVisibility(ConfigManager.get('uiPanelMinimized'), true);
            this.isReady = true;
        },

        applyConfigToUI() {
            this.elements.resDateInput.value = ConfigManager.get('targetDate');
            this.elements.resStartTime.value = ConfigManager.get('targetStartTime');
            this.elements.resEndTime.value = ConfigManager.get('targetEndTime');
            this.elements.preferredSeatNumber.value = ConfigManager.get('uiPreferredSeatNumber');
            this.elements.autoConfirm.checked = ConfigManager.get('autoConfirmReservation');
            this.elements.autoStartToggle.checked = ConfigManager.get('autoStartAtSpecificTime');
            this.elements.startHour.value = ConfigManager.get('startHour');
            this.elements.startMinute.value = ConfigManager.get('startMinute');
            this.elements.startSecond.value = ConfigManager.get('startSecond');
            this.elements.rsRefreshInterval.value = ConfigManager.get('refreshInterval');
            this.elements.rsPostSelectionDelay.value = ConfigManager.get('postSelectionDelay');
            this.elements.rsOutcomeTimeout.value = ConfigManager.get('postActionMaxWait');
            this.elements.autoStartTimeInputs.style.display = this.elements.autoStartToggle.checked ? 'block' : 'none';
        },

        setupEventListeners() {
            this.elements.minimizePanel.addEventListener('click', () => this.togglePanelVisibility(!ConfigManager.get('uiPanelMinimized')));
            this.elements.minimizedStartReserveBtn.addEventListener('click', () => ReservationEngine.manualStart());
            this.elements.minimizedShowTimeBtn.addEventListener('click', () => this.togglePanelVisibility(false));
            this.elements.startReserveBtn.addEventListener('click', () => ReservationEngine.manualStart());
            this.elements.resetReserveBtn.addEventListener('click', () => ReservationEngine.stop());
            this.elements.refreshSeatsBtn.addEventListener('click', () => ReservationEngine.manualRefresh());

            const inputs = {
                'res-date-input': 'targetDate', 'res-start-time': 'targetStartTime', 'res-end-time': 'targetEndTime',
                'preferred-seat-number': 'uiPreferredSeatNumber', 'start-hour': 'startHour', 'start-minute': 'startMinute', 'start-second': 'startSecond'
            };
            for (const [id, key] of Object.entries(inputs)) {
                document.getElementById(id).addEventListener('change', (e) => ConfigManager.set(key, e.target.value));
            }

            this.elements.toggleAllSettings.addEventListener('click', (e) => {
                e.preventDefault();
                const container = this.elements.allSettingsContainer;
                const isVisible = container.style.display === 'block';
                container.style.display = isVisible ? 'none' : 'block';
                e.target.textContent = isVisible ? '展开设置...' : '收起设置';
            });

            this.elements.toggleLogPanel.addEventListener('click', (e) => {
                e.preventDefault();
                const container = this.elements.logPanel;
                const isVisible = container.style.display === 'block';
                container.style.display = isVisible ? 'none' : 'block';
                e.target.textContent = isVisible ? '显示日志...' : '收起日志';
            });

            this.elements.autoConfirm.addEventListener('change', (e) => ConfigManager.set('autoConfirmReservation', e.target.checked));
            this.elements.autoStartToggle.addEventListener('change', (e) => {
                ConfigManager.set('autoStartAtSpecificTime', e.target.checked);
                this.elements.autoStartTimeInputs.style.display = e.target.checked ? 'block' : 'none';
                ReservationEngine.scheduleAutoStart();
            });

            const speedInputs = {
                'rs-refresh-interval': 'refreshInterval',
                'rs-post-selection-delay': 'postSelectionDelay',
                'rs-outcome-timeout': 'postActionMaxWait'
            };
            for (const [id, key] of Object.entries(speedInputs)) {
                document.getElementById(id).addEventListener('change', (e) => ConfigManager.set(key, parseInt(e.target.value, 10)));
            }

            this.elements.floorSelect.addEventListener('change', (e) => {
                ConfigManager.set('uiSelectedFloor', e.target.value);
                this.updateFloorAndPreferenceOptions();
            });
            this.elements.preferenceSelect.addEventListener('change', (e) => ConfigManager.set('uiSelectedPreference', e.target.value));
            this.elements.panelContent.querySelector('.quick-time-ranges').addEventListener('click', (event) => {
                const btn = event.target.closest('.quick-time-btn');
                if (!btn) return;
                this.elements.resStartTime.value = btn.dataset.start;
                this.elements.resEndTime.value = btn.dataset.end;
                ConfigManager.set('targetStartTime', btn.dataset.start, false);
                ConfigManager.set('targetEndTime', btn.dataset.end);
            });

            this.elements.profileLoad1.addEventListener('click', () => ProfileManager.load(1));
            this.elements.profileSave1.addEventListener('click', () => ProfileManager.save(1));
            this.elements.profileLoad2.addEventListener('click', () => ProfileManager.load(2));
            this.elements.profileSave2.addEventListener('click', () => ProfileManager.save(2));
        },

        togglePanelVisibility(isMinimized, skipSave = false) {
            ConfigManager.set('uiPanelMinimized', isMinimized, !skipSave);
            this.elements.panelContent.style.display = isMinimized ? 'none' : 'block';
            this.elements.minimizedPanelContent.style.display = isMinimized ? 'flex' : 'none';
            this.elements.minimizePanel.textContent = isMinimized ? '▾' : '▴';
            this.elements.libseatReservationPanel.style.width = isMinimized ? '220px' : '350px';
            this.updateTimerDisplay();
        },

        updateStatus(message, statusType = 'info') {
            if (!this.isReady) {
                Utils.log(`[Status Update] ${message}`);
                return;
            }
            this.elements.statusEl.textContent = message;
            this.elements.statusEl.className = `status-message ${statusType}`;
            Utils.log(`[状态] ${message}`);
        },

        async updateFloorAndPreferenceOptions() {
            if (!this.isReady) return;
            const floorSelect = this.elements.floorSelect;
            const prefSelect = this.elements.preferenceSelect;

            const currentSelectedFloor = floorSelect.value;
            const currentSelectedPref = prefSelect.value;

            floorSelect.innerHTML = '<option value="auto">自动检测楼层</option>';
            prefSelect.innerHTML = '<option value="auto">按优先级自动选择</option>';

            Object.keys(ConfigManager.get('seatPreferences')).forEach(floor => {
                floorSelect.add(new Option(floor, floor));
            });

            floorSelect.value = currentSelectedFloor || ConfigManager.get('uiSelectedFloor');

            const selectedFloor = floorSelect.value === 'auto'
                ? await ReservationEngine.getDetectedFloor()
                : floorSelect.value;

            if (selectedFloor && ConfigManager.get('seatPreferences')[selectedFloor]) {
                ConfigManager.get('seatPreferences')[selectedFloor].forEach(pref => {
                    prefSelect.add(new Option(pref.type, pref.type));
                });
            }
            prefSelect.value = currentSelectedPref || ConfigManager.get('uiSelectedPreference');
        },

        updateTimerDisplay() {
            if (!this.isReady) return;
            const { startReserveBtn, resetReserveBtn, minimizedStartReserveBtn, minimizedShowTimeBtn, refreshSeatsBtn } = this.elements;
            const isMinimized = ConfigManager.get('uiPanelMinimized');

            if (ReservationEngine.isActive) {
                startReserveBtn.style.display = 'none';
                resetReserveBtn.style.display = isMinimized ? 'none' : 'inline-block';
                minimizedStartReserveBtn.disabled = true;
                minimizedStartReserveBtn.textContent = '抢座中...';
                refreshSeatsBtn.style.display = 'none';
            } else {
                startReserveBtn.style.display = isMinimized ? 'none' : 'inline-block';
                resetReserveBtn.style.display = 'none';
                minimizedStartReserveBtn.disabled = false;
                minimizedStartReserveBtn.textContent = '手动立刻抢座';
                refreshSeatsBtn.style.display = 'inline-block';
                if (ConfigManager.get('autoStartAtSpecificTime') && ReservationEngine.nextAutoStartTime) {
                    const diff = ReservationEngine.nextAutoStartTime.getTime() - Date.now();
                    if (diff > 0) {
                        const totalSeconds = Math.floor(diff / 1000);
                        const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
                        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2,'0');
                        const s = String(totalSeconds % 60).padStart(2,'0');
                        minimizedShowTimeBtn.textContent = `下次自动: ${h}:${m}:${s}`;
                    } else {
                        minimizedShowTimeBtn.textContent = '定时已过期';
                    }
                } else {
                    minimizedShowTimeBtn.textContent = '预约时间: 就绪';
                }
            }
        }
    };

    const ReservationEngine = {
        vm: null,
        reservationTimer: null,
        autoStartTimer: null,
        nextAutoStartTime: null,
        isActive: false,
        attempts: 0,
        MAX_ATTEMPTS: 5,
        FETCH_SEAT_MAX_RETRIES: 3,
        FETCH_SEAT_RETRY_DELAY: 1000,
        timerDisplayInterval: null, // 新增：用于更新计时器显示的 interval ID

        async init(vueInstance) {
            this.vm = vueInstance;
            VueAdapter.init(vueInstance);
            await UIManager.updateFloorAndPreferenceOptions();
            this.scheduleAutoStart();
            // 确保计时器显示在脚本初始化后立即开始更新
            if (this.timerDisplayInterval) clearInterval(this.timerDisplayInterval);
            this.timerDisplayInterval = setInterval(() => UIManager.updateTimerDisplay(), 1000);
        },

        async getDetectedFloor() {
            if (!this.vm || !this.vm.readingRoom) return null;
            const path = this.vm.readingRoom.parentNamePath || this.vm.readingRoom.name || '';
            const match = path.match(/(\d+F)/);
            return match ? match[1] : null;
        },

        async scheduleAutoStart() {
            if (this.autoStartTimer) clearTimeout(this.autoStartTimer);
            this.nextAutoStartTime = null;
            if (!ConfigManager.get('autoStartAtSpecificTime')) {
                UIManager.updateStatus('定时抢座已关闭。', 'info');
                return;
            }
            const now = new Date();
            let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ConfigManager.get('startHour'), ConfigManager.get('startMinute'), ConfigManager.get('startSecond'));
            if (targetTime <= now) targetTime.setDate(targetTime.getDate() + 1);
            const delay = targetTime.getTime() - now.getTime();

            if (delay < 0) {
                 UIManager.updateStatus('定时任务设置有误，时间已过。请检查。', 'error');
                 return;
            } else if (delay > 24 * 60 * 60 * 1000 + 5000) {
                 UIManager.updateStatus('定时任务时间设置过远，请检查。', 'error');
                 return;
            }

            this.nextAutoStartTime = targetTime;
            UIManager.updateStatus(`定时任务已设定，将于 ${targetTime.toLocaleString('zh-CN')} 自动抢座。`, 'info');
            this.autoStartTimer = setTimeout(() => this.start(true), delay);
        },

        manualStart() {
            this.stop(false);
            this.start(true);
        },

        stop(notify = true, reschedule = true) {
            if (this.reservationTimer) clearTimeout(this.reservationTimer);
            if (this.autoStartTimer) clearTimeout(this.autoStartTimer);
            this.reservationTimer = null;
            this.isActive = false;
            if (notify) {
                UIManager.updateStatus('抢座已停止。', 'info');
            }
            if (reschedule) {
                this.scheduleAutoStart();
            }
            UIManager.updateTimerDisplay();
        },

        _preflightCheck() {
            Utils.log('执行启动预检...');
            if (!this.vm) {
                return { success: false, message: '预检失败: Vue 实例未加载。请刷新页面。' };
            }

            const { targetDate, targetStartTime, targetEndTime, autoStartAtSpecificTime, startHour, startMinute, startSecond } = ConfigManager.config;

            if (!targetDate || !targetStartTime || !targetEndTime || targetStartTime === targetEndTime) {
                return { success: false, message: '预检失败: 预约日期或时间范围未设置或不合法。' };
            }

            if (autoStartAtSpecificTime) {
                if (isNaN(parseInt(startHour)) || isNaN(parseInt(startMinute)) || isNaN(parseInt(startSecond)) ||
                    parseInt(startHour) < 0 || parseInt(startHour) > 23 || parseInt(startMinute) < 0 || parseInt(startMinute) > 59 || parseInt(startSecond) < 0 || parseInt(startSecond) > 59) {
                    return { success: false, message: '预检失败: 定时抢座时间设置不合法。' };
                }
            }
            Utils.log('预检通过。');
            return { success: true, message: '预检通过。' };
        },

        async start(isNewRun = false) {
            if (isNewRun) this.attempts = 0;
            this.isActive = true;
            UIManager.updateTimerDisplay();

            const preflight = this._preflightCheck();
            if (!preflight.success) {
                UIManager.updateStatus(preflight.message, 'error');
                GM_notification({ title: GM.info.script.name, text: preflight.message, timeout: 10000 });
                this.stop(false, false);
                return;
            }

            if (this.attempts >= this.MAX_ATTEMPTS) {
                UIManager.updateStatus(`已达到最大抢座尝试次数 (${this.MAX_ATTEMPTS}次)，停止。`, 'error');
                GM_notification({ title: GM.info.script.name, text: '抢座失败，已达到最大尝试次数。', timeout: 8000 });
                this.stop(false, false);
                return;
            }
            this.attempts++;
            UIManager.updateStatus(`第 ${this.attempts}/${this.MAX_ATTEMPTS} 次尝试抢座...`, 'working');
            if (!this.vm) {
                UIManager.updateStatus('错误: Vue 实例丢失，无法继续。', 'error');
                this.stop(true, false);
                return;
            }
            try {
                await this.executeReservationFlow();
            } catch (e) {
                await Utils.error('Reservation flow caught an error:', e);
                UIManager.updateStatus(`尝试失败: ${e.message}`, 'error');
                this.scheduleNextAttempt();
            }
        },

        async executeReservationFlow() {
            const { targetDate, targetStartTime, targetEndTime, uiSelectedFloor, uiPreferredSeatNumber } = ConfigManager.config;
            UIManager.updateStatus(`第 ${this.attempts} 次尝试: 设置时间范围...`, 'working');
            await VueAdapter.setTimeRange(targetDate, targetStartTime, targetEndTime);

            let sortedSeats = [];
            const refreshDelay = ConfigManager.get('refreshInterval');

            for (let i = 0; i < this.FETCH_SEAT_MAX_RETRIES; i++) {
                UIManager.updateStatus(`第 ${i + 1}/${this.FETCH_SEAT_MAX_RETRIES} 次刷新座位列表...`, 'working');
                const fetchSuccess = await this.ensureSeatListIsFetched();
                if (!fetchSuccess) {
                    throw new Error('获取座位列表失败，请检查网络或页面状态。');
                }

                const preferredSeatNumbers = (uiPreferredSeatNumber || '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                let floorForSorting = uiSelectedFloor === 'auto' ? await this.getDetectedFloor() : uiSelectedFloor;
                if (!floorForSorting) {
                    Utils.log("无法自动检测楼层, 使用默认 3F 进行排序。");
                    floorForSorting = "3F";
                }

                const currentFoundSeats = this.filterAndSortSeats(this.vm.seatList, floorForSorting, preferredSeatNumbers);
                UIManager.updateStatus(`当前可选座位: ${currentFoundSeats.length} 个`, 'info');

                if (currentFoundSeats.length > 0) {
                    sortedSeats = currentFoundSeats;
                    break;
                }

                if (i < this.FETCH_SEAT_MAX_RETRIES - 1) {
                    await new Promise(r => setTimeout(r, refreshDelay));
                }
            }

            if (sortedSeats.length === 0) {
                UIManager.updateStatus('当前可选座位：0。请检查时间范围或楼层偏好设置。', 'error');
                GM_notification({ title: GM.info.script.name, text: '多次刷新后仍无空闲座位，抢座已停止。'});
                this.stop(false, false);
                return;
            }

            UIManager.updateStatus(`锁定 ${sortedSeats.length} 个目标座位，尝试预约...`, 'working');
            for (const seat of sortedSeats.slice(0, 5)) {
                if (!this.isActive) return;
                const success = await this.selectAndReserveSeat(seat);
                if (success) {
                    UIManager.updateStatus(`成功预约座位: ${seat.name}!`, 'success');
                    Utils.log(`成功预约座位: ${seat.name}`);
                    GM_notification({ title: GM.info.script.name, text: `成功预约到座位: ${seat.name}！`, image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg', timeout: 10000 });
                    this.stop(false, true);
                    return;
                }
            }
            throw new Error('本轮所有候选座位均预约失败。');
        },

        async selectAndReserveSeat(seat) {
            UIManager.updateStatus(`尝试预约座位 ${seat.name}...`, 'working');
            try {
                await VueAdapter.selectSeat(seat);
                await new Promise(r => setTimeout(r, ConfigManager.get('postActionMinDelay') + ConfigManager.get('postSelectionDelay')));

                if (!this.vm.seatReserveVisible) {
                    await Utils.error('预约确认模态框未出现，可能座位已被抢走或选择失败。');
                    return false;
                }

                if (!ConfigManager.get('autoConfirmReservation')) {
                    UIManager.updateStatus('模态框已打开，请手动确认。脚本已暂停。', 'info');
                    this.stop(false);
                    return true;
                }

                const initialUrl = window.location.href;
                this.vm.reservationResult = null;

                try {
                    await VueAdapter.confirmReservation(seat);
                } catch(e) {
                    Utils.log('VM confirm method failed, falling back to DOM click. Error:', e.message);
                    const confirmButton = document.querySelector('.seat-btn.seat-btn-primary, .btn-primary, button.primary');
                    if (confirmButton) {
                        Utils.safeClick(confirmButton);
                        Utils.log('已尝试通过DOM点击确认按钮。');
                    }
                    else {
                        await Utils.error('未找到确认按钮，无法通过DOM点击进行回退操作。');
                        return false;
                    }
                }

                const outcome = await this.checkReservationOutcome(initialUrl);
                if (outcome.status === 'success') {
                    return true;
                } else {
                    UIManager.updateStatus(`预约 ${seat.name} 失败: ${outcome.message}`, 'error');
                    if (outcome.status === 'failure_existing_reservation') {
                        UIManager.updateStatus(`预约失败: ${outcome.message} (已检测到已有预约，脚本停止)`, 'error');
                        GM_notification({ title: GM.info.script.name, text: `预约失败: ${outcome.message}`, timeout: 8000 });
                        this.stop(false, false);
                    }
                    return false;
                }
            } catch (e) {
                await Utils.error('座位选择或确认过程中发生错误:', e);
                return false;
            }
        },

        async checkReservationOutcome(initialUrl) {
            const FAST_POLL_DURATION = 1200;
            const FAST_POLL_INTERVAL = 60;
            const SLOW_POLL_INTERVAL = 200;
            const MAX_WAIT = ConfigManager.get('postActionMaxWait');

            let elapsedTime = 0;

            while (elapsedTime < MAX_WAIT) {
                if (window.location.href !== initialUrl && window.location.href.includes('/pages/user/')) {
                    Utils.log('检测到页面已跳转至用户中心，预约成功。');
                    return { status: 'success', message: '页面已跳转至用户中心。' };
                }

                const errorMsgEl = document.querySelector('.uni-toast-content, .uni-modal-content, .error-message');
                if (errorMsgEl && errorMsgEl.offsetParent !== null) {
                    const text = errorMsgEl.textContent.trim();
                    if (text.includes('已有其他申请或预约')) {
                        Utils.log(`[快速失败] 检测到已有预约: ${text}`);
                        return { status: 'failure_existing_reservation', message: text };
                    } else if (text.includes('失败') || text.includes('不可预约') || text.includes('被占用') || text.includes('不可用')) {
                        Utils.log(`[快速失败] 检测到错误: ${text}`);
                        return { status: 'failure', message: text };
                    }
                }
                if (this.vm.reservationResult && this.vm.reservationResult.code !== 200) {
                     Utils.log(`[快速失败] 检测到VM内部错误: ${JSON.stringify(this.vm.reservationResult)}`);
                     return { status: 'failure', message: this.vm.reservationResult.msg || 'VM返回错误结果。' };
                }

                const delay = (elapsedTime < FAST_POLL_DURATION) ? FAST_POLL_INTERVAL : SLOW_POLL_INTERVAL;
                await new Promise(r => setTimeout(r, delay));
                elapsedTime += delay;
            }
            Utils.log('等待预约结果超时。');
            return { status: 'timeout', message: '等待预约结果超时。' };
        },

        filterAndSortSeats(seatList, floorId, preferredSeatNumbers) {
            const preferences = ConfigManager.get('seatPreferences')[floorId] || [];
            const blacklist = ConfigManager.get('globalBlacklistKeywords');
            const uiPref = UIManager.elements.preferenceSelect.value;

            const validSeats = seatList.filter(seat =>
                seat.type === 'SEAT' && seat.enabled && seat.status === 'FREE' &&
                !blacklist.some(keyword => seat.name?.includes(keyword))
            ).map(seat => {
                const seatNumber = Utils.parseSeatNumberFromName(seat.name);
                if (isNaN(seatNumber)) return null;

                let category = "未分类", basePriority = Infinity;

                for (const pref of preferences) {
                    if (Utils.matchesPreferenceRule(pref.rule, seatNumber)) {
                        category = pref.type;
                        basePriority = pref.priority;
                        break;
                    }
                }

                let finalPriority = basePriority;

                if (uiPref !== 'auto') {
                    if (category === uiPref) {
                        finalPriority = 0;
                    } else {
                        finalPriority = basePriority + 100;
                    }
                }

                return {
                    ...seat,
                    seatNumber,
                    category,
                    finalPriority,
                    distance: Math.abs(seatNumber - Utils.DISTANCE_SORT_TARGET_SEAT),
                    isPreferred: preferredSeatNumbers.includes(seatNumber)
                };
            }).filter(Boolean);

            return validSeats.sort((a, b) => {
                if (a.isPreferred !== b.isPreferred) return a.isPreferred ? -1 : 1;
                if (a.finalPriority !== b.finalPriority) return a.finalPriority - b.finalPriority;
                return a.distance - b.distance;
            });
        },

        async ensureSeatListIsFetched() {
            for (let i = 0; i < this.FETCH_SEAT_MAX_RETRIES; i++) {
                try {
                    await VueAdapter.getSeats();
                    await new Promise(r => setTimeout(r, 300));
                    if (this.vm.seatList && this.vm.seatList.length > 0) {
                        return true;
                    }
                    Utils.log(`座位列表为空或未定义。重试中 (${i + 1}/${this.FETCH_SEAT_MAX_RETRIES})...`);
                } catch (e) {
                    await Utils.error(`获取座位列表失败 (${i + 1}/${this.FETCH_SEAT_MAX_RETRIES}):`, e.message);
                }
                await new Promise(r => setTimeout(r, this.FETCH_SEAT_RETRY_DELAY));
            }
            return false;
        },

        scheduleNextAttempt() {
            this.isActive = false;
            if (this.reservationTimer) clearTimeout(this.reservationTimer);
            const delay = ConfigManager.get('retryInterval') + (Math.random() * ConfigManager.get('randomizeDelay'));
            UIManager.updateStatus(`等待 ${Math.round(delay / 1000)} 秒后重试...`, 'working');
            this.reservationTimer = setTimeout(() => this.start(), delay);
        },

        async manualRefresh() {
             if (!this.vm) {
                UIManager.updateStatus('错误: 无法找到 Vue 实例。', 'error');
                return;
            }
            UIManager.updateStatus('正在手动刷新座位列表...', 'working');
            try {
                await VueAdapter.setTimeRange(ConfigManager.get('targetDate'), ConfigManager.get('targetStartTime'), ConfigManager.get('targetEndTime'));
                const fetchSuccess = await this.ensureSeatListIsFetched();
                if (fetchSuccess) {
                    const availableCount = this.vm.seatList.filter(s => s.type === 'SEAT' && s.enabled && s.status === 'FREE').length;
                    UIManager.updateStatus(`座位刷新成功。当前可选座位: ${availableCount} 个`, 'success');
                } else {
                    UIManager.updateStatus('座位刷新失败，无法从服务器获取列表。', 'error');
                }
            } catch (e) {
                await Utils.error('手动刷新座位失败:', e);
                UIManager.updateStatus(`错误: 手动刷新座位失败。(${e.message})`, 'error');
            }
        }
    };

    async function main() {
        if (!window.location.href.includes('libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2')) {
            return;
        }

        GM_notification({
            title: GM.info.script.name, text: '脚本已启动，正在初始化...',
            image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg',
            timeout: 3000
        });

        await ConfigManager.load();
        UIManager.create();
        UIManager.updateStatus('等待页面完全加载...', 'info');

        window.addEventListener('load', async () => {
            Utils.log('window.onload 事件已触发，开始查找 Vue 实例...');
            UIManager.updateStatus('正在查找 Vue 实例...', 'working');
            const vueInstance = await Utils.waitForUniAppPageVm();
            if (vueInstance) {
                UIManager.updateStatus('Vue 实例已找到，脚本就绪。', 'success');
                await ReservationEngine.init(vueInstance);
            } else {
                UIManager.updateStatus('错误: 无法找到 Vue 实例。请刷新页面重试。', 'error');
            }
        });
    }

    // 确保主函数在DOM加载后执行
    if (document.readyState === 'complete') {
        main().catch(e => Utils.error("主程序发生未捕获的错误:", e));
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            main().catch(e => Utils.error("主程序发生未捕获的错误:", e));
        });
    }

})();

```
