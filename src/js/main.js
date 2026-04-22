import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

const productLinks = {
    "880RR": "product_pages/marmot-ajax-3.html",
    "985RF": "product_pages/northface-talus-4.html",
    "985PR": "product_pages/northface-alpine-3.html",
    "344YJ": "product_pages/cedar-ridge-rimrock-2.html",
};

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="${productLinks[product.Id] || "#"}">
            <img src="${product.Image}" alt="${product.NameWithoutBrand}" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
            </li>
        `;



}

async function init() {
    const products = await dataSource.getData();
    const visibleProducts = products.filter((p) => productLinks[p.Id]);

    const htmlItems = visibleProducts.map(productCardTemplate).join("");
    listElement.innerHTML = htmlItems;
    
    // Add event listeners to product cards for interactivity
    addProductCardEvents();
}

// EVENT 1: Mouseover event - Add visual feedback when hovering over product cards
function addProductCardEvents() {
    const productCards = document.querySelectorAll(".product-card");
    
    productCards.forEach((card) => {
        card.addEventListener("mouseover", (e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        });
        
        // EVENT 2: Mouseout event - Remove visual feedback when leaving product cards
        card.addEventListener("mouseout", (e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
        });
        
        // EVENT 3: Focus event - Add visual feedback when tabbing to product links for accessibility
        const link = card.querySelector("a");
        if (link) {
            link.addEventListener("focus", (e) => {
                e.currentTarget.style.outline = "3px solid #0066cc";
            });
            
            // EVENT 4: Blur event - Remove focus style when moving away
            link.addEventListener("blur", (e) => {
                e.currentTarget.style.outline = "none";
            });
        }
    });
}

// EVENT 5: DOMContentLoaded - Ensure all DOM elements are ready before interacting
document.addEventListener("DOMContentLoaded", () => {
    init();
});