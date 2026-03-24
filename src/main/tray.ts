import { Menu, Tray, nativeImage, BrowserWindow } from 'electron';
import menuIconPath from '../../resources/menuTemplate.png?asset';

export function CreateTray(window: BrowserWindow) {
  let icon = nativeImage.createFromPath(menuIconPath);

  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    { label: 'Dev Clientes', enabled: false },
    { type: 'separator' },
    {
      label: 'Cadastrar cliente',
      click: () => {
        window.webContents.send('new-customer');

        if (window.isMinimizable()) window.restore();

        window.focus();
      },
    },
    {
      label: 'Abrir',
      click: () => {
        window.show();
      },
    },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' },
  ]);

  tray.setToolTip('Dev Clientes');

  tray.setContextMenu(menu);
}
