import React, { useState } from "react";
import { Box, Text, Badge, Select } from "@chakra-ui/react";

function Task({ id, title, status, onChangeStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    onChangeStatus(newStatus, id);
  };

  let color = "yellow";

  if (status === "in-progress") {
    color = "blue";
  } else if (status === "complete") {
    color = "green";
  }

  return (
    <Box key={id} bg="white" p={2} mb={2} borderRadius={4}>
      <Text>{title}</Text>
      <Select
        value={selectedStatus}
        onChange={handleStatusChange}
        mt={2}
        mb={2}
        size="sm"
        colorScheme={color}
        variant="outline"
      >
        <option value="backlog">Backlog</option>
        <option value="in-progress">In Progress</option>
        <option value="complete">Complete</option>
      </Select>
    </Box>
  );
}

export default Task;
