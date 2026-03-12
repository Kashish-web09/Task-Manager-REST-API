import express from 'express';
import taskRoutes from './task-manager-api/routes/taskRoutes.js';
const server=express();
server.use(express.json());
server.use('/api/tasks',taskRoutes);

server.listen(3000,()=>{
    console.log("Server is running at: http://localhost:3000")
});