import React, { useEffect, useState } from 'react';
import axios from 'axios';


function InsightsPanel() {
const [insights, setInsights] = useState(null);


const fetchInsights = async () => {
try {
const res = await axios.get('http://localhost:4000/insights');
setInsights(res.data);
} catch (err) {
console.error(err);
}
};
  useEffect(() => {
fetchInsights();
}, []);


if (!insights) return <p>Loading insights...</p>;


return (
<div>
<h3>Smart Insights</h3>
<p>{insights.summary}</p>


<h4>Details:</h4>
<ul>
<li>Total Tasks: {insights.totalTasks}</li>
<li>High Priority: {insights.highPriority}</li>
<li>Due Soon: {insights.dueSoon}</li>
<li>Busiest Day: {insights.busiestDay}</li>
</ul>
</div>
);
}


export default InsightsPanel;
