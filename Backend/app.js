const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
require('dotenv').config()
const sequelize = require('./util/database')
const userRouter = require('./router/user')
const Chat = require('./models/chats')
const User = require('./models/user')
const Group= require('./models/group')
const UserGroup = require('./models/usergroup');
const groupRouter = require('./router/group');
const messageRouter = require('./router/message');
const app = express();
/*app.use(cors({
    origin:"*",
    credentials:true,
    
}))
*/
app.use(cors())

app.use(bodyParser.json({extended:false}))

Chat.belongsTo(User);
User.hasMany(Chat);
Group.hasMany(Chat);
Chat.belongsTo(Group);

User.belongsToMany(Group , {through: UserGroup} )
Group.belongsToMany(User , {through: UserGroup} )

app.use('/user',userRouter)
app.use('/group',groupRouter)
app.use('/message' , messageRouter)



sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('running now')
    })
})

.catch(err=>{
    console.log(err)
})