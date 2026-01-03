import { Router } from "express";
import clientctl from "../controller/clientctl.js";
import checkClientAuth from "../middlewares/clientAuth.js";
import upload from "../middlewares/upload.js";
import taskCtl from "../controller/taskctl.js";
import userctl from "../controller/userctl.js";

const clientrout=Router();

//Login ROute
clientrout.get('/addperson',clientctl.signuppage);
clientrout.post('/addPerson',userctl.createuser);
clientrout.get('/login',clientctl.loginpage);
clientrout.post('/login',userctl.loginuser);
clientrout.get('/logout',clientctl.logout);

clientrout.use(checkClientAuth);
// Dashboard Route
clientrout.get('/',clientctl.dashboard);
clientrout.get('/addPerson',clientctl.addPersonPage);
clientrout.get('/delete/:id',userctl.deleteuser);
clientrout.get('/edit/:id',clientctl.addPersonPage);
clientrout.post('/edit/:id',userctl.updateuser);
clientrout.get('/view-employee',clientctl.viewemp);
clientrout.get('/changepassword',clientctl.changePasswordPage);
clientrout.post('/changepassword',clientctl.changePassword);
clientrout.get('/profile',clientctl.profile);
clientrout.get('/edit-profile',clientctl.editprofilepage);
clientrout.post('/edit-profile', upload, clientctl.editprofile);
// Task routes
clientrout.get('/addTask', taskCtl.addTaskPage);
clientrout.post('/addTask', taskCtl.addTask);
clientrout.get('/viewTasks', taskCtl.viewTasksPage);
// My Tasks
clientrout.get('/my-tasks/:id',taskCtl.MyTasksPage);
// mark Task Completed
clientrout.get('/task/:id/complete',taskCtl.MarkTaskCompleted);
// Delete Task
clientrout.get('/delete/task/:id',taskCtl.deleteTask);
clientrout.get('/edit/task/:id',taskCtl.edittaskpage);
clientrout.post('/edit/task/:id',taskCtl.edittask);
export default clientrout;