const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Week8';

// Schema
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number,
    city: String
});

// Model
const Person = mongoose.model(
    'modelname',
    PersonSchema,
    'personCollection'
);

// Insert one document
async function insertOne() {
    const doc1 = new Person({
        name: 'Yousuf',
        age: 44,
        gender: 'Male',
        salary: 3456,
        city: 'London'
    });

    const savedDoc = await doc1.save();

    console.log('One document inserted');
    console.log(savedDoc);
}

// Insert many documents
async function insertMany() {
    const manypersons = [
        {
            name: 'SimonNHQ',
            age: 42,
            gender: 'Male',
            salary: 3456,
            city: 'London'
        },
        {
            name: 'NeeshaNN',
            age: 53,
            gender: 'Female',
            salary: 1000,
            city: 'Manchester'
        },
        {
            name: 'MaryNHQ',
            age: 27,
            gender: 'Female',
            salary: 5402,
            city: 'London'
        },
        {
            name: 'MikeNJQ',
            age: 40,
            gender: 'Male',
            salary: 4519,
            city: 'Birmingham'
        }
    ];

    const result = await Person.insertMany(manypersons);

    console.log('Many documents inserted');
    console.log(result);
}

// Find all documents
async function findAll() {
    const docs = await Person.find({})
        .sort({ salary: 1 })
        .select('name age salary city');

    console.log('\nShowing all documents');

    docs.forEach(doc => {
        console.log(
            doc.age,
            doc.name,
            doc.salary,
            doc.city
        );
    });
}

// Find females age 30 and above
async function findFemalesOver30() {
    const docs = await Person.find({
        gender: 'Female',
        age: { $gte: 30 }
    })
        .sort({ salary: 1 })
        .select('name age salary');

    console.log('\nFemales aged 30 or above:');

    docs.forEach(doc => {
        console.log(
            doc.age,
            doc.name,
            doc.salary
        );
    });
}

// Count documents
async function countDocuments() {
    const count = await Person.countDocuments();

    console.log('\nTotal Documents Count:', count);
}

// Find people from London
async function findByCity() {
    const cityName = 'London';

    const docs = await Person.find({
        city: cityName
    });

    console.log(`\nPeople from ${cityName}:`);

    docs.forEach(doc => {
        console.log(
            doc.name,
            doc.age,
            doc.gender,
            doc.salary,
            doc.city
        );
    });
}

// Update all females' salary
async function updateManyPersons() {
    const result = await Person.updateMany(
        { gender: 'Female' },
        { salary: 5555 }
    );

    console.log('\nUpdate successful');
    console.log(result);
}

// Delete people aged 45 or above
async function deleteManyPersons() {
    const result = await Person.deleteMany({
        age: { $gte: 45 }
    });

    console.log('\nDeleted documents:');
    console.log(result);
}

// Main function
async function main() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to ${MONGO_URI}`);

        
        await insertOne();
        await insertMany();
        await findAll();
        await findFemalesOver30();
        await countDocuments();
        await findByCity();
        await updateManyPersons();
        await deleteManyPersons();

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.connection.close();
        console.log('\nConnection closed');
    }
}

main();