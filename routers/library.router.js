import express from "express"
import { addBook, borrowBook, getAllBooks, getAllBorrowedBooks, getAllMembers, registerMember, returnBook } from "../controllers/library.controller.js";

const router = express.Router();

router.post("/books", addBook);
router.post("/members",registerMember);

router.post("/borrow/:bookId",borrowBook);
router.put("/return/:borrowId",returnBook);

router.get("/books",getAllBooks)
router.get("/borrowed",getAllBorrowedBooks)
router.get("/members",getAllMembers)



export default router