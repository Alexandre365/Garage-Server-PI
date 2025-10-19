import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import fs from 'fs';
import path from 'path';

let db: Database<sqlite3.Database, sqlite3.Statement>;

// Garantir que a pasta exista
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbFile = path.join(dataDir, 'banco.db');
const exists = fs.existsSync(dbFile);

type propsProduct = {
  title: string;
  description: string;
  value: number;
  category: string;
}
type propsUpdateProduct = {
  title: string;
  description: string;
  value: number;
  category: string;
  id: number;
}


open({
    filename: dbFile,
    driver: sqlite3.Database
})
.then(async dBase => {
    db = dBase

    try {
            if (!exists) {
            await db.run(
                `CREATE TABLE Product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                value REAL NOT NULL,
                category TEXT NOT NULL
                )`
            )
            console.log(await db.all("SELECT * from Product"));
            }
    } catch (dbError) {
        console.error(dbError);
    }
})


// Get the messages in the database
let getAllProduct = async (): Promise<any[] | undefined> => {
    try {
    return await db.all("SELECT * from Product");
    } catch (dbError) {
    console.error(dbError);
    }
}
let getProduct =async (id: number): Promise<any[] | undefined> => {
    try {
    return await db.all(`
        SELECT * from Product
        WHERE id = ?
      `,id);
    } catch (dbError) {
    console.error(dbError);
    }
}
let setProduct = async (item: propsProduct): Promise<number | undefined> => {
  const { title, description, value, category } = item
  try {
    const result = await db.run(
        `
        INSERT INTO Product (title, description, value, category)
        VALUES (?, ?, ?, ?)
      `,
        title, description, value, category
    );
    
    return result.changes
  } catch (dbError) {
    console.error(dbError);
    return undefined;
  }
};
let deleteProduct = async (id: number): Promise<number | undefined> =>{
  try {
    const result = await db.run(`
      DELETE FROM Product WHERE id = ?;
    `,id);
    return result.changes
  } catch (dbError) {
    console.error(dbError);
    return undefined;
  }
}
let updateProduct = async (item: propsUpdateProduct): Promise<number | undefined> =>{
  const { title, description, value, category, id } = item
  try {
    const result = await db.run(`
      UPDATE Product
      SET title = ?,
          description = ?,
          value = ?,
          category = ?
      WHERE id = ?
    `,title, description, value, category, id);
    return result.changes
  } catch (dbError) {
    console.error(dbError);
    return undefined;
  }
}


export {getAllProduct, getProduct, setProduct, deleteProduct, updateProduct}
