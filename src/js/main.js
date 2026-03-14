import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="#">
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
    const firstFour = products.slice(0, 4);

    const htmlItems = firstFour.map(productCardTemplate).join("");
    listElement.innerHTML = htmlItems;
}

init();