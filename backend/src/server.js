import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import connectDB from "./utils/db.js";
import router from "./routes/auth.routes.js";
import taskRouter from "./routes/todo.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 7002;

app.use("/api/auth",router);
app.use("/api/task",taskRouter)

connectDB();

app.listen(port,()=>{
    console.log(`SERVER STARTED AT: ${port}`);
})