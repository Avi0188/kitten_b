const { Router } = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ err: "User already registered" });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).send({ err: err.message });
            }
            const newUser = new userModel({
                email,
                name,
                password: hash
            });
            await newUser.save();
            return res.status(201).send("Registered successfully");
        });
    } catch (error) {
        return res.status(500).send({ err: error.message });
    }
});


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ err:"User not found" });
        }
        else{
            bcrypt.compare(password, user.password, async(err, data)=>{
                try {
                    if(data){
                        const token = jwt.sign({userId:user._id}, "masai")
                        return res.status(200).send({msg:"Login successful", token})
                    }
                } catch (error) {
                    res.status(400).send({error:error.message})
                }
            })
        }

       
    } catch (error) {
        return res.status(500).send({ err: error.message });
    }
});


module.exports = userRouter;
