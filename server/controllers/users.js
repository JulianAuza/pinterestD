var mongoose = require('mongoose');
var User = mongoose.model('User');
var Board = mongoose.model('Board');
var Pin = mongoose.model('Pin');
var currentUser

module.exports = {
    createUser: function (req, res) {
        var user = new User({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            followers: [],
            following: [],
            email: req.body.email,            
            interests: [],
            password: req.body.password, 
        });
        var myBoard = new Board();
        myBoard.name = "My Likes";
        myBoard._owner = user;
        user.boards.push(myBoard);
        myBoard.save(function (err){
            user.save(function (err, user) {
                if (err) {
                    res.json(err);
                } else {
                    currentUser = user.email;
                    console.log(currentUser);
                    res.json(user);
                }
            });
        });
    },
    addUserInterest: function (req, res) {
        User.findOne({email: currentUser}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                for(var k=0;k<req.body.interest.length;k++){
                    user.interests.push(req.body.interest[k])
                }
                user.save(function (err, user) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        })
    }, 
    checkEmail: function (req, res) {
        User.find({email: req.body.email}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                res.json(user);                
            }
        })
    },
    login: function (req, res) {
        User.find({email: req.body.email}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                currentUser = req.body.email
                res.json(user);
            }
        })
    }, 
    getCurrentUser: function(req, res) {
        User.findOne({email: currentUser}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                res.json(user);
            }
        })
    },
    grabUserUsingID: function(req, res) {
        User.findOne({_id: req.body.userID}, function(err, user){
            if(err){
                console.log(err)
            }
            else{
                res.json(user);
            }
        })
    },
    getBoards: function(req,res){
        User.findOne({email: currentUser}, function(err, user){
            if (err) {
                console.log(err);
            } else {
                Board.find({_owner: user._id}, function(err, boards){
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json(boards);
                    }
                });
            }
        })
    },
    grabUserPins: function(req, res) {
        User.findOne({email: req.body.email}).populate('pins').exec(function(err, user){
            if(err){
                console.log(err)
            }
            else{
                res.json(user);  
                }
            });
        },

    follow: function(req,res){
        User.findOne({_id : req.body.follower._id}, function(err, follower){
            if(err){
                console.log(err);
            } else {
                User.findOne({_id : req.body.followee._id}, function(err, followee){
                    if(err){
                        console.log(err);
                    } else {
                        follower.following.push(followee);
                        followee.followers.push(follower);
                        console.log("inside follow");
                        follower.save(function(err){
                            followee.save(function(err){
                                if (err){
                                    console.log(err);
                                } else {
                                    res.json({});
                                }
                            })
                        })
                    }
                })
            }
        })
    },

    unfollow: function(req,res){
        User.findOne({_id : req.body.follower._id}, function(err, follower){
            if(err){
                console.log(err);
            } else {
                User.findOne({_id : req.body.followee._id}, function(err, followee){
                    if(err){
                        console.log(err);
                    } else {
                        var posX = follower.following.indexOf(followee._id);
                        follower.following.splice(posX, 1);
                        var posY = followee.followers.indexOf(follower._id);
                        console.log("inside unfollow", posY);
                        followee.followers.splice(posY, 1);
                        follower.save(function(err){
                            if(err){
                                console.log(err);
                            } else {
                                followee.save(function(err){
                                    if (err){
                                        console.log(err);
                                    } else {
                                        res.json({});
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    logout: function(req, res) {
        currentUser = {}
        res.json([]);
    }
}    