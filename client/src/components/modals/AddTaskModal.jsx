import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("backlog");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAddTask = () => {
    if (title !== "") {
      onAddTask({ title, status });
      setTitle("");
      setStatus("backlog");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={handleTitleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={handleStatusChange}>
              <option value="backlog">Backlog</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAddTask}>
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddTaskModal;
