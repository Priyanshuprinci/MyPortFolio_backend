const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI || "mongodb+srv://princi:princi@cluster0.hggsk.mongodb.net/MyProject?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error: ", err));
  
  const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
  });
  
  const Project = mongoose.model('Project', projectSchema, 'Projects');

  
  app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    
    res.json(projects);
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));