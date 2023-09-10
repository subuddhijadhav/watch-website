console.log("connected");

//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};


//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//making function
function ready() {
    //removing items from cart
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons)
    for (var i = 0; i < reomveCartButtons.length; i++) {
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

//removing items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var prodcutImg = shopProducts.getElementsByClassName("prodcut-img")[0].src;
    console.log(title, price, prodcutImg);
    addProductToCart(title, price, prodcutImg);
    updatetotal();
}

function addProductToCart(title, price, prodcutImg) {
    var cartShopBox = document.createElement("div");
    // cartShopBox.classList.add('cart-box');
}


//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("Rs", " "));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        //if price contains some cent value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = "Rs " + total;
    }
}

ready();
updatetotal();
quantityChanged();
// addCart();
// addCartClicked();