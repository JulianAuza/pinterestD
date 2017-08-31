var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PinSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    description: {
        type: String
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId, 
        ref: 'Comment'
    }],
    image: {
        type: String
    },
    url: {
        type: String
    }},
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        }
});

var Pin = mongoose.model('Pin', PinSchema);