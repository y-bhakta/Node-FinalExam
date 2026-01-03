import { Router } from "express";
import adminctl from "../controller/adminctl.js";

const adminrout=Router();

adminrout.get('/',adminctl.dashboard);

export default adminrout;