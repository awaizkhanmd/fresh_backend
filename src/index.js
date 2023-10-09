import express from "express";
import mongoose from "mongoose";
import os from 'os'
import router from "./routes/routes.js";
import cors from "cors"

import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(cors())

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());


app.use(function (req, res, next) {
    console.log("Middleware called")
    next();
});


app.get('/user', function (req, res) {
    console.log("/user request called");
    res.send('Welcome to GeeksforGeeks');
});
 

export const startServer = async () => {
    try {
        app.use("/",router);


        const port = process.env.PORT;
        const server = app.listen(port, () => {
          const networkInterfaces = os.networkInterfaces();
          const ipAddress = Object.values(networkInterfaces)
            .flatMap(ifaces => ifaces.filter(iface => !iface.internal && iface.family === "IPv4"))
            .map(iface => iface.address)
            .find(Boolean);
    
          console.log(`Server is running on http://localhost:${port}`);
          if (ipAddress) {
            console.log(`Locally connected to: http://${ipAddress}:${port}`);
          } else {
            console.log("Unable to determine server IP address.");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

export const connectToMongoDB = async () => {
    const options = {
      useNewUrlParser: true,
      maxPoolSize: 10,
      useUnifiedTopology: true
    };
  
    const mongoURI = process.env.MONGO_URI 
  
    try {
      await mongoose.connect(mongoURI, options);
      console.log("MongoDB Connected.");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    }
  };
  

  startServer();
  connectToMongoDB();