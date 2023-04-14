import { Flex, Box, Heading, Text, Badge, Button } from "@chakra-ui/react";
import Task from "./Task";
import { useEffect, useState } from "react";
import AddTaskModal from "../modals/AddTaskModal";
import axios from "axios";

const TaskBoard = () => {
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    axios
      .get("http://localhost:3001/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();

    const intervalId = setInterval(() => {
      getTasks();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const onChangeStatus = (newStatus, taskId) => {
    axios
      .patch("http://localhost:3001/update-task", {
        id: taskId,
        newStatus,
      })
      .catch((error) => {
        console.log(error);
      });

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onAddTask = ({ title, status }) => {
    axios
      .post("http://localhost:3001/add-task", {
        title,
        status,
      })
      .then((res) => {
        const newTasks = [
          ...tasks,
          {
            id: res.data.id,
            title,
            status,
          },
        ];

        setTasks(newTasks);
      });
  };

  return (
    <>
      <AddTaskModal
        isOpen={addTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onAddTask={onAddTask}
      />
      <Flex
        flexWrap={{ base: "wrap", md: "nowrap" }}
        justifyContent="space-between"
        width="100%"
        minHeight={"400px"}
      >
        <Box
          width={{ base: "100%", md: "33%" }}
          bg="yellow.200"
          p={4}
          mb={{ base: 2, md: 0 }}
        >
          <Heading as="h2" size="md" mb={4}>
            Backlog
          </Heading>
          {tasks
            .filter((task) => task.status === "backlog")
            .map((task) => (
              <Task
                key={task.id}
                onChangeStatus={onChangeStatus}
                id={task.id}
                title={task.title}
                status={task.status}
              />
            ))}
        </Box>
        <Box
          width={{ base: "100%", md: "33%" }}
          bg="blue.200"
          p={4}
          mb={{ base: 2, md: 0 }}
          ml={{ base: 0, md: 2 }}
        >
          <Heading as="h2" size="md" mb={4}>
            In Progress
          </Heading>
          {tasks
            .filter((task) => task.status === "in-progress")
            .map((task) => (
              <Task
                key={task.id}
                onChangeStatus={onChangeStatus}
                id={task.id}
                title={task.title}
                status={task.status}
              />
            ))}
        </Box>
        <Box
          width={{ base: "100%", md: "33%" }}
          bg="green.200"
          p={4}
          mb={{ base: 2, md: 0 }}
          ml={{ base: 0, md: 2 }}
        >
          <Heading as="h2" size="md" mb={4}>
            Complete
          </Heading>
          {tasks
            .filter((task) => task.status === "complete")
            .map((task) => (
              <Task
                key={task.id}
                onChangeStatus={onChangeStatus}
                id={task.id}
                title={task.title}
                status={task.status}
              />
            ))}
        </Box>
      </Flex>

      <Flex w={"full"} alignItems={"center"} justifyContent={"center"} mt={12}>
        <Button
          size={"lg"}
          colorScheme="purple"
          onClick={() => setAddTaskModalOpen(true)}
        >
          Add Task
        </Button>
      </Flex>
    </>
  );
};

export default TaskBoard;
