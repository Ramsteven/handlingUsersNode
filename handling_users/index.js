const express = require('express');
const app =  express();
const { ROLE, users } = require('./data.js')
const { authUser, authRole } = require('./basicAuth.js')
const projectRouter = require('./routes/projects')


app.use(express.json());
app.use(setUser);
app.use('/projects',projectRouter);


app.get('/', (req, res) => {
    res.send("home page welcome");
})


app.get('/dashboard', authUser, (req, res) => {
    res.send("dasboard page");
})

app.get('/Admin', authUser, authRole(ROLE.ADMIN),(req, res) => {
    res.send("Admin Page");
})


function setUser (req, res , next){
    const userId = req.body.userId
    console.log(userId)
    if(userId){
        req.user = users.find(user => user.id === userId);
        console.log("tambien aca")
    }

    next()
}

app.listen("3000", (req,res)=>{
    console.log("me conecte");
})