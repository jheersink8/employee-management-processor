// pg npm import
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

//--------------------- VIEW QUERIES ---------------------//
function ViewQuery(tableQuery) {
    this.tableQuery = tableQuery;
    this.runQuery = async function () {
        const { rows } = await pool.query(`${this.tableQuery}`);
        console.table(rows);
    };
};