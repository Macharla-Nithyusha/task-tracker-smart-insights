const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Ajv = require('ajv');
const ajv = new Ajv();

const createSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    description: { type: 'string' },
    priority: { type: 'string', enum: ['Low','Medium','High'] },
    due_date: { type: ['string','null'], format: 'date' },
    status: { type: 'string', enum: ['Todo','In Progress','Done'] }
  },
  required: ['title']
};
const validate = ajv.compile(createSchema);

// POST /tasks
router.post('/', async (req, res) => {
  const valid = validate(req.body);
  if (!valid) return res.status(400).json({ error: 'Invalid input', details: validate.errors });
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ data: task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// GET /tasks
router.get('/', async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      search: req.query.search,
      sortBy: req.query.sortBy,
      sortDir: req.query.sortDir
    };
    const tasks = await Task.list(filters);
    res.json({ data: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// PATCH /tasks/:id
router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  const allowed = ['status','priority','title','description','due_date'];
  const patch = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) patch[k] = req.body[k]; });
  try {
    const updated = await Task.update(id, patch);
    res.json({ data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
