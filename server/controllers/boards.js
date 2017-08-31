var mongoose = require('mongoose');
var Board = mongoose.model('Board');
var User = mongoose.model('User')

module.exports = {
    createBoard: function (req, res) {
        
        User.findOne({ _id: req.body._userid }, function (err, creator) {
            if (err) {
                console.log(err)
            }
            else {
                var board = new Board({
                    name: req.body.name,
                    _owner: creator._id,
                    _pins: [],
                });
            
                board.save(function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        res.json({});
                    }
                })
            }
        })

    },

    addBoardWithPin: function (req, res) {
        User.findOne({_id: req.body.owner._id}, function(err, user){
            if(err){
                console.log(err);
            }
            else{
                console.log(user);
                var board = new Board({
                    name: req.body.boardName,
                    _owner: user._id,
                    _pins: [req.body.pin],
                });
                board.save(function (error, board) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(board);
                        res.json(board);
                    }
                })
            }
        })
    },

    show: function (req, res) {
        Board.find({_owner: req.body._id}, function (err, items) {
            if (err) {
                console.log(err)
            } else {
                res.json(items)
            }
        })
    },
    delete:function(req,res){
        Board.remove({_id:req.body.board.content},function(err,item){
            if(err){
                console.log(err);
            } else {
                res.json([]);
            }
        })
    },
         
    addToBoard:function(req,res){
        Board.findOne({_id: req.body.boardid}, function (err, board) {
            if (err) {
                console.log(err)
            }
            else {
                board._pins.push(req.body.postid);
                board.save(function (error) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        User.findOne({_id: board._owner}, function(err, user){
                            if(err) {
                                console.log(err);
                            } else {
                                user.pins.push(req.body.postid);
                                user.save(function(err){
                                    if(err){
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

    grabMyBoard: function(req,res){
        Board.findOne({_id: req.body._id}, function(err,board){
            if(err){
                console.log(err);
            } else {
                res.json(board);
            }
        })
    }
} 