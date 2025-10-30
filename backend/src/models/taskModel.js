const db = require('../db');

const create = async (task) => {
  const [id] = await db('tasks').insert(task);
  return db('tasks').where({ id }).first();
};

const list = async (filters = {}) => {
  const query = db('tasks');
  if (filters.status) query.where('status', filters.status);
  if (filters.priority) query.where('priority', filters.priority);
  if (filters.search) query.where('title', 'like', `%${filters.search}%`);
  if (filters.sortBy === 'due_date') query.orderBy('due_date', filters.sortDir || 'asc');
  else query.orderBy('created_at', 'desc');
  return query.select('*');
};

const getById = (id) => db('tasks').where({ id }).first();

const update = async (id, patch) => {
  patch.updated_at = new Date().toISOString();
  await db('tasks').where({ id }).update(patch);
  return getById(id);
};

module.exports = { create, list, getById, update };
