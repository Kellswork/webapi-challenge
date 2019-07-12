const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel');


router.get('/', async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: 'actions could not be retrieved' });
  }
});

router.get('/:id', validateActionId, async (req, res) => {
  try {
    const action = await db.get(req.params.id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({ error: 'action with ID could not be retrieved' });
  }
});

router.put('/:id', validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    let upDatedAction = await db.update(id, req.body);
    upDatedAction = await db.get(id);
    res.status(200).json(upDatedAction);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Action data could not be saved to the database' });
  }
});

router.delete('/:id', validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAction = await db.remove(id);
    res.status(200).json({ message: 'Action has been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Action with ID could not be deleted' });
  }
});

// validation middleware
async function validateActionId(req, res, next) {
    try {
        const { id } = req.params;
        const action = await db.get(id);
    if (!Number(id)) {
      return res.status(400).json({ error: 'the ID provided is not a number' });
    } else if (!action) {
      return res.status(400).json({ error: 'the ID provided is invalid' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = router;
