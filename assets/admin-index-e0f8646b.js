import"./main-8913e1af.js";let h=document.querySelector(".menuToggle"),f=document.querySelectorAll(".topBar-menu a"),o=document.querySelector(".topBar-menu");h.addEventListener("click",g);f.forEach(t=>{t.addEventListener("click",$)});function g(){o.classList.contains("openMenu")?o.classList.remove("openMenu"):o.classList.add("openMenu")}function $(){o.classList.remove("openMenu")}const d="https://livejs-api.hexschool.io/api/livejs/v1/admin",i="rxzan",c="qBHJXrpBrwdkIMnsz1kD5HcDZrB3",p=document.querySelector(".js-orderList");let u=[];function y(){l()}y();function S(){let t={};u.forEach(n=>{n.products.forEach(r=>{t[r.category]==null?t[r.category]=r.price*r.quantity:t[r.category]+=r.price*r.quantity})});let a=Object.keys(t),e=[];a.forEach(n=>{let r=[];r.push(n),r.push(t[n]),e.push(r)}),c3.generate({bindto:"#chart",data:{type:"pie",columns:e}})}function l(){axios.get(`${d}/${i}/orders`,{headers:{authorization:c}}).then(function(t){u=t.data.orders;let a="";u.forEach(e=>{let n="";e.products.forEach(s=>{n+=`<p>${s.title} × ${s.quantity}</p>`});let r="";e.paid?r="已處理":r="未處理",a+=`<tr>
                <td>${e.id}</td>
                <td>
                    <p>${e.user.name}</p>
                    <p>${e.user.tel}</p>
                </td>
                    <td>${e.user.address}</td>
                    <td>${e.user.email}</td>
                <td>
                ${n}
                </td>
                <td>${B(e.createdAt)}</td>
                <td class="js-orderStatus">
                    <a href="#" class="orderStatus" data-id="${e.id}" data-status="${r}"> ${r} </a>
                </td>
                <td>
                    <input type="button" class="delSingleOrder-Btn js-orderDelete" data-id="${e.id}" value="刪除" />
                </td>
                </tr>`}),p.innerHTML=a,S()}).catch(function(t){console.log(t.response.data)})}p.addEventListener("click",t=>{t.preventDefault();const a=t.target.getAttribute("class");let e=t.target.getAttribute("data-id");if(a=="delSingleOrder-Btn js-orderDelete"){L(e);return}if(a=="orderStatus"){let n=t.target.getAttribute("data-status");v(n,e);return}});function v(t,a){let e;t==!0?e=!1:e=!0,axios.put(`${d}/${i}/orders`,{data:{id:a,paid:e}},{headers:{authorization:c}}).then(function(n){alert("修改訂單狀態成功"),l()})}function L(t){axios.delete(`${d}/${i}/orders/${t}`,{headers:{authorization:c}}).then(function(a){alert("刪除成功"),l()})}function B(t){const a=t*1e3,e=new Date(a),n=e.getFullYear(),r=e.getMonth()+1,s=e.getDate();return`${n}/${r<10?"0"+r:r}/${s<10?"0"+s:s}`}const D=document.querySelector(".discardAllBtn");D.addEventListener("click",t=>{t.preventDefault(),axios.delete(`${d}/${i}/orders`,{headers:{authorization:c}}).then(function(a){alert("正在執行毀滅式刪除..."),l()})});
