Backend Logic

Knex + SQLite for quick schema and query building.

Ajv for runtime validation.

Modular routes for /tasks and /insights.

Insight logic calculates totals, groupings, and summaries.

Frontend Architecture

App.js → orchestrates data fetch and filters.

TaskForm.js → create new tasks.

TaskList.js → display and update tasks inline.

InsightsPanel.js → render analytical summary.

Insight Logic

Uses rule-based aggregation (no AI):

Finds dominant priority category.

Counts near-due tasks (3 days).

Detects busiest day based on due_date grouping.

Generates a short natural-language summary.

Improvements & Ideas

Add user authentication and task ownership.

Implement pagination and sorting.

Introduce analytics charts (Recharts or Chart.js).

Extend schema with subtasks or labels.

Add testing (Jest) and CI/CD.
