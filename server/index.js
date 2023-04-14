const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3001;
const tasks = [];

app.get("/tasks", (req, res) => {
  console.log("get /tasks");
  try {
    console.log(tasks);
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
  console.log;
  const { title, status } = req.body;

  try {
    tasks.push({ title, status, id: tasks.length + 1 });

    return res.status(200).json({ id: tasks.length });
  } catch (error) {
    console.log("Error in post /add-task, error: ", error);
    return res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
