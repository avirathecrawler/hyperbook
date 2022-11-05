/*
	The library of things
*/

function isNumber(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function capitaliseFirstLetter(input)
{
	//Check if there are multiple categories separated by comma
	var categoryArr = 	input.split(",");
	
	var result = "";
	for(var i=0; i < categoryArr.length; i++)
  	{
	//	console.log("Cap: "+categoryArr[i]);
		result += categoryArr[i].charAt(0).toUpperCase() + categoryArr[i].slice(1).toLowerCase()+",";
	}
	
    return result.substring(0, result.length - 1);//last one is an empty comma
}

function getHourDisplay(h)
{
	var display = h+"am";
	if(h > 12)
	  {
		  pm =  h-12;
		  display = pm + "pm";
	  }
	  
	else if(h == 12)
		display = "noon";
	else if(h == 0)
		display = "midnight";	
  
  	return display;  
}

function getWallpaper()
{
		var day = (today.getDay() + 3)%7; 	
 		var backgroundimg = "../images/wallpapers/nature"+day+".jpg";	
 		return  "url('" + backgroundimg + "')"; 
}

function minsToMidnight() {
    var now = new Date();
    var then = new Date(now);
    then.setHours(24,0,0,0);
    return Math.floor((then - now)/6e4);
}

//y >> x. Both in seconds
function timeBetween(x,y)
{	
	if(y > x)
	{
		var seconds = y - x;
		
		return formatTime(seconds);
	}
}

function timeBetweenElaborate(x,y)
{	
	if(y > x)
	{
		temp =  formatTime(y-x).split(" ");
		
		var formatted = temp[0];
		
	//	console.log(temp[0]);
		
		if(temp[0] == "1d")
			formatted = "One Day";
			
		else if(temp[0].indexOf("d") != -1)
			formatted = temp[0].replace("d"," days");
			
		else if(temp[0] == "1h")
			formatted = "One Hour";
			
		else if(temp[0].indexOf("h") != -1)
			formatted = temp[0].replace("h"," hours");
			
		else if(temp[0] == "1m")
			formatted = "One Minute";
		
		else if(temp[0].indexOf("m") != -1)
			formatted = temp[0].replace("m"," minutes");


		return formatted;
		
	}
	
}


function getgreeting()
{   
	if(hour <12)
  		greeting = "Good Morning, ";
  	else if(hour < 16)
  		greeting = "Good Afternoon, ";
  	else
  		greeting = "Good Evening, ";

	return greeting+' <b>'+getName() +'. </b>';

}

function formatTime(timeinsec)
{
  timeinsec = timeinsec.toFixed();
  
  if(timeinsec < 60)
    return timeinsec+"s";
    
  if(timeinsec < 3600)
  {
    var min = Math.floor(timeinsec/60);
    
    var sec = timeinsec - (min * 60);
    
    return min+"m "+sec+"s";  
  }
  
  if(timeinsec < (3600 * 24))
  {
    var hours = Math.floor(timeinsec/3600);
    
    var min = Math.floor(timeinsec/60 - hours * 60);
    
    return hours+"h "+min+"m";
  }
  
  var day = Math.floor(timeinsec/(3600*24));
  
  var hours = Math.floor((timeinsec - day * 3600*24)/3600);
  
  return day+"d "+hours+"h";
}

function setBadge(color,text)
{
	if(color) chrome.browserAction.setBadgeBackgroundColor({color: color});
    if(text)  chrome.browserAction.setBadgeText({text: text});
}
function getTopSitesPermission()
{
		chrome.permissions.request({
			permissions: ["topSites"]
			}, function (a) {
				if (a)
				{		
					 setTopSitesPermission();
					 showTopSites();
				 }
			});	
				
}



function getSiteFromUrl(url) 
{
	var siteRegexp = /^(\w+:\/\/[^\/]+).*$/;
	var match = url.match(siteRegexp);
	return match[1];
}

function getDomainName(url)
{
	var domain = getSiteFromUrl(url).replace(/.*?:\/\//g, "");
	domain = domain.replace("www.","");  
	return domain;
}

function getSuperdomain(url)
{
	var domain = getSiteFromUrl(url).replace(/.*?:\/\//g, "");
	domain = domain.replace("www.","");  
	var s = domain.split('.');
	
	var l = s.length;
	
	if(l == 2)
   		return s[0]; //eg. google.com => google
   		
   	else if(l > 2 && s[l-2].length > 3)  	
   		return s[l-2] + s[l-3];  //eg. docs.google.com => google docs
  
   	else if(l > 2)
   		return s[l-3];  //eg. google.com.au => google
   	
   	else
   		return s[0]; //don't know what case is this
}

function getSuperdomainFull(url)
{
	var domain = getSiteFromUrl(url).replace(/.*?:\/\//g, "");
	domain = domain.replace("www.","");  
	var s = domain.split('.');
	
	var l = s.length;
	
	if(l == 2)
   		return domain; //eg. google.com => google.com
   		
   	else if(l > 2 && s[l-2].length > 3)  	
   		return s[l-2] + "."+ s[l-1];  //eg. docs.google.com => google.com
  
   	else if(l > 2)
   		return s[l-3]+"."+s[l-2]+"."+s[l-1];  //eg. google.com.au => google
   	
   	else
   		return domain; //don't know what case is this
}

function geolocation()
{
	navigator.geolocation.getCurrentPosition(function (position){
	var latitude = position.coords.latitude.toFixed(4); //4 digits would give an accuracy within 10m
	var longitude = position.coords.longitude.toFixed(4);
	
	if(!isLocationChanged(latitude,longitude))
	{
		//console.log("No need to geolocate. Just get the darn weather");
		getweatherFromYahoo(getWoeid());		
	   return;
	}
	
	var latlong = latitude + ','+longitude;
	var yahooapi = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22' + encodeURIComponent(latlong) + '%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=';
	
	  $.getJSON(yahooapi, function(r){
		  if (r.query.count > 1)   var result = r.query.results.Result[0];
		  else if (r.query.count == 1)	var result = r.query.results.Result;
		  else 	return 0; //no location found
		
		 setLocation(result.city,result.country,result.woeid,latitude,longitude); 	      
         getweatherFromYahoo(result.woeid,result.countrycode);               
	  });
	});
}

function getweatherFromYahoo(woeid)
{		
	units = "c";
	var yahooapi = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D'+woeid+'%20and%20u%3D%22'+units+'%22&format=json&callback=';	
	$.getJSON(yahooapi, function(r) {
		if(r.query.count == 1){
			var weather = r.query.results.channel.item.condition;
			setWeather( weather.temp,weather.text);
		}
	});
}