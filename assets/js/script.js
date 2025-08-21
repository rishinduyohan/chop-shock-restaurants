//console.log("Hello");

let  searchItem = document.getElementById("default-search");
searchItem.addEventListener("keypress", e=>{
    if(e.key === "Enter"){
        e.preventDefault();
        let item = searchItem.value;
        search(item);
    }
});
search =(item)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error : ",error));
}