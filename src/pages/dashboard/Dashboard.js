import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@mui/material";

import Todo from "../todo/Todo";

import { useSelector, useDispatch } from "react-redux";
import { appSelector } from "../../redux/appRedux";

const Dashboard = () => {
  const todo = useSelector(appSelector.todo);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="Tareas Completadas" />
          <CardContent>
            <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
              {todo.filter((t) => t.completed).length} de {todo.length}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ textAlign: "center" }}>
          <CardHeader title="Tareas Pendientes" />
          <CardContent>
            <Box sx={{ fontWeight: "bold", fontSize: "h6.fontSize" }}>
              {todo.filter((t) => !t.completed).length} de {todo.length}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box>Dashboard</Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Dashboard;
