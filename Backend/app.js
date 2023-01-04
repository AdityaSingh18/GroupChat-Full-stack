const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
require('dotenv').config()
const sequelize = require('./util/database')
const userRouter = require('./router/user')
const Chat = require('./models/chats')
const User = require('./models/user')
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


app.use('/user',userRouter)



sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log('running now')
    })
})

.catch(err=>{
    console.log(err)
})