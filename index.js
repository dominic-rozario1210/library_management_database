import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import libraryRouter from "./routers/library.router.js"
import connectDB from "./database/dbConfig.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.status(200).json({
        message:"Welcome to library management system API",
        basePath:"/api/library",
        endpoints:{
            addBook:{method:"POST", pathway:"/api/library/books"},
            getAllBooks:{method:"GET",pathway:"/api/library/books"},
            registerMember:{method:"POST", pathway:"/api/library/members"},
            getAllMembers:{method:"GET", pathway:"/api/library/members"},
            borrowBook:{method:"POST",pathway:"/api/library/borrow/:bookId"},
            returnBook:{method:"PUT", pathway:"/api/library/return/:borrowId"},
            getAllBorrowedBooks:{method:"GET",pathway:"./api/library/borrowed"}
        }
    })
})

app.use("/api/library",libraryRouter);

connectDB();

app.listen(process.env.PORT,() => {
    console.log("app started")
})
