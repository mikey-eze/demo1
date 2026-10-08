const products=[
{id:1,name:"Essential T-Shirt",category:"Fashion",price:499,old:699,rating:4.8,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"},
{id:2,name:"Street Sneakers",category:"Sneakers",price:1499,old:1999,rating:4.9,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85"},
{id:3,name:"Studio Headphones",category:"Tech",price:999,old:1299,rating:4.7,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85"},
{id:4,name:"Daily Backpack",category:"Bags",price:799,old:1099,rating:4.8,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85"},
{id:5,name:"Minimal Watch",category:"Accessories",price:1299,old:1699,rating:4.6,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=85"},
{id:6,name:"Classic Hoodie",category:"Fashion",price:1199,old:1599,rating:4.8,image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85"},
{id:7,name:"Runner Pro",category:"Sneakers",price:1799,old:2299,rating:4.9,image:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=85"},
{id:8,name:"Wireless Earbuds",category:"Tech",price:1499,old:1999,rating:4.7,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85"},
{id:9,name:"Canvas Tote",category:"Bags",price:599,old:799,rating:4.5,image:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85"},
{id:10,name:"Everyday Cap",category:"Accessories",price:399,old:599,rating:4.6,image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=85"},
{id:11,name:"Oversized Tee",category:"Fashion",price:649,old:899,rating:4.8,image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=85"},
{id:12,name:"Tech Sling Bag",category:"Bags",price:899,old:1199,rating:4.7,image:"https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=85"}];
let cart=JSON.parse(localStorage.getItem("novaCart")||"[]"),wish=JSON.parse(localStorage.getItem("novaWish")||"[]"),category="All";
const $=id=>document.getElementById(id);
function save(){localStorage.setItem("novaCart",JSON.stringify(cart));localStorage.setItem("novaWish",JSON.stringify(wish))}
function filterCategory(c){category=c;renderChips();renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function renderChips(){const cats=["All","Fashion","Sneakers","Tech","Bags","Accessories"];$("chips").innerHTML=cats.map(c=>`<button class="chip ${category===c?"active":""}" onclick="filterCategory('${c}')">${c}</button>`).join("")}
function renderProducts(){let q=$("search").value.toLowerCase();let list=products.filter(p=>(category==="All"||p.category===category)&&p.name.toLowerCase().includes(q));const s=$("sort").value;if(s==="low")list.sort((a,b)=>a.price-b.price);if(s==="high")list.sort((a,b)=>b.price-a.price);if(s==="rating")list.sort((a,b)=>b.rating-a.rating);$("products").innerHTML=list.map(p=>`<article class="product"><button class="wish ${wish.includes(p.id)?"on":""}" onclick="toggleWish(${p.id})">${wish.includes(p.id)?"♥":"♡"}</button><img src="${p.image}" alt="${p.name}"><div class="product-info"><span class="tag">${p.category}</span><h3>${p.name}</h3><div class="rating">★ ${p.rating}</div><div class="price-row"><div><span class="price">₹${p.price}</span> <del>₹${p.old}</del></div><button class="add" onclick="add(${p.id})">Add</button></div></div></article>`).join("");$("empty").hidden=list.length>0}
function add(id){const x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});save();renderCart();toast("Added to cart")}
function change(id,n){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=n;if(x.qty<1)cart=cart.filter(i=>i.id!==id);save();renderCart()}
function renderCart(){let count=cart.reduce((a,b)=>a+b.qty,0),total=0;$("cartCount").textContent=count;$("cartItems").innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);total+=p.price*i.qty;return`<div class="cart-item"><img src="${p.image}"><div><strong>${p.name}</strong><div>₹${p.price}</div><div class="qty"><button onclick="change(${p.id},-1)">−</button><span>${i.qty}</span><button onclick="change(${p.id},1)">+</button></div></div><button class="close" onclick="change(${p.id},-${i.qty})">×</button></div>`}).join(""):"<p>Your cart is empty.</p>";$("cartTotal").textContent="₹"+total}
function toggleCart(){ $("cart").classList.toggle("open");$("overlay").classList.toggle("show")}
function toggleWish(id){wish.includes(id)?wish=wish.filter(x=>x!==id):wish.push(id);save();$("wishCount").textContent=wish.length;renderProducts()}
function toggleWishlist(){if(!wish.length)return toast("Your wishlist is empty");category="All";$("search").value="";let saved=products.filter(p=>wish.includes(p.id));$("products").innerHTML=saved.map(p=>`<article class="product"><button class="wish on" onclick="toggleWish(${p.id})">♥</button><img src="${p.image}"><div class="product-info"><span class="tag">Wishlist</span><h3>${p.name}</h3><div class="price-row"><span class="price">₹${p.price}</span><button class="add" onclick="add(${p.id})">Add</button></div></div></article>`).join("");document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function checkout(){if(!cart.length)return toast("Your cart is empty");alert("Demo checkout: order placed successfully!");cart=[];save();renderCart();toggleCart()}
function toggleTheme(){document.body.classList.toggle("dark");localStorage.setItem("novaDark",document.body.classList.contains("dark"))}
function showDeals(){filterCategory("All");$("sort").value="low";renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"});toast("Showing our best-value picks")}
function toast(msg){$("toast").textContent=msg;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),1800)}
function scrollToTop(){scrollTo({top:0,behavior:"smooth"})}
function subscribe(e){e.preventDefault();toast("You're on the list!")}
if(localStorage.getItem("novaDark")==="true")document.body.classList.add("dark");
$("wishCount").textContent=wish.length;renderChips();renderProducts();renderCart();