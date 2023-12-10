// import jquery in js/jquery/jquery-2.2.4.min.js




// on load of page execute function
$(function() {
    // ajax request to get http://127.0.0.1:8080/flights
    $.ajax({
        url: 'http://127.0.0.1:8080/flights',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // loop through the data and get data.destination and data.origin
            var listDestination = [];
            var listOrigin = [];
            for (var i = 0; i < data.length; i++) {

                // append the data to array and remove duplicates
                var destination = data[i].destination;
                var origin = data[i].origin;

                listDestination.push(destination);
                listOrigin.push(origin);

                var uniqueDestination = listDestination.filter(function(item, pos) {
                    return listDestination.indexOf(item) == pos;
                });
                var uniqueOrigin = listOrigin.filter(function(item, pos) {
                    return listOrigin.indexOf(item) == pos;

                });
            }

            // remove the list in listDestinations and listOrigins
            $('#listDestinations').empty();
            $('#listOrigins').empty();

            // append default value
            $('#listDestinations').append('<option value="" selected>Destination</option>');
            $('#listOrigins').append('<option value="" selected>Origin</option>');

            // loop through the uniqueDestination and append to the select tag
            for (var i = 0; i < uniqueDestination.length; i++) {
                $('#listDestinations').append('<option value="' + uniqueDestination[i] + '">' + uniqueDestination[i] + '</option>');
            }
            // loop through the uniqueOrigin and append to the select tag
            for (var i = 0; i < uniqueOrigin.length; i++) {
                $('#listOrigins').append('<option value="' + uniqueOrigin[i] + '">' + uniqueOrigin[i] + '</option>');
            }


        }
    });

    // ajax request to get http://127.0.0.1:8080/planes
    $.ajax({
        url: 'http://127.0.0.1:8080/planes',
        type: 'GET',
        dataType: 'json',
        success: function (data){
            // loop through the data and get data.operator and remove duplicates
            var listOperator = [];
            for (var i = 0; i < data.length; i++) {
                var operator = data[i].operator;
                listOperator.push(operator);
                var uniqueOperator = listOperator.filter(function(item, pos) {
                    return listOperator.indexOf(item) == pos;
                });
            }
            // remove the list in listOperators
            $('#listOperators').empty();
            // append default value
            $('#listOperators').append('<option value="" selected>Operator</option>');
            // loop through the uniqueOperator and append to the select tag
            for (var i = 0; i < uniqueOperator.length; i++) {
                $('#listOperators').append('<option value="' + uniqueOperator[i] + '">' + uniqueOperator[i] + '</option>');
            }

        }
    });

});


// on click of the search id button
function search() {
    console.log('search');
    // get the value of the select tag
    var destination = $('#listDestinations').val();
    if (destination == "") {
        destination = null;
    }
    var origin = $('#listOrigins').val();
    if (origin == "") {
        origin = null;
    }
    var operator = $('#listOperators').val();
    if (operator == "") {
        operator = null;
    }
    // redirect to listing.html
    window.location.href = 'listing.html?destination=' + destination + '&origin=' + origin + '&operator=' + operator;
}
