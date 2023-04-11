import express from "express";
import mongoose from "mongoose";

import BlogModel from "../models/blogModel.js";

const router = express.Router();

export const getBlogs = async (req, res) => {
  // const { page } = req.query;

  try {
    const blogs = await BlogModel.find();
    res.json({ data: blogs });
    // const LIMIT = 10;
    // const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    // const total = await BlogModel.countDocuments({});
    // const blogs = await BlogModel.find()
    //   .sort({ _id: -1 })
    //   .limit(LIMIT)
    //   .skip(startIndex);

    // res.json({
    //   data: blogs,
    //   currentPage: Number(page),
    //   numberOfPages: Math.ceil(total / LIMIT),
    // });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const blog = req.body;

  const newBlogModel = new BlogModel({
    ...blog,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBlogModel.save();

    res.status(201).json(newBlogModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// export const getBlogsBySearch = async (req, res) => {
//   const { searchQuery } = req.query;

//   try {
//     const title = new RegExp(searchQuery, "i");

//     const blogs = await BlogModel.find({
//       $or: [{ title }, { tags: { $in: tags.split(",") } }],
//     });

//     res.json({ data: blogs });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
