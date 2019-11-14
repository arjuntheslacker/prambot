const fs = require('fs');

function getDBConnectionString() {
	if (process.env.NODE_ENV === 'production') {
		return {connectionString: process.env.DATABASE_URL, ssl: true};
	} else {
		return JSON.parse(fs.readFileSync('./dev_db_config.json'));
	}
}

module.exports = getDBConnectionString();