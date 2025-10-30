import React, { useEffect, useState } from 'react';
import axios from 'axios';


function TaskList() {
const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState('');


const fetchTasks = async () => {
try {
const res = await axios.get('http://localhost:4000/tasks', { params: { status: filter } });
setTasks(res.data);
} catch (err) {
console.error(err);
}
};
  const updateTask = async (id, status) => {
try {
await axios.patch(`http://localhost:4000/tasks/${id}`, { status });
fetchTasks();
} catch (err) {
console.error(err);
}
};


useEffect(() => {
fetchTasks();
}, [filter]);

  return (
<div>
<h3>All Tasks</h3>
<label>Filter by Status: </label>
<select value={filter} onChange={(e) => setFilter(e.target.value)}>
<option value=''>All</option>
<option value='Pending'>Pending</option>
<option value='In Progress'>In Progress</option>
<option value='Completed'>Completed</option>
</select>

<ul>
{tasks.map((task) => (
<li key={task._id || task.id}>
<b>{task.title}</b> ({task.priority}) — {task.status} — Due: {new Date(task.dueDate).toLocaleDateString()}
<br />
<button onClick={() => updateTask(task._id || task.id, 'In Progress')}>Start</button>
<button onClick={() => updateTask(task._id || task.id, 'Completed')}>Complete</button>
</li>
))}
</ul>
</div>
);
}


export default TaskList;
