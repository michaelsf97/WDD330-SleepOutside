import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  if (!cartItems.length) {
    document.querySelector(".product-list").innerHTML = "";
    return;
  }

  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Re-attach event listeners after rendering
  addCartItemEvents();
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="cart-card__remove" data-index="${index}">🗑</button>
</li>`;

  return newItem;
}

function removeFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(index, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

// EVENT 1: Click event with event delegation - Remove items from cart (existing functionality)
// Enhanced with additional event handling
function addCartItemEvents() {
  const productList = document.querySelector(".product-list");
  
  productList.addEventListener("click", (e) => {
    const button = e.target.closest(".cart-card__remove");
    if (!button) return;
    removeFromCart(Number(button.dataset.index));
  });
  
  // EVENT 2: Mouseover event - Visual feedback on cart items
  const cartCards = document.querySelectorAll(".cart-card");
  cartCards.forEach((card) => {
    card.addEventListener("mouseover", (e) => {
      e.currentTarget.style.backgroundColor = "#f5f5f5";
      e.currentTarget.style.borderLeft = "4px solid #0066cc";
    });
    
    // EVENT 3: Mouseout event - Remove visual feedback from cart items
    card.addEventListener("mouseout", (e) => {
      e.currentTarget.style.backgroundColor = "";
      e.currentTarget.style.borderLeft = "";
    });
  });
  
  // EVENT 4: Mouseover on delete button - Change cursor and color
  const deleteButtons = document.querySelectorAll(".cart-card__remove");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("mouseover", (e) => {
      e.target.style.fontSize = "1.5rem";
      e.target.style.cursor = "pointer";
    });
    
    btn.addEventListener("mouseout", (e) => {
      e.target.style.fontSize = "";
    });
  });
}

// EVENT 5: DOMContentLoaded - Initialize cart when page loads
document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
});
