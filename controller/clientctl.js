import bcrypt from "bcrypt";
import Usermodel from "../models/usermodel.js";
import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const clientctl={
    // dasboard
    async dashboard(req,res){
        try {
            let totalUsers=await Usermodel.countDocuments();
            let totalAdmin=await Usermodel.countDocuments({role:"Admin"});
            let totalEmployees=await Usermodel.countDocuments({role:"Employee"});
            return res.render('./index.ejs',{
                totalUsers,
                totalAdmin,
                totalEmployees
            });
        } catch (error) {
            return res.render('./index.ejs',{
                totalUsers:0,
                totalManagers:0,
                totalEmployees:0
            });
        }
    },
    // login page
    loginpage(req,res){
        return res.render('./pages/login.ejs');
    },
    //logout
    logout(req,res){
        return res.clearCookie('token').redirect('/login');
    },
    //Adding The Manager And Employee By Admin Only
    async addPersonPage(req,res){
        try {
            let {id}=req.params;
            let oneuser=await Usermodel.findById(id);
            return res.render('./pages/editPerson.ejs',{manager:oneuser});
        } catch (error) {
            
        }
    },
    // Edit Person Page
    async editpersonpage(req,res){
        try {
            let {id}=req.params;
            let userone=await Usermodel.findById(id);
            return res.render('./pages/editPerson.ejs',{userone});
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    // Change Password
    changePasswordPage(req,res){
        return res.render('./pages/changePassword.ejs');
    },
    async changePassword(req,res){
        try {
            const { currentPassword, newPassword, confirmPassword } = req.body;
            const { token } = req.cookies;
            let decoded=jwt.verify(token,"myTokenKey");
            let user=await Usermodel.findById(decoded.userId);
            let isValid = await bcrypt.compare(currentPassword, user.password);
            if (isValid) {
                if (newPassword == confirmPassword) {
                    user.password = await bcrypt.hash(newPassword, 10);
                    await user.save();
                    return res.redirect('/logout');
                } else {
                    console.log('error', 'new password and confirm password not match');
                    return res.redirect('/changepassword');
                }
            } else {
                console.log('error', 'Current Password Not Match');
                return res.redirect('/changepassword');
            }
        } catch (error) {
            console.log(error);
            return res.redirect('/changepassword');
        }
    },
    profile(req, res) {
        return res.render('./pages/profilepage.ejs');
    },
    editprofilepage(req, res) {
        return res.render('./pages/editprofilepage.ejs');
    },
    async editprofile(req, res) {
        try {
            let oneuser = res.locals.user;
            const updateData = { ...req.body };
            if (req.file) {
                updateData.image = `uploads/${req.file.filename}`;
                console.log(`[editprofile] Image uploaded: ${updateData.image}`);
            } else {
                console.log('[editprofile] No file received from multer');
            }
            let dbuser = await Usermodel.findByIdAndUpdate(oneuser.id, updateData, { new: true });
            console.log(`[editprofile] User updated. Image field in DB: ${dbuser.image}`);
            return res.redirect('/profile');
        } catch (error) {
            console.error('[editprofile] Error:', error);
            return res.redirect('/edit-profile');
        }
    },
    async viewemp(req,res){
        try {
            let user=await Usermodel.find({});
            let Emp=user.filter((u)=>u.role==="Employee");
            res.render('./pages/viewEmployee.ejs',{Emp});
        } catch (error) {
            console.log(error);
            return res.redirect(req.get('Referrer') || '/');
        }
    },
    // Signup Page
    signuppage(req,res){
        return res.render('./pages/signup.ejs');
    }
};

export default clientctl;