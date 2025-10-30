import React, { useState } from 'react';
import axios from 'axios';


function TaskForm() {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('Medium');
const [dueDate, setDueDate] = useState('');


const handleSubmit = async (e) => {
e.preventDefault();
try {
await axios.post('http://localhost:4000/tasks', { title, description, priority, dueDate, status: 'Pending' });
alert('Task added successfully');
setTitle('');
setDescription('');
setPriority('Medium');
setDueDate('');
} catch (err) {
console.error(err);
alert('Error adding task');
}
};
return (
<form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
<h3>Add New Task</h3>
<input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
<br />
<textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
<br />
<select value={priority} onChange={(e) => setPriority(e.target.value)}>
<option>Low</option>
<option>Medium</option>
<option>High</option>
</select>
<br />
<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
<br />
<button type="submit">Add Task</button>
</form>
);
}


export default TaskForm;
