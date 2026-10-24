const followModel = require('../models/follow.model')
const userModel = require('../models/user.model')

async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername){
        return res.status(403).json({
            message: "you can not follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(200).json({
            message: `user ${followeeUsername} does not exists`
        })
    }

    const isAlreadyFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollow){
        return res.status(200).json({
            message: `you already follow him ${followeeUsername}`
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })  

    return res.status(200).json({
        message: `you are now foolowing ${followeeUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController(req,res){
    try{
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const doesFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!doesFollow){
        return res.status(409).json({
            message: `you does not follow ${followeeUsername}`
        })
    }

    const unfollowData = await followModel.findOneAndDelete({
        follower:followerUsername,
        followee:followeeUsername
    })

    return res.status(200).json({
        message:`you successfully unfollowed ${followeeUsername}`
    })
}catch(err){
    return res.status(401).json({
        message: "error",
        err: err.message
    })
}
}

module.exports = {
    followUserController,
    unfollowUserController
}