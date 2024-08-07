const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const url = 'yourKluster';
const dbName = 'todo';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Define routes
    app.post('/todo', async (req, res) => {
      console.log('Request Body:', req.body);
      const todoCollection = db.collection('todo');
      try {
        const result = await todoCollection.insertOne(req.body);
        console.log('Insert Result:', result);
        res.status(201).json(result.ops[0]);
      } catch (error) {
        console.error('Error inserting item:', error);
        res.status(400).json({ message: error.message });
      }
    });

    // Get all users
    app.get('/todo', async (req, res) => {
      const usersCollection = db.collection('todo');
      try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Get a user by ID
    app.get('/todo/:id', async (req, res) => {
      const usersCollection = db.collection('todo');
      try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.put('/todo/:id', async (req, res) => {
      const todoCollection = db.collection('todo');
      try {
        const result = await todoCollection.findOneAndUpdate(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
          { returnOriginal: false }
        );
        if (!result.value) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json(result.value);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    // Delete a user
    app.delete('/todo/:id', async (req, res) => {
      const usersCollection = db.collection('todo');
      try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

  

 

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(error => console.error(error));
