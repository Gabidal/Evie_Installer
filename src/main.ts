import { app, BrowserWindow, ipcMain } from 'electron';
import { Remove_Old_Launcher } from './app/Update_Launcher';

if (process.argv.length > 1 && process.argv[1] === '--Remove_Old_Launcher'){
    Remove_Old_Launcher()
}

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 400,
    height: 150,
    titleBarStyle: 'hidden',
    resizable: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('Close', () => {
  process.exit(0);
});