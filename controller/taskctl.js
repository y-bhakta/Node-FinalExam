import Task from "../models/taskmodel.js";
import User from "../models/usermodel.js";

const taskCtl = {
    async addTaskPage(req, res) {
        try {
            const users = await User.find({});
            return res.render('./pages/AddTask.ejs',{ users });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/AddTask.ejs',{ users: [] });
        }
    },
    async addTask(req, res) {
        try {
            await Task.create(req.body);
            return res.redirect('/viewTasks');
        } catch (error) {
            console.log(error.message);
            return res.redirect(req.get('Referer') || '/');
        }
    },
    async viewTasksPage(req, res) {
        try {
            const tasks = await Task.find({}).populate('assignTo');
            return res.render('./pages/ViewTasks.ejs',{ tasks });
        } catch (error) {
            console.log(error.message);
            return res.render('./pages/ViewTasks.ejs',{ tasks: [] });
        }
    },
    async MyTasksPage(req,res){
        try {
            let {id}=req.params;
            let mytasks=await Task.find({assignTo:id}).populate('assignTo');
            let completesTasks=mytasks.filter(t=>t.status==="Completed");
            let inProgressTasks=mytasks.filter(t=>t.status==="In Progress");
            let pendingTasks=mytasks.filter(t=>t.status==="Pending");
            return res.render('./pages/MyTasks.ejs',{completesTasks,inProgressTasks,pendingTasks});
        } catch (error) {
            console.log(error);
            return res.render('./pages/MyTasks.ejs',{completesTasks:[],inProgressTasks:[],pendingTasks:[]});
        }
    },
    async MarkTaskCompleted(req,res){
        try {
            let {id}=req.params;
            let task=await Task.findByIdAndUpdate(id,{status:"Completed"});
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async deleteTask(req,res){
        try {
            let {id}=req.params;
            await Task.findByIdAndDelete(id);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async edittaskpage(req,res){
        try {
            let {id}=req.params;
            let task=await Task.findById(id);
            const users = await User.find({});
            return res.render('./pages/EditTask.ejs',{task,users});
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async edittask(req,res){
        try {
            let {id}=req.params;
            await Task.findByIdAndUpdate(id,req.body);
            return res.redirect('/viewTasks');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    }
}

export default taskCtl;