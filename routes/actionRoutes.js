const express = require('express');
const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ error: 'actions could not be retrieved' });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const action = await db.get(req.params.id);
      res.status(200).json(action);
    } catch (error) {
      res.status(500).json({ error: 'action with ID could not be retrieved' });
    }
  });

module.exports = router;