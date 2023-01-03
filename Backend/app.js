const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const sequelize = require('./util/database')
const userRouter = require('./router/user')
const app = express();
app.use(cors());
app.use(bodyParser.json({extended:false}))


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