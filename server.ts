import  express ,{ Request, Response } from "express";
import  configuration  from "./app/config/config.load";
const db = require("./app/models/models/index.js")
const listEndpoints = require('express-list-endpoints');
import Router from './app/routes/auth.routes'; 

const app= express();

//Parse Json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('jwt-secret-key', 'this is jwt sceret key'); // jwt secret token

app.use(Router);

// Authenticate the database connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

app.get("/",(req: Request,res: Response)=>{
    res.json({
        message: "hello this is a typescript api"
    })
})

// Set port, listen for requests
const PORT: number = Number(process.env.PORT) || configuration.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});