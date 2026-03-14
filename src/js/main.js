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
}

init();