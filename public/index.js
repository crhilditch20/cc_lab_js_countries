var countries;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
};

var populateList = function(countries){
  var select = document.querySelector('#country-list');
    countries.forEach(function(country){
      var option = document.createElement('option'); 
      option.innerText = country.name; 
      option.value = country.name;
      select.appendChild(option); 
    });
};

var requestComplete = function(){
  if(this.status !== 200) return; //this. refers to the request object. status 200 is the request success code.
  var jsonString = this.responseText; //property of request which is the data returned by the get request
  countries = JSON.parse(jsonString); //turns the massive string into an array of objects
  // console.log(countries[0].name); //prints the name of the country which is the value of the key 'name' in the first object in the countries array
  populateList(countries);
};

var displayCountryInfo = function() {
  // var countries = document.querySelector('#country-list');
  var name = document.querySelector('#name');
  name.innerText = "Country: " + this.value;
  for(var country of countries){
    if(country.name === this.value){
      var countryObject = country;
    }
  }
  var population = document.querySelector('#population');
  population.innerText = "Population: " + countryObject.population;

  var capital = document.querySelector('#capital');
  capital.innerText = "Capital: " + countryObject.capital;
  localStorage.setItem("lastCountry", this.value);
};


var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
    makeRequest(url, requestComplete);
  var selectCountry = document.querySelector('#country-list');
  selectCountry.onchange = displayCountryInfo;

};

window.onload = app;