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
    .then(data =>{
        console.log(data);
        setItem(data);
    })
    .catch(error => console.error("Error : ",error));
}

setItem = (data) =>{
    let meals = data.meals;
    let container = document.getElementById("search-results");
    container.innerHTML = "";
    if(meals){
        meals.forEach(meal => {
            let div = document.createElement("div");
            div.classList.add("meal");
            div.innerHTML = `
                <h3>${meal.strMeal}</h3>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>${meal.strInstructions}</p>
            `;
            container.appendChild(div);
        });
    }else{
        container.innerHTML = "<p>No results found</p>";
    }
}