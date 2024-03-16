const { Pool } = require('pg');
const pool = new Pool(
	{
		user: 'postgres',
		password: '1234',
		host: 'localhost',
		database: 'database_name_db'
	},
)
pool.connect();
