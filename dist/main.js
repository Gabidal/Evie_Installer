/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/Update_Launcher.ts":
/*!************************************!*\
  !*** ./src/app/Update_Launcher.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Remove_Old_Launcher = exports.Start_Launcher_Update = exports.Update_Launcher = void 0;
const original_fs_1 = __webpack_require__(/*! original-fs */ "original-fs");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const Utils_1 = __webpack_require__(/*! ./Utils */ "./src/app/Utils.ts");
const Launcher_Version_File_Name = "./Launcher_Version.txt";
async function Update_Launcher() {
    const exists = await original_fs_1.promises.access(Launcher_Version_File_Name, original_fs_1.constants.F_OK).then(() => true).catch(() => false);
    //this means that the launcher version existsm and that we can fetch a new one from github.
    if (exists) {
        const version = new Date((await original_fs_1.promises.readFile(Launcher_Version_File_Name)).toString('utf8'));
        //now check if the version got from the latest release is greater than this launchers version.
        //this launcher version is got from the Launcher_Version.txt file.
        //read the version string from the file.
        const Latest_Release = await (0, Utils_1.Get_Launcher_Release)();
        const Release_Version = new Date(Latest_Release.published_at);
        if (Release_Version > version) {
            return Utils_1.RESPONSE.NEED_UPDATE_LAUNCHER;
        }
    }
    else {
        //if the launcher version file does not exist.
        //this means that this is the first time that the launcher is being run.
        //so we need to create the launcher version file.
        await original_fs_1.promises.writeFile(Launcher_Version_File_Name, new Date().toString());
    }
    return Utils_1.RESPONSE.NULL;
}
exports.Update_Launcher = Update_Launcher;
async function Start_Launcher_Update() {
    const Latest_Release = await (0, Utils_1.Get_Launcher_Release)();
    const Release_Version = new Date(Latest_Release.published_at);
    //we need to update the launcher.
    //we need to delete the Launcher_Version.txt file and then create a new one with the new version.
    await original_fs_1.promises.unlink(Launcher_Version_File_Name);
    await original_fs_1.promises.writeFile(Launcher_Version_File_Name, Release_Version.toString());
    //now we need to download the new launcher.
    await Download_Launcher(Latest_Release);
}
exports.Start_Launcher_Update = Start_Launcher_Update;
async function Download_Launcher(Release) {
    const Download_Link = Release.assets[0].browser_download_url;
    const Download_Response = await fetch(Download_Link);
    //Start the downloaded executable. and at the same time stop this launcher.
    const Buffer = await Download_Response.arrayBuffer();
    await original_fs_1.promises.writeFile('./Evie_Installer_New.exe', new Uint8Array(Buffer));
    //now startup the executable.
    await original_fs_1.promises.chmod('./Evie_Installer_New.exe', 0o755);
    (0, child_process_1.exec)('./Evie_Installer_New.exe --Remove_Old_Launcher');
}
async function Remove_Old_Launcher() {
    //remove the old launcher.
    await original_fs_1.promises.unlink('./Evie_Installer.exe');
    //rename the new launcher to the old launcher.
    await original_fs_1.promises.rename('./Evie_Installer_New.exe', './Evie_Installer.exe');
    //releanch this launcher so that it doesnt have the _new postfix init.
    await original_fs_1.promises.chmod('./Evie_Installer.exe', 0o755);
    (0, child_process_1.exec)('./Evie_Installer.exe');
}
exports.Remove_Old_Launcher = Remove_Old_Launcher;


/***/ }),

/***/ "./src/app/Utils.ts":
/*!**************************!*\
  !*** ./src/app/Utils.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sleep = exports.Get_Compiler_Release = exports.Get_Launcher_Release = exports.RESPONSE = void 0;
var RESPONSE;
(function (RESPONSE) {
    RESPONSE[RESPONSE["NULL"] = 0] = "NULL";
    RESPONSE[RESPONSE["NEED_UPDATE_LAUNCHER"] = 1] = "NEED_UPDATE_LAUNCHER";
    RESPONSE[RESPONSE["NEED_UPDATE_EVIE"] = 2] = "NEED_UPDATE_EVIE";
    RESPONSE[RESPONSE["NEED_INSTALL_GIT"] = 3] = "NEED_INSTALL_GIT";
    RESPONSE[RESPONSE["NEED_INSTALL_WINGET"] = 4] = "NEED_INSTALL_WINGET";
    RESPONSE[RESPONSE["CANNOT_SET_STARTUP"] = 5] = "CANNOT_SET_STARTUP";
})(RESPONSE = exports.RESPONSE || (exports.RESPONSE = {}));
async function Get_Launcher_Release() {
    const response = await fetch('https://api.github.com/repos/Gabidal/Evie_Installer/releases/latest');
    return await response.json();
}
exports.Get_Launcher_Release = Get_Launcher_Release;
async function Get_Compiler_Release() {
    const response = await fetch('https://api.github.com/repos/Gabidal/Evie/releases/latest');
    return await response.json();
}
exports.Get_Compiler_Release = Get_Compiler_Release;
function Sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.Sleep = Sleep;


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "original-fs":
/*!******************************!*\
  !*** external "original-fs" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("original-fs");

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
const Update_Launcher_1 = __webpack_require__(/*! ./app/Update_Launcher */ "./src/app/Update_Launcher.ts");
const path_1 = __webpack_require__(/*! path */ "path");
if (process.argv.length > 1 && process.argv[1] === '--Remove_Old_Launcher') {
    (0, Update_Launcher_1.Remove_Old_Launcher)();
}
const createWindow = () => {
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