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
    if (category == '全部') {
        renderProductList();
        return;
    };
    let str = "";
    productData.forEach((item) => {
        if (item.category == category) {
            str += combineProductHTMLItem(item);
        };
    });
    productList.innerHTML = str;
});

// 重構 product item HTML
function combineProductHTMLItem(item) {
    return `
    <li class="productCard">
    <h4 class="productType">${item.category}</h4>
    <img
    src="${item.images}"
    alt=""
    />
    <a href="#" class="addCardBtn" data-id="${item.id}" data-product="${item.title}">加入購物車</a>
    <h3>${item.title}</h3>
    <del class="originPrice">NT$ ${new Intl.NumberFormat('en-IN').format(item.origin_price)}</del>
    <p class="nowPrice">NT$ ${new Intl.NumberFormat('en-IN').format(item.price)}</p>
    </li>
    `;
}

// 點擊加入購物車
// js-addCart 改為 addCardBtn
productList.addEventListener('click', (e) => {
    e.preventDefault();
    let addCartClass = e.target.getAttribute("class");
    if (addCartClass !== "addCardBtn") {
        return;
    }

    let productId = e.target.getAttribute('data-id');
    let numCheck = 1;
    cartData.forEach((item) => {
        if (item.product.id === productId) {
            numCheck = item.quantity += 1;
        };
    });

    axios.post(`${api_url}/${api_path}/carts`, {
        "data": {
            "productId": productId,
            "quantity": numCheck
        }
    })
        .then(function (res) {
            const cartProductName = e.target.getAttribute('data-product');
            alert(`"${cartProductName}" 已加入購物車`);
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
            document.querySelector('.js-total').textContent = new Intl.NumberFormat('en-IN').format(res.data.finalTotal);
            let str = "";
            cartData.forEach((item) => {
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
                        <a href="#" class="material-icons" data-id="${item.id}" data-product="${item.product.title}"> clear </a>
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

// 刪除特定筆購物車商品
cartList.addEventListener('click', (e) => {
    e.preventDefault();
    const cartId = e.target.getAttribute('data-id');
    const cartProductName = e.target.getAttribute('data-product');
    if (cartId == null) {
        return;
    };
    axios.delete(`${api_url}/${api_path}/carts/${cartId}`)
        .then(function (res) {
            alert(`已刪除 "${cartProductName}"`);
            getCartList();
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
});

// 刪除所有購物車內容
const discardAllBtn = document.querySelector('.discardAllBtn');
discardAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    axios.delete(`${api_url}/${api_path}/carts`)
        .then(function (res) {
            alert(`已刪除所有購物車內容`);
            getCartList();
        })
        .catch(function (error) {
            alert(`購物車中已無商品`);
        })
});
// 記錄點︰90分鐘


//送出訂單
const orderInfoBtn = document.querySelector('.orderInfo-btn');
orderInfoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //1. 購物車中要有品項
    if (cartData.length == 0) {
        alert('訂單送出失敗：購物車中沒有任何商品');
        return;
    };
    //2. 資料須填寫完整
    const customerName = document.querySelector('#customerName').value;
    const customerPhone = document.querySelector('#customerPhone').value;
    const customerEmail = document.querySelector('#customerEmail').value;
    const customerAddress = document.querySelector('#customerAddress').value;
    const tradeWay = document.querySelector('#tradeWay').value;
    if (customerName == "" || customerPhone == "" || customerEmail == "" || customerAddress == "" || tradeWay == "") {
        alert('還有資料未填寫');
        return;
    }
    if (validateEmail(customerEmail)==false){
        alert("請填寫正確的Email");
        return;
      }
    axios.post(`${api_url}/${api_path}/orders`, {
        "data": {
            "user": {
                "name": customerName,
                "tel": customerPhone,
                "email": customerEmail,
                "address": customerAddress,
                "payment": tradeWay
            }
        }
    })
        .then(function (res) {
            alert('成功送出訂單');
            document.querySelector('#customerName').value = "";
            document.querySelector('#customerPhone').value = "";
            document.querySelector('#customerEmail').value = "";
            document.querySelector('#customerAddress').value = "";
            document.querySelector('#tradeWay').value = "ATM";
            getCartList();
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
});

//建議前後台加總 8 小時內完成


// 表單驗證
const customerEmail = document.querySelector("#customerEmail");
customerEmail.addEventListener("blur", function (e) {
    if (validateEmail(customerEmail.value) == false) {
        document.querySelector(`[data-message=Email]`).textContent = "請填寫正確 Email 格式";
        return;
    }
})

// validate.js
const inputs = document.querySelectorAll("input[name],select[data=payment]");
console.log(inputs);
const form = document.querySelector(".orderInfo-form");
const constraints = {
    "姓名": {
        presence: {
            message: "必填欄位"
        }
    },
    "電話": {
        presence: {
            message: "必填欄位"
        },
        length: {
            minimum: 8,
            message: "需超過 8 碼"
        }
    },
    "信箱": {
        presence: {
            message: "必填欄位"
        },
        email: {
            message: "格式錯誤"
        }
    },
    "寄送地址": {
        presence: {
            message: "必填欄位"
        }
    },
    "交易方式": {
        presence: {
            message: "必填欄位"
        }
    },
};


inputs.forEach((item) => {
    // change, blur(移開焦點), input(填寫值改變時觸發)
    item.addEventListener("change", function () {

        item.nextElementSibling.textContent = '';
        let errors = validate(form, constraints) || '';

        if (errors) {
            Object.keys(errors).forEach(function (keys) {
                console.log(document.querySelector(`[data-message=${keys}]`))
                document.querySelector(`[data-message="${keys}"]`).textContent = errors[keys];
            })
        }
    });
});

// email驗證
function validateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true
    }
    return false;
}
function validatePhone(phone) {
    if (/^[09]{2}\d{8}$/.test(phone)) {
        return true
    }
    return false;
}
