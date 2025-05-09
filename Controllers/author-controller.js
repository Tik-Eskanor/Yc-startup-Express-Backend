const Author = require('../Models/Author')
const Startup = require("../Models/Startup")

const createAuthor = async (req,res)=>
{
    try {
        const data = req.body
        const result = await Author.insertOne(data)
        if(!result)
        {
            return res.status(500).json({
                success:false,
                message:"Unable to save data"
            })
        }
        res.status(201).json({
            success:false,
            data:result
        })
    } catch(e) 
    {
        console.log(e)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
        
    }
}

const getAuthor = async (req,res)=>
    {
        try {
            const id = req.params.id

            const result = await Author.findById(id)
            if(!result)
            {
             return res.status(404).json({
                    success:false,
                    message:"No author found"
                })
            }
            res.status(200).json({
                success:true,
                data:result
            })
        }catch(e) 
        {
            console.log(e)
            res.status(500).json({
                success:false,
                message:'something went wrong from get author'
            })
            
        }
    }

const getAuthorStartups = async (req,res)=>
    {
        try {
            const id = req.params.id

            const result = await Startup.find({author:id}).populate('author')

            if(!result)
            {
                return res.status(404).json({
                    success:false,
                    message:"No post found"
                })
            }
            res.status(200).json({
                success:true,
                data:result
            })
        }catch(e) 
        {
            console.log(e)
            res.status(500).json({
                success:false,
                message:'something went wrong from get author'
            })
            
        }
    }

module.exports = {createAuthor,getAuthor,getAuthorStartups}