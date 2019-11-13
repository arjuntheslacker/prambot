const { Pool } = require('pg')
const connectionString = require('./db_config');

const pool = new Pool(connectionString);

async function query(sql) {
	const result = await pool.query(sql);
	return result.rows;
}

async function end() {
	await pool.end();
}

module.exports = {
	query,
	end
};