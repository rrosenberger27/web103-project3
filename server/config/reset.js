import pool from "./database.js";

const resetDb = async () => {
    try {
        const createTableQuery = `
        DROP TABLE IF EXISTS CustomItem;
        CREATE TABLE CustomItem (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            logo VARCHAR(100) NOT NULL,
            stripes VARCHAR(100) NOT NULL,
            color VARCHAR(100) NOT NULL,
            fabric_type VARCHAR(100) NOT NULL
        );
    `
        await pool.query(createTableQuery);
        console.log("CustomItem Table created succesfully ✅");

    } catch (err) {
        console.error("Error resetting database", err);
        throw err;
    }

}

resetDb();
