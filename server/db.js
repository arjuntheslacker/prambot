const { Pool } = require('pg')
const connectionString = require('./db_config');

const pool = new Pool(connectionString);

async function query(sql, values=[]) {
	const result = await pool.query(sql, values);
	return result.rows;
}

async function end() {
	await pool.end();
}
const prepared = query("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;");
module.exports = {
	query,
	end
};