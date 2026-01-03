import bcrypt from "bcrypt";
import Usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const userctl={
    async getallusers(req,res){
        try {
            const user=await Usermodel.find({});
            return res.json(user);
        } catch (error) {
            return res.json(error);
        }
    },
    async createuser(req,res){
        try {
            req.body.password=await bcrypt.hash(req.body.password,10);
            await Usermodel.create(req.body); 
            return res.redirect('/login');
        } catch (error) {
            console.log(error);
            return res.redirect('/addperson');
        }
    },
    async getoneuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findById(id);
            return res.json(user);
        } catch (error) {
            return res.json(error);
        }
    },
    async deleteuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findByIdAndDelete(id);
            return res.redirect(req.get('Referrer') || '/');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async updateuser(req,res){
        try {
            const {id}=req.params;
            const user=await Usermodel.findByIdAndUpdate(id,req.body);
            return res.redirect('/view-employee');
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    async loginuser(req,res){
        try {
            const {email,password}=req.body;
            let user=await Usermodel.findOne({email});
            if(!user){
                console.log("user not found");                
                return res.redirect(req.get('Referre')||'/');
            }
            const isValid=await bcrypt.compare(password,user.password);
            if(!isValid){
                console.log('Invaid Credentials !');                
                return res.redirect(req.get('Referre')||'/');
            }
            let payload={
                userId:user._id,
                Role:user.role
            };
            const token=jwt.sign(payload,"myTokenKey");
            res.cookie('token',token);
            return res.redirect('/');
        } catch (error) {
            console.log(error);            
            return res.redirect(req.get('Referre')||'/');
        }
    },
    logout(req,res){
        return res.clearCookie("token").json({message:"Logout Successful !"});
    }
}

export default userctl;