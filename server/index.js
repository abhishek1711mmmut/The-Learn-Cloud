const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const TodoModel=require('./Models/Todo')

const app=express()
app.use(cors())
app.use(express.json())

const dotenv=require('dotenv');
dotenv.config();

const PORT=process.env.PORT || 4000;
const MONGODB_URL=process.env.MONGODB_URL;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})

mongoose.connect(MONGODB_URL)
.then(console.log("DB Connected Successfully"))
.catch(err=>console.log("Error in connecting database"))

app.get('/get', (req, res)=>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req, res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndUpdate(id,{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/add', (req, res)=>{
    const task=req.body.task;
    TodoModel.create({
        task:task
    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id', (req, res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post('/swap', async(req, res)=>{
    try {
        const {firstTask, secondTask}=req.body;
        const task1=await TodoModel.findById(firstTask._id);
        task1.task=secondTask.task;
        await task1.save()
        const task2=await TodoModel.findById(secondTask._id);
        task2.task=firstTask.task;
        await task2.save();
    } catch (error) {
        console.log(error)
    }
})