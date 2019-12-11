const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const {query, end} = require('./db');
const {
	stringGenerator, 
	validateRecommendationInput, 
	validateSymptoms
} = require('./util');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(process.cwd(), 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/getSymptoms', async (req, res) => {
	const output = await query('SELECT id, name, details from symptoms where date_delete = 0 order by name');
	res.json(output);
});

app.get('/api/getTreatmentList', async (req, res) => {
	const output = await query('SELECT id, name, details from treatments where date_delete = 0 order by name');
	res.json(output);
});

app.post('/api/inspector', async (req, res) => {
	let output = req.body;
	output.type = typeof(req.body.symptoms);
	req.body.symptoms.forEach(x => console.log(x));
	res.json(output);
});

// app.post('/api/insertDataMap', async (req, res) => {
// 	const symptoms = req.body.symptoms.map(x => {
// 		return {id: x, intensity: 5};
// 	});
// 	const symptom_string = stringGenerator(symptoms);
// 	const treatments = req.body.treatments;
	
// 	const query_string = "INSERT into base_mapping \
// 	(symptoms, symptom_string, treatments) \
// 	values ($1, $2, $3)";
// 	const values = [
// 		JSON.stringify(symptoms), 
// 		symptom_string, 
// 		JSON.stringify(treatments)
// 	];

// 	const output = await query(query_string, values);
// 	res.json(output);
// });

// app.post('/api/query', async (req, res) => {
// 	const output = await query(req.body.query);
// 	res.json(output);
// });

app.post('/api/getRecommendation', async (req, res) => {
	req.body.symptoms = req.body.symptoms.map(x => {
		return {id: x, intensity: 5};
	});
	if (!validateRecommendationInput(req.body)) {
		res.status(500);
		res.json({error: 'input did not pass validation'});
		return;
	}

	const symptoms = req.body.symptoms;
	const valid = await validateSymptoms(symptoms);
	if (!valid) {
		res.status(500);
		res.json({error: 'invalid symptom in list'});
		return;
	}

	const circumstance = req.body.circumstance;
	// we're not doing intensities right now, but we want to save them in the db
	const symptomString = stringGenerator(symptoms);

	const query_string = "select treatments from base_mapping \
						  where date_delete = 0 \
						  order by levenshtein(symptom_string, \
						  $1) ASC \
						  limit 1";

	const output = await query(query_string, [symptomString]);
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
