const Author = require("../Models/Author");
const jwt = require('jsonwebtoken')


const signIn = async (req,res)=>
    {
       try{
           const {email} = req.body;
           const user = await Author.findOne({email})
           console.log(user)

         if(!user)
         {
            return res.status(404).json({success:false,message:"No user found"})
         }

         // Create user token
         const tokenData = {userId:user._id,name:user.name,userName:user.userName,id:user.id,email:user.email,image:user.image,bio:user.bio}
         const accessToken = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'240m'})
         
         res.status(200).json({
            success:true,
            accessToken
         })
        
       }catch(e) 
       {
         console.log(e)
         res.status(500).json({
            success:false,
            message:'Something went wrong. Try again.'
         })
       }
    }

    const signUp = async (req,res)=> 
        {
           try {
            //  extract user information from req bod
            const {name,userName,id,email,image,bio} = req.body
        
            // Check if user already exists
            const userExists = await Author.findOne({email})
            if(userExists)
            {
              return res.status(400).json({
                 success:false,
                 message:'User with account already exists'
               })
            }
    
        
            // create new user
            const data = {name,
                         userName,
                         id,
                         email,
                         image,
                         bio}
        
            const result = await Author.insertOne(data)
            if(result)
            {
                res.status(201).json({
                success:true,
                data:result})
            }
            else
            {
               return res.status(400).json({success:false,message:'Unable to register user'})
            }
        
           }catch(e) 
           {
             console.log(e)
             res.status(500).json({
                success:false,
                message:'Something went wrong during signup. Try again.'
             })
           }
        }
        
module.exports = {signIn,signUp}