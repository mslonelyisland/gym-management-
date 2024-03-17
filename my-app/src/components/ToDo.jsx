import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,useTheme } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { tokens } from "../theme";

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
    <Box width="60%" m="20px 0px 20px 40px">
      <Typography variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}>
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

export default ToDo;
