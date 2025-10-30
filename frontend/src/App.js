import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';


function App() {
const [activeTab, setActiveTab] = useState('tasks');


return (
<div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
<h1>Task Tracker with Smart Insights</h1>


<div style={{ marginBottom: '20px' }}>
<button onClick={() => setActiveTab('tasks')} style={{ marginRight: '10px' }}>Tasks</button>
<button onClick={() => setActiveTab('insights')}>Insights</button>
</div>


{activeTab === 'tasks' ? (
<>
<TaskForm />
<TaskList />
</>
) : (
<InsightsPanel />
)}
</div>
);
}
export default App;
