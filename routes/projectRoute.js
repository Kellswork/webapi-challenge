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

// validation middlewares
async function validateProjectId(req, res, next) {
  const { id } = req.params;
  const project = await db.get(id);
  if (!Number(id)) {
    return res.status(400).json({ error: 'the ID provided is not a number' });
  } else if (!project) {
    return res.status(400).json({ error: 'the ID provided is invalid' });
  }
  next();
}

module.exports = router;
