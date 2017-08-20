// Make all require calls here
// -----------------------------------------------
// Call the twitterkeys object in keys.js
var keys = require("./keys.js");
// Call the Node package for twitter
var twitter = require('twitter');
// Call the Node package for spotify
var Spotify = require('node-spotify-api');
// Include the request npm package 
var request = require("request");
// Include the fs nmp package
var fs = require("fs");

// Save the arguments into variables
// -------------------------------------------------
// The first argument
var argument1 = process.argv[2];
// The second argument
var argument2 = process.argv[3];

// Create functions here
// --------------------------------------------------
// This is the function for the my-tweets argument
// This will show your last 20 tweets and when they 
// were created at in your terminal/bash window.
function myTweets() {
	// Initialize twitter api keys
	var client = new twitter (keys.twitterKeys);
	// Specify parameters for API call
	var params = {
		screen_name: 'NodeLiri',
		count: "20"
	};
	// Execute API call
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		// Display any errors
  		if (error) {
  			throw error
  		};
		// Loop through the response
		for (var i =0; i < tweets.length; i++) {
			// Read the time the tweet was created
			var tweetTime = tweets[i].created_at;
			// Read the tweet
			var tweet = tweets[i].text;
			// display the tweet
			console.log(i + " : " + tweet);
			// display the time of the tweet
			console.log(i + " (time): " + tweetTime);
		};  		
	});
};

// This is the function for the spotify-this-song argument
// This will show the following information about the song
// in the terminal window
// Artist(s), the song's name, A preview link of the song
// from spotify, the album that the song is from.
// If no song is provided then the default is "The Sign" 
// by Ace of Base

function spotifySong(song) {
	// Initialize spotify API keys
	var client = new Spotify (keys.spotifyKeys);
	// If a song has been passed into the function
	// then set parameters to the specified song. 
	// Otherwise set it to The Sign by Ace of Base
	if (typeof(song) != "undefined") {
		// Specify parameters for API call
		var params = {
			type: 'track',
			query: song,
			limit: 1
		}
	} else {
		// Specify alternate parameters for API call
		var params = {
			type: 'track',
			query: "The Sign Ace of Base",
			limit: 1
		};
	};
	// Execute API call
	client.search(params, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		};
		// Display the artists by looping through length or artist array
		for (var i =0; i < data.tracks.items[0].album.artists.length; i++) {
			console.log("Artists: " + data.tracks.items[0].album.artists[i].name);
		};
		// Display the song name
		console.log("Song: " + data.tracks.items[0].name);
		// Display the preview link
		console.log("Preview link: " + data.tracks.items[0].preview_url);
		// Display the album that the song is from
		console.log("Album: " + data.tracks.items[0].album.name);
	}); 
};

// This is the function to get movie data

function movieInfo(movie) {
	// Run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  	// If the request is successful (i.e. if the response status code is 200)
	  	if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the movie title
		    console.log("Movie Title: " + JSON.parse(body).Title);
		    // Year the movie came out
		    console.log("Release Year: " + JSON.parse(body).Year);
		    // IMDB rating of the movie
		    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		    // Country where the movie was produced
		    console.log("Country: " + JSON.parse(body).Country);
		    // Language of the movie
		    console.log("Language: " + JSON.parse(body).Language);
		    // Plot of the movie
		    console.log("Plot: " + JSON.parse(body).Plot);
		    // Actors in the movie
		    console.log("Actors: " + JSON.parse(body).Actors);
		    // Rotten tomoatoes rating
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		};
	});
};

// This function pulls the command inside the random.txt file

function random() {
	// This will read the file
	fs.readFile("random.txt", "utf8", function(error, data) {

		// If the code experiences any errors it will log the error to the console.
		if (error) {
			return console.log(error);
		};

		// split data by commas
		var dataArr = data.split(",");

		// Save the arguments from the array
		var textArg1 = dataArr[0];
		var textArg2 = dataArr[1];

		// Check if there are quotations around the second argument
		// If so, then delete quotation marks.
		// This is done using character codes because the code in the 
		// text file for " is different from that typed in js

		if(textArg2.charCodeAt(0)===8221 && textArg2.charCodeAt(textArg2.length - 1) === 8221) 
		{
			textArg2 = textArg2.substr(1, textArg2.length - 2);
		};

		// Depending on argument1 call the relevant function
		switch(textArg1) {
			// call the myTweets function
			case "my-tweets":
				// run the my-tweets function
				myTweets();
				break;
			// call the spotify function
			case "spotify-this-song":
				// run the spotify function
				spotifySong(textArg2);
				break;
			// call the movies function
			case "movie-this":
				// run the movies function
				movieInfo(textArg2);
				break;
		};
	});
};

// -------------------------------------------------
// Execute switch case and call functions as necessary
// -------------------------------------------------
switch(argument1) {
	// call the myTweets function
	case "my-tweets":
		// run the my-tweets function
		myTweets();
		break;
	// call the spotify function
	case "spotify-this-song":
		// run the spotify function
		spotifySong(argument2);
		break;
	// call the movies function
	case "movie-this":
		// run the movies function
		movieInfo(argument2);
		break;
	case "do-what-it-says":
		// run the random function
		random();
		break;
};











