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

//Add comments
const comments = [
    {id:1,pImg:"assets/images/p2.jpeg",title:"Spaghetti Bolognese",shares:"2 Shares",commenter:"Rishindu Yohan",comment:"“ I have to say, your Spaghetti Bolognese recipe is nothing short of amazing! I've always been a fan of Italian cuisine, but I was a bit intimidated by the idea of making this classic at home”"},
    {id:2,pImg:"assets/images/p3.jpeg",title:"Chicken Alfredo",shares:"5 Shares",commenter:"Jane Doe",comment:"“ I recently tried your Chicken Alfredo recipe, and I have to say, it was absolutely delicious! The creamy sauce paired perfectly with the tender chicken and fettuccine pasta. It was a hit with my family, and I'll definitely be making it again soon.”"},
    {id:3,pImg:"assets/images/p4.jpg",title:"Vegetable Stir Fry",shares:"3 Shares",commenter:"Susan H",comment:"“ Your Vegetable Stir Fry recipe is a game changer! It's so quick and easy to make, and the flavors are incredible. I love how versatile it is – I can use whatever veggies I have on hand.”"},
    {id:4,pImg:"assets/images/p1.jpg",title:"Beef Tacos",shares:"4 Shares",commenter:"Mike Johnson",comment:"“ I made your Beef Tacos for dinner last night, and they were a huge hit! The seasoning was perfect, and I loved the fresh toppings. I'll definitely be adding this recipe to my regular rotation.”"}
]
const commentContainer = document.getElementById("commentContainer");

for(let i=0;i<6;i++){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        let recipe = data.meals[0];
        let comment = comments[i];
        let article = document.createElement("article");
        article.classList.add("rounded-2xl", "border", "border-black/5", "shadow-soft", "p-5");
        article.setAttribute("data-aos", "zoom-in");
        article.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${comment.pImg}" alt="man" class="w-auto h-10 rounded-full">
            <div>
                <h3 class="font-semibold">${recipe.strMeal}</h3>
                <p class="text-sm text-secondary/70">by ${comment.commenter}</p>
            </div>
        </div>
        <p class="mt-3 text-sm text-secondary/80">“ ${comment.comment}”</p>
        <img src="${recipe.strMealThumb}"
            class="h-44 w-full object-cover group-hover:scale-105 transition"
            alt="Crunchy Potatoes" />
            <div class="mt-4 text-xs text-secondary/60">${comment.shares}</div>

        `;

        commentContainer.appendChild(article);
    });
}
