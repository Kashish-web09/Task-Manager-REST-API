
import express from 'express';
import {getAllTasks,getTaskById,createTask,updateTask,deleteTask} from '../controller/taskController.js'
const routes=express.Router();
routes.post('/',createTask)
routes.get('/',getAllTasks);
routes.get('/:id',getTaskById);
routes.put('/:id',updateTask)
routes.delete('/:id',deleteTask)

export default routes;