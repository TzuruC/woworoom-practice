// 連接 html 框架

// - 產品列表
const productSelect = document.querySelector(".productSelect"); //下拉篩選
const productWrap = document.querySelector(".productWrap"); // 渲染商品外層
const addCardBtn = document.querySelectorAll(".addCardBtn"); // 加入購物車

// - 購物車
const shoppingCartTable = document.querySelector(".shoppingCart-table"); // 渲染購物車中品項外層
const discardBtn = document.querySelectorAll(".discardBtn"); // 刪除一筆購物車資料
const discardAllBtn = document.querySelector(".discardAllBtn"); // 刪除所有購物車內容

// - 填寫預訂資料
const orderInfoInputWrap = document.querySelectorAll(".orderInfo-inputWrap"); // 所有表單填寫內容


// 連接 api 資料


//取得購物車列表
function getCartList() {
    axios.get(`${api_url}/${api_path}/carts`)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

//加入購物車 //*是否需要以 productId 為帶入參數? (範例沒有)
function addCart(productId, quantity) {
    axios.post(`${api_url}/${api_path}/carts`, {
        "data": {
            "productId": productId,
            "quantity": quantity
        }
    })
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

//清除購物車內全部產品
function deleteCart() {
    axios.delete(`${api_url}/${api_path}/carts`)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error.response.data); //如果有申請api_path，沒有個別 execute 也能抓到資料
        })
}

// 刪除購物車內特定產品
function deleteCartId(cartId) {
    axios.delete(`${api_url}/${api_path}/carts/${cartId}`)
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

// 送出購買訂單
function sendBuyOrder() {
    axios.post(`${api_url}/rxzan/orders`, {
        "data": {
            "user": {
                "name": "六角學院",
                "tel": "07-5313506",
                "email": "hexschool@hexschool.com",
                "address": "高雄市六角學院路",
                "payment": "Apple Pay"
            }
        }
    })
        .then(function (res) {
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

// 渲染 html 內容
const api_url = "https://livejs-api.hexschool.io/api/livejs/v1/customer";
const api_path = "rxzan";
const token = "qBHJXrpBrwdkIMnsz1kD5HcDZrB3";


// 取得產品列表
function getProductList() {
    axios.get(`${api_url}/${api_path}/products`)
        .then(function (res) {
            let products = res.data.products;
            products.forEach((i) => {
                productWrap.innerHTML += `
                <li class="productCard">
                <h4 class="productType">${i.category}</h4>
                <img
                src="${i.images}"
                alt=""
                />
                <a href="#" class="addCardBtn">加入購物車</a>
                <h3>${i.title}</h3>
                <del class="originPrice">NT$${i.origin_price}</del>
                <p class="nowPrice">NT$${i.price}</p>
                </li>
                `;
            });
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}


getProductList();

// 新增資料

// 刪除資料