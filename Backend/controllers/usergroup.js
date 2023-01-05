const User = require('../models/user');
const Chat = require('../models/chats');
const Group = require('../models/group');
const Usergroup = require('../models/usergroup');


exports.fetchUsers = async(req,res,next)=>{
    try {
        let groupId = req.params.groupId ;
        // console.log('...........................' , groupId)
        const group = await  Group.findByPk(groupId)
        if(!group){
            return res.status(404).json({message:"no group found"})
        }
        let users = await group.getUsers()
        let data = users.filter(user => user.id != req.user.id)
        return res.status(200).json(data)
    } catch (err) {
        res.status(500).json({err , message: "some error occured" });
    }
}

exports.addUserToGroup = async(req,res,next)=>{
    const {email, groupId} = req.body
    console.log(email , groupId)
    try {
        if(!email || !groupId){
            return res.status(400).json({message:'enter all fields'})
        }
        let user = await User.findOne({where:{email}});
        let group = await Group.findByPk(groupId);
        if(!user || !group){
            return res.status(404).json({message:'User not found'})
        }
   
            const check = await group.hasUser(user);
            console.log(check);
            if(check){
                return res.status(401).json({ message:'user already in group'});
            }
            const data = await group.addUser(user , {through:{isAdmin:false}}) ;
            return res.status(200).json({user , message:'added user to group'});
        
    } catch (error) {
        res.status(500).json({error , message: "some error occured" });
    }
}