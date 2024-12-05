const products = [
  {
    id: 1,
    name: "CA Pro Classic Unisex Sneakers",
    price: 6399,
    org_price: 7999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380190/54/sv01/fnd/IND/fmt/png/CA-Pro-Classic-Unisex-Sneakers",
    color: "green",
    type: "shoe",
    incart: 0,
  },
  {
    id: 2,
    name: "Divecat V2 Lite Cat Unisex Slides",
    price: 1399,
    org_price: 1999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/386713/03/sv01/fnd/IND/fmt/png/Divecat-V2-Lite-Cat-Unisex-Slides",
    color: "navy blue",
    type: "slider",
    incart: 0,
  },
  {
    id: 3,
    name: "PUMA x one8 22 FH Rubber Unisex Cricket Shoes",
    price: 4869,
    org_price: 6499,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/106713/04/sv01/fnd/IND/fmt/png/PUMA-x-one8-22-FH-Rubber-Unisex-Cricket-Shoes",
    color: "orange",
    type: "shoe",
    incart: 0,
  },
  {
    id: 4,
    name: "Pacer Future Unisex Sneakers",
    price: 3849,
    org_price: 6999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/380367/01/sv01/fnd/IND/fmt/png/Pacer-Future-Unisex-Sneakers",
    color: "black",
    type: "shoe",
    incart: 0,
  },
  {
    id: 5,
    name: "Zeal Men's Sandals",
    price: 2249,
    org_price: 2999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/381396/01/sv01/fnd/IND/fmt/png/Zeal-Men's-Sandals",
    color: "blue",
    type: "sandals",
    incart: 0,
  },
  {
    id: 6,
    name: "PWR Frame OP-1 Equinox Unisex Sneakers",
    price: 6359,
    org_price: 11999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380698/01/sv01/fnd/IND/fmt/png/PWRFrame-OP-1-Equinox-Unisex-Sneakers",
    color: "white",
    type: "shoe",
    incart: 0,
  },
  {
    id: 7,
    name: "Skyrocket Lite Unisex Running Shoes",
    price: 3149,
    org_price: 4999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/379437/29/sv01/fnd/IND/fmt/png/Skyrocket-Lite-Unisex-Running-Shoes",
    color: "neon",
    type: "shoe",
    incart: 0,
  },
  {
    id: 8,
    name: "Graviton Pro Unisex Sneakers",
    price: 4409,
    org_price: 6999,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/380736/37/sv01/fnd/IND/fmt/png/Graviton-Pro-Unisex-Sneakers",
    color: "black",
    type: "shoe",
    incart: 0,
  },
];

const productList = document.querySelector(".product-list");
const carticondiv = document.querySelector(".cart");
const cartCountText = document.querySelector(".cart-count");
const cartDisplayCtn = document.querySelector(".cart-display-items");

