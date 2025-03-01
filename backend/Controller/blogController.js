const Blog = require("../Modals/BlogModel");

const addBlog = async (req, res) => {
    try {
      const newBlog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.file ? req.file.path : null,
        userId: req.params.id,
      });
      res.json({
        status: "success",
        message: "Blog added successfully.",
        newBlog: newBlog,
      });
    } catch (error) {
      res.status(500).json({
        status: "failure",
        message: `Blog entry not added  ${error}`,
      });
    }
  };
  
  const myBlogs = async (req,res) =>{
    const myBlog = await Blog.find({"userId": req.params.id}).sort({created:-1});
    try{
      res.status(200).json(myBlog);
    }catch(error){
      res.status(500).json({
        status:"failure",
        message:`Data cannot be fetched. ${error}`
      });
    }
  }
  
  const updateBlog = async (req,res) =>{
    try{
      const updateData = {
        title: req.body.title,
        content: req.body.content
      };
      if(req.file){
        updateData.imageUrl = req.file.path
      }
       // console.log("I am calling this from update blog controller:",req.params.id)
      await Blog.findByIdAndUpdate(req.params.id,updateData,{new: true});
      res.status(200).json({
        status: "success",
        message: "Blog updated."
      });
    }catch(error){
      res.status(500).json({
        status: "failure",
        message: `Couldn't update the blog please retry. ${error}`
      });
    }
  }
  
  const deleteBlog = async (req,res) =>{
    try{
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "Success",
        message: "entry deleted"
      });
    } catch(error){
      res.status(500).json({
        status: "failure",
        message: `cannot able to delete the blog. ${error}`
      })
    }
  }
  
  const getAllBlogs = async (req,res) =>{
    const allBlogs = await Blog.find({}).sort({createdAt: -1});
    res.json(allBlogs);
  }

  const getSingleBlog = async (req,res) =>{
    try{
        const id = req.params.id;
        const singleBlog = await Blog.findById({_id:id})
        res.json(singleBlog);
    }catch(error){
        res.status(500).json({
            status: "failure",
            message: `Data cannot be fetched. ${error}`
        });
    }
  }

  module.exports = {myBlogs, addBlog, updateBlog, deleteBlog, getAllBlogs, getSingleBlog}