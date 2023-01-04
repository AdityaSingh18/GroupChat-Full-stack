const User = require('../models/user');
const Chat = require('../models/chats');

exports.postMessage = async(req,res,next)=>{
    const {message} = req.body;
    console.log(req.user)
    try {
        console.log(message)
        if(!message){
            return res.status(400).json({message:'nothing entered'})
        }
        const data = await req.user.createChat({message})
        const name = req.user.name
       
        
        const arr = []
        const details = {
            id :data.id ,
            name:req.user.name ,
            message:data.message,
            createdAt:data.createdAt
        }
        arr.push(details);
        res.status(201).json({arr , message:'sucessfully added chat message'})
    } catch (err) {
        res.status(500).json({message:'unable to add chat'+err})
    }
}

exports.getMessage = async(req,res,next)=>{

    try {
        let userId = req.user.id
        console.log(userId)
    
        const data = await Chat.findAll({where:{userId}});

       
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message:'unable to get chats'+error})
    }
    
    
} 