import"./main-8913e1af.js";let $=document.querySelector(".menuToggle"),h=document.querySelectorAll(".topBar-menu a"),o=document.querySelector(".topBar-menu");$.addEventListener("click",f);h.forEach(e=>{e.addEventListener("click",g)});function f(){o.classList.contains("openMenu")?o.classList.remove("openMenu"):o.classList.add("openMenu")}function g(){o.classList.remove("openMenu")}const d="https://livejs-api.hexschool.io/api/livejs/v1/admin",u="rxzan",i="qBHJXrpBrwdkIMnsz1kD5HcDZrB3";c3.generate({bindto:"#chart",data:{type:"pie",columns:[["Louvre 雙人床架",1],["Antony 雙人床架",2],["Anty 雙人床架",3],["其他",4]],colors:{"Louvre 雙人床架":"#DACBFF","Antony 雙人床架":"#9D7FEA","Anty 雙人床架":"#5434A7",其他:"#301E5F"}}});let l=[];const p=document.querySelector(".js-orderList");function m(){c()}m();function c(){axios.get(`${d}/${u}/orders`,{headers:{authorization:i}}).then(function(e){l=e.data.orders;let r="";l.forEach(t=>{let a="";t.products.forEach(s=>{a+=`<p>${s.title} × ${s.quantity}</p>`});let n="";t.paid?n="已處理":n="未處理",r+=`<tr>
                <td>${t.id}</td>
                <td>
                    <p>${t.user.name}</p>
                    <p>${t.user.tel}</p>
                </td>
                    <td>${t.user.address}</td>
                    <td>${t.user.email}</td>
                <td>
                ${a}
                </td>
                <td>${S(t.updatedAt)}</td>
                <td class="js-orderStatus">
                    <a href="#" class="orderStatus" data-id="${t.id}" data-status="${n}"> ${n} </a>
                </td>
                <td>
                    <input type="button" class="delSingleOrder-Btn js-orderDelete" data-id="${t.id}" value="刪除" />
                </td>
                </tr>`}),p.innerHTML=r}).catch(function(e){console.log(e.response.data)})}p.addEventListener("click",e=>{e.preventDefault();const r=e.target.getAttribute("class");let t=e.target.getAttribute("data-id");if(r=="delSingleOrder-Btn js-orderDelete"&&L(t),r=="orderStatus"){let a=e.target.getAttribute("data-status");y(a,t)}});function y(e,r){let t;e==!0?t=!1:t=!0,axios.put(`${d}/${u}/orders`,{data:{id:r,paid:t}},{headers:{authorization:i}}).then(function(a){alert("修改訂單狀態成功"),c()})}function L(e){axios.delete(`${d}/${u}/orders/${e}`,{headers:{authorization:i}}).then(function(r){alert("刪除成功"),c()})}function S(e){const r=e*1e3,t=new Date(r),a=t.getFullYear(),n=t.getMonth()+1,s=t.getDate();return`${a}/${n<10?"0"+n:n}/${s<10?"0"+s:s}`}
