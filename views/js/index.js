$(document).ready(function () { // you can also use $(function() {}, it is the same
    var token = sessionStorage.authToken;

    // if token is not found, show only unprotected section 
    if (token == undefined) {
        $(".protectedSection").hide();
        $(".unprotectedSection").show();
    } else {  // show the protected section
        $(".protectedSection").show();
        $(".unprotectedSection").hide();
    }

    $(".logoutBtn").click(function () {
        $.ajax({
            url: "/logout?token=" + sessionStorage.authToken,
            method: "get"
        })
            .done(function (data) {
                sessionStorage.removeItem("authToken");
                location.reload();
            })
            .fail(function (err) {
                console.log(err.responseText);
            })
    });


});

function login() {  // This function is to be put OUTSIDE the $(document).ready() codes
    var credentials = {
        // get values from the username and password textboxes
        username: $("#username").val(),
        password: $("#password").val()
    }
    $.ajax({  // we make a connection to our login web API to perform a login request
        url: "/login",
        method: "post",
        data: credentials
    })
        .done(function (data) { // if response indicates a successful login
            $(".statusMessage").text(data.message);

            //stores the token returned from the server, if successful login
            sessionStorage.authToken = data.token;
            sessionStorage.username = data.username;
            sessionStorage.point = data.point;
            location.href = '/restaurants';
        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
}

//macdonald
function addcart() {
    sessionStorage.point = (parseInt(sessionStorage.point) + 10) + "";
    var cart = {
        bigmac: $("#myNumber1").val(),
        filletofish: $("#myNumber2").val(),
        mcspicy: $("#myNumber3").val(),
        happymeal: $("#myNumber4").val(),
        doublecheeseburger: $("#myNumber5").val(),
        username: sessionStorage.username,
        point: sessionStorage.point,
        time: $("#time").val(),
        rating: $("#rating").val(),
        mode: $("#mode").val(),


    }
    console.log(cart.bigmac + cart.filletofish + cart.mcspicy + cart.happymeal + cart.doublecheeseburger + cart.time, cart.rating);


    $.ajax({
        url: "/api/carts?token=" + sessionStorage.authToken,
        method: "post",
        data: cart
    })
        .done(function (data) { // if response indicates a successful login
            $(".statusMessage").text(data.message);
            $(".foodrating").text(data.rating);
            //insert data.rating value here!
            alert("Cart Added Successfully! Points = " + data.point);
            // location.href = '/restaurants';
        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
}

//KFC
function addcart1() {
    sessionStorage.point = (parseInt(sessionStorage.point) + 10) + "";
    var cart = {
        doubledownburger: $("#myNumber1").val(),
        ricebucket: $("#myNumber2").val(),
        twopcschicken: $("#myNumber3").val(),
        shroom: $("#myNumber4").val(),
        snacker: $("#myNumber5").val(),
        username: sessionStorage.username,
        point: sessionStorage.point,
        time: $("#time").val(),
        rating: $("#rating").val(),
        mode: $("#mode").val(),

    }
    console.log(cart.doubledownburger + cart.ricebucket + cart.twopcschicken + cart.shroom + cart.snacker);


    $.ajax({
        url: "/api/carts1?token=" + sessionStorage.authToken,
        method: "post",
        data: cart
    })
        .done(function (data) { // if response indicates a successful login
            $(".statusMessage").text(data.message);
            $(".foodrating").text(data.rating);
            alert("Cart Added Successfully! Points = " + data.point);
            // location.href = '/restaurants';
        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
}

//Burger King

function addcart2() {
    sessionStorage.point = (parseInt(sessionStorage.point) + 10) + "";
    var cart = {
        taro: $("#myNumber1").val(),
        whopper: $("#myNumber2").val(),
        swiss: $("#myNumber3").val(),
        onion: $("#myNumber4").val(),
        tender: $("#myNumber5").val(),
        username: sessionStorage.username,
        point: sessionStorage.point,
        time: $("#time").val(),
        rating: $("#rating").val(),
        mode: $("#mode").val(),

    }
    console.log(cart.taro + cart.whopper + cart.swiss + cart.onion + cart.tender);


    $.ajax({
        url: "/api/carts2?token=" + sessionStorage.authToken,
        method: "post",
        data: cart
    })
        .done(function (data) { // if response indicates a successful login
            $(".statusMessage").text(data.message);
            $(".foodrating").text("average rating: " + data.rating);
            alert("Cart Added Successfully! Points = " + data.point);
            // location.href = '/restaurants';
        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
}

function signup() {
    var signup = {
        username: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        phone: $("#phone").val(),
        point: 0,
    }
    $.ajax({
        url: "/sign",
        method: "post",
        data: signup
    })
        .done(function (data) { // if response indicates a successful login
            $(".statusMessage").text(data.message);
            location.replace("/login");

        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
}

$(".delete").click(function deleteUser() {

    var deleteuser = {
        username: sessionStorage.username,
    }
    $.ajax({
        url: "/api/users/" + sessionStorage.username + "?token=" + sessionStorage.authToken,
        method: "delete",
        data: deleteuser
    })
        .done(function (data) { // if response indicates a successful login
            alert("Account deleted successfully")
            location.replace("/login");
        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
        })
    return false;
});

$(".promo").click(function redeemPromotion() {

    if (sessionStorage.point < 20) {
        alert("Not Enough Points to Redeem!")
    }
    else {
        sessionStorage.point = (parseInt(sessionStorage.point) - 20) + "";
        var promotion = {
            username: sessionStorage.username,
        }
        $.ajax({
            url: "/api/promotion?token=" + sessionStorage.authToken,
            method: "post",
            data: promotion
        })
            .done(function (data) { // if response indicates a successful login
                alert("Promotion Redeemed Successfully")
                location.replace("/restaurants");
            })
            .fail(function (err) { // if response indicates an unsuccessful login
                $(".statusMessage").text(err.responseText);
            })
        return false;
    }
});

// $(".favmcds").click(function favtomcds() {
//     console.log("GOT");

//     var mcdfav = {
//         macdonald: "Favourite",
//         kfc: "NIL",
//         burger: "NIL",
//         username: sessionStorage.username,

//     }
//     $.ajax(
//         {
//             url: "/api/favmcd?token=" + sessionStorage.authToken,
//             method: "post",
//             data: mcdfav
//         }
//     ).done(
//         function (data) {
//             alert("Macdonald has been added to your favourite!");
//         }
//     ).fail(
//         function (err) {
//             console.log(err.responseText);
//         }
//     );
//     return false;
// });


//edituser

// var UserId = 0;
// $(function () { // This is our so called “ready” function in shorthand
//     var urlParams = new URLSearchParams(window.location.search);
//     UserId = urlParams.get('_id');

//     $.ajax({
//         url: "/api/users" + UserId,
//         method: "get"
//     }).done(
//         function (data) {
//             $('#email').val(data.email);
//             $('#phone').val(data.phone);
//             $('#password').val(data.password);
//         }
//     ).fail(
//         function (err) {
//             console.log(err.responseText);
//         }
//     );
// });

function updateUser() {
    var updatedUser = {

        email: $("#email").val(),
        phone: $("#phone").val(),
        password: $("#password").val(),
    }
    $.ajax(
        {
            url: "/api/users?token=" + sessionStorage.authToken,
            method: "put",
            data: updatedUser
        }
    ).done(
        function (data) {
            alert("Account updated!");
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
        }
    );
    return false;
}


//view cart

// $(document).ready(function () {
//     $.ajax({
//         url: "/events",
//         method: "get"
//     })
//         .done(
//             function (data) {
//                 data.forEach(function (event) {
//                     $(".events").append(`
//                         <article>
//                         <h2><a href="/edit?id=${event._id}">${event.name}</a></h2>
//                         <div>
//                             ${event.description}<br>
//                             Start: ${event.start.date} ${event.start.time}<br>
//                             End: ${event.end.date} ${event.end.time}<br>
//                         </div>
//                         </article>
//                     `);
//                 })
//             }
//         )
//         .fail(
//             function (err) {
//                 console.log(err.responseText);
//             }
//         )

//     $(".addEvent").click(function () {
//         $(".addNewEvent").show();
//     })
// })

/////////////////////////////////////////////////
$(".viewcartkfc").click(function viewCart() {
    // var viewcart = {
    //     username: sessionStorage.username,
    // }
    $.ajax({
        url: "/api/viewcartkfc?token=" + sessionStorage.authToken,
        method: "get",
        // data: viewcart
    })
        .done(function (cart) { // if response indicates a successful login
            cart.forEach(function (carts) {
                $(".cartskfc").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${carts.username}</th>
                <th colspan="1"> KFC </th>
                </tr>
                 <tr>
                <td colspan="4">
                Number of double down burger: ${carts.doubledownburger}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of ricebucket: ${carts.ricebucket}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of two pc chicken: ${carts.twopcschicken}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of shroom burger: ${carts.shroom}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of snacker meal: ${carts.snacker}
                </td>
                </tr>

                
                </table>
                </article>
                `);
            })
        })
        .fail(function (err) {
            console.log("failed")
        })
    return false;
})

$(".viewcartmcd").click(
    function viewCart() {
        // var viewcart = {
        //     username: sessionStorage.username,
        // }
        $.ajax({
            url: "/api/viewcartmcd?token=" + sessionStorage.authToken,
            method: "get",
            // data: viewcart
        })
            .done(function (cart) { // if response indicates a successful login
                cart.forEach(function (carts) {
                    $(".cartsmcd").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${carts.username}</th>
                <th colspan="1"> MCD </th>
                </tr>
                 <tr>
                <td colspan="4">
                Number of bigmac: ${carts.bigmac}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of fillet-o-fish: ${carts.filletofish}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of mc spicy: ${carts.mcspicy}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of happy meals: ${carts.happymeal}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of double cheese burger: ${carts.doublecheeseburger}
                </td>
                </tr>

                
                </table>
                </article>
                `);
                })
            })
            .fail(function (err) {
                console.log("failed")
            })
        return false;
    })

$(".viewcartbks").click(function viewCart() {
    // var viewcart = {
    //     username: sessionStorage.username,
    // }
    $.ajax({
        url: "/api/viewcartbks?token=" + sessionStorage.authToken,
        method: "get",
        // data: viewcart
    })
        .done(function (cart) { // if response indicates a successful login
            cart.forEach(function (carts) {
                $(".cartsbks").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${carts.username}</th>
                <th colspan="1"> BKS </th>
                </tr>
                <tr>
                <td colspan="4">
                Number of taro pie: ${carts.taro}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of whopper: ${carts.whopper}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of swiss burger: ${carts.swiss}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of onion ring: ${carts.onion}
                </td>
                </tr>

                
                </table>
                </article>
                `);
            })
        })
        .fail(function (err) {
            console.log("failed")
        })
    return false;
});
$(".viewhistorykfc").click(function viewhistory() {
    // var viewhistory = {
    //     username: sessionStorage.username,
    // }
    $.ajax({
        url: "/api/viewhistorykfc?token=" + sessionStorage.authToken,
        method: "get",
        // data: viewhistory
    })
        .done(function (history) { // if response indicates a successful login
            history.forEach(function (historys) {
                $(".historyskfc").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${historys.username}</th>
                <th colspan="1"> KFC </th>
                </tr>
                 <tr>
                <td colspan="4">
                Number of double down burger: ${historys.doubledownburger}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of ricebucket: ${historys.ricebucket}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of two pc chicken: ${historys.twopcschicken}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of shroom burger: ${historys.shroom}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of snacker meal: ${historys.snacker}
                </td>
                </tr>

                
                </table>
                </article>
                `);
            })
        })
        .fail(function (err) {
            console.log("failed")
        })
    return false;
})

$(".viewhistorymcd").click(
    function viewhistory() {
        // var viewhistory = {
        //     username: sessionStorage.username,
        // }
        $.ajax({
            url: "/api/viewhistorymcd?token=" + sessionStorage.authToken,
            method: "get",
            // data: viewhistory
        })
            .done(function (history) { // if response indicates a successful login
                history.forEach(function (historys) {
                    $(".historysmcd").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${historys.username}</th>
                <th colspan="1"> MCD </th>
                </tr>
                 <tr>
                <td colspan="4">
                Number of bigmac: ${historys.bigmac}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of fillet-o-fish: ${historys.filletofish}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of mc spicy: ${historys.mcspicy}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of happy meals: ${historys.happymeal}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of double cheese burger: ${historys.doublecheeseburger}
                </td>
                </tr>

                
                </table>
                </article>
                `);
                })
            })
            .fail(function (err) {
                console.log("failed")
            })
        return false;
    })

$(".viewhistorybks").click(function viewhistory() {
    // var viewhistory = {
    //     username: sessionStorage.username,
    // }
    $.ajax({
        url: "/api/viewhistorybks?token=" + sessionStorage.authToken,
        method: "get",
        // data: viewhistory
    })
        .done(function (history) { // if response indicates a successful login
            history.forEach(function (historys) {
                $(".historysbks").append(`
                <article>
              
                <table>
                <tr>
                <th colspan="1"> User: ${historys.username}</th>
                <th colspan="1"> BKS </th>
                </tr>
                <tr>
                <td colspan="4">
                Number of taro pie: ${historys.taro}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of whopper: ${historys.whopper}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of swiss burger: ${historys.swiss}
                </td>
                </tr>
                <tr>
                <td colspan="4">
                Number of onion ring: ${historys.onion}
                </td>
                </tr>

                
                </table>
                </article>
                `);
            })
        })
        .fail(function (err) {
            console.log("failed")
        })
    return false;
})


function favtomcds() {
    console.log("GOT");
    usernamez = sessionStorage.username;
    var mcdfav = {
        restaurants: "Macdonald",
        username: usernamez,
    }
    $.ajax(
        {
            url: "/api/favmcd?token=" + sessionStorage.authToken,
            method: "post",
            data: mcdfav
        }
    ).done(
        function (data) {
            alert("Macdonald has been added to your favourite!");
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
            alert("You already have a favourite!")
        }
    );
    return false;
}

function favtokfc() {
    console.log("GOT");
    usernamez = sessionStorage.username;
    var kfcfav = {
        restaurants: "KFC",
        username: usernamez,
    }
    $.ajax(
        {
            url: "/api/favkfc?token=" + sessionStorage.authToken,
            method: "post",
            data: kfcfav
        }
    ).done(
        function (data) {
            alert("KFC has been added to your favourite!");
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
            alert("You already have a favourite!")
        }
    );
    return false;
}

function favtobks() {
    console.log("GOT");
    usernamez = sessionStorage.username;
    var bksfav = {
        restaurants: "Burger King",
        username: usernamez,
    }
    $.ajax(
        {
            url: "/api/favbks?token=" + sessionStorage.authToken,
            method: "post",
            data: bksfav
        }
    ).done(
        function (data) {
            alert("Burger King has been added to your favourite!");
        }
    ).fail(
        function (err) {
            console.log(err.responseText);
            alert("You already have a favourite!")
        }
    );
    return false;
}

function viewfav() {
    // var viewcart = {
    //     username: sessionStorage.username,
    // }
    $.ajax({
        url: "/api/viewfav?token=" + sessionStorage.authToken,
        method: "get",
        // data: viewcart
    })
        .done(function (favourite) { // if response indicates a successful login

            $(".viewfav").append(`
                <p>
                Restaurant: ${favourite.restaurants}
                </p>
                `);

        })
        .fail(function (err) {
            console.log("failed")
        })
    return false;
}