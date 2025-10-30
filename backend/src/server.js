const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const insightsRouter = require('./routes/insights');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', tasksRouter);
app.use('/insights', insightsRouter);

app.get('/', (req,res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Task Tracker API running on http://localhost:${port}`));
