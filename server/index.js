const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const { ActionIt } = require("actionit");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3001;
const tasks = [];
const messages = [];

app.get("/tasks", (req, res) => {
  try {
    return res.status(200).send(tasks);
  } catch (error) {
    console.log("Error in get /tasks, error: ", error);
    return res.sendStatus(500);
  }
});

app.patch("/update-task", (req, res) => {
  const { id, newTitle, newStatus } = req.body;

  try {
    const taskIndex = tasks.findIndex((e) => e.id === id);

    if (taskIndex !== -1) {
      if (newTitle) {
        tasks[taskIndex].title = newTitle;
      }

      if (newStatus) {
        tasks[taskIndex].status = newStatus;
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log("Error in patch /update-task, error: ", error);
    return res.sendStatus(500);
  }
});

app.post("/add-task", (req, res) => {
  const { title, status } = req.body;

  try {
    tasks.push({ title, status, id: tasks.length + 1 });

    return res.status(200).json({ id: tasks.length });
  } catch (error) {
    console.log("Error in post /add-task, error: ", error);
    return res.sendStatus(500);
  }
});

/*
  AI super powers:
*/

const addTask = ({ title, status }) => {
  let newStatus = status;
  if (!["backlog", "in-progress", "complete"].includes(newStatus)) {
    newStatus = "backlog";
  }

  tasks.push({ title, status: newStatus, id: tasks.length + 1 });
};

const updateTask = ({ id, newTitle, newStatus }) => {
  const intId = parseInt(id);
  const taskIndex = tasks.findIndex((e) => e.id === intId);

  if (taskIndex !== -1) {
    if (newTitle) {
      tasks[taskIndex].title = newTitle;
    }

    if (newStatus) {
      tasks[taskIndex].status = newStatus;
    }
  }
};

const actionIt = new ActionIt({
  open_ai_api_key: process.env.OPEN_AI_API_KEY,
});

actionIt.addFunction({
  name: "addTask",
  description:
    "Add a new task with a title and status. The available statuses are: backlog, in-progress and complete.",
  function: addTask,
  parameters: {
    title: { type: "string", required: true },
    status: { type: "string", required: true },
  },
  on_response: (e) => {
    console.log(e);
  },
});

actionIt.addFunction({
  name: "updateTask",
  description:
    "Updates an existing task by it's integer id. The task's title and status can be updated with a newTitle and newStatus variable. The available statuses are: backlog, in-progress and complete.",
  function: updateTask,
  parameters: {
    id: { type: "integer", required: true },
    newTitle: { type: "string", required: false },
    newStatus: { type: "string", required: false },
  },
  on_response: (e) => {
    console.log(e);
  },
});

app.post("/send-message", async (req, res) => {
  const { message } = req.body;

  try {
    const taskState = `Task list: ${JSON.stringify(tasks)}`;
    const [userMessage, newAssistantMessage, response] =
      await actionIt.handleMessagesInput(messages, message, taskState);

    messages.push(userMessage);
    messages.push(newAssistantMessage);

    return res.status(200).send(response);
  } catch (error) {
    console.log("Error in post /send-message, error: ", error);
    return res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
