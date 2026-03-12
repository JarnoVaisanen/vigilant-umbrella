"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Paper,
  CircularProgress,
  Divider,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ef5350",
    },
    background: {
      default: "#1a1a1a",
      paper: "#2a2a2a",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== "") {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask }),
      });
      const created = await res.json();
      setTasks((t) => [...t, created]);
      setNewTask("");
    }
  }

  async function deleteTask(index) {
    const task = tasks[index];
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task._id }),
    });
    setTasks(tasks.filter((_, i) => i !== index));
  }

  async function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1: tasks[index]._id,
          text1: tasks[index].text,
          id2: tasks[index - 1]._id,
          text2: tasks[index - 1].text,
        }),
      });
      setTasks(updatedTasks);
    }
  }

  async function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1: tasks[index]._id,
          text1: tasks[index].text,
          id2: tasks[index + 1]._id,
          text2: tasks[index + 1].text,
        }),
      });
      setTasks(updatedTasks);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          To-Do List
        </Typography>

        <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Kirjoita tehtävä..."
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTask}
            startIcon={<AddTaskIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            Lisää
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && tasks.length === 0 && (
          <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
            Ei tehtäviä. Lisää ensimmäinen tehtävä!
          </Typography>
        )}

        <Paper elevation={3}>
          <List disablePadding>
            {tasks.map((task, index) => (
              <Fade in key={task._id?.toString() || index}>
                <Box>
                  <ListItem
                    sx={{ py: 1.5, px: 2 }}
                    secondaryAction={
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => moveTaskUp(index)}
                          disabled={index === 0}
                          color="info"
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => moveTaskDown(index)}
                          disabled={index === tasks.length - 1}
                          color="info"
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => deleteTask(index)}
                          color="secondary"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={task.text}
                      primaryTypographyProps={{ fontSize: "1rem" }}
                    />
                  </ListItem>
                  {index < tasks.length - 1 && <Divider />}
                </Box>
              </Fade>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
