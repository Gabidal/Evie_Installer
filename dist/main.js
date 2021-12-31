/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
//import { Remove_Old_Launcher } from './app/Update_Launcher';
const path_1 = __webpack_require__(/*! path */ "path");
// if (process.argv.length > 1 && process.argv[1] === '--Remove_Old_Launcher'){
//     Remove_Old_Launcher()
// }
const createWindow = () => {
    // exec("echo " + process.cwd() + " > $info1.txt")
    // exec("echo " + __dirname + " > $info2.txt")
    let win = new electron_1.BrowserWindow({
        width: 400,
        height: 200,
        title: 'Evie Installer',
        icon: (0, path_1.join)(__dirname, 'Logo.ico'),
        titleBarStyle: 'hidden',
        show: false,
        resizable: true,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile((0, path_1.join)(__dirname, 'index.html'));
    win.webContents.once('did-finish-load', () => {
        win.show();
    });
};
electron_1.app.on('ready', createWindow);
electron_1.ipcMain.on('Close', () => {
    process.exit(0);
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map