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

var populateRegionList = function(countries) {
  var select = document.querySelector('#region-list');
  var regions = []
  countries.forEach(function(country) {
    regions.push(country.region);
    console.log(regions);})
    filteredRegions = regions.filter(function(region, index, self) {
      return index === self.indexOf(region);
  }) 
    console.log(filteredRegions);
    filteredRegions.forEach(function(region) {
      var option = document.createElement('option');
          option.innerText = region;
          option.value = region;
          select.appendChild(option);
    })
};

var filterCountriesByRegion = function(){
  var filtered = countries.filter(function(country){
    return (country.region === this.value);
  }.bind(this));
  console.log(filtered);
    var select = document.querySelector('#country-list');
    select.innerHTML = "";
    console.log(select);
    filtered.forEach(function(countryObject){
      var option = document.createElement('option'); 
      option.innerText = countryObject.name; 
      console.log(countryObject.name);
      option.value = countryObject.name;
      select.appendChild(option); 
    });
}

var requestComplete = function(){
  if(this.status !== 200) return; //this. refers to the request object. status 200 is the request success code.
  var jsonString = this.responseText; //property of request which is the data returned by the get request
  countries = JSON.parse(jsonString); //turns the massive string into an array of objects
  // console.log(countries[0].name); //prints the name of the country which is the value of the key 'name' in the first object in the countries array
  populateList(countries);
  populateRegionList(countries);
};

var getCountryObject = function (value) {
  for(var country of countries){
    if(country.name === value){
      var countryObject = country;
    }
  } return countryObject;
};

var displayCountryInfo = function() {
  // var countries = document.querySelector('#country-list');
  var countryObject = getCountryObject(this.value);
  var name = document.querySelector('#name');
  name.innerText = "Country: " + countryObject.name;
  var population = document.querySelector('#population');
  population.innerText = "Population: " + countryObject.population;

  var capital = document.querySelector('#capital');
  capital.innerText = "Capital: " + countryObject.capital;
  localStorage.setItem("lastCountry", this.value);
  getBorderingCountries(countryObject);
};

var getBorderingCountries = function(listCountry){
  var borderCountries = countries.filter(function(country){
          return (country.borders.includes(listCountry.alpha3Code));
        }); console.log(borderCountries);
  borderCountries.forEach(function(borderCountry){
      console.log(borderCountry.name);
      var border = document.querySelector('ul');
      var borderCountries = document.createElement('li');
      borderCountries.innerText = "Border Country: " + borderCountry.name + ", Population: " + borderCountry.population + ", Capital: " + borderCountry.capital;
      border.appendChild(borderCountries);
  });
  }

var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
    makeRequest(url, requestComplete);
  var selectCountry = document.querySelector('#country-list');
  selectCountry.onchange = displayCountryInfo;

  var regionList = document.querySelector('#region-list');
  regionList.onchange = filterCountriesByRegion;

};

window.onload = app;