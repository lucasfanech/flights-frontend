// get GET parameters from URL on page load
var url = new URL(window.location.href);
var destinationParam = url.searchParams.get("destination");
var originParam = url.searchParams.get("origin");

if (destinationParam == "null") {
    destinationParam = null;
}
if (originParam == "null") {
    originParam = null;
}



$(function () {
    // ajax request to get http://127.0.0.1:8080/flights
    $.ajax({
        url: 'http://127.0.0.1:8080/flights',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#listFlights').empty();
            for (var i = 0; i < data.length; i++) {
                var destination = data[i].destination;
                var origin = data[i].origin;
                var price = data[i].price;
                var image = data[i].image;
                var description = data[i].description;
                var origin = data[i].origin;
                var departure_date = data[i].departure_date;
                var departure_time = data[i].departure_time;
                var arrival_date = data[i].arrival_date;
                var arrival_time = data[i].arrival_time;
                var id = data[i].id;
                var plane = data[i].plane;
                var date = data[i].date;
                var time = data[i].time;
                var duration = data[i].duration;
                var seats = data[i].seats;
                var flightNumber = data[i].flightNumber;
                var flight = data[i].flight;

                if (destinationParam != null) {
                    if (destinationParam != destination) {
                        // remove the element from the array
                        data.splice(i, 1);
                        continue;
                    }
                }
                if (originParam != null) {
                    if (originParam != origin) {
                        // remove the element from the array
                        data.splice(i, 1);
                        continue;
                    }
                }

                // split / to get the last word of destination


                // request to search image on Pexels
                $.ajax({
                    headers: {
                        "Authorization": "Mf9ptFvuhGMdc8vdS1vJ8dQV0z6y6e8A8RdNOLyRyDL0wEOyoCg0pmo3"
                    },
                    url: 'https://api.pexels.com/v1/search?query=' + destination + '%20monument&per_page=100',
                    type: 'GET',
                    dataType: 'json',
                    // Using a closure to capture the correct value of the image variable
                    success: (function (image, destination,departure_date,departure_time,arrival_date,arrival_time,price,description,origin,plane,date,time,duration,seats,flightNumber,flight, id) {
                        // get random number from 0 to 100 and get photos[1] from the array


                        return function (data) {
                            console.log(data);
                            // get random number from 0 to 100
                            var randomNumber = Math.floor(Math.random() * 30);
                            var imageUrl = data.photos[randomNumber].src.large;
                            console.log(imageUrl);
                            console.log(destination);
                            // Now use imageUrl to set the image source
                            var html = '<div class="col-12 col-sm-6 col-lg-4">' +
                                '<div class="single-features-area mb-50">' +
                                '<img src="' + imageUrl + '" alt="">' +
                                '<!-- Price -->' +
                                '<div class="price-start">' +
                                '<p>FROM $500/person</p>' +
                                '</div>' +
                                    '<div class="feature-content d-flex align-items-center justify-content-between">' +
                                    '<div class="feature-title"><p>' + origin + '</p><h5>' + destination + '</h5></div>' +
                                 '<div class="feature-favourite"><a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></div>' +
                                '<!-- button open modal -->' +
                                '<div class="feature-price">' +
                                '<div href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="setModal(\''+destination+'\', \''+origin+'\', \''+id+'\')">Details</div>' +

                                        '</div>' +
                                        '</div>';
                            $('#listFlights').append(html);


                        };
                    })(image,destination,departure_date,departure_time,arrival_date,arrival_time,price,description,origin,plane,date,time,duration,seats,flightNumber,flight, id)
                });
            }
            $('#flightsNumber').text(data.length + ' flights found');
        }
    });
});

function setModal(destination, origin, id){
    // set in exampleModalLabel the destination and origin
    $('#exampleModalLabel').text(destination + ' - ' + origin);
    // ajax request to get http://127.0.0.1:8080/reservations/flight_id/" + id
    $.ajax({
        url: 'http://127.0.0.1:8080/reservations/flight_id/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#listReservations').empty();
            for (var i = 0; i < data.length; i++) {
                var name = data[i].passenger.surname;
                var email = data[i].passenger.email_address;
                var firstname = data[i].passenger.firstname;
                var flight_id = data[i].flight_id;
                console.log(name, email, firstname);
                var html = '<tr>' +
                    '<td>' + name + '</td>' +
                    '<td>' + firstname + '</td>' +
                    '<td>' + email + '</td>' +
                    '</tr>';
                $('#listReservations').append(html);
                $('#id_flight').val(flight_id);
            }
        }
    });
}


// on click of addReservation button
function addReservation() {
    console.log('addReservation');
    // get the value of the input tags
    var id_flight = $('#id_flight').val();
    var surname = $('#surname').val();
    var firstname = $('#firstname').val();
    var email = $('#email').val();
    // ajax request to post http://
    $.ajax({
        url: 'http://127.0.0.1:8080/reservations',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            flight_id: id_flight,
            passenger: {
                surname: surname,
                firstname: firstname,
                email_address: email
            }
        }),
        success: function (data) {
            console.log(data);
            // reload the page
            location.reload();
        },
        error: function (data) {
            console.log(data);
        }
    });
}



