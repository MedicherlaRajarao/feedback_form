const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const FeedbackModel = require('./models/Feedback')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee",{
  //useNewUrlparser:true,
  
})
.then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });
app.get('/',(req,res) => {
  res.send('Welcome to API');
})
    


app.post('/login', (req, res) => {
    const {email,password} =req.body;
    EmployeeModel.findOne({email})
    .then(user =>{
        if(user) {
            if(user.password === password) {
                res.json("success")
            } else {
                res.json("password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
    .catch(err => res.status(500).json(err))
})

app.post('/register',async (req, res) => {
    
    try {
        console.log('Register data:', req.body);
        const employee = await EmployeeModel.create(req.body);
        console.log('Response data:', employee);
        res.status(201).json(employee);
      } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
     

})
app.post('/feedback', async (req, res) => {
    try {
      const feedback = await FeedbackModel.create(req.body);
      res.status(201).json(feedback);
    } catch (err) {
      res.status(500).json(err);
    }
})

const PORT =3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});