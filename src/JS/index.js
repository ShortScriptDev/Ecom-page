let stateTax = 0.1;
let subtotal = 0;
let total = 0;
let orderIndex = 0;
let productId = 0;

function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartCountElement = document.querySelector('.cart-count');

    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length.toString();
    }
}
function updateTotal() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var subtotal = 0;

    // Calculate the subtotal
    cartItems.forEach(function (item) {
        subtotal += item.productPrice * item.quantity;
    });

    // Calculate taxes 
    var stateTax = 0.1;
    var taxes = subtotal * stateTax;

    // Calculate the total
    var total = subtotal + taxes;

    // Update the total display on page
    var totalElement = document.querySelector('.total');
    if (totalElement) {
        totalElement.textContent = '$' + total.toFixed(2);
    }
}

function addToCart(addedItem, productId) {
  let parentE = addedItem.parentElement;
  let parentOfParent = addedItem.parentElement.parentElement;

  //Got product name
  let itemName = parentE.querySelector(".product-title");
  let productName = itemName.innerHTML;

  // Get image with src class
  let itemImage = parentOfParent.querySelector(".product-img");
  let productImage = itemImage.src;
  
  let addBtn = parentE.querySelector(".bi-plus")
  addBtn.classList.add('addedborder')
  //Got product price
  let itemPrice = parentE.querySelector(".price");
  let productPrice = itemPrice.innerHTML;
  productPrice = productPrice.replace("$", "");
  productPrice = Number(productPrice);

  //Calculate totals
  subtotal += productPrice;
  taxes = subtotal * stateTax;
  total = subtotal + taxes;
  subtotal.toFixed(2);
  taxes.toFixed(2);
  total.toFixed(2);

  //Store item data in localstorage
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  var existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: productId,
      name: productName,
      image: productImage,
      productPrice: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  
    //Update changes for each function
  updateCartCount();
  updateTotal();

}
// cart functions
// add item to cart
function removeProduct(productId) {
  // Get the cartItems from localStorage
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the index of the item to modify
  var indexToModify = cartItems.findIndex(
    (item) => item.id.toString() === productId
  );

  // If the item is found, decrease the quantity
  if (indexToModify !== -1) {
    if (cartItems[indexToModify].quantity > 1) {
      // If quantity is greater than 1, decrease it
      cartItems[indexToModify].quantity -= 1;
    } else {
      // If quantity is 1, remove the item from the array
      cartItems.splice(indexToModify, 1);
    }

    // Update the localStorage with the modified cartItems array
    localStorage.setItem("cart", JSON.stringify(cartItems));

    //Update changes for each function
    displayCart();
    updateTotal();

  } else {
    console.log("Item not found in cart.");
  }
}

function displayCart() {
  // get the cartItems from localStorage
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  var cartContainer = document.getElementById("cart-container");

  // Clear the cart container
  cartContainer.innerHTML = "";

  // Display cart items on the cart page
  cartItems.forEach(function (item) {
    var productDiv = document.createElement("div");
    productDiv.innerHTML = `
            <img class="image" src="${item.image}"/>
            <h3>${item.name}</h3>
            <p>Price: $${item.productPrice.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-btn" onclick="removeProduct('${item.id}')">Remove</button>
        `;
    cartContainer.appendChild(productDiv);
    productDiv.classList.add('productitem')
  });
}
// Function to compare 2 arrays of objects
function arraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

//initial state of cartItems
var previousCartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Check for changes every second
setInterval(function () {
  // get the current state of cartItems
  var currentCartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Compare the current state with the previous state
  if (!arraysEqual(currentCartItems, previousCartItems)) {
    // If theres a change, update the previous state and call displayCart
    previousCartItems = currentCartItems;
    //Update changes for each function
    displayCart();
    updateCartCount();
    updateTotal();
  }
}, 1000); // Check every second 

// displayCart on page load
window.onload = function () {
  //Update changes for each function on page load
  displayCart();
  updateCartCount();
  updateTotal();
};

