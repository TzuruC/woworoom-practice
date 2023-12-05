import"./main-8913e1af.js";document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".recommendation-wall");t.style.cursor="grab";let e={top:0,left:0,x:0,y:0};const r=function(c){t.style.cursor="grabbing",t.style.userSelect="none",e={left:t.scrollLeft,top:t.scrollTop,x:c.clientX,y:c.clientY},document.addEventListener("mousemove",o),document.addEventListener("mouseup",n)},o=function(c){const l=c.clientX-e.x,y=c.clientY-e.y;t.scrollTop=e.top-y,t.scrollLeft=e.left-l},n=function(){t.style.cursor="grab",t.style.removeProperty("user-select"),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)};t.addEventListener("mousedown",r)});let h=document.querySelector(".menuToggle"),$=document.querySelectorAll(".topBar-menu a"),d=document.querySelector(".topBar-menu");h.addEventListener("click",L);$.forEach(t=>{t.addEventListener("click",q)});function L(){d.classList.contains("openMenu")?d.classList.remove("openMenu"):d.classList.add("openMenu")}function q(){d.classList.remove("openMenu")}const a="https://livejs-api.hexschool.io/api/livejs/v1/customer",s="rxzan",m=document.querySelector(".productWrap"),S=document.querySelector(".productSelect"),f=document.querySelector(".shoppingCart-tableList");let p=[],i=[];function E(){N(),u()}E();function N(){axios.get(`${a}/${s}/products`).then(function(t){p=t.data.products,g()}).catch(function(t){console.log(t.response.data)})}function g(){let t="";p.forEach(e=>{t+=v(e),m.innerHTML=t})}S.addEventListener("change",t=>{console.log(t.target.value);const e=t.target.value;if(e=="全部"){g();return}let r="";p.forEach(o=>{o.category==e&&(r+=v(o))}),m.innerHTML=r});function v(t){return`
    <li class="productCard">
    <h4 class="productType">${t.category}</h4>
    <img
    src="${t.images}"
    alt=""
    />
    <a href="#" class="addCardBtn" data-id="${t.id}" data-product="${t.title}">加入購物車</a>
    <h3>${t.title}</h3>
    <del class="originPrice">NT$${new Intl.NumberFormat("en-IN").format(t.origin_price)}</del>
    <p class="nowPrice">NT$${new Intl.NumberFormat("en-IN").format(t.price)}</p>
    </li>
    `}m.addEventListener("click",t=>{if(t.preventDefault(),t.target.getAttribute("class")!=="addCardBtn")return;let r=t.target.getAttribute("data-id"),o=1;i.forEach(n=>{n.product.id===r&&(o=n.quantity+=1)}),axios.post(`${a}/${s}/carts`,{data:{productId:r,quantity:o}}).then(function(n){const c=t.target.getAttribute("data-product");alert(`"${c}" 已加入購物車`),u()}).catch(function(n){console.log(n.response.data)})});function u(){axios.get(`${a}/${s}/carts`).then(function(t){i=t.data.carts,document.querySelector(".js-total").textContent=new Intl.NumberFormat("en-IN").format(t.data.finalTotal);let e="";i.forEach(r=>{e+=`
                <tr>
                    <td>
                        <div class="cardItem-title">
                            <img src="${r.product.images}" alt="" />
                            <p>${r.product.title}</p>
                        </div>
                    </td>
                    <td>NT$${new Intl.NumberFormat("en-IN").format(r.product.price)}</td>
                    <td>${r.quantity}</td>
                    <td>NT$${new Intl.NumberFormat("en-IN").format(r.product.price*r.quantity)}</td>
                    <td class="discardBtn">
                        <a href="#" class="material-icons" data-id="${r.id}" data-product="${r.product.title}"> clear </a>
                    </td>
                </tr>
                `}),f.innerHTML=e}).catch(function(t){console.log(t.response.data)})}f.addEventListener("click",t=>{t.preventDefault();const e=t.target.getAttribute("data-id"),r=t.target.getAttribute("data-product");e!=null&&axios.delete(`${a}/${s}/carts/${e}`).then(function(o){alert(`已刪除 "${r}"`),u()}).catch(function(o){console.log(o.response.data)})});const b=document.querySelector(".discardAllBtn");b.addEventListener("click",t=>{t.preventDefault(),axios.delete(`${a}/${s}/carts`).then(function(e){alert("已刪除所有購物車內容"),u()}).catch(function(e){alert("購物車中已無商品")})});const I=document.querySelector(".orderInfo-btn");I.addEventListener("click",t=>{if(t.preventDefault(),i.length==0){alert("訂單送出失敗：購物車中沒有任何商品");return}const e=document.querySelector("#customerName").value,r=document.querySelector("#customerPhone").value,o=document.querySelector("#customerEmail").value,n=document.querySelector("#customerAddress").value,c=document.querySelector("#tradeWay").value;if(e==""||r==""||o==""||n==""||c==""){alert("還有資料未填寫");return}axios.post(`${a}/${s}/orders`,{data:{user:{name:e,tel:r,email:o,address:n,payment:c}}}).then(function(l){alert("成功送出訂單"),document.querySelector("#customerName").value="",document.querySelector("#customerPhone").value="",document.querySelector("#customerEmail").value="",document.querySelector("#customerAddress").value="",document.querySelector("#tradeWay").value="ATM",u()}).catch(function(l){console.log(l.response.data)})});
