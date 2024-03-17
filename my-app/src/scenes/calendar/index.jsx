import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Calendar = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      setTodos([...todos, todoText]);
      setTodoText("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth={400} m="auto">
      <Typography variant="h4" align="center" gutterBottom>
        To-Do List
      </Typography>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Add Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          sx={{ mt: 1 }}
        >
          Add
        </Button>
      </Box>
      {todos.length > 0 ? (
        <List>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText primary={todo} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(index)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" align="center">
          No todos yet. Add some tasks above!
        </Typography>
      )}
    </Box>
  );
};

export default Calendar;
