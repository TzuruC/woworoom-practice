import"./main-8913e1af.js";c3.generate({bindto:"#chart",data:{type:"pie",columns:[["Louvre 雙人床架",1],["Antony 雙人床架",2],["Anty 雙人床架",3],["其他",4]],colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}});document.querySelector(".discardAllBtn");const d=document.querySelector(".orderPage-table");document.querySelectorAll(".delSingleOrder-Btn");const s="https://livejs-api.hexschool.io/api/livejs/v1/admin",c="rxzan",l="qBHJXrpBrwdkIMnsz1kD5HcDZrB3";function h(){axios.get(`${s}/${c}/orders`,{headers:{authorization:l}}).then(function(n){let o="",e=n.data.orders;console.log(e),e.forEach(t=>{o+=`
                <tr>
                    <td>${t.id}</td>
                    <td>
                        <p>${t.user.name}</p>
                        <p>${t.user.tel}</p>
                    </td>
                    <td>${t.user.address}</td>
                    <td>${t.user.email}</td>
                    <td>
                        <p>
                        ${t.products.map(r=>r.title+"*"+r.quantity).join("</br>")}
                        </p>
                    </td>
                    <td>${u(t.updatedAt)}</td>
                    <td class="orderStatus">
                        <a href="#">未處理</a>
                    </td>
                    <td>
                        <input type="button" class="delSingleOrder-Btn" value="刪除" />
                    </td>
                </tr>
                `}),d.innerHTML=`
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
                    ${o}
                    
                </table>
            `}).catch(function(n){console.log(n.response.data)})}h();function u(n){const o=n*1e3,e=new Date(o),t=e.getFullYear(),r=e.getMonth()+1,a=e.getDate();return`${t}/${r<10?"0"+r:r}/${a<10?"0"+a:a}`}