products.forEach((product) => {
  const productCtn = document.createElement("div");
  productCtn.classList.add("product-ctn");

  const addToCarts = document.createElement("button");
  addToCarts.classList.add("add-to-cart");
  addToCarts.textContent = `Add to cart`;

  productCtn.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">
          ₹<span class="current-price">${product.price}</span>
          <span class="original-price">${product.org_price}</span>
        </p>`;

  addToCarts.addEventListener("click", function () {
    cart(product);
    setItems(product);
    totalPrice();
  });

  productCtn.appendChild(addToCarts);
  productList.appendChild(productCtn);
});

function reloadCart() {
  let totalItemsInCart = localStorage.getItem("cartQuant");

  if (totalItemsInCart === null) {
    localStorage.setItem("cartQuant", "0");
    cartCountText.textContent = `0`;
  } else {
    cartCountText.textContent = `${totalItemsInCart}`;
  }
}

function cart(product) {
  let totalItemsInCart = parseInt(localStorage.getItem("cartQuant")) || 0;
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  let isProductInCart = cartItems.find((item) => item.id === product.id);

  if (!isProductInCart) {
    totalItemsInCart++; // Adding one item if not already in the cart
    localStorage.setItem("cartQuant", totalItemsInCart);
    cartCountText.textContent = `${totalItemsInCart}`;
  } else {
    totalItemsInCart++; // Increment total items count if already in cart
    localStorage.setItem("cartQuant", totalItemsInCart);
    cartCountText.textContent = `${totalItemsInCart}`;
  }
}

function setItems(product) {
  let cartItemList = JSON.parse(localStorage.getItem("cartItems")) || [];
  let isProductInCart = cartItemList.find((item) => item.id === product.id);

  if (!isProductInCart) {
    const newProduct = { ...product, incart: 1 };
    cartItemList.push(newProduct);
  } else {
    if (isProductInCart.incart < 5) {
      isProductInCart.incart += 1;
    } else {
      document.querySelector(".max_limit").style.display = "block";
    }
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItemList));
  displayCartItems(JSON.stringify(cartItemList));
}

function displayCartItems(cartItems) {
  const parsedItems = JSON.parse(cartItems);
  cartDisplayCtn.innerHTML = "";

  let totalItemCount = 0; // Track total items in cart

  parsedItems.forEach((item) => {
    totalItemCount += item.incart; // Add item quantity to total

    const display_item = document.createElement("div");
    display_item.classList.add("display-item");
    display_item.innerHTML = `
      <div class="display-item-left">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="display-item-right">
        <h5>${item.name}</h5>
        <div class="display-item-price">
          <h5>₹ ${item.price}</h5>
        </div>
        <div class="quant-counter">
          <i class="fa-solid fa-minus"></i>
          <p>${item.incart}</p>
          <i class="fa-solid fa-plus"></i>
        </div>
        <div class="delete-icon">
          <i class="fa-solid fa-trash"></i>
        </div>
        <p class="max_limit" style="display:none;">Reached Your Limit</p>
      </div>`;

    const minusBtn = display_item.querySelector(".fa-minus");
    const plusBtn = display_item.querySelector(".fa-plus");
    const deleteBtn = display_item.querySelector(".fa-trash");
    const quantityText = display_item.querySelector(".quant-counter p");

    minusBtn.addEventListener("click", () => {
      if (item.incart > 1) {
        item.incart -= 1;
        quantityText.textContent = item.incart;
        updateCart(parsedItems);
        totalPrice();
      } else {
        alert("Use the trash icon to remove the item.");
      }
    });

    plusBtn.addEventListener("click", () => {
      if (item.incart < 5) {
        item.incart += 1;
        quantityText.textContent = item.incart;
        updateCart(parsedItems);
        totalPrice();
    
        // Hide the "Reached Your Limit" message if item is below the limit
        display_item.querySelector(".max_limit").style.display = "none";
      } else {
        // Show the "Reached Your Limit" message when quantity exceeds 5
        display_item.querySelector(".max_limit").style.display = "block";
      }
    });
    

    deleteBtn.addEventListener("click", () => {
      const index = parsedItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (index > -1) {
        parsedItems.splice(index, 1);
        updateCart(parsedItems);
        displayCartItems(JSON.stringify(parsedItems));
        totalPrice();
      }
    });

    cartDisplayCtn.appendChild(display_item);
  });

  localStorage.setItem("cartItems", JSON.stringify(parsedItems)); // Update cart in localStorage
  localStorage.setItem("cartQuant", totalItemCount); // Update total items count
  cartCountText.textContent = totalItemCount; // Display total items count
}

function updateCart(parsedItems) {
  localStorage.setItem("cartItems", JSON.stringify(parsedItems));
  displayCartItems(JSON.stringify(parsedItems));
  totalPrice();
}

function totalPrice() {
  let total = 0;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach((item) => {
    total += item.price * item.incart;
  });
  document.querySelector(".price-checkout").textContent = `₹ ${total}`;
}

// Update the cart on each page load
reloadCart();
