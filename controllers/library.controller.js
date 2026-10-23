import express from "express"
import Book from "../database/models/book.schema.js";
import Member from "../database/models/member.schema.js";
import BorrowRecord from "../database/models/borrowRecord.schema.js";


let bookIdCounter = 2;
let memberIdCounter = 2;
let borrowIdCounter = 1;

export const addBook = async(req, res) => {
    try {
        const { title, author, category, totalCopies } = req.body;

        const newBook = await Book.create({
            title,
            author,
            category,
            totalCopies,
            availableCopies:totalCopies

        });

        res.status(200).json({
            message: "book added successfully",
            book: newBook
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const registerMember = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const newMember = await Member.create({
            name,
            email,
            phone
        })

        res.status(200).json({
            message: "member added successfully",
            member: newMember
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const borrowBook = async (req, res) => {
    try {
        const {bookId} = req.params;
        const { memberId,borrowDate,returnDate} = req.body;

        const book = await Book.findById(bookId);

        if(!book){
            res.status(404).json({message:"Book not found"});
        }

        const member = await Member.findById(memberId);

        if (!member){
            res.status(404).json({message:"Member not found"});
        }

        if(book.availableCopies <= 0){
            res.status(400).json({message:"No copies Available for borrowing"})
        }
        book.availableCopies -= 1;
        await book.save();

        const newRecord = await BorrowRecord.create({
            bookId,
            memberId,
            borrowDate,
            returnDate
        })
    
        
        res.status(200).json({
            message:"book successfully borrowed",
            borrowedBook:newRecord
        })


    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const returnBook = async (req,res) =>{
    try {
        const {borrowId} = req.params;

        const record = await BorrowRecord.findById(borrowId);

        if(!record){
            res.status(404).json({message:"Borrow record not found"})
        }
        if(record.status === "returned"){
            res.status(400).json({message:"book has already returned"})
        }

        const book = await Book.findById(record.bookId)

        if(book){
            book.availableCopies ++;
            await book.save();
        }

        record.status = "returned";
        await record.save();

        res.status(200).json({
            message:"book returned successfully",
            borrowRecord:record
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllBooks = async (req,res) => {
    const books = await Book.find(); // new
    res.status(200).json({total:books.length,books})
}

export const getAllBorrowedBooks = async (req,res) =>{

    try {
        const records = await BorrowRecord.aggregate([
            {
                $lookup:{
                    from:"books",
                    localField:"bookId",
                    foreignField:"_id",
                    as:"book"
                }
            },
            {
                $lookup:{
                    from:"members",
                    localField:"memberId",
                    foreignField:"_id",
                    as:"member"
                }
            },
            {
                $unwind:"$book"
            },
            {
                $unwind:"$member"
            },
            {
                $project:{
                    _id:0,
                    borrowId:"$_id",
                    bookTitle:"$book.title",
                    memberName:"$member.name",
                    borrowDate:{
                        $dateToString:{
                            format:"%m-%m-%d",
                            date:"$borrowDate"
                        }
                    },
                    returnDate:{
                        $dateToString:{
                            format:"%Y-%m-%d",
                            date:"$returnDate"
                        }
                    },
                    returnStatus:"$status"
                }
            }
        
        ]);

        res.status(200).json({
            total:records.length,
            records
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getAllMembers = async(req,res) => {
    const members = await Member.find();
    res.status(200).json({total:members.length,members})
}