//console.log("Hello");
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=milk")
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error : ",error));