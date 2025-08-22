//console.log("Hello");
let categorySelect = document.getElementById("categorySelect");
let areaSelect = document.getElementById("areaSelect");
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
    .then(data =>{
        console.log(data);
        setItem(data);
    })
    .catch(error => console.error("Error : ",error));
}

setItem = (data) =>{
    
}

fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
.then(res => res.json())
.then(data =>{
    data.meals.forEach(category => {
        let option = document.createElement("option");
        option.value =category.strCategory;
        option.textContent = category.strCategory;
        categorySelect.appendChild(option);

    });
});