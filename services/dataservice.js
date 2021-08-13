var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = {};
var userModel;
var mcdSchema = {};
var mcdModel;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/usersDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                userSchema = schema({
                    username: String,
                    password: String,
                    email: String,
                    phone: Number,
                    token: String,
                    point: Number,
                });

                mcdSchema = schema({
                    bigmac: String,
                    filletofish: String,
                    mcspicy: String,
                    happymeal: String,
                    doublecheeseburger: String,
                    username: String,
                    time: String,
                    rating: Number,
                    mode: String

                });
                kfcSchema = schema({
                    doubledownburger: String,
                    ricebucket: String,
                    twopcschicken: String,
                    shroom: String,
                    snacker: String,
                    username: String,
                    time: String,
                    rating: Number,
                    mode: String

                });
                bkSchema = schema({
                    taro: String,
                    whopper: String,
                    swiss: String,
                    onion: String,
                    tender: String,
                    username: String,
                    time: String,
                    rating: Number,
                    mode: String
                });
                promoSchema = schema({

                    wagyu: String,
                });

                favouriteSchema = schema({
                    restaurants: String,
                    username: String,
                });

                var connection = mongoose.connection;
                userModel = connection.model('users', userSchema);
                mcdModel = connection.model('mcds', mcdSchema);
                kfcModel = connection.model('kfcs', kfcSchema);
                bkModel = connection.model('bks', bkSchema);
                promoModel = connection.model('promotion', promoSchema);
                favouriteModel = connection.model('favourite', favouriteSchema)
            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    login: function (u, p, callback) {
        userModel.findOne({ username: u, password: p }, callback);
    },
    signup: function (u, p, e, ph, po, callback) {
        var newUser = new userModel({
            username: u,
            password: p,
            email: e,
            phone: ph,
            point: po
        });
        newUser.save(callback);
    },

    addfavouritemcd: function (u, callback) {
        var addFav = new favouriteModel({
            restaurants: "Macdonald",
            username: u
        });
        addFav.save(callback);
    },

    addfavouritekfc: function (u, callback) {
        var addFav = new favouriteModel({
            restaurants: "KFC",
            username: u
        });
        addFav.save(callback);
    },

    addfavouritebks: function (u, callback) {
        var addFav = new favouriteModel({
            restaurants: "Burger King",
            username: u
        });
        addFav.save(callback);
    },

    searchuserinfav: function (u, callback) {
        favouriteModel.findOne({ username: u }, callback);
    },

    viewfav: function (u, callback) {
        favouriteModel.findOne({ username: u }, callback);
    },

    // userModel.save({ username: u, password: p, email: e, phone: ph }, callback);

    updateToken: function (id, token, callback) {
        userModel.findByIdAndUpdate(id, { token: token }, callback);
    },
    checkToken: function (token, callback) {
        userModel.findOne({ token: token }, callback);
    },
    removeToken: function (id, callback) {
        userModel.findByIdAndUpdate(id, { $unset: { token: 1 } }, callback);
    },
    updatePoint: function (id, point, callback) {
        console.log(point);
        userModel.findByIdAndUpdate(id, { point: point }, callback);
    },

    addcart: function (b, f, m, h, d, u, ti, ra, de, callback) {
        var newMcd = new mcdModel({
            bigmac: b,
            filletofish: f,
            mcspicy: m,
            happymeal: h,
            doublecheeseburger: d,
            username: u,
            time: ti,
            rating: ra,
            mode: de
        });
        newMcd.save(callback);
    },

    addcart1: function (d, r, t, sh, s, u, ti, ra, de, callback) {
        var newKfc = new kfcModel({
            doubledownburger: d,
            ricebucket: r,
            twopcschicken: t,
            shroom: sh,
            snacker: s,
            username: u,
            time: ti,
            rating: ra,
            mode: de,
        });
        newKfc.save(callback);
    },

    addcart2: function (ta, w, s, o, t, u, ti, ra, de, callback) {
        var newBk = new bkModel({
            taro: ta,
            whopper: w,
            swiss: s,
            onion: o,
            tender: t,
            username: u,
            time: ti,
            rating: ra,
            mode: de
        });
        newBk.save(callback);
    },

    deleteUser: function (u, callback) {
        userModel.deleteMany({ username: u }, callback);
    },

    updateUser: function (id, e, ph, p, callback) {
        var updatedUser = {
            email: e,
            phone: ph,
            password: p
        };
        userModel.findByIdAndUpdate(id, updatedUser, callback);
        // userModel.findOneAndUpdate({ username: username }, callback);
    },


    // ordersrating: function (id, rating, callback) {
    //     mcdModel.aggregate(id, { rating: rating }, callback)
    // },

    ordersrating: function (callback) {


        mcdModel.find({}, callback);

    },
    ordersrating1: function (callback) {


        kfcModel.find({}, callback);

    },
    ordersrating2: function (callback) {


        bkModel.find({}, callback);

    },

    addpromo: function (callback) {
        var newPromo = new promoModel({


            wagyu: "1",
        });
        newPromo.save(callback);
    },

    //view cart
    viewcartkfc: function (username, callback) {

        kfcModel.find({ username: username }, callback);


    },

    viewcartmcd: function (username, callback) {

        mcdModel.find({ username: username }, callback);


    },

    viewcartbks: function (username, callback) {


        bkModel.find({ username: username }, callback);

    },

    //view history
    viewhistorykfc: function (username, callback) {

        kfcModel.find({ username: username }, callback);


    },

    viewhistorymcd: function (username, callback) {

        mcdModel.find({ username: username }, callback);


    },

    viewhistorybks: function (username, callback) {


        bkModel.find({ username: username }, callback);

    },

};

module.exports = database;