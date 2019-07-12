const express = require('express');
const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Projects could not be retrieved' });
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.get(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Project with ID could not be retrieved' });
  }
});

router.post('/', validateProjectData, async (req, res) => {
  try {
    const project = await db.insert(req.body);
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Project data could not be saved to the database' });
  }
});

router.put('/:id', validateProjectId, validateProjectData, async (req, res) => {
  try {
    const { id } = req.params;
    let upDatedProject = await db.update(id, req.body);
    upDatedProject = await db.get(id);
    res.status(200).json(upDatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Project data could not be saved to the database' });
  }
});

router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    let deletedProject = await db.remove(id);
    deletedProject = await db.get();
    res.status(200).json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: 'Project with ID could not be retrieved' });
  }
});

// validation middlewares
async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await db.get(id);
    if (!Number(id)) {
      return res.status(400).json({ error: 'the ID provided is not a number' });
    } else if (!project) {
      return res.status(400).json({ error: 'the ID provided is invalid' });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
}

async function validateProjectData(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: 'missing project data' });
    } else if (name === '' || name.length < 3) {
      return res.status(400).json({
        error: 'name is required and cannot be less than 3 characters'
      });
    } else if (description === '' || description.length < 5) {
      return res.status(400).json({
        error: 'description is required and cannot be less than 5 characters'
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = router;
