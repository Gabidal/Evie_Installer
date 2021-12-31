import { app, BrowserWindow, ipcMain } from 'electron';
//import { Remove_Old_Launcher } from './app/Update_Launcher';
import { join } from 'path';
import { exec } from 'child_process';

// if (process.argv.length > 1 && process.argv[1] === '--Remove_Old_Launcher'){
//     Remove_Old_Launcher()
// }

const createWindow = (): void => {

  // exec("echo " + process.cwd() + " > $info1.txt")
  // exec("echo " + __dirname + " > $info2.txt")

  let win = new BrowserWindow({
    width: 400,
    height: 200,
    title: 'Evie Installer',
    icon: join(__dirname, 'Logo.ico'),

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
  

  win.loadFile(join(__dirname, 'index.html'));

  win.webContents.once('did-finish-load', () => {
    win.show()
  });
}

app.on('ready', createWindow);

ipcMain.on('Close', () => {
   process.exit(0);
});