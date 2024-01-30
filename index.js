const express = require('express')
const app =express();
const db= require('./config/db')

const port =9000
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello");
}

)
app.use("/uploads",express.static("uploads"));
app.use("/user",require('./routes/userRoutes'));
app.use("/api",require('./routes/appRoutes'));
app.use("/profile",require('./routes/profileRoutes'));
app.use("/blogposts",require('./routes/blogpostRoute'));
app.use("/feedback",require('./routes/feedbackRoute'));
app.use("/likes",require('./routes/likeRoutes'));
app.use("/todo",require('./routes/toDoRoutes'));
app.use("/blogview",require('./routes/viewRoutes'));
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
 })




