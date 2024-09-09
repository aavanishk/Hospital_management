const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  rfid: String,
  records: [{ type: String }]
});

const Patient = mongoose.model('Patient', patientSchema);

// Routes
app.post('/api/patient', async (req, res) => {
  const newPatient = new Patient(req.body);
  await newPatient.save();
  res.send('Patient added');
});

app.get('/api/patient/:rfid', async (req, res) => {
  const patient = await Patient.findOne({ rfid: req.params.rfid });
  res.send(patient);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
