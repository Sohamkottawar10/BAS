//Registering the student/customer, adding data in the database.
import express from 'express'
import { Student } from '../models/Student.js';
import bcrypt from 'bcrypt'
const router = express.Router();

router.post('/register', async(req, res) => {
    try{
        const {name, username, password} = req.body;    //destructuring the entered values.
        const student = await Student.findOne({username})
        if(student){
            return res.json({message : "Already Registered"})
        }   //check if else statement should be added or not.
        const hashPassword = await bcrypt.hash(password, 10)
        const newStudent = new Student({
            name: name,
            username: username,
            password: hashPassword,
        })
        await newStudent.save()
        return res.json({registered: true})

    } catch(err) {
        return res.json
    }
})

export {router as studentRouter}