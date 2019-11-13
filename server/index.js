const express = require('express');
const path = require('path');
const {query, end} = require('./db');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(process.cwd(), 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	const list = ["item1", "item2", "item3"];
	res.json(list);
});

app.get('/api/sample', async (req, res) => {
	const output = await query('Select NOW()');
	res.json(output);
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(process.cwd()+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

process.on('cleanup', () => {
	end().then(() => {
		console.log('cleaned up');
	});
});

// do app specific cleaning before exiting
process.on('exit', function () {
 	process.emit('cleanup');
});

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
 	process.exit(2);
});

//catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', function(e) {
 	console.log('Uncaught Exception...');
 	console.log(e.stack);
 	process.exit(99);
});