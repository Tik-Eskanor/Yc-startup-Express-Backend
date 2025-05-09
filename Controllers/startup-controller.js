const Startup = require('../Models/Startup')


const createStartup = async (req,res)=>
{
    try {
         const data = req.body
         const result = await Startup.insertOne(data)
        if(!result)
        {
            return res.status(500).json({
                success:false,
                message:"Unable to save data"
            })
        }
        res.status(201).json({
            success:true,
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


const getStartups = async (req,res)=>
    {
        try {
            const result = await Startup.find({}).populate('author')

            res.status(200).json({
                success:true,
                data:result
            })
        }catch(e) 
        {
            console.log(e)
            res.status(500).json({
                success:false,
                message:'something went wrong'
            })
            
        }
    }

 const search = async (req,res)=>
    {
        try {
            const queryParam = req.query.query
            const result = await Startup.find(
                {$or: [
                    { title: { $regex: queryParam, $options: 'i' } }, // Case-insensitive
                    { description: { $regex: queryParam, $options: 'i' } },
                    { category: { $regex: queryParam, $options: 'i' } },
                    { 'author.name': { $regex: queryParam, $options: 'i' } },
                    { 'author.userName': { $regex: queryParam, $options: 'i' } },
                    ],}
                ).populate('author')
            
            res.status(201).json({
                success:true,
                data:result
            })
        }catch(e) 
        {
            console.log(e)
            res.status(500).json({
                success:false,
                message:'something went wrong'
            })
            
        }
    }
   
const getStartup = async (req,res)=>
    {
        try {
            const id = req.params.id

            const result = await Startup.findById(id).populate('author')
            if(!result)
            {
             return res.status(404).json({
                    success:true,
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
                message:'something went wrong from get startup'
            })
            
        }
    }


const updateViews = async (req,res)=>
    {
        try {
             const id = req.params.id

            if(!id)
            {
                return res.status(403).json({
                    success:false,
                    message:"Error: No id"
                })
            }

             const result = await Startup.findOneAndUpdate(
                { _id: id }, // Filter to find the document
                { $inc: { views: 1 } }, // Increment views by 1
                { new: true } // Return the updated document
             )

            if(!result)
            {
                return res.status(500).json({
                    success:false,
                    message:"Unable to update data"
                })
            }

            res.status(201).json({
                success:true
            })

        }catch(e) 
        {
            console.log(e)
            res.status(500).json({
                success:false,
                message:'something went wrong'
            })
            
        }
    }


module.exports = {createStartup,getStartups,getStartup,search,updateViews}