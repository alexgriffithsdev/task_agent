import React, { useEffect, useState } from "react";
import TaskBoard from "../components/tasks/TaskBoard";
import Chat from "../components/chat/Chat";
import axios from "axios";

function Home() {
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

  return (
    <div className="p-12 relative">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Agent Task!</h1>
        <h2 className="text-xl font-bold">
          An example of using actionit to interact with your application!
        </h2>
      </div>

      <div className="w-full mt-12">
        <TaskBoard tasks={tasks} setTasks={setTasks} />
      </div>

      <div className="fixed right-10 bottom-10">
        <Chat getTasks={getTasks} />
      </div>
    </div>
  );
}

export default Home;
