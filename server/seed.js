import express from 'express'
import bcrypt from 'bcrypt'
import Admin from './models/Admin.js'
import './db.js'

async function AdminAccount(){
    try {
        const adminCount = await Admin.countDocuments()
        if(adminCount === 0) {
            const hashPassword = await bcrypt.hash('adminpassword', 10)
            const newAddmin = new Admin({
                username: 'admin',
                password: hashPassword
            })
            await newAddmin.save()
            console.log("account created")
        } else {
            console.log("Account already exists!! ")
        }
    } catch(err) {
        console.log("error")
    }
}

AdminAccount()

