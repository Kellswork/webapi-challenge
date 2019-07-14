async function validateActionData(req, res, next) {
  try {
    const { description, notes, project_id } = req.body;
    if (!notes || !description) {
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

module.exports = {
    validateActionData, validateActionId
}