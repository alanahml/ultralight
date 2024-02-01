const now = new Date();
console.log(now); //your Date object for the current day/time

const body = document.body;

/*---------------------------------------------------
First, we need location data so that we can use
latitutde/longitude values to get the local weather.
We’ll try to use the Browser’s native geolocation API
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
---------------------------------------------------*/
// if (navigator.geolocation) {
// 	navigator.geolocation.getCurrentPosition(processLocation, locationError);
// }else{
// 	console.log("Sorry, gelocation is not supported")
// }

// function processLocation(pos) {
// 	const crd = pos.coords;
// 	console.log("Your current position is:");
// 	console.log(`Latitude: ${crd.latitude}`);
// 	console.log(`Longitude: ${crd.longitude}`);
// 	getWeatherData(crd.latitude, crd.longitude);
// }

// function locationError(err) {
// 	console.warn(`ERROR(${err.code}): ${err.message}`);
// }

/*document.querySelector('.class'); grabs class

/*---------------------------------------------------
This is the main API call to the Open weather API.
The documentation is here: https://openweathermap.org/current
Usually, you’ll want to keep your API Key in a repository
"secret" instead of directly in your code for security reasons.
---------------------------------------------------*/
function getWeatherData(){
	let lat = 49.2577354;
	let lon = -123.123904;
	const appId = 'c61d0b99eb79bef542b8b04858e067e8'; 
	const	url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
	
	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log({weatherData: data })
			if( data.cod == '404' ){
				//error in getting data, display error
				console.log( data.message );
			}else{
				processWeatherData(data);
			}      
		})
		.catch(error => console.log(error));
}

window.addEventListener('load', function() {
	getWeatherData();
})

/*---------------------------------------------------
Process the data we received from the API
into formats that are useful for us
---------------------------------------------------*/
function processWeatherData(data){
	// let’s first log our full data result, then
	// store the data we need in variables for later use

	console.log(data);
	const temp = data.main.temp;
	const weather = data.weather[0].description;
	const location = data.name;
	const country = data.sys.country;
	const rain  = data.weather[0].description.includes("rain")


	displayData(now, temp, location, weather, country)
	console.log(weather.includes("rain"))

	function showRain() {
		var x = document.querySelector("canvas");
		console.log({x})
		if (rain) {
		x.style.display = "block";
		} else {
			x.style.display = "none";
		}
		
	}

	showRain()
	
}





// 	//add our data into HTML placeholders
// 	displayData(now, sunsetTime, bloomTime, closeTime, temp)


// /*---------------------------------------------------
// Our functions for using the data with our HTML elements
// ------------------------------------------------------*/

// displayData(now)

function displayData(now, temp, location, weather, country){
	let nowDiv = document.getElementById('now');
	nowDiv.innerText = formatDate(now);

	let rainDiv = document.getElementById('rain');
	rainDiv.innerText = weather;

	let tempDiv = document.getElementById('temp');
	tempDiv.innerText = temp+'°C';

	let locationDiv = document.getElementById('location');
	locationDiv.innerText = location + ', ' + country;

}

function formatDate( date ){
	// see this reference for formatting options:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
	return date.toLocaleTimeString('default', { timeStyle: 'short' })

}



// 	let duskDiv = document.getElementById('dusk');
// 	duskDiv.innerText = formatDate( sunsetTime );

// 	let bloomDiv = document.getElementById('bloom');
// 	bloomDiv.innerText = formatDate( bloomTime );

// 	let closeDiv = document.getElementById('close');
// 	closeDiv.innerText = formatDate( closeTime );

// 	let tempDiv = document.getElementById('temp');
// 	tempDiv.innerText = temp+'F';
// }


// function updateFlowerColor(temp){
// 	const tempMin = 20;
// 	const tempMax = 90;
// 	let ratio;
// 	//limit range to maximum / minimum values of tempRange
// 	if( temp > tempMax){
// 	  ratio = 1;
// 	}else if( temp < tempMin){
// 	  ratio = 0;
// 	}else{
// 		ratio = (temp - tempMin)/(tempMax-tempMin)
// 	}

// 	let redValue = Math.round(ratio*255) //255 is the full saturation of the color, let’s get a range from 0–255
// 	body.style.setProperty('--red', redValue);
// 	console.log('redtint value', redValue);

// }

// /*---------------------------------------------------
// Utility functions that help us calculate things
// ---------------------------------------------------*/
// function hoursToMS( hours ){
// 	// given a number of hours, returns the equivalent milliseconds
// 	// hours * 60 min/hour * 60sec/min * 1000ms/sec
// 	return hours * 60 * 60 * 1000;
// }

