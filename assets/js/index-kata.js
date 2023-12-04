const api_url = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const api_path = "rxzan";
const token = "qBHJXrpBrwdkIMnsz1kD5HcDZrB3";

const productList = document.querySelector('.productWrap');
const productSelect = document.querySelector('.productSelect');
const cartList = document.querySelector('.shoppingCart-tableList');


let productData = [];

function init() {
    getProductList();
}

init();

function getProductList() {
    axios.get(`${api_url}/${api_path}/products`)
        .then(function (res) {
            productData = res.data.products;
            renderProductList();
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}
// 記錄點︰30~50分鐘

productSelect.addEventListener('change', (e) => {
    console.log(e.target.value);
});

function renderProductList() {
    let str = "";
    productData.forEach((item) => {
        str += `
    <li class="productCard">
    <h4 class="productType">${item.category}</h4>
    <img
    src="${item.images}"
    alt=""
    />
    <a href="#" class="addCardBtn">加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">NT$${new Intl.NumberFormat('en-IN').format(item.origin_price)}</del>
    <p class="nowPrice">NT$${new Intl.NumberFormat('en-IN').format(item.price)}</p>
    </li>
    `;
        productList.innerHTML = str;
    });
}