//an array of dog breeds 
var dogBreeds = ['dalmation', 'terrier', 'doberman pinscher', 'poodle', 'greyhound',
    'golden retriever', 'labrador retriever', 'pitbull', 'yorkshire terrier', 'beagle',
    'wolfhound', 'bulldog', 'french bulldog', 'pug', 'dachshund', 'german shepherd',
    'rottweiler', 'chihuahua', 'husky', 'border collie'
];
//a loop that appends a button for each string in the array on to the page 
$(document).ready(function() {
	// function to execute when submit button is pressed on dog-form
	$("#dog-form").submit(function(){ 
		//get value from form
		var input = $('#breed-input').val();
		//add new dog breed to array
		dogBreeds.push(input);
		//add new button on DOM
		// create button element in html with breed name
        var buttonHtml = '<button class="btn btn-info btn-sm" data-breed="' + input + '">' + input + '</button>';
        // append a new button to the dogButttons class div in the html with the variable buttonHtml
        $('.dogButtons').append(buttonHtml);
        //prevent form from redirecting
        return false;

	})
    // for each dog breed in the array
    for (var i = 0; i < dogBreeds.length; i++) {
        // capture name of breed
        var dogBreed = dogBreeds[i];
        // create button element in html with breed name
        var buttonHtml = '<button class="btn btn-info btn-sm" data-breed="' + dogBreed + '">' + dogBreed + '</button>';
        // append a new button to the dogButttons class div in the html with the variable buttonHtml
        $('.dogButtons').append(buttonHtml);
    }
    // At this point, a bunch of buttons are on the page

    // Now, when the user clicks a button
    $('.dogButtons').on('click','button', function() {
        // Get breed data off button that was clicked
        var breed = $(this).attr('data-breed');
        // Constructing a URL to use in ajax GET request 	
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + breed + '&api_key=dc6zaTOxFJmzC&limit=10';
        // Perform AJAX GET request to get data from an api 
        $.ajax({
                url: queryURL,
                method: "GET"
        })
        // once the data comes back from the API
        .done(function(response) {
            // capture array of results in results variable
            var results = response.data;
            // for each of the ten gif data points loop over every result item
            for (var i = 0; i < results.length; i++) {
                // create an image element
                var dogImage = $('<img>');      
                // Give values to the image element that are static
                dogImage.attr("src", results[i].images.fixed_height_still.url);
                dogImage.attr("data-state", "still");
                dogImage.attr("data-animate", results[i].images.fixed_height.url);
                dogImage.attr("data-still", results[i].images.fixed_height_still.url);
                //Under every gif, display its rating (PG, G, so on).
            	// Creating and storing a div tag
            	var animalDiv = $('<div class="animalDiv col-xs-4">');
           		 // Creating a paragraph tag with the result item's rating
            	var p = $("<p>").text("Rating: " + results[i].rating);
            	// Appending the paragraph to the animalDiv
            	animalDiv.append(dogImage);
            	animalDiv.append(p);
                // Prepend the animalDiv to the html page
                $('#dogGifs').prepend(animalDiv);
            }

            // Now, when the user clicks an image
            $("img").on('click', function() {

                // Get data off image that was clicked
                var state = $(this).attr("data-state");
                // If the clicked image's state is still
                if (state === "still") {
                    //update its src attribute to what its data-animate value is
                    $(this).attr("src", $(this).attr("data-animate"));
                    // Then, set the image's data-state to animate
                    $(this).attr("data-state", "animate");
                    // Else set src to the data-still value
            	} else {
		            $(this).attr("src", $(this).attr("data-still"));
		            $(this).attr("data-state", "still");
                }

            });
        });
    });
});
