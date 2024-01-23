import express from "express";
const router = express.Router();
import {createData, getUserData, updateData, deleteData, sendMail} from "../controller/crud.js"

router.post("/user", createData);
router.get("/user", getUserData);
router.put("/user/:id",updateData);
router.delete("/user/:id", deleteData);
router.post("/user/send", sendMail);

export default router;