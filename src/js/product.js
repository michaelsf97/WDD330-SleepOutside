import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Move button setup to a function so we can add multiple event listeners
function setupAddToCartButton() {
  const addToCartButton = document.getElementById("addToCart");
  
  // EVENT 1: Click event - Add product to cart (existing functionality)
  addToCartButton.addEventListener("click", addToCartHandler);
  
  // EVENT 2: Mouseover event - Visual feedback when hovering over button
  addToCartButton.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#0066cc";
    e.target.style.transform = "scale(1.05)";
    e.target.style.cursor = "pointer";
  });
  
  // EVENT 3: Mouseout event - Remove visual feedback
  addToCartButton.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "";
    e.target.style.transform = "scale(1)";
  });
  
  // EVENT 4: Keydown event - Support Enter key to add to cart
  addToCartButton.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const product = await dataSource.findProductById(e.target.dataset.id);
      addProductToCart(product);
    }
  });
}

// EVENT 5: DOMContentLoaded - Ensure button is ready before adding listeners
document.addEventListener("DOMContentLoaded", () => {
  setupAddToCartButton();
});
