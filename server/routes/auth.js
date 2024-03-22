//checking the authorisation of admin. 

//If the admin is registered, then the password is checked. If the password is correct, then a token is generated and stored in a cookie. The token is then sent to the client. 
//The client can then use this token to access the protected routes. The token is stored in the cookie with the name token. The cookie is set to be httpOnly and secure. This means that the cookie can only be accessed by the server and not by the client. 
//The cookie is also set to be secure, which means that it can only be accessed over HTTPS. The token is signed using the secret key Admin_key. The token contains the username and role of the admin. The token is then sent to the client as a response. 
//The client can then use this token to access the protected routes. If the admin is not registered, then a message is sent to the client saying that the admin is not registered. 
//If the password is incorrect, then a message is sent to the client saying that the password is incorrect. If the role is not admin, then a message is sent to the client saying that the user is not authorized. If there is an error, then the error is sent to the client.


import express from 'express'
import { Admin } from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post('/login', async (req, res) => {
    try{
        const {username, password, role} = req.body;
        if(role === 'admin'){
            const admin = await Admin.findOne({username})
            if(!admin) {
                return res.json({message: "admin not registered"})
            }
            const validPassword = await bcrypt.compare(password, admin.password)
            if(!validPassword){
                return res.json({message: "wrong password"})
            }
            const token = jwt.sign({username: admin.username, role: 'admin'}, process.env.Admin_key)
            res.cookie('token', token, {httpOnly: true, secure: true})  //we can add time to expire the cookie
            return res.json({login:true, role: 'admin'})
        }  else {
            res.status(209).json("You are not authorized")
        }
    } catch(err){
        res.json(err)
    }
})

export {router as AdminRouter}