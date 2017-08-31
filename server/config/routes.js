var path = require('path');
var users = require('../controllers/users.js');
var pins = require('../controllers/pins.js');
var boards = require('../controllers/boards.js');

module.exports = function (app) {

    app.post('/api/register', function (req, res) {
        users.createUser(req, res);
    })

    app.post('/api/addUserInterest', function (req, res) {
        users.addUserInterest(req, res);
    })
    
    app.post('/api/checkEmail', function (req, res) {
        users.checkEmail(req, res);
    })
    
    app.post('/api/login', function (req, res) {
        users.login(req, res);
    })

    app.get('/api/getCurrentUser', function (req, res) {
        users.getCurrentUser(req, res);
    })

    app.post('/api/grabUserUsingID', function (req, res) {
        users.grabUserUsingID(req, res);
    })

    app.post('/api/imageOptions', function (req, res) {
        console.log("in routes");
        pins.parseImages(req, res);
    })

    app.get('/api/imageGrab', function (req, res) {
        pins.parseImages(req, res);
    })

    app.post('/newBoard', function (req, res) {
        boards.createBoard(req, res);
    })

    app.post('/addBoardWithPin', function (req, res) {
        boards.addBoardWithPin(req, res);
    })

    app.post('/showBoards', function (req, res){
        boards.show(req,res);
    });

     app.post('/deleteBoard', function (req, res) {
        boards.delete(req, res);
    })

    app.get('/api/boards', function (req, res) {
        users.getBoards(req, res);
    })

    app.post('/api/createPin', function (req, res) {
        pins.create(req, res);
    })

    app.post('/addToBoard', function (req, res) {
        boards.addToBoard(req, res);
    })

    app.get('/api/pins', function (req, res) {
        pins.grab(req, res);
    });

    app.post('/api/retrieveUserPins', function (req, res) {
        pins.retrieveUserPins(req, res);
    });

    app.post('/api/singlepin', function (req, res) {
        pins.one(req, res);
    });

    app.post('/api/grabUserPins', function (req, res) {
        users.grabUserPins(req, res);
    })

    app.post('/api/follow', function (req, res) {
        users.follow(req, res);
    })

    app.post('/api/unfollow', function (req, res) {
        users.unfollow(req, res);
    })
    
    app.get('/api/logout', function (req, res){
        users.logout(req, res);
    })

    app.post('/api/removePin', function (req, res) {
        pins.removePin(req, res);
    })

    app.post('/api/viewingBoard', function (req, res) {
        boards.grabMyBoard(req, res);
    })

    app.all('*', function (req, res) {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })

}
