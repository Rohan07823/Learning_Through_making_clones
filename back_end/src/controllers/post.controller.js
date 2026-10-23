
const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {


    try {
        console.log(req.body, req.file);

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "unauthorized access"
            })
        }
        try{
                 const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                 console.log(decodedToken);
        }catch(err){
            return res.status(401).json({
                message: "unauthorized access"
            })
        }
   
        

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

module.exports = {
    createPostController
};
