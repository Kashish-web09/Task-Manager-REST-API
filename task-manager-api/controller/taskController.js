import fs from 'fs'

const filePath=new URL('../data/tasks.json',import.meta.url);

function readTasks(){
    const data=fs.readFileSync(filePath);
    return JSON.parse(data);
}
function writeTasks(tasks){
    fs.writeFileSync(filePath,JSON.stringify(tasks,null,2));
}
function getAllTasks(req,res){
    const tasks=readTasks();
    res.json(tasks);
};
function getTaskById(req,res){
    const tasks=readTasks();
const id=Number(req.params.id);
const task=tasks.find(task=>task.id===id);
if(!task){
   return res.status(404).send("Task not found");
    
}
   return res.json(task)
}

function createTask(req,res){
    const tasks=readTasks();
const {title}=req.body;
if(!title){
    return res.status(400).send("Title is required")
}
let newId;
if(tasks.length===0){
    newId=1;
}else{
    newId=tasks[tasks.length-1].id+1;
}

let newTask={
    id:newId,
    title:title,
    completed:false
}
tasks.push(newTask);
writeTasks(tasks);
return res.status(201).json(newTask);
}
function updateTask(req,res){
    const tasks=readTasks();
const id=Number(req.params.id);
const task=tasks.find(task=>task.id===id);
if(!task){
    return res.status(404).send("Task not found!");
}
const {title,completed}=req.body;
if(title !== undefined) task.title = title;
if(completed !== undefined) task.completed = completed;
writeTasks(tasks);
return res.json(task);
}
function deleteTask(req,res){
    let tasks=readTasks();
const id=Number(req.params.id);
const index=tasks.findIndex(task=>task.id===id);
if(index===-1){
    return res.status(404).send("Task not found!");
}
tasks.splice(index,1);
writeTasks(tasks);
return res.json({message:"Task deleted successfully"});

}
export {getAllTasks,getTaskById,createTask,updateTask,deleteTask};