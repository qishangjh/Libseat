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
---
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
### **QIshan今天抢到座位了吗 - 更新日志 (V1.5.1 -> V1.6.0)**
#### **🚀 新增 (Features)**
1.  **高级速度设置**
    *   新增了三个核心速度参数，允许用户根据自己的网络情况和风险偏好进行精细调整，以达到最快的抢座速度：
        *   **刷新间隔 (ms)**: 在未找到座位时，连续刷新座位列表之间的等待时间。
        *   **选座后延迟 (ms)**: 点击座位后，等待确认弹窗出现的额外延迟。
        *   **结果超时 (ms)**: 点击确认后，等待最终预约结果的最长时间。
    *   这些选项已完全集成到UI面板的可折叠“设置”区域中，方便随时修改。
#### **✨ 优化 (Improvements)**
1.  **UI 终极紧凑布局**
    *   对UI面板进行了彻底的重新设计，追求极致的简洁与高效。
    *   **核心设置分离**：默认界面现在只显示最核心的预约选项（楼层、日期、时间、偏好座位）。
    *   **统一的可折叠设置**：所有自动化选项（定时抢座、自动确认）和新增的高级速度设置，全部被整合进一个**“展开设置...”**链接中。只有在需要微调时才需展开，极大地减少了日常使用时的屏幕空间占用。
    *   **布局优化**：将“预约日期”和“时间段”选择框放在了同一行，进一步压缩了UI高度。
2.  **智能无座处理逻辑**
    *   彻底重做了当目标时间段内没有空闲座位时的处理逻辑。
    *   **自动刷新重试**：当脚本启动后发现没有可用座位，它不会立即停止，而是会自动**刷新最多3次**，以应对座位尚未完全放出或被瞬间抢完的情况。
    *   **实时状态反馈**：在自动刷新的过程中，UI面板会实时显示**“当前可选座位: X”**，让用户能清楚地看到脚本正在努力工作以及每次刷新的结果。
    *   **智能停止**：只有在连续刷新3次后，仍然一个符合条件的座位都找不到时，脚本才会最终停止，并明确提示用户“当前可选座位：0 请更换时间”。
#### **🛠️ 修复 (Fixes)**
1.  **修复了“无座提示”被覆盖的关键问题**
    *   解决了当脚本因无座而停止时，最终提示信息（“请更换时间”）被后续的默认状态（“抢座已停止”或“定时任务已设定”）瞬间覆盖掉的逻辑Bug。现在，正确的提示信息会永久保留在界面上。
2.  **修复了多个由代码重构引入的潜在问题**
    *   增强了 `ConfigManager` 的健壮性，确保新增的配置项能够被正确地加载默认值并持久化保存。

### V1.4.4 - 精准复合排序版 (2025-11-14)

*   **优化：重构座位分类逻辑，精准实现复合优先级排序。** 解决了在“按优先级选择”模式下，所有座位都被归类为“靠边”而导致地段偏好失效的问题。现在，脚本会优先将座位分类到“大理石”、“中间”等更具体的偏好类型，然后才考虑“靠边”作为通用类型。
*   **改进：精确的复合排序。** 排序逻辑严格遵循：
    1.  **是否是“喜欢座位号”（`isPreferred`：最高优先级）。**
    2.  **被分类的“地段偏好类型”的优先级（`categoryPriority`：例如 靠边 P1 > 大理石 P2 > 中间 P3）。**
    3.  **距离目标座位号 `40` 的远近（`distanceFromTarget`：越近越优先）。**

### V1.4.3 - 定位与多选增强版 (2025-11-14)

*   **新功能：喜欢座位号支持多选。** “指定座位号”输入框改为文本类型，允许用户输入多个以逗号分隔的座位号，脚本将这些座位视为最高优先级进行选择。
*   **优化：靠近目标座位号40的优先级。** 将距离排序的目标座位号从 `50` 调整为 `40`。
*   **修复：UI面板显示Bug。** 增大了UI面板展开时的默认宽度（从320px调整为350px），并略微增大了最小化时的宽度，以解决楼层下拉框文本显示不完整的问题。
*   **优化：`updateFloorAndPreferenceOptions` 鲁棒性。** 将函数声明为 `async`，确保内部 `getFloorIdentifier` 和 `saveConfig` 调用正确 `await`，提高异步处理的稳定性。

### V1.4.2 - UI稳定加强版 (2025-11-14)

*   **新功能：脚本启动通知。** 脚本启动时会通过浏览器通知用户脚本已运行，增强用户感知。
*   **优化：UI注入重试机制。** 引入 `ensureUIPresentAndInitialized` 包装函数，在UI面板首次注入DOM失败或被移除时，会进行多次重试以确保UI最终能稳定显示。
*   **优化：UI元素引用。** 将所有UI元素引用集中管理在 `uiElements` 对象中，避免重复DOM查询，提升效率和稳定性。
*   **优化：UI面板最小宽度。** 为UI面板设置 `min-width`，确保即使在最小化状态下也能完整显示标题和迷你按钮。
*   **优化：核心UI函数鲁棒性。** `updateTimerDisplay` 和 `scheduleAutoStart` 函数在执行前会检查UI是否已就绪 (`uiReady` 状态)，避免操作不存在的元素。

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
// @name         QIshan今天抢到座位了吗 - V1.6.0
// @namespace    https://github.com/qishangjh/Libseat
// @version      1.6.0
// @description  为吉林大学图书馆座位预约系统 (libseat.jlu.edu.cn) 创建的 Tampermonkey 用户脚本。
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

    // =================================================================================
    // --- [模块] 工具函数 (Utils) ---
    // =================================================================================
    const Utils = {
        ruleRegexCache: new Map(),
        seatCheckCache: new Map(),
        DISTANCE_SORT_TARGET_SEAT: 40,
        TARGET_COMPONENT_NAME: "SeatChooseV2",

        async log(...args) {
            console.log(`[${GM.info.script.name}]`, ...args);
            try { await GM_log(`[${GM.info.script.name}]`, ...args); } catch (e) { /* silent */ }
        },
        async error(...args) {
            console.error(`[${GM.info.script.name} ERROR]`, ...args);
            try { await GM_log(`[${GM.info.script.name} ERROR]`, ...args); } catch (e) { /* silent */ }
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

        findVueInstance(rootVm, componentName) {
            if (!rootVm) return null;
            const vueInstance = rootVm.$vm || rootVm;
            if (!vueInstance || typeof vueInstance !== 'object') return null;
            const name = vueInstance.$options?.name || vueInstance.$options?._componentTag;
            if (name === componentName) return vueInstance;
            if (vueInstance.$children && vueInstance.$children.length > 0) {
                for (const child of vueInstance.$children) {
                    const childVm = this.findVueInstance(child, componentName);
                    if (childVm) return childVm;
                }
            }
            return null;
        },

        async waitForUniAppPageVm() {
            await this.log('Attempting to find UniApp Vue instance...');
            return new Promise((resolve) => {
                let retryCount = 0;
                const maxRetries = 180; // 36 seconds
                const interval = setInterval(async () => {
                    if (retryCount++ > maxRetries) {
                        clearInterval(interval);
                        await this.error('Max retries reached for finding root Vue instance.');
                        return resolve(null);
                    }
                    if (typeof getCurrentPages === 'function') {
                        const pages = getCurrentPages();
                        if (pages && pages.length > 0) {
                            const rootVm = pages[pages.length - 1]?.$vm;
                            const foundVm = this.findVueInstance(rootVm, this.TARGET_COMPONENT_NAME);
                            if (foundVm) {
                                clearInterval(interval);
                                await this.log(`Successfully found "${this.TARGET_COMPONENT_NAME}" VM.`);
                                return resolve(foundVm);
                            }
                        }
                    }
                }, 200);
            });
        }
    };

    // =================================================================================
    // --- [模块] 配置管理器 (ConfigManager) ---
    // =================================================================================
    const ConfigManager = {
        key: 'libseat_auto_reserve_config_v1_5_1', // 键名保持不变以兼容旧配置
        config: {},
        defaultConfig: {
            autoStartAtSpecificTime: true,
            startHour: 21, startMinute: 0, startSecond: 1,
            targetDate: "", targetStartTime: "08:00", targetEndTime: "22:00",
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
            autoConfirmReservation: true,
            retryInterval: 2000, randomizeDelay: 500,
            postActionMaxWait: 5000, postActionMinDelay: 200,
            uiSelectedFloor: "3F", uiSelectedPreference: "auto",
            uiPreferredSeatNumber: "", uiPanelMinimized: true,

            // [新增的速度配置项]
            refreshInterval: 1500,     // 刷新座位列表的间隔 (毫秒)
            postSelectionDelay: 300,   // 点击座位后等待弹窗的延迟 (毫秒)
        },

        async load() {
            try {
                const storedConfig = await GM_getValue(this.key, null);
                // [核心修改] 使用新的 defaultConfig，确保新配置项存在
                this.config = { ...this.defaultConfig, ...storedConfig };
                if (!this.config.targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(this.config.targetDate)) {
                    this.config.targetDate = Utils.getTomorrowFormattedDate();
                }
                await Utils.log("Configuration loaded:", this.config);
            } catch (e) {
                await Utils.error("Failed to load configuration:", e);
                this.config = { ...this.defaultConfig };
                this.config.targetDate = Utils.getTomorrowFormattedDate();
            }
        },

        async save() {
            try {
                // [核心修改] 将新的速度配置项加入保存列表，以便持久化
                const configToSave = {
                    autoStartAtSpecificTime: this.config.autoStartAtSpecificTime,
                    startHour: this.config.startHour, startMinute: this.config.startMinute, startSecond: this.config.startSecond,
                    targetDate: this.config.targetDate, targetStartTime: this.config.targetStartTime, targetEndTime: this.config.targetEndTime,
                    uiSelectedFloor: this.config.uiSelectedFloor, uiSelectedPreference: this.config.uiSelectedPreference,
                    uiPreferredSeatNumber: this.config.uiPreferredSeatNumber, uiPanelMinimized: this.config.uiPanelMinimized,
                    autoConfirmReservation: this.config.autoConfirmReservation,

                    // [新增] 保存速度设置
                    refreshInterval: this.config.refreshInterval,
                    postSelectionDelay: this.config.postSelectionDelay,
                    postActionMaxWait: this.config.postActionMaxWait,
                };
                await GM_setValue(this.key, configToSave);
                await Utils.log("Configuration saved.");
            } catch (e) {
                await Utils.error("Failed to save configuration:", e);
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

    // =================================================================================
    // --- [模块] Vue 适配器 (VueAdapter) ---
    // =================================================================================
    const VueAdapter = {
        vm: null,
        init(vueInstance) {
            this.vm = vueInstance;
        },

        _callVmMethod(methodNames, ...args) {
            for (const name of methodNames) {
                if (typeof this.vm[name] === 'function') {
                    Utils.log(`Calling VM method: ${name}`);
                    return this.vm[name](...args);
                }
            }
            throw new Error(`No known VM method found from: [${methodNames.join(', ')}]`);
        },

        async getSeats() {
            return this._callVmMethod(['getSeats', 'getSeatList', 'refreshSeats', 'loadSeats']);
        },

        async selectSeat(seat) {
            if (typeof this.vm.selectSeat === 'function') {
                return this.vm.selectSeat({ seat, index: this.vm.seatList.findIndex(s => s.id === seat.id) });
            }
            return this._callVmMethod(['handleSeatClick'], seat);
        },

        async confirmReservation(seat) {
            return this._callVmMethod(['confirmReservation', 'submitReservation', 'reserveSeat'], seat);
        },

        async setTimeRange(date, startTime, endTime) {
            if (!this.vm.timeRange) throw new Error('vm.timeRange is not available.');
            this.vm.timeRange.date = date;
            this.vm.timeRange.startTime = startTime;
            this.vm.timeRange.endTime = endTime;
            // Use $set for reactivity if available
            if (typeof this.vm.$set === 'function') {
                this.vm.$set(this.vm.timeRange, 'date', date);
                this.vm.$set(this.vm.timeRange, 'startTime', startTime);
                this.vm.$set(this.vm.timeRange, 'endTime', endTime);
            }
            await new Promise(r => setTimeout(r, ConfigManager.get('postActionMinDelay')));
            await Utils.log('Time range updated in VM.');
        }
    };

    // =================================================================================
    // --- [模块] UI 管理器 (UIManager) --- [v1.5.7 超紧凑布局]
    // =================================================================================
    const UIManager = {
        elements: {},
        isReady: false,
        quickTimeRanges: [
            { name: "全天", start: "08:15", end: "21:45" },
            { name: "上午", start: "08:15", end: "12:00" },
            { name: "下午1", start: "12:20", end: "15:20" },
            { name: "下午2", start: "15:00", end: "18:00" },
            { name: "晚上", start: "18:00", end: "21:45" }
        ],

        create() {
            if (document.getElementById('libseat-reservation-panel')) {
                Utils.log('UI panel already exists. Re-initializing.');
                this.initialize();
                return;
            }
            const panel = document.createElement('div');
            panel.id = 'libseat-reservation-panel';
            // [核心修改] 将日期和时间段放在同一行
            panel.innerHTML = `
                <style>
                    #libseat-reservation-panel{position:fixed;top:20px;right:20px;z-index:9999;background:white;padding:15px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.2);font-family:sans-serif;font-size:14px;color:#333;transition:all .3s ease;width:350px}
                    #libseat-reservation-panel *{box-sizing:border-box}#libseat-reservation-panel .header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:5px;border-bottom:1px solid #eee}
                    #libseat-reservation-panel h3{margin:0;font-size:16px}#libseat-reservation-panel button{background:0;border:0;cursor:pointer;font-size:16px;color:#666}#libseat-reservation-panel button:hover{color:#000}
                    #libseat-reservation-panel label{display:block;margin-bottom:5px;font-weight:700;color:#555}
                    #libseat-reservation-panel select,#libseat-reservation-panel input{width:100%;padding:8px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;font-size:14px}
                    #libseat-reservation-panel .input-group-row{display:flex;gap:8px;align-items:center}
                    #libseat-reservation-panel .quick-time-ranges{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px}
                    #libseat-reservation-panel .quick-time-btn{padding:5px 10px;font-size:12px;background:#f0f0f0;border:1px solid #ccc;border-radius:4px;color:#555}
                    #libseat-reservation-panel .quick-time-btn:hover{background:#e0e0e0}
                    #libseat-reservation-panel .action-btn{padding:10px;border:0;border-radius:4px;color:#fff;font-weight:700;cursor:pointer;font-size:15px;transition:background .2s}
                    #libseat-reservation-panel #start-reserve-btn{background:#4CAF50}#libseat-reservation-panel #start-reserve-btn:hover{background:#43A047}
                    #libseat-reservation-panel #reset-reserve-btn{background:#FF9800}#libseat-reservation-panel #reset-reserve-btn:hover{background:#FB8C00}
                    #libseat-reservation-panel #refresh-seats-btn{background:#2196F3}#libseat-reservation-panel #refresh-seats-btn:hover{background:#1976D2}
                    #libseat-reservation-panel #reservation-status{padding:10px;background:#f8f9fa;border-radius:4px;min-height:20px;color:#333;margin-top:15px;font-size:13px;text-align:center;border:1px solid #dee2e6;transition:all .3s}
                    #libseat-reservation-panel #minimized-panel-content{display:none;flex-direction:column;gap:8px;margin-top:5px}
                    #libseat-reservation-panel #minimized-panel-content button{background-color:#f8f8f8;border:1px solid #e0e0e0;padding:8px 10px;font-size:13px;border-radius:4px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
                    .settings-container{display:none;border-top:1px solid #eee;margin-top:10px;padding-top:10px}
                    #toggle-all-settings{font-size:12px;color:#007bff;text-decoration:none;cursor:pointer;float:right;margin-top:-5px;margin-bottom:5px}
                    .settings-header{font-weight:bold;margin-top:5px;margin-bottom:8px;font-size:13px;color:#333}
                </style>
                <div class="header"><h3>QIshan今天抢到座位了吗</h3><button id="minimize-panel">▴</button></div>
                <div id="minimized-panel-content">
                    <button id="minimized-start-reserve-btn" title="点击立即开始抢座">手动立刻抢座</button>
                    <button id="minimized-show-time-btn" title="点击展开设置面板">预约时间: 就绪</button>
                </div>
                <div id="panel-content">
                    <div class="input-group-row"><div style="flex:1"><label for="floor-select">楼层:</label><select id="floor-select"></select></div><div style="flex:1"><label for="preference-select">地段偏好:</label><select id="preference-select"></select></div></div>

                    <!-- [布局优化] 日期和时间段放在同一行 -->
                    <div class="input-group-row">
                        <div style="flex: 1 1 40%;">
                            <label for="res-date-input">预约日期:</label>
                            <input type="date" id="res-date-input">
                        </div>
                        <div style="flex: 1 1 60%;">
                            <label>时间段:</label>
                            <div class="input-group-row">
                                <input type="time" id="res-start-time" style="flex:1;">
                                <span>-</span>
                                <input type="time" id="res-end-time" style="flex:1;">
                            </div>
                        </div>
                    </div>
                    <div class="quick-time-ranges">${this.quickTimeRanges.map(r=>`<button class="quick-time-btn" data-start="${r.start}" data-end="${r.end}">${r.name}</button>`).join('')}</div>

                    <div><label for="preferred-seat-number">喜欢座位号:</label><input type="text" id="preferred-seat-number" placeholder="如: 40, 41 (逗号分隔)"></div>

                    <a href="#" id="toggle-all-settings">展开设置...</a>

                    <div id="all-settings-container" class="settings-container">
                        <div class="settings-header">自动化设置</div>
                        <div class="input-group-row" style="margin-bottom:10px;">
                           <label style="margin-bottom:0;flex:1" for="auto-start-toggle"><input type="checkbox" id="auto-start-toggle" style="width:auto;margin-right:5px;">定时抢座</label>
                           <label style="margin-bottom:0;flex:1" for="auto-confirm"><input type="checkbox" id="auto-confirm" style="width:auto;margin-right:5px;">自动确认</label>
                        </div>
                        <div id="auto-start-time-inputs" style="display:none;">
                            <div class="input-group-row"><div style="flex:1"><label for="start-hour">时:</label><input type="number" id="start-hour" min="0" max="23"></div><div style="flex:1"><label for="start-minute">分:</label><input type="number" id="start-minute" min="0" max="59"></div><div style="flex:1"><label for="start-second">秒:</label><input type="number" id="start-second" min="0" max="59"></div></div>
                        </div>

                        <div class="settings-header">高级速度设置 (谨慎修改)</div>
                        <div class="input-group-row">
                            <div style="flex:1"><label for="rs-refresh-interval" title="每次刷新座位列表之间的等待时间。过低可能被服务器拒绝。">刷新(ms):</label><input type="number" id="rs-refresh-interval" min="100" step="100"></div>
                            <div style="flex:1"><label for="rs-post-selection-delay" title="点击座位后，等待确认弹窗出现的延迟。">延迟(ms):</label><input type="number" id="rs-post-selection-delay" min="50" step="50"></div>
                            <div style="flex:1"><label for="rs-outcome-timeout" title="点击确认后，等待成功/失败结果的最长时间。">超时(ms):</label><input type="number" id="rs-outcome-timeout" min="1000" step="500"></div>
                        </div>
                    </div>

                    <div style="display:flex;gap:10px;margin-top:15px"><button id="start-reserve-btn" class="action-btn" style="flex:2">开始抢座</button><button id="refresh-seats-btn" class="action-btn" style="flex:1">刷新</button><button id="reset-reserve-btn" class="action-btn" style="flex:2;display:none">重置抢座</button></div>
                    <div id="reservation-status">就绪，请设置参数并点击开始</div>
                </div>
            `;
            document.body.appendChild(panel);
            Utils.log('UI panel created and appended to body.');
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
                'toggle-all-settings', 'all-settings-container', 'auto-start-time-inputs'
            ];

            this.elements = ids.reduce((acc, id) => {
                const camelCaseKey = id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
                acc[camelCaseKey] = document.getElementById(id);
                return acc;
            }, {});

            this.elements.statusEl = this.elements.reservationStatus; // Alias

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

            this.elements.autoConfirm.addEventListener('change', (e) => ConfigManager.set('autoConfirmReservation', e.target.checked));

            this.elements.autoStartToggle.addEventListener('change', (e) => {
                ConfigManager.set('autoStartAtSpecificTime', e.target.checked);
                this.elements.autoStartTimeInputs.style.display = e.target.checked ? 'block' : 'none';
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
            const styles = {
                info: { bg: '#f8f9fa', border: '#dee2e6', color: '#333' },
                working: { bg: '#e3f2fd', border: '#2196F3', color: '#0d47a1' },
                success: { bg: '#e8f5e9', border: '#4CAF50', color: '#1b5e20' },
                error: { bg: '#ffebee', border: '#F44336', color: '#c62828' }
            };
            const style = styles[statusType] || styles.info;
            this.elements.statusEl.style.backgroundColor = style.bg;
            this.elements.statusEl.style.borderColor = style.border;
            this.elements.statusEl.style.color = style.color;
        },

        async updateFloorAndPreferenceOptions() {
            if (!this.isReady) return;
            const floorSelect = this.elements.floorSelect;
            const prefSelect = this.elements.preferenceSelect;
            floorSelect.innerHTML = '<option value="auto">自动检测楼层</option>';
            prefSelect.innerHTML = '<option value="auto">按优先级自动选择</option>';

            Object.keys(ConfigManager.get('seatPreferences')).forEach(floor => {
                floorSelect.add(new Option(floor, floor));
            });
            floorSelect.value = ConfigManager.get('uiSelectedFloor');

            const selectedFloor = floorSelect.value === 'auto'
                ? await ReservationEngine.getDetectedFloor()
                : floorSelect.value;

            if (selectedFloor && ConfigManager.get('seatPreferences')[selectedFloor]) {
                ConfigManager.get('seatPreferences')[selectedFloor].forEach(pref => {
                    prefSelect.add(new Option(pref.type, pref.type));
                });
            }
            prefSelect.value = ConfigManager.get('uiSelectedPreference');
        },

        updateTimerDisplay() {
            if (!this.isReady) return;
            const { startReserveBtn, resetReserveBtn, minimizedStartReserveBtn, minimizedShowTimeBtn } = this.elements;
            const isMinimized = ConfigManager.get('uiPanelMinimized');

            if (ReservationEngine.isActive) {
                startReserveBtn.style.display = 'none';
                resetReserveBtn.style.display = isMinimized ? 'none' : 'inline-block';
                minimizedStartReserveBtn.disabled = true;
                minimizedStartReserveBtn.textContent = '抢座中...';
            } else {
                startReserveBtn.style.display = isMinimized ? 'none' : 'inline-block';
                resetReserveBtn.style.display = 'none';
                minimizedStartReserveBtn.disabled = false;
                minimizedStartReserveBtn.textContent = '手动立刻抢座';

                if (ConfigManager.get('autoStartAtSpecificTime') && ReservationEngine.nextAutoStartTime) {
                    const diff = ReservationEngine.nextAutoStartTime.getTime() - Date.now();
                    if (diff > 0) {
                        const totalSeconds = Math.floor(diff / 1000);
                        const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
                        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2,'0');
                        const s = String(totalSeconds % 60).padStart(2,'0');
                        minimizedShowTimeBtn.textContent = `下次自动: ${h}:${m}:${s}`;
                    }
                } else {
                    minimizedShowTimeBtn.textContent = '预约时间: 就绪';
                }
            }
        }
    };

    // =================================================================================
    // --- [模块] 核心抢座引擎 (ReservationEngine) ---
    // =================================================================================
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

        async init(vueInstance) {
            this.vm = vueInstance;
            VueAdapter.init(vueInstance);
            await UIManager.updateFloorAndPreferenceOptions();
            this.scheduleAutoStart();
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
                UIManager.updateStatus('定时抢座已关闭。');
                return;
            }

            const now = new Date();
            let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ConfigManager.get('startHour'), ConfigManager.get('startMinute'), ConfigManager.get('startSecond'));
            if (targetTime <= now) targetTime.setDate(targetTime.getDate() + 1);

            const delay = targetTime.getTime() - now.getTime();
            this.nextAutoStartTime = targetTime;
            UIManager.updateStatus(`定时任务已设定，将于 ${targetTime.toLocaleString('zh-CN')} 自动抢座。`);
            this.autoStartTimer = setTimeout(() => this.start(true), delay);
            setInterval(() => UIManager.updateTimerDisplay(), 1000); // Update countdown
        },

        manualStart() {
            this.stop(false); // Stop any existing timers but don't reset status message
            this.start(true);
        },

        // [核心修改] 增加 reschedule 参数，用于控制是否重新安排下一次任务
        stop(notify = true, reschedule = true) {
            if (this.reservationTimer) clearTimeout(this.reservationTimer);
            if (this.autoStartTimer) clearTimeout(this.autoStartTimer);
            this.reservationTimer = null;
            this.isActive = false;
            if (notify) {
                UIManager.updateStatus('抢座已停止。');
            }
            // 只有在需要的时候才重新安排任务
            if (reschedule) {
                this.scheduleAutoStart();
            }
            UIManager.updateTimerDisplay();
        },


    async start(isNewRun = false) {
        if (isNewRun) this.attempts = 0;
        this.isActive = true;
        UIManager.updateTimerDisplay();

        if (this.attempts >= this.MAX_ATTEMPTS) {
            UIManager.updateStatus(`已达到最大抢座尝试次数 (${this.MAX_ATTEMPTS}次)，停止。`, 'error');
            GM_notification({ title: GM.info.script.name, text: '抢座失败，已达到最大尝试次数。', timeout: 8000 });
            this.stop(false, false); // [核心修改点] 彻底停止，不重新安排
            return;
        }
        this.attempts++;
        UIManager.updateStatus(`第 ${this.attempts}/${this.MAX_ATTEMPTS} 次尝试抢座...`, 'working');

        if (!this.vm) {
            UIManager.updateStatus('错误: Vue 实例丢失，无法继续。', 'error');
            this.stop(true, false); // [核心修改点] 彻底停止
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


        // [核心修改] 使用配置项替换硬编码的延迟
        async executeReservationFlow() {
            const { targetDate, targetStartTime, targetEndTime, uiSelectedFloor, uiPreferredSeatNumber } = ConfigManager.config;
            UIManager.updateStatus(`第 ${this.attempts} 次尝试: 设置时间范围...`, 'working');
            await VueAdapter.setTimeRange(targetDate, targetStartTime, targetEndTime);

            let sortedSeats = [];
            const EMPTY_FETCH_RETRIES = 3;
            // [修改点] 使用配置项代替固定的 1500
            const refreshDelay = ConfigManager.get('refreshInterval');

            for (let i = 0; i < EMPTY_FETCH_RETRIES; i++) {
                UIManager.updateStatus(`第 ${i + 1}/${EMPTY_FETCH_RETRIES} 次刷新座位列表...`, 'working');

                const fetchSuccess = await this.ensureSeatListIsFetched();
                if (!fetchSuccess) {
                    throw new Error('获取座位列表失败，请检查网络。');
                }

                const preferredSeatNumbers = (uiPreferredSeatNumber || '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                let floorForSorting = uiSelectedFloor === 'auto' ? await this.getDetectedFloor() : uiSelectedFloor;
                if (!floorForSorting) {
                    Utils.log("无法自动检测楼层, 使用默认 3F 进行排序。");
                    floorForSorting = "3F";
                }

                const currentFoundSeats = this.filterAndSortSeats(this.vm.seatList, floorForSorting, preferredSeatNumbers);
                UIManager.updateStatus(`当前可选座位: ${currentFoundSeats.length}`, 'info');

                if (currentFoundSeats.length > 0) {
                    sortedSeats = currentFoundSeats;
                    break;
                }

                if (i < EMPTY_FETCH_RETRIES - 1) {
                    await new Promise(r => setTimeout(r, refreshDelay));
                }
            }

            if (sortedSeats.length === 0) {
                UIManager.updateStatus('当前可选座位：0 请更换时间', 'error');
                GM_notification({
                    title: GM.info.script.name,
                    text: '多次刷新后仍无空闲座位，抢座已停止。'
                });
                this.stop(false, false);
                return;
            }

            UIManager.updateStatus(`锁定 ${sortedSeats.length} 个目标座位，尝试预约...`, 'working');

            for (const seat of sortedSeats.slice(0, 3)) {
                const success = await this.selectAndReserveSeat(seat);
                if (success) {
                    UIManager.updateStatus(`成功预约座位: ${seat.name}!`, 'success');
                    Utils.log(`Successfully reserved seat: ${seat.name}`);
                    GM_notification({ title: GM.info.script.name, text: `成功预约到座位: ${seat.name}！`, image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg', timeout: 10000 });
                    this.stop(false, true);
                    return;
                }
                if (!this.isActive) return;
            }

            throw new Error('本轮所有候选座位均预约失败。');
        },

        // [核心修改] 使用配置项替换硬编码的延迟
        async selectAndReserveSeat(seat) {
            UIManager.updateStatus(`尝试预约座位 ${seat.name}...`, 'working');
            try {
                await VueAdapter.selectSeat(seat);
                // [修改点] 使用 postSelectionDelay 配置项代替固定的 300
                await new Promise(r => setTimeout(r, ConfigManager.get('postActionMinDelay') + ConfigManager.get('postSelectionDelay')));

                if (!this.vm.seatReserveVisible) {
                    await Utils.error('Reservation modal did not appear.');
                    return false;
                }

                if (!ConfigManager.get('autoConfirmReservation')) {
                    UIManager.updateStatus('模态框已打开，请手动确认。');
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
                    if (confirmButton) Utils.safeClick(confirmButton);
                    else {
                        await Utils.error('Could not find confirm button for DOM click fallback.');
                        return false;
                    }
                }

                const outcome = await this.checkReservationOutcome(initialUrl);
                if (outcome.status === 'success') {
                    return true;
                } else {
                    UIManager.updateStatus(`预约 ${seat.name} 失败: ${outcome.message}`, 'error');
                    if (outcome.status === 'failure_existing_reservation') {
                        UIManager.updateStatus(`预约失败: ${outcome.message} (已停止抢座)`, 'error');
                        this.stop(false, false);
                    }
                    return false;
                }
            } catch (e) {
                await Utils.error('Error during seat selection/confirmation:', e);
                return false;
            }
        },


        async checkReservationOutcome(initialUrl) {
            const MAX_WAIT = ConfigManager.get('postActionMaxWait');
            let elapsedTime = 0;
            return new Promise(resolve => {
                const interval = setInterval(async () => {
                    elapsedTime += 100;
                    if (window.location.href !== initialUrl && window.location.href.includes('/pages/user/')) {
                        clearInterval(interval);
                        return resolve({ status: 'success', message: '页面已跳转至用户中心。' });
                    }
                    const errorMsg = document.querySelector('.uni-toast-content, .uni-modal-content, .error-message');
                    if (errorMsg && errorMsg.offsetParent !== null) {
                        const text = errorMsg.textContent.trim();
                        if (text.includes('已有其他申请或预约')) {
                            clearInterval(interval);
                            return resolve({ status: 'failure_existing_reservation', message: text });
                        } else if (text.includes('失败') || text.includes('不可预约') || text.includes('被占用')) {
                            clearInterval(interval);
                            return resolve({ status: 'failure', message: text });
                        }
                    }
                    if (elapsedTime >= MAX_WAIT) {
                        clearInterval(interval);
                        return resolve({ status: 'timeout', message: '等待预约结果超时。' });
                    }
                }, 100);
            });
        },

        filterAndSortSeats(seatList, floorId, preferredSeatNumbers) {
            const preferences = ConfigManager.get('seatPreferences')[floorId] || [];
            const blacklist = ConfigManager.get('globalBlacklistKeywords');
            const uiPref = UIManager.elements.preferenceSelect.value;
            const prefDefs = new Map(preferences.map(p => [p.type, p]));

            const validSeats = seatList.filter(seat =>
                seat.type === 'SEAT' && seat.enabled && seat.status === 'FREE' &&
                !blacklist.some(keyword => seat.name?.includes(keyword))
            ).map(seat => {
                const seatNumber = Utils.parseSeatNumberFromName(seat.name);
                if (isNaN(seatNumber)) return null;

                let category = "未分类", priority = Infinity;
                if (uiPref === 'auto') {
                    for (const pref of preferences.sort((a,b) => a.priority - b.priority)) {
                        if (Utils.matchesPreferenceRule(pref.rule, seatNumber)) {
                            category = pref.type;
                            priority = pref.priority;
                            break;
                        }
                    }
                } else {
                    const targetPref = prefDefs.get(uiPref);
                    if (targetPref && Utils.matchesPreferenceRule(targetPref.rule, seatNumber)) {
                        category = targetPref.type;
                        priority = targetPref.priority;
                    } else return null; // If user selects a specific type, filter out others
                }

                return { ...seat, seatNumber, category, priority,
                    distance: Math.abs(seatNumber - Utils.DISTANCE_SORT_TARGET_SEAT),
                    isPreferred: preferredSeatNumbers.includes(seatNumber)
                };
            }).filter(Boolean); // Remove nulls

            return validSeats.sort((a, b) => {
                if (a.isPreferred !== b.isPreferred) return a.isPreferred ? -1 : 1;
                if (a.priority !== b.priority) return a.priority - b.priority;
                return a.distance - b.distance;
            });
        },

        // [核心修改] 替换旧的 fetchSeatListSafely 函数
        async ensureSeatListIsFetched() {
            for (let i = 0; i < this.FETCH_SEAT_MAX_RETRIES; i++) {
                try {
                    await VueAdapter.getSeats();
                    await new Promise(r => setTimeout(r, 300));
                    // 只要 seatList 存在 (即使是空数组)，就认为获取成功
                    if (this.vm.seatList) {
                        return true;
                    }
                    Utils.log(`Seat list is null or undefined. Retrying (${i + 1}/${this.FETCH_SEAT_MAX_RETRIES})...`);
                } catch (e) {
                    await Utils.error(`Error fetching seats (${i + 1}/${this.FETCH_SEAT_MAX_RETRIES}):`, e.message);
                }
                await new Promise(r => setTimeout(r, this.FETCH_SEAT_RETRY_DELAY));
            }
            return false; // 多次尝试后依然失败
        },


        scheduleNextAttempt() {
            this.isActive = false;
            if (this.reservationTimer) clearTimeout(this.reservationTimer);
            const delay = ConfigManager.get('retryInterval') + (Math.random() * ConfigManager.get('randomizeDelay'));
            UIManager.updateStatus(`等待 ${Math.round(delay / 1000)} 秒后重试...`);
            this.reservationTimer = setTimeout(() => this.start(), delay);
        },

        // [核心修改] 替换旧的 manualRefresh 函数
        async manualRefresh() {
             if (!this.vm) {
                UIManager.updateStatus('错误: 无法找到 Vue 实例。', 'error');
                return;
            }
            UIManager.updateStatus('正在手动刷新座位列表...', 'working');
            try {
                await VueAdapter.setTimeRange(ConfigManager.get('targetDate'), ConfigManager.get('targetStartTime'), ConfigManager.get('targetEndTime'));

                // 使用新的函数名，并检查其返回值
                const fetchSuccess = await this.ensureSeatListIsFetched();

                if (fetchSuccess) {
                    const availableCount = this.vm.seatList.filter(s => s.type === 'SEAT' && s.enabled && s.status === 'FREE').length;
                    UIManager.updateStatus(`座位刷新成功。当前可选座位: ${availableCount}`, 'success');
                } else {
                    UIManager.updateStatus('座位刷新失败，无法从服务器获取列表。', 'error');
                }

            } catch (e) {
                await Utils.error('手动刷新座位失败:', e);
                UIManager.updateStatus(`错误: 手动刷新座位失败。(${e.message})`, 'error');
            }
        }

    };

    // =================================================================================
    // --- [主入口] Main Execution ---
    // =================================================================================
    async function main() {
        if (!window.location.href.includes('libseat.jlu.edu.cn/pages/reserve/seat-reserve/seat-choose-v2')) {
            Utils.log('Not on target page. Script will not run.');
            return;
        }

        GM_notification({
            title: GM.info.script.name, text: '脚本已启动，正在初始化...',
            image: 'https://www.jlu.edu.cn/__local/A/24/7D/2920253818AFBB1F55C97500B6E_67995171_B10E6.jpg',
            timeout: 3000
        });

        await ConfigManager.load();
        UIManager.create();

        UIManager.updateStatus('正在查找 Vue 实例...', 'working');
        const vueInstance = await Utils.waitForUniAppPageVm();

        if (vueInstance) {
            UIManager.updateStatus('Vue 实例已找到，脚本就绪。', 'success');
            await ReservationEngine.init(vueInstance);
        } else {
            UIManager.updateStatus('错误: 无法找到 Vue 实例。请刷新页面重试。', 'error');
        }
    }

    main().catch(e => Utils.error("An unhandled error occurred in main execution:", e));

})();```
