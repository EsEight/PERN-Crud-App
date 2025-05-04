import express, { urlencoded } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)
app.use(tasksRoutes)

app.listen(3000)

console.log("Server on port 3000")