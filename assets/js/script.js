//console.log("Hello");
let categorySelect = document.getElementById("categorySelect");
let areaSelect = document.getElementById("areaSelect");
let searchItem = document.getElementById("default-search");
let recipeCards = document.getElementById("recipe-cards");
let searchBtn = document.getElementById("btn-search");


//Add categories 
fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(res => res.json())
    .then(data => {
        data.meals.forEach(category => {
            let option = document.createElement("option");
            option.value = category.strCategory;
            option.textContent = category.strCategory;
            categorySelect.appendChild(option);
        });
    });

//Add areas
fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then(res => res.json())
    .then(data => {
        data.meals.forEach(area => {
            let option = document.createElement("option");
            option.value = area.strArea;
            option.textContent = area.strArea;
            areaSelect.appendChild(option);
        });
    });

//Add random items
for (let i = 0; i < 6; i++) {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            let recipe = data.meals[0];
            let article = document.createElement("article");
            article.classList.add("group", "bg-white", "rounded-2xl", "overflow-hidden", "shadow-soft", "border", "border-black/5");
            article.setAttribute("data-aos", "zoom-in");
            article.innerHTML = `
            <img src="${recipe.strMealThumb}" class="h-44 w-full object-cover group-hover:scale-105 transition" alt="${recipe.strMeal}" />
            <div class="p-4">
                <h3 class="font-semibold">${recipe.strMeal}</h3>
                <div class="mt-2 flex items-center justify-between text-sm text-secondary/70">
                    <span>${recipe.strArea} • ${recipe.strCategory}</span>
                    <a href="" class="text-accent font-medium">View Recipe</a>
                </div>
            </div>
        `;
            article.addEventListener("click", () => showMealDetails(recipe.idMeal));
            recipeCards.appendChild(article);

        });
};


//search items
searchItem.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        let item = searchItem.value.trim();
        searchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
        searchItem.value = "";
    }
});
searchBtn.addEventListener("click", e => {
    e.preventDefault();
    let item = searchItem.value.trim();
    searchMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
    searchItem.value = "";

});
//search by category
categorySelect.addEventListener("change", () => {
    if (categorySelect.value) searchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySelect.value}`);
});

//search by area
areaSelect.addEventListener("change", () => {
    if (areaSelect.value) searchMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaSelect.value}`);
});

searchMeals = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            recipeCards.innerHTML = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    let article = document.createElement("article");
                    article.classList.add("group", "bg-white", "rounded-2xl", "overflow-hidden", "shadow-soft", "border", "border-black/5");
                    article.setAttribute("data-aos", "zoom-in");
                    article.innerHTML = `
                    <img src="${meal.strMealThumb}" class="h-44 w-full object-cover group-hover:scale-105 transition" alt="${meal.strMeal}" />
                    <div class="p-4">
                        <h3 class="font-semibold">${meal.strMeal}</h3>
                        <div class="mt-2 flex items-center justify-between text-sm text-secondary/70">
                            <span>${meal.strArea} • ${meal.strCategory}</span>
                            <a href="" class="text-accent font-medium">View Recipe</a>
                        </div>
                    </div>
                `;
                    article.addEventListener("click", () => showMealDetails(meal.idMeal));
                    recipeCards.appendChild(article);
                });
            } else {
                recipeCards.innerHTML = "<h2 class='text-center text-2xl'>No recipes found</h2>";
            }
        })
        .catch(error => console.error("Error : ", error));
}
showMealDetails=(id)=>{
    localStorage.setItem("mealId", id);
    window.location.href = "recipeItem.html";
}