const {query} = require('./db');

function intenseStringGenerator(symptoms) {
	// input: [{id: 1, intensity: 3}, {id: 2, intensity: 2}, {id: 3, intensity: 5}];
	// output: 111**22***33333

	let outputString = '';
	symptoms.forEach(symptom => {
		outputString += symptom.id.toString().repeat(symptom.intensity) + '*'.repeat(5-symptom.intensity);
	});
	return outputString;
}

function stringGenerator(symptoms) {
	// input: [{id: 1, intensity: 3}, {id: 2, intensity: 2}, {id: 3, intensity: 5}];
	// output: 111112222233333

	let outputString = '';
	symptoms.forEach(symptom => {
		outputString += symptom.id.toString().repeat(5);
	});
	return outputString;
}

function validateRecommendationInput(body) {
	if (!body.symptoms) return false;
	if (!body.circumstance) return false;
	if (!typeof(body.symptoms) == "object") return false;
	try {
		for (let i = 0; i < body.symptoms.length; i++) {
			const symptom = body.symptoms[i];
			const id = symptom.id;
			const intensity = symptom.intensity;
			if (typeof(id) != "number") return false;
			if (typeof(intensity) != "number") return false;
			if (intensity > 5 || intensity < 1) return false;
		}
	} catch {
		return false;
	}
	if (typeof(body.circumstance) != "string") return false;
	return true; 
}

async function validateSymptoms(symptoms) {
	let validIds = await query("select id from symptoms");
	validIds = validIds.map(x => x.id);

	for (let i = 0; i < symptoms.length; i++) {
		const x = symptoms[i];
		if (!validIds.includes(x.id)) {
			return false;
		}
	}
	return true;
}

module.exports = {
	stringGenerator,
	intenseStringGenerator,
	validateRecommendationInput,
	validateSymptoms
}