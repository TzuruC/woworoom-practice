console.log("後台");

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
// const discardAllBtn = document.querySelector(".discardAllBtn"); // 刪除全部訂單 // 與刪除所有購物車內容重複宣告
const orderPageTable = document.querySelector(".orderPage-table"); // 渲染收到訂單資料
