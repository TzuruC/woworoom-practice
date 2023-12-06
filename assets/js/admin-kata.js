const api_url = "https://livejs-api.hexschool.io/api/livejs/v1/admin";
const api_path = "rxzan";
const token = "qBHJXrpBrwdkIMnsz1kD5HcDZrB3";

const orderList = document.querySelector(".js-orderList");
let orderData = [];


function init(){
    getOrderList();
}
init(); // 畫面初始化

function renderC3(){
    //物件資料蒐集
    let total = {};
    orderData.forEach((item)=>{
        item.products.forEach((productItem)=>{
            if(total[productItem.category] == undefined){
                total[productItem.category] = productItem.price*productItem.quantity;
            }else{
                total[productItem.category] += productItem.price*productItem.quantity;
            }
        });
    });
    let categoryAry = Object.keys(total);
    let newData = [];
    categoryAry.forEach((item)=>{
        let ary= [];
        ary.push(item);
        ary.push(total[item]);
        newData.push(ary);
    });

//  - C3 表格
let chart = c3.generate({
    bindto: '#chart', // HTML 元素綁定
    data: {
        type: "pie",
        columns: newData,        
    },
});
}

// 取得訂單列表
function getOrderList() {
    axios.get(`${api_url}/${api_path}/orders`, {
        headers: {
            "authorization": token
        }
    })
        .then(function (res) {
            orderData = res.data.orders;
            let str = "";
            orderData.forEach((item) => {
                // 組產品字串
                let productStr = "";
                item.products.forEach((productItem)=>{
                    productStr+=`<p>${productItem.title} × ${productItem.quantity}</p>`;
                });
                // 判斷訂單處理狀態
                let orderStatus = "";
                item.paid ? orderStatus="已處理" : orderStatus="未處理";
                // 組訂單字串

                str+=`<tr>
                <td>${item.id}</td>
                <td>
                    <p>${item.user.name}</p>
                    <p>${item.user.tel}</p>
                </td>
                    <td>${item.user.address}</td>
                    <td>${item.user.email}</td>
                <td>
                ${productStr}
                </td>
                <td>${transDate(item.createdAt)}</td>
                <td class="js-orderStatus">
                    <a href="#" class="orderStatus" data-id="${item.id}" data-status="${orderStatus}"> ${orderStatus} </a>
                </td>
                <td>
                    <input type="button" class="delSingleOrder-Btn js-orderDelete" data-id="${item.id}" value="刪除" />
                </td>
                </tr>`;
            });
            orderList.innerHTML = str;
            renderC3();
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

// 未處理、刪除按鈕
orderList.addEventListener('click', (e)=>{
    e.preventDefault();
    const targetClass = e.target.getAttribute("class");
    let id = e.target.getAttribute("data-id");

    // 刪除按鈕
    if(targetClass == "delSingleOrder-Btn js-orderDelete"){
        deleteOrderItem(id);
        return;
    }
    // 訂單狀態按鈕
    if(targetClass == "orderStatus"){
        let status = e.target.getAttribute("data-status")
        changeOrderStatus(status,id);
        return;
    }
});

function changeOrderStatus(status,id){
    let newStatus;
    if(status==true){
        newStatus = false;
    }else{
        newStatus = true;
    }
    axios.put(`${api_url}/${api_path}/orders`, {
        "data": {
            "id": id,
            "paid": newStatus
        }
    }, {
        headers: {
            "authorization": token
        }
    })
    .then(function (res) {
        alert("修改訂單狀態成功");
        getOrderList();
    })
}

function deleteOrderItem(id){
    axios.delete(`${api_url}/${api_path}/orders/${id}`, {
        headers: {
            "authorization": token
        }
    })
    .then(function (res) {
        alert("刪除成功");
        getOrderList();
    })
}



// 將時間戳轉為 年/月/日
function transDate(timeStamp) {
    // 秒轉毫秒 new Date(13碼)
    const msecTime = timeStamp * 1000;
    const date = new Date(msecTime);
    // 擷取日期
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份是從0開始的，所以需要加1
    const day = date.getDate();
    // 組合格式 2021/03/08
    const dateFormatted = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    return dateFormatted;
}


const discardAllBtn = document.querySelector('.discardAllBtn');
discardAllBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    axios.delete(`${api_url}/${api_path}/orders`, {
        headers: {
            "authorization": token
        }
    })
    .then(function (res) {
        alert("正在執行毀滅式刪除...");
        getOrderList();
    })
});