require('dotenv').config();
const express=require('express');
const app=express();
const path = require('path');

const cors = require('cors');
const bodyParser = require('body-parser');




const User=require('./models/user');
const Message = require('./models/message');
const Forgotpassword = require('./models/password');
const Group = require('./models/group');
const Groupuser = require('./models/groupuser');



User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User, {through: Groupuser});
User.belongsToMany(Group, {through: Groupuser});

Group.hasMany(Message);
Message.belongsTo(Group);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User)



const userroutes=require('./routes/user');
const passwordroutes=require('./routes/password');
const messageroutes=require('./routes/message');
const chatroutes=require('./routes/chat');
const adminroutes=require('./routes/admin');




app.use(cors());
app.use(bodyParser.json());



app.use('/user',userroutes);
app.use('/password',passwordroutes)
app.use('/message',messageroutes)
app.use('/chat',chatroutes)
app.use('/admin',adminroutes)




const sequelize=require('./util/database');
sequelize.sync();
app.listen(4000,()=>{
    console.log('server started at port 4000');
});