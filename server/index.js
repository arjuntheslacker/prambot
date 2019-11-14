const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const {query, end} = require('./db');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(process.cwd(), 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	const list = ["item1", "item2", "item3"];
	res.json(list);
});

app.get('/api/sample', async (req, res) => {
	const output = await query('SELECT NOW()');
	res.json(output);
});

app.get('/api/getSymptoms', async (req, res) => {
	const output = await query('SELECT * from symptoms');
	res.json(output);
});

app.get('/api/getTreatmentList', async (req, res) => {
	const output = await query('SELECT * from treatments');
	res.json(output);
});

app.post('/api/getTreatmentList', async (req, res) => {
	// join feedback table to treatment table, sort by feedback.score
	const user_id = req.body.user_id;
	if (!user_id) {
		res.status(500);
		res.json({error: 'No user supplied'});
		return;
	}
	const output = await query('select treatment.id, treatment.name, treatment.description from treatments INNER JOIN feedback on (treatment.id = feedback.treatment_id) where feedback.user_id = $1 order by feedback.score desc;', [user_id]);
	res.json(output);
});

// Handles any requests that don't match the ones above
// loading the UI bundle for now
app.get('*', (req,res) =>{
	res.sendFile(path.join(process.cwd()+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

// Process cleanup functions
process.on('cleanup', () => {
	end().then(() => {
		console.log('cleaned up');
	});
});

process.on('exit', function () {
 	process.emit('cleanup');
});

process.on('SIGINT', function () {
 	process.exit(2);
});

process.on('uncaughtException', function(e) {
 	console.log('Uncaught Exception...');
 	console.log(e.stack);
 	process.exit(99);
});