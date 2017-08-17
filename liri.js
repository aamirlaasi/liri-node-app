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
			console.log(tweet);
			// display the time of the tweet
			console.log(tweetTime);
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

function spotifySong() {
	// Initialize spotify API keys
	var client = new Spotify (keys.spotifyKeys);
	// Specify parameters for API call
	var params = {
		type: 'track',
		query: argument2,
		limit: 1
	};
	// Execute API call
	client.search(params, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		};
		// Display the artists by looping through length or artist array
		for (var i =0; i < data.tracks.items[0].album.artists.length; i++) {
			console.log(data.tracks.items[0].album.artists[i].name);
		};
		// Display the song name
		console.log(data.tracks.items[0].name);
		// Display the preview link
		console.log(data.tracks.items[0].preview_url);
		// Display the album that the song is from
		console.log(data.tracks.items[0].album.name);
		});
};

// This is the function to get movie data

function movieInfo() {
	// Run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + argument2 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  	// If the request is successful (i.e. if the response status code is 200)
	  	if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the movie title
		    console.log(JSON.parse(body).Title);
		    // Year the movie came out
		    console.log(JSON.parse(body).Year);
		    // IMDB rating of the movie
		    console.log(JSON.parse(body).imdbRating);
		    // Country where the movie was produced
		    
		};
	});
};

movieInfo();















