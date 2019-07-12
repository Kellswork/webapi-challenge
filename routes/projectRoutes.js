const express = require('express');
const db = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');


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

router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    const { id } = req.params;
    const actions = await db.getProjectActions(id);
    res.status(200).json(actions);
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

router.post(
  '/:id/actions',
  validateProjectId,
  validateActionData,
  async (req, res) => {
    try {
      const { id } = req.params;
      const action = await actionDb.insert({ ...req.body, project_id: id });
      res.status(200).json(action);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message });
    }
  }
);

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
    res.status(500).json({ error: 'Project with ID could not be deleted' });
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
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
}

async function validateActionData(req, res, next) {
  try {
    const { description, notes, project_id} = req.body;
    if (!notes || !description ) {
      return res.status(400).json({ message: 'missing action data' });
    } else if (notes === '' || notes.length < 3) {
      return res.status(400).json({
        error: 'notes is required and cannot be less than 3 characters'
      });
    } else if (description === '' || description.length < 5) {
      return res.status(400).json({
        error: 'description is required and cannot be less than 5 characters'
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = router;
