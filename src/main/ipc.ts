import { app, ipcMain } from 'electron';

ipcMain.handle('fetch-users', () => {
  console.log('buscando usuários...');

  return [
    { id: 1, nome: 'Matheus' },
    { id: 2, nome: 'Ana' },
    { id: 3, nome: 'Pedro' },
  ];
});

ipcMain.handle('get-version', () => {
  return app.getVersion();
});
