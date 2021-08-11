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
})
$(".viewcart").click(function viewCart() {
    var viewcart = {
        username: sessionStorage.username,
    }
    $.ajax({
        url: "/api/viewcart?token=" + sessionStorage.authToken,
        method: "post",
        data: viewcart
    })
        .done(function (cart) { // if response indicates a successful login
            location.replace("/cart");
            alert("Cart Is Updated!")
            console.log(cart);
            $(".bigmac").text(cart);

            // console.log(data.bigmac);

            // $("").text(data.rating);

        })
        .fail(function (err) { // if response indicates an unsuccessful login
            $(".statusMessage").text(err.responseText);
            console.log("failed")
        })
    return false;

})

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



