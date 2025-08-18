console.log("Hello, Chop-shock Restaurant!");

const restaurantList = document.getElementById("restaurant-list");
const restaurants = ["Chop-shock", "Sushi Place", "Pasta House"];

restaurants.forEach(restaurant => {
    const div = document.createElement("div");
    div.textContent = restaurant;
    restaurantList.appendChild(div);
});
