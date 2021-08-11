var express = require('express');
var crypto = require('crypto');
var db = require('./services/dataservice.js');

db.connect();

var routes = function () {
    var router = require('express').Router();

    router.use(express.urlencoded({
        extended: true
    }));

    router.use(function (req, res, next) { //Middleware code, executed on every HTTP request
        //if it is api request, then check for valid token
        if (req.url.includes("/api")) {
            //first time use req.query
            var token = req.query.token; //get token from query. if not defined, means no token
            if (token == undefined) {
                res.status(401).send("No tokens are provided");
            } else {
                db.checkToken(token, function (err, user) {
                    if (err || user == null) {
                        res.status(401).send("Invalid token provided");
                    } else {
                        //using next() means to proceed on with the HTTP request processing
                        res.locals.user = user;
                        next();
                    }
                });
            }
        } else { //means any other url, no need to check for auth 
            //means proceed on with the request.
            next();
        }
    })


    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/login3.html");
    });


    router.get('/sign_up', function (req, res) {
        res.sendFile(__dirname + "/views/register.html");

    });

    router.get('/signup', function (req, res) {
        res.sendFile(__dirname + "/views/signup_success.html");
    });

    router.get('/restaurants', function (req, res) {
        res.sendFile(__dirname + "/views/restaurants.html");
    });

    router.get('/macdonald', function (req, res) {
        res.sendFile(__dirname + "/views/macdonald.html");
    });

    router.get('/kfc', function (req, res) {
        res.sendFile(__dirname + "/views/kfc.html");
    });

    router.get('/burgerking', function (req, res) {
        res.sendFile(__dirname + "/views/burgerking.html");
    });

    router.get('/login', function (req, res) {
        res.sendFile(__dirname + "/views/login3.html");
    });

    router.get('/promotion', function (req, res) {
        res.sendFile(__dirname + "/views/promotion.html");
    });

    router.get('/member', function (req, res) {
        res.sendFile(__dirname + "/views/member.html");
    });

    router.get('/cart', function (req, res) {
        res.sendFile(__dirname + "/views/cart.html");
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + "/views/" + req.originalUrl);
    });

    router.get('/images/*', function (req, res) {
        res.sendFile(__dirname + "/" + req.originalUrl);
    });

    router.get('/profile', function (req, res) {
        res.sendFile(__dirname + "/views/profile.html");
    });


    router.post('/login', function (req, res) {
        var data = req.body; // get form data from the HTTP body
        db.login(data.username, data.password, function (err, user) {
            if (err) {
                // if error in server side, we send error 500.
                res.status(500).send("Login unsuccessful due to server error.");
            } else {
                if (user == null) {
                    // if the returned user object is null (i.e. cannot login)
                    res.status(401).send("Login unsucessful. Please try again later.");
                } else {
                    var strToHash = user.username + Date.now();
                    var token = crypto.createHash('md5').update(strToHash).digest('hex');
                    db.updateToken(user._id, token, function (err, user) {
                        res.status(200).json({ 'message': 'Login successful.', 'token': token, 'username': user.username, 'point': user.point });
                    });
                    // res.sendFile(__dirname + "/views/restaurants.html");
                }
            }
        })
    })

    router.get("/logout", function (req, res) {
        var token = req.query.token;
        if (token == undefined) {
            res.status(401).send("No tokens are provided");
        } else {
            db.checkToken(token, function (err, user) {
                if (err || user == null) {
                    res.status(401).send("Invalid token provided");
                } else {
                    db.removeToken(user._id, function (err, user) {
                        res.status(200).send("Logout successfully")
                    });
                }
            })
        }
    })

    router.post("/api/items", function (req, res) {
        //simulate add item to db
        res.status(200).send("Item added successfully.");
    })

    // router.post("/api/carts", function (req, res) {
    //     //simulate add item to db
    //     res.status(200).send([
    //         {
    //             "name": "item1",
    //             "price": "$1"
    //         },
    //         {
    //             "name": "item2",
    //             "price": "$2"
    //         }
    //     ]);
    // })

    router.post("/api/carts", function (req, res) {
        //simulate add item to db
        var pointz;
        var data = req.body; // get form data from the HTTP body
        // console.log(data.bigmac + data.filletofish + data.mcspicy + data.happymeal + data.doublecheeseburger);
        db.addcart(data.bigmac, data.filletofish, data.mcspicy, data.happymeal, data.doublecheeseburger, data.username, data.time, data.rating, function (err, cart) {
            if (err) {
                res.status(500).send("Unable to add to cart");
            } else {
                db.updatePoint(res.locals.user._id, data.point, function (err, user) {
                    console.log("routes" + data.point);
                    pointz = data.point;
                });
                if (data.rating == null) {
                    console.log("rating is null");
                } else {
                    db.ordersrating(function (err, records) {

                        var sum = 0;
                        for (var i = 0; i < records.length; i++) {

                            sum = sum + records[i].rating;
                        }
                        var avg = sum / records.length;
                        res.status(200).json({ 'message': 'Update successful.', 'rating': avg.toFixed(2), 'point': pointz });
                    });
                }
                //{ $match: { status: "A" } },
                // { $group: { _id: "$_id", rating: { $avg: "$rating" } } }
                // )
                // res.status(200).send(cart);
            }

        })
    })

    router.post("/api/carts1", function (req, res) {
        var point1;
        //simulate add item to db
        var data = req.body; // get form data from the HTTP body
        // console.log(data.bigmac + data.filletofish + data.mcspicy + data.happymeal + data.doublecheeseburger);
        db.addcart1(data.doubledownburger, data.ricebucket, data.twopcschicken, data.shroom, data.snacker, data.username, data.time, data.rating, function (err, cart) {
            if (err) {
                res.status(500).send("Unable to add to cart");
            } else {
                db.updatePoint(res.locals.user._id, data.point, function (err, user) {
                    console.log("routes" + data.point);
                    point1 = data.point;
                });
                if (data.rating == null) {
                    console.log("rating is null");
                } else {
                    db.ordersrating1(function (err, records) {

                        var sum = 0;
                        for (var i = 0; i < records.length; i++) {

                            sum = sum + records[i].rating;
                        }
                        var avg = sum / records.length;
                        res.status(200).json({ 'message': 'Update successful.', 'rating': avg.toFixed(2), 'point': point1 });
                    });
                }
                //{ $match: { status: "A" } },
                // { $group: { _id: "$_id", rating: { $avg: "$rating" } } }
                // )
                // res.status(200).send(cart);
            }

        })

    })

    router.post("/api/carts2", function (req, res) {
        var point2;
        //simulate add item to db
        var data = req.body; // get form data from the HTTP body
        // console.log(data.bigmac + data.filletofish + data.mcspicy + data.happymeal + data.doublecheeseburger);
        db.addcart2(data.taro, data.whopper, data.swiss, data.onion, data.tender, data.username, data.time, data.rating, function (err, cart) {
            if (err) {
                res.status(500).send("Unable to add to cart");
            } else {
                db.updatePoint(res.locals.user._id, data.point, function (err, user) {
                    console.log("routes" + data.point);
                    point2 = data.point;
                });
                if (data.rating == null) {
                    console.log("rating is null");
                } else {
                    db.ordersrating2(function (err, records) {

                        var sum = 0;
                        for (var i = 0; i < records.length; i++) {

                            sum = sum + records[i].rating;
                        }
                        var avg = sum / records.length;
                        res.status(200).json({ 'message': 'Update successful.', 'rating': avg.toFixed(2), 'point': point2 });
                    });
                }
                //{ $match: { status: "A" } },
                // { $group: { _id: "$_id", rating: { $avg: "$rating" } } }
                // )
                // res.status(200).send(cart);
            }
        })

    })

    router.post("/api/viewcart", function (req, res) {
        //simulate add item to db

        var data = req.body; // get form data from the HTTP body
        // console.log(data.bigmac + data.filletofish + data.mcspicy + data.happymeal + data.doublecheeseburger);
        db.viewcart(data.username, function (err, cart) {
            console.log(cart);
            console.log(cart.bigmac);
            if (err) {
                res.status(500).send("Unable to view cart");
            } else {

                res.status(200).json({ 'cart': cart });
            }
        })
    })


    router.get("/api/items", function (req, res) {
        //simulate retrieve items from db
        res.status(200).send([
            {
                "name": "item1",
                "price": "$1"
            },
            {
                "name": "item2",
                "price": "$2"
            }
        ])
    })

    router.post('/sign', function (req, res) {
        // var name = req.body.name;
        // var email = req.body.email;
        // var pass = req.body.password;
        // var phone = req.body.phone;

        var data = req.body; // get form data from the HTTP body
        console.log(data.username + data.password + data.email + data.phone + data.point);
        db.signup(data.username, data.password, data.email, data.phone, data.point, function (err, user) {
            if (err) throw err;
            console.log("Record inserted Successfully");

        });

        return res.redirect('/signup');
    })
    router.delete('/api/users/:username', function (req, res) {
        var username = req.params.username;
        console.log(username);

        db.deleteUser(username, function (err, users) {
            if (err) {
                res.status(500).send("Unable to delete user");
            } else {
                if (users == null || users.n == 0) {
                    res.status(200).send("No users were deleted");
                } else {
                    res.status(200).send("User " + " is deleted");
                }
            }
        })

    });

    //edit user
    router.put('/api/users', function (req, res) {
        var data = req.body;
        db.updateUser(data.id, data.email, data.phone, data.password, function (err, user) {
            // if (err) {
            //     res.status(500).send("Unable to update account");
            // } else {
            //     if (users == null) {
            //         res.status(200).send("Account is not updated");
            //     } else {
            //         res.status(200).send(user);
            //     }
            // }
            res.end();
        });
    });

    router.post("/api/promotion", function (req, res) {
        //simulate add item to db
        var data = req.body; // get form data from the HTTP body
        // console.log(data.bigmac + data.filletofish + data.mcspicy + data.happymeal + data.doublecheeseburger);
        db.addpromo(function (err, cart) {
            if (err) {
                res.status(500).send("Unable to add to cart");
            } else {
                db.updatePoint(res.locals.user._id, data.point, function (err, user) {
                    console.log("routes" + data.point);
                    res.status(200).json({ 'message': 'Update successful.', 'point': data.point });
                });
                // if (data.rating == null) {
                //     console.log("rating is null");
                // } else {
                //     db.ordersrating(res.locals.user._id, data.rating, function (err, cart) {
                //         console.log("it Worked!");
                //         res.status(200).json({ 'message': 'Update successful.', 'rating': data.rating });
                //     });
                // }
                //{ $match: { status: "A" } },
                // { $group: { _id: "$_id", rating: { $avg: "$rating" } } }
                // )
                // res.status(200).send(cart);
            }

        })
    })

    return router;
};

module.exports = routes();
