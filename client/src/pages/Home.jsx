import React from "react";
import TaskBoard from "../components/tasks/TaskBoard";

function Home() {
  return (
    <div className="p-12">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Agent Task!</h1>
        <h2 className="text-xl font-bold">
          An example of using actionit to interact with your application!
        </h2>
      </div>

      <div className="w-full mt-12">
        <TaskBoard />
      </div>
    </div>
  );
}

export default Home;
