import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { join } from 'node:path';

import { CreateTray } from './tray';

import { createFileRoute, createURLRoute } from 'electron-router-dom';
import iconPath from '../../resources/icon.png?asset';

import { creatShortcuts } from './shortcuts';

import './ipc';
import './store';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#030712',
    icon: iconPath,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  CreateTray(mainWindow);
  creatShortcuts(mainWindow);

  if (process.platform === 'darwin') {
    app.dock?.setIcon(iconPath);
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  const devServerURL = createURLRoute(
    process.env['ELECTRON_RENDERER_URL']!,
    'main',
  );

  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'main',
  );

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(devServerURL);
  } else {
    mainWindow.loadFile(...fileRoute);
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('ping', () => console.log('pong'));

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
