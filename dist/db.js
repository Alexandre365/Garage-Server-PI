"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.setProduct = exports.getProduct = exports.getAllProduct = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let db;
// Garantir que a pasta exista
const dataDir = path_1.default.join(__dirname, 'data');
if (!fs_1.default.existsSync(dataDir)) {
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
const dbFile = path_1.default.join(dataDir, 'banco.db');
const exists = fs_1.default.existsSync(dbFile);
(0, sqlite_1.open)({
    filename: dbFile,
    driver: sqlite3_1.default.Database
})
    .then(async (dBase) => {
    db = dBase;
    try {
        if (!exists) {
            await db.run(`CREATE TABLE Product (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                value REAL NOT NULL,
                category TEXT NOT NULL
                )`);
            console.log(await db.all("SELECT * from Product"));
        }
    }
    catch (dbError) {
        console.error(dbError);
    }
});
// Get the messages in the database
let getAllProduct = async () => {
    try {
        return await db.all("SELECT * from Product");
    }
    catch (dbError) {
        console.error(dbError);
    }
};
exports.getAllProduct = getAllProduct;
let getProduct = async (id) => {
    try {
        return await db.all(`
        SELECT * from Product
        WHERE id = ?
      `, id);
    }
    catch (dbError) {
        console.error(dbError);
    }
};
exports.getProduct = getProduct;
let setProduct = async (item) => {
    const { title, description, value, category } = item;
    try {
        const result = await db.run(`
        INSERT INTO Product (title, description, value, category)
        VALUES (?, ?, ?, ?)
      `, title, description, value, category);
        return result.changes;
    }
    catch (dbError) {
        console.error(dbError);
        return undefined;
    }
};
exports.setProduct = setProduct;
let deleteProduct = async (id) => {
    try {
        const result = await db.run(`
      DELETE FROM Product WHERE id = ?;
    `, id);
        return result.changes;
    }
    catch (dbError) {
        console.error(dbError);
        return undefined;
    }
};
exports.deleteProduct = deleteProduct;
let updateProduct = async (item) => {
    const { title, description, value, category, id } = item;
    try {
        const result = await db.run(`
      UPDATE Product
      SET title = ?,
          description = ?,
          value = ?,
          category = ?
      WHERE id = ?
    `, title, description, value, category, id);
        return result.changes;
    }
    catch (dbError) {
        console.error(dbError);
        return undefined;
    }
};
exports.updateProduct = updateProduct;
