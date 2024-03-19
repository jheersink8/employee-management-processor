const iq = require('../scripts/questions');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'emp_db',
    password: '1234',
    port: 5432,
});

const test1 = function () {
    pool.connect()
        .then(() => { return pool.query('SELECT * FROM department') })
        .then((result) => { console.table(result.rows) })
        .catch((error) => { console.error('Error', error) })
        .finally(() => { pool.end() });
};


const test2 = function () {
    pool.connect()
    const text = 'INSERT INTO department(id, name) values($1, $2)'
    const values = [DEFAULT, 'TEST']
    const res = pool.query(text, values)
    console.log(res.rows)
};
// test2();


// client.connect()
//     .then(() => { return client.query('SELECT * FROM roles') })
//     .then((result) => { console.table(result.rows) })
//     .catch((error) => { console.error('Error', error) })
//     .finally(() => { client.end() });

// client.connect()
//     .then(() => { return client.query('SELECT * FROM employee') })
//     .then((result) => { console.table(result.rows) })
//     .catch((error) => { console.error('Error', error) })
//     .finally(() => { client.end() });