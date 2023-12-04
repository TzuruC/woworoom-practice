// 連接 html 框架

//  - C3 表格
let chart = c3.generate({
    bindto: '#chart', // HTML 元素綁定
    data: {
        type: "pie",
        columns: [
            ['Louvre 雙人床架', 1],
            ['Antony 雙人床架', 2],
            ['Anty 雙人床架', 3],
            ['其他', 4],
        ],
        colors: {
            "Louvre 雙人床架": "#DACBFF",
            "Antony 雙人床架": "#9D7FEA",
            "Anty 雙人床架": "#5434A7",
            "其他": "#301E5F",
        }
    },
});

//  - 訂單資料
const discardAllBtn = document.querySelector(".discardAllBtn"); // 刪除全部訂單 // 與刪除所有購物車內容重複宣告
const orderPageTable = document.querySelector(".orderPage-table"); // 渲染收到訂單資料
const delSingleOrderBtn = document.querySelectorAll(".delSingleOrder-Btn");

const api_url = "https://livejs-api.hexschool.io/api/livejs/v1/admin";
const api_path = "rxzan";
const token = "qBHJXrpBrwdkIMnsz1kD5HcDZrB3";


// 連接 api 資料
// 取得訂單列表
function renderOrderList() {
    axios.get(`${api_url}/${api_path}/orders`, {
        headers: {
            "authorization": token
        }
    })
        .then(function (res) {
            let renderOrderItem = ``;
            let orders = res.data.orders;
            console.log(orders);

            orders.forEach((i) => {
                renderOrderItem += `
                <tr>
                    <td>${i.id}</td>
                    <td>
                        <p>${i.user.name}</p>
                        <p>${i.user.tel}</p>
                    </td>
                    <td>${i.user.address}</td>
                    <td>${i.user.email}</td>
                    <td>
                        <p>
                        ${i.products.map((e)=> e.title + "*" + e.quantity).join('</br>')}
                        </p>
                    </td>
                    <td>${transDate(i.updatedAt)}</td>
                    <td class="orderStatus">
                        <a href="#">未處理</a>
                    </td>
                    <td>
                        <input type="button" class="delSingleOrder-Btn" value="刪除" />
                    </td>
                </tr>
                `;
            });
            orderPageTable.innerHTML = `
            <table class="orderPage-table">
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>聯絡人</th>
                            <th>聯絡地址</th>
                            <th>電子郵件</th>
                            <th>訂單品項</th>
                            <th>訂單日期</th>
                            <th>訂單狀態</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    ${renderOrderItem}
                    
                </table>
            `;
        })
        .catch(function (error) {
            console.log(error.response.data);
        })
}

renderOrderList();


// 將時間戳轉為 年/月/日
function transDate(timeStamp) {
    // 秒轉毫秒
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
