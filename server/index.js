require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
//Routers imports
const Auth = require("./routes/authRoutes");
const User = require("./routes/userRoutes");
const Projects = require("./routes/ProjectsRoutes");
const Tasks = require("./routes/TasksRoutes");
const cookieParser = require("cookie-parser");
const {authenticateUser} = require("./middleware/authMiddleware");


//config
const app = express();
const port = process.env.PORT;

//middleware
app.use (cookieParser())
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(errorHandlerMiddleware);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.log(err);
  });

//example route
app.get('/api/test',(req,res)=>{ res.json({msg:"it is working"})})


// routes
app.use("/api/auth", Auth);
app.use("/api/project",authenticateUser, Projects);
app.use("/api/user",authenticateUser, User);
app.use("/api/task",authenticateUser, Tasks);
