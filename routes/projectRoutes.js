const express = require('express');
const db = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');
const { validateProjectData, validateProjectId } = require('../validator/projectValidator');
const { validateActionData } = require('../validator/actionValidator');

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



module.exports = router;
