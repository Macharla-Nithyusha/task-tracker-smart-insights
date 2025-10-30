
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const total = await db('tasks').count('id as count').first();

    const byPriority = await db('tasks')
      .select('priority')
      .count('id as count')
      .groupBy('priority');

    const today = new Date();
    const in3 = new Date();
    in3.setDate(today.getDate() + 3);
    const in3Str = in3.toISOString().slice(0,10);
    const todayStr = today.toISOString().slice(0,10);
  const dueSoon = await db('tasks')
      .whereNotNull('due_date')
      .whereBetween('due_date', [todayStr, in3Str])
      .count('id as count')
      .first();

    const byDay = await db('tasks')
      .whereNotNull('due_date')
      .select(db.raw("strftime('%w', due_date) as weekday"))
      .count('id as count')
      .groupBy('weekday')
      .orderBy('count', 'desc');

    const busiest = (byDay && byDay[0]) ? byDay[0] : null;
 
    let dominantPriority = 'None';
    if (byPriority.length) {
      const max = byPriority.reduce((a,b)=> a.count>=b.count?a:b);
      dominantPriority = `${max.priority} (${max.count})`;
    }

    const summary = `You have ${total.count || 0} tasks — dominant priority: ${dominantPriority}. ${dueSoon.count || 0} task(s) due within 3 days.`;
 res.json({
      data: {
        total: total.count || 0,
        byPriority,
        dueSoon: dueSoon.count || 0,
        busiestWeekday: busiest ? { weekday: busiest.weekday, count: busiest.count } : null,
        summary
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
