const express = require("express");
const router = express.Router();


const {signUp,login,logout,userController, updateAssistant, geminiResponse} = require("../Controller/auth");
const {authenticate} = require("../middleware/authentication");

router.post("/signup",signUp);
router.post("/login",login);
router.get("/logout",logout)
router.get("/user",authenticate,userController);
router.put("/update",authenticate,updateAssistant);
router.get("/update",authenticate,logout);
router.post("/gemini",authenticate,geminiResponse)



module.exports= router;