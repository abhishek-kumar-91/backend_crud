import Crud from "../models/crud.js"
import nodemailer from "nodemailer"

export const createData = async(req, res) => {
    const {name, email, phoneNumber, hobbies} = req.body;

    try{
        const oldUser = await Crud.findOne({email});
        if(oldUser){
            return res.status(404).json({message: "User already exist"});
        }

        const result = await Crud.create({
            name, email, phoneNumber, hobbies
        })

        res.status(201).json({result, message: "User Data Created"})
    }catch(err){
        res.status(500).json({message: "Something went wrong"});
        console.log(err);
    }
}

export const getUserData = async(req, res) =>{
    try{
        const result = await Crud.find();

        if(result != 0){
           return res.status(200).json(result)
        }else{
            return res.json({message: "Data empty"})
        }
        
    }catch(err){
        console.log("Error from fetching data", err);
    }
}


export const updateData = async(req, res) => {
    const userId = req.params.id;
    const {name, email, phoneNumber, hobbies} = req.body;
    try{
       const updateUserData = await Crud.findByIdAndUpdate(userId, {
        name,
        email,
        phoneNumber,
        hobbies
       }, {new: true});

       if (!updateUserData) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(201).json(updateUserData);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
        console.log("Error from update data",err);
    }
}


//delete controller

export const deleteData = async(req, res) => {
    const userId = req.params.id;
    try{
        const userDeleted = await Crud.findByIdAndDelete(userId);

        if(!userDeleted){
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });

    }catch(err){
        res.status(500).json({message: "Internal server error"});
        console.log("Error from delete data",err);
    }
}

//send data to mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abhishekkumar958830@gmail.com',
      pass: 'mfsc veqq atiu dusq',
    },
  
    
  });

export const sendMail = async(req, res) =>{
    const { to, subject, text } = req.body;
    const mailOptions = {
    from: 'abhishekkumar958830@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ success: 'Email sent successfully' });
    }
  });
}