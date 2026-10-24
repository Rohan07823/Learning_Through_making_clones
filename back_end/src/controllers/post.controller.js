
const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {


    try {
              
         const decodedToken = req.user;
          

        if (!req.file) {  
            return res.status(400).json({
                message: 'Please upload an image'
            });
        }

        const file = await imageKit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                req.file.originalname
            ),
            fileName: req.file.originalname
        });

        const post = await postModel.create({
            imgUrl : file.url,
            userId: decodedToken.id,
            caption: req.body.caption
        })

        return res.status(201).json({
            message: 'Image uploaded successfully',
            file,
            post
        });

    } catch (error) {
        console.error('ImageKit upload error:', error);

        return res.status(500).json({
            message: 'Failed to upload image'
        });
    }
}

async function getAllPostsController(req,res){
    

     const decoded = req.user;
    
     const userId = decoded.id;

     const posts = await postModel.find({ userId });

     return res.status(200).json({
         message: "Posts retrieved successfully",
         posts
     });
     
}

async function getPostDetailsController(req,res){
    
    try{
        
    const decoded = req.user;

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isOwner = post.userId.toString() === userId.toString();
    
    if(!isOwner){
        return res.status(403).json({
            message: "You are not authorized to view this post"
        })
    }

    return res.status(200).json({
        message: "post details retrieved successfully",
        post
    })
}catch(err){
    return res.status(500).json({
        err: err.message,
    })
}


}
module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController
};
