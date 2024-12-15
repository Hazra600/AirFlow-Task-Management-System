const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addToTaskList(tasks, taskId1, text1, priority1) {
  tasks.push({
    taskId: taskId1,
    text: text1,
    priority: priority1,
  });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addToTaskList(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortTaskByPriority);
  res.json({ tasks: result });
});

function editTaskPriority(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
      break;
    }
  }

  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = editTaskPriority(tasks, taskId, priority);
  res.json({ tasks: result });
});

function editTaskText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
      break;
    }
  }

  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = editTaskText(tasks, taskId, text);
  res.json({ tasks: result });
});

function deleteTaskById(task, taskId) {
  return task.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);

  let result = tasks.filter((task) => deleteTaskById(task, taskId));
  res.json({ tasks: result });
});

function getTaskByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);

  let result = tasks.filter((task) => getTaskByPriority(task, priority));
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
