var mongoose = require('mongoose');
var Schema = mongoose.Schema

var BoardSchema = new mongoose.Schema({
    _owner: {type: Schema.Types.ObjectId, ref: 'User'},
    _pins:[{type: Schema.Types.ObjectId, ref: 'Pin'}],
    name: {
        type: String,
        required: [true, "Name field must be filled out"],
        trim: true,
    },
});

var Board = mongoose.model('Board', BoardSchema);