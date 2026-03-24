import { app, ipcMain } from 'electron';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import PouchDb from 'pouchdb';
import { Customer, NewCustomer } from '../shared/types/ipc';

// Determinar o caminho base para o banco de dados com base no sistema operacional
let dbPath;
if (process.platform === 'darwin') {
  dbPath = path.join(app.getPath('appData'), 'devclientes', 'my_db');
} else {
  dbPath = path.join(app.getPath('userData'), 'my_db');
}

// Criar o diretório do banco de dados se não existir
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Inicializar o banco de dados
const db = new PouchDb<Customer>(dbPath);

// Função para adicionar no banco
async function addCustomer(
  doc: NewCustomer,
): Promise<PouchDB.Core.Response | void> {
  const id = randomUUID();

  const data: Customer = {
    ...doc,
    _id: id,
  };

  return db
    .put(data)
    .then((response) => response)
    .catch((err) => console.error('ERRO AO CADASTRAR', err));
}

ipcMain.handle(
  'add-customer',
  async (event, doc: Customer): Promise<PouchDB.Core.Response | void> => {
    return await addCustomer(doc);
  },
);

// Função para retorna todos os clientes
async function fetchAllCustomers(): Promise<Customer[]> {
  try {
    const response = await db.allDocs({ include_docs: true });
    return response.rows.map((row) => row.doc as Customer);
  } catch (err) {
    console.error('ERRO AO BUSCAR CLIENTES', err);
    return [];
  }
}

ipcMain.handle('fetch-all-customers', async (): Promise<Customer[]> => {
  return await fetchAllCustomers();
});

// Buscar cliente pelo ID
async function fetchCustomerById(docId: string): Promise<Customer | null> {
  return db
    .get(docId)
    .then((doc) => doc)
    .catch((err) => {
      console.error('ERRO AO BUSCAR CLIENTE', err);
      return null;
    });
}

ipcMain.handle(
  'fetch-customer-id',
  async (event, docId: string): Promise<Customer | null> => {
    return await fetchCustomerById(docId);
  },
);

// Deletar um cliente
async function deleteCustomer(
  docId: string,
): Promise<PouchDB.Core.Response | null> {
  try {
    const doc = await db.get(docId);
    return await db.remove(doc);
  } catch (err) {
    console.error('ERRO AO DELETAR CLIENTE', err);
    return null;
  }
}

ipcMain.handle(
  'delete-customer',
  async (event, docId: string): Promise<PouchDB.Core.Response | null> => {
    return await deleteCustomer(docId);
  },
);

async function updateCustomer(
  doc: Customer,
): Promise<PouchDB.Core.Response | null> {
  try {
    return await db.put(doc);
  } catch (err) {
    console.error('ERRO AO ATUALIZAR CLIENTE', err);
    return null;
  }
}

ipcMain.handle(
  'update-customer',
  async (event, doc: Customer): Promise<PouchDB.Core.Response | null> => {
    return await updateCustomer(doc);
  },
);
