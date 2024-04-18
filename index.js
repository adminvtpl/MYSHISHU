const express = require('express')
const mysql = require('mysql');
const app =express();
const db= require('./config/db')
const phpass = require('phpass');

const hasher = new phpass.PasswordHash();
let connection = mysql.createConnection({
    host: '13.126.173.67',
    database: 'myshishuadmin_myshishu',
    user: 'myshishuadmin_myshishu',
    password: 'sumit@123',
    
   
   
  });

const port =9000
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello");
}

)

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to mysql database of myshishu as id ' + connection.threadId);
});
app.post('/api/mysql/users', (req, res) => {
  // Extract data from the request body
  const { username, email, password , name  } = req.body;

  // Hash the password
  const hashedPassword = hasherHashPassword(password);

  connection.query('INSERT INTO wp_users (user_login, user_pass, user_email , user_nicename , display_name , user_registered) VALUES (?, ?, ?,?,?,?)', [username, hashedPassword, email, name , name,"2024-11-25 07:01:08"], (error, results, fields) => {
    if (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    res.status(201).send('Data inserted successfully');
  });
});

app.post('/api/mysql/users/signin', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM wp_users WHERE user_email = ?', [email], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).send('Error querying database');
      return;
    }

    if (results.length === 0) {
      // User not found
      res.status(401).send({msg :'Invalid email' ,success : false  });
      return;
    }

    const user = results[0];
    console.log(user);
    const hasher = new phpass.PasswordHash();

    if (!hasher.checkPassword(password, user.user_pass)) {
      // Passwords do not match
      res.status(401).send({msg : 'Invalid email or password' , success : true , data : user });
      return;
    }

    // Passwords match, sign-in successful
    console.log('Sign-in successful');
    res.status(200).send({msg : 'Sign-in successful' , data : user , success : true });
  });
});

function hasherHashPassword(password) {
  return hasher.hashPassword(password); // Hash the password
}
app.use("/uploads",express.static("uploads"));
app.use("/user",require('./routes/userRoutes'));
app.use("/api",require('./routes/appRoutes'));
app.use("/profile",require('./routes/profileRoutes'));
app.use("/blogposts",require('./routes/blogpostRoute'));
app.use("/feedback",require('./routes/feedbackRoute'));
app.use("/likes",require('./routes/likeRoutes'));
app.use("/todo",require('./routes/toDoRoutes'));
app.use("/blogview",require('./routes/viewRoutes'));
app.use("/Event",require('./routes/eventRoute'));
app.use("/emergency",require('./routes/emergencyRoute'));
app.use("/medicals",require('./routes/medicalinfoRoutes'));
app.use("/child",require('./routes/child_sleepRoutes'));
app.use("/milestones",require('./routes/milestonesRoute'));
app.use("/pay",require('./routes/paymentRoutes'));
app.use("/courseCart",require('./routes/cartRoutes'));
app.use("/appVersion",require('./routes/appVersionRoutes'));
app.use("/ChildMemories",require('./routes/memoriesRoutes'));
app.use("/courseLikes",require('./routes/courseLikeRoutes'));
app.use("/saveImage",require('./routes/imageSaveRoutes'));
app.use("/childAge",require('./routes/childAgeRoutes'));
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
 })




