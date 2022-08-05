import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// COMPLETE Add logic to a method that accepts some content and adds it to the database
//export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const obStore = tx.objectStore('jate');
  
  // allow for no return
  const count = (await obStore.get('counter')) || 0;
  count = count + 1
  const res = await obStore.put({ id: count, value: content });
  
  await tx.done;
  
  return res;
};

// COMPLETE: Add logic for a method that gets all the content from the database
//export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const obStore = transaction.objectStore('jate');
  
  const res = await obStore.getAll();
  await tx.done;
  return res.value;
}

initdb();
