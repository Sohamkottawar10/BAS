//checking the authorisation of admin. 

//If the admin is registered, then the password is checked. If the password is correct, then a token is generated and stored in a cookie. The token is then sent to the client. 
//The client can then use this token to access the protected routes. The token is stored in the cookie with the name token. The cookie is set to be httpOnly and secure. This means that the cookie can only be accessed by the server and not by the client. 
//The cookie is also set to be secure, which means that it can only be accessed over HTTPS. The token is signed using the secret key Admin_key. The token contains the username and role of the admin. The token is then sent to the client as a response. 
//The client can then use this token to access the protected routes. If the admin is not registered, then a message is sent to the client saying that the admin is not registered. 
//If the password is incorrect, then a message is sent to the client saying that the password is incorrect. If the role is not admin, then a message is sent to the client saying that the user is not authorized. If there is an error, then the error is sent to the client.


import express from 'express'
import { Admin } from '../models/Admin.js';
import { Student} from '../models/Student.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'


const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password, role} = req.body;
        if(role === 'admin'){
            const admin = await Admin.findOne({username})
            if(!admin) {
                return res.status(400).json({message: "admin not registered"})
            }
            const validPassword = await bcrypt.compare(password, admin.password)
            if(!validPassword){
                return res.status(401).json({message: "wrong password"})

            }
            const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_key)
            res.cookie('token', token, {httpOnly: true, secure: true})  //we can add time to expire the cookie
            return res.json({login:true, role: 'admin'})
        }   else if(role === 'student') {
                const student = await Student.findOne({username})
                if(!student) {
                    return res.status(400).json({message: "student not registered"})
                }   
                const validPassword = await bcrypt.compare(password, student.password)
                if(!validPassword){
                    return res.status(401).json({message: "wrong password"})
                }
                const token = jwt.sign({username: student.username, role: 'student'}, process.env.Student_key)  //process.env.Student_key this is the secret key used to sign the token
                res.cookie('token', token, {httpOnly: true, secure: true})
                return res.json({login:true, role: 'student'})   
        }
        else {
            console.log("role is : " + {role})
            return res.status(209).json({message: "You are not authorized"})
        }
    } catch(err){
        res.json(err)
    }
})


//this below code will ensure that only admin can access the protected routes(i.e. to add the students), add verifyAdmin as a middleware to the routes that you want to protect.In student.js
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json("Invalid Admin")
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {   //decoded is an object containing the username and role of the admin
            if(err) {
                return res.status(403).json("You are not authorized")
            } else {
                req.username = decoded.username;
                req.role = decoded.role
                next()      //next is a function, it will continue the execution of the code, if the user is authorized. 
            }
            
        })
    }
}

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json("Invalid User")
    } else {
        jwt.verify(token, process.env.Admin_key, (err, decoded) => {   //decoded is an object containing the username and role of the admin
            if(err) {
                jwt.verify(token, process.env.Student_key, (err, decoded) => {   //decoded is an object containing the username and role of the admin
                    if(err) {
                        return res.status(403).json("You are not authorized")
                    } else {
                        req.username = decoded.username;
                        req.role = decoded.role
                        next()      //next is a function, it will continue the execution of the code, if the user is authorized. 
                    }
                    
                })
            } else {
                req.username = decoded.username;
                req.role = decoded.role
                next()      //next is a function, it will continue the execution of the code, if the user is authorized. 
            }
            
        })
    }
}


router.get('/verify', verifyUser, (req, res) => {
    res.json({login: true, role: req.role})
})


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({logout: true})
})

export {router as AdminRouter, verifyAdmin}