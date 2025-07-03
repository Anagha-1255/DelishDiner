/*  recipes  */

function showdata() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {

        const myObj = JSON.parse(this.responseText);

        for (i = 0; i < myObj.recipes.length; i++) {


            var divbox = document.createElement("div");
            var img_data = document.createElement("img");
            var name_data = document.createElement("h1");
            // var instruction_data = document.createElement("h4");

            var prep_time = document.createElement("h4");           


            divbox.classList.add("recipe-card");
            img_data.classList.add("img-style");

            img_data.src = myObj.recipes[i].image;
            name_data.innerHTML = myObj.recipes[i].name;
            // instruction_data.innerHTML = myObj.recipes[i].instructions;
            prep_time.innerHTML ="Prep Time: " + myObj.recipes[i].prepTimeMinutes + " minutes";

            divbox.appendChild(img_data);
            divbox.appendChild(name_data);
            // divbox.appendChild(instruction_data);
            divbox.appendChild(prep_time);

            document.getElementById("show-items").appendChild(divbox);
        }

    }
    xmlhttp.open("GET", "https://dummyjson.com/recipes");
    xmlhttp.send();
}


/*products*/

let allProducts = [];
let categories = new Set();

function fetchProducts() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const response = JSON.parse(this.responseText);
        allProducts = response.products;
        categories = new Set(allProducts.map(p => p.category));
        displayCategories();
        displayProducts(allProducts);
    }
    xmlhttp.open("GET", "https://dummyjson.com/products");
    xmlhttp.send();
}

function displayCategories() {
    const categoryButtonsDiv = document.getElementById("category-buttons");
    categoryButtonsDiv.innerHTML = '<button class="category-btn" onclick="displayProducts(allProducts)">All</button>';
    categories.forEach(category => {
        const button = document.createElement("button");
        button.classList.add("category-btn");
        button.innerText = category;
        button.onclick = () => filterByCategory(category);
        categoryButtonsDiv.appendChild(button);
    });
}

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");

        let productImg = document.createElement("img");
        productImg.src = product.thumbnail;

        let productTitle = document.createElement("h3");
        productTitle.innerText = product.title;

        let productPrice = document.createElement("h3");
        productPrice.classList.add("price");
        productPrice.innerText = "$" + product.price;

        let productDesc = document.createElement("p");
        productDesc.innerText = product.description;

        let productCatg = document.createElement("p");
        productCatg.classList.add("category");
        productCatg.innerText = product.category;

        productCard.appendChild(productImg);
        productCard.appendChild(productTitle);
        productCard.appendChild(productPrice);
        productCard.appendChild(productDesc);
        productCard.appendChild(productCatg);

        productList.appendChild(productCard);
    });
}

function filterByCategory(category) {
    const filteredProducts = allProducts.filter(product => product.category === category);
    displayProducts(filteredProducts);
}


/*team section*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getTeam() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        const myObj = JSON.parse(this.responseText);
        document.getElementById("team-div").innerHTML = ""; // Clear previous results
        myObj.users.forEach(user => {
            let userDiv = document.createElement("div");
            userDiv.classList.add("user-div-style");

            let userImg = document.createElement("img");
            userImg.src = user.image;

            let userDetails = document.createElement("div");
            userDetails.classList.add("user-div-deat");

            let userName = document.createElement("h3");
            userName.textContent = `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`;

            let userGender = document.createElement("h4");
            userGender.textContent = `Gender: ${capitalizeFirstLetter(user.gender)}`;
           
            let userAge = document.createElement("h4");
            userAge.textContent = `Age: ${user.age}`;

            let userLoc = document.createElement("h4");
            userLoc.textContent = `City: ${capitalizeFirstLetter(user.address.city)}`;

            userDetails.append(userName, userGender, userAge, userLoc);
            userDiv.append(userImg, userDetails);

            document.getElementById("team-div").appendChild(userDiv);
        });
    }
    xmlhttp.open("GET", "https://dummyjson.com/users");
    xmlhttp.send();
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.team');
    pages.forEach(team => team.style.display = 'none');

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}

function showPages(pageId) {
    // Hide all pages
    const page = document.querySelectorAll('.products');
    page.forEach(products => products.style.display = 'none');

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}

function showPager(pageId) {
    // Hide all pages
    const pagers = document.querySelectorAll('.recipes');
    pagers.forEach(recipes => recipes.style.display = 'none');

    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
}
