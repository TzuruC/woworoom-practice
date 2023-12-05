const api_url = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const api_path = "rxzan";
const token = "qBHJXrpBrwdkIMnsz1kD5HcDZrB3";

const productList = document.querySelector('.productWrap');
const productSelect = document.querySelector('.productSelect');
const cartList = document.querySelector('.shoppingCart-tableList');

let productData = [];
let cartData = [];

function init() {
    getProductList();
    getCartList();
}

init(); //畫面初始化

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

// 渲染畫面
function renderProductList() {
    let str = "";
    productData.forEach((item) => {
        str += combineProductHTMLItem(item);
        productList.innerHTML = str;
    });
}

// 篩選條件
productSelect.addEventListener('change', (e) => {
    console.log(e.target.value);
    const category = e.target.value;
    if(category == '全部'){
        renderProductList();
        return;
    };
    let str = "";
    productData.forEach((item) => {
        if(item.category == category){
            str += combineProductHTMLItem(item);            
        };
    });
    productList.innerHTML = str;
});

// 重構 product item HTML
function combineProductHTMLItem(item){
    return `
    <li class="productCard">
    <h4 class="productType">${item.category}</h4>
    <img
    src="${item.images}"
    alt=""
    />
    <a href="#" class="addCardBtn" data-id="${item.id}">加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">NT$${new Intl.NumberFormat('en-IN').format(item.origin_price)}</del>
    <p class="nowPrice">NT$${new Intl.NumberFormat('en-IN').format(item.price)}</p>
    </li>
    `;
}

// 點擊加入購物車
// js-addCart 改為 addCardBtn
productList.addEventListener('click',(e)=>{
    e.preventDefault();
    let addCartClass = e.target.getAttribute("class");
    if( addCartClass !== "addCardBtn"){
        return;
    }

    let productId = e.target.getAttribute('data-id');    
    let numCheck = 1;
    cartData.forEach((item)=>{
        if(item.product.id === productId){
            numCheck = item.quantity+=1;
        };
    });
    
    axios.post(`${api_url}/${api_path}/carts`, {
        "data": {
            "productId": productId,
            "quantity": numCheck
        }
    })
    .then(function (res) {
        alert("已加入購物車");
        getCartList();
    })
    .catch(function (error) {
        console.log(error.response.data);
    })
});

//取得購物車資料
function getCartList() {
    axios.get(`${api_url}/${api_path}/carts`)
        .then(function (res) {
            cartData = res.data.carts;
            let str = "";
            cartData.forEach((item)=>{
                str += `
                <tr>
                    <td>
                        <div class="cardItem-title">
                            <img src="${item.product.images}" alt="" />
                            <p>${item.product.title}</p>
                        </div>
                    </td>
                    <td>NT$${new Intl.NumberFormat('en-IN').format(item.product.price)}</td>
                    <td>${item.quantity}</td>
                    <td>NT$${new Intl.NumberFormat('en-IN').format((item.product.price * item.quantity))}</td>
                    <td class="discardBtn">
                        <a href="#" class="material-icons"> clear </a>
                    </td>
                </tr>
                `;
            });
            cartList.innerHTML = str;
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

