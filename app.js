const DEFAULT_DATA={
siteName:"MTV Россия",ticker:"MTV РОССИЯ · МУЗЫКА. КУЛЬТУРА. СЕЙЧАС.",heroTag:"MTV ORIGINALS · 2026",
heroTitle:"ГРОМЧЕ.\nСМЕЛЕЕ.\nБЛИЖЕ.",heroText:"Музыка, люди и истории, которые задают настроение. Новый ритм MTV Россия.",
aboutText:"MTV — пространство музыки и поп-культуры, где важны новые голоса, смелые идеи и люди, которые меняют правила.",
footerText:"Музыка. Культура. Сейчас. Следи за обновлениями и присоединяйся к сообществу.",
email:"hello@mtv.example",telegramMtv:"https://t.me/mtv_1russia",telegramNextv:"https://t.me/nextv_itv",copyright:"© 2026 MTV Россия · Концепт сайта",
accent:"lime",
news:[
{id:"n1",category:"MTV NEWS",title:"Новый сезон начинается с громкого сигнала",body:"Новости музыки, поп-культуры и новых творческих проектов — в одном месте.",art:"MTV",color:"linear-gradient(135deg,#2a224b,#ec4d9e)",date:"08.10.2026",published:true,featured:true},
{id:"n2",category:"ВИДЕО · ПРЕМЬЕРА",title:"На повторе: треки, которые задают настроение",body:"Подборка редакции для тех, кто всегда на своей частоте.",art:"▶",color:"linear-gradient(135deg,#0b3c55,#42d9db)",date:"07.10.2026",published:true,featured:false},
{id:"n3",category:"КУЛЬТУРА · ГИД",title:"Что добавить в культурный плейлист",body:"Открытия, события и идеи для следующего большого впечатления.",art:"★",color:"linear-gradient(135deg,#572015,#ff9a39)",date:"05.10.2026",published:true,featured:false}
],
programs:[
{id:"p1",title:"MTV Originals",body:"Истории за пределами плейлиста.",number:"01 / ORIGINALS",published:true},
{id:"p2",title:"Music Radar",body:"Новые имена и музыкальные открытия.",number:"02 / MUSIC",published:true},
{id:"p3",title:"Culture Club",body:"Люди, идеи и культурные повороты.",number:"03 / CULTURE",published:true}
],
team:[{id:"u1",name:"MTVA",role:"Создатель"},{id:"u2",name:"Редакция",role:"Админ"},{id:"u3",name:"Модератор",role:"Модератор"}]
};
function clone(o){return JSON.parse(JSON.stringify(o))}
function loadData(){try{const raw=JSON.parse(localStorage.getItem("mtvData"));if(raw&&typeof raw==="object")return Object.assign(clone(DEFAULT_DATA),raw)}catch(e){}return clone(DEFAULT_DATA)}
function saveData(data){localStorage.setItem("mtvData",JSON.stringify(data))}
function esc(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function active(name){return location.pathname.split("/").pop()===name?"active":""}
function nav(){const links='<a class="'+active("news.html")+'" href="news.html">Новости</a><a class="'+active("projects.html")+'" href="projects.html">Проекты</a><a class="'+active("about.html")+'" href="about.html">О канале</a><a class="'+active("contacts.html")+'" href="contacts.html">Контакты</a><a href="admin.html">Studio</a>';return '<div class="container"><div class="nav"><a class="logo" href="index.html">MTV<b>.</b></a><nav class="navlinks">'+links+'</nav><span class="status">● В РИТМЕ</span><button type="button" class="mobile-menu" onclick="document.body.classList.toggle("menu-open")">☰</button><div class="mobile-panel">'+links+'</div></div></div>'}
function footer(data){return '<footer class="footer"><div class="container"><div class="footer-top"><div><a class="logo" href="index.html">MTV<b>.</b></a><p style="max-width:420px">'+esc(data.footerText)+'</p></div><div class="footer-links"><a href="news.html">Новости</a><a href="projects.html">Проекты</a><a href="about.html">О канале</a><a href="contacts.html">Контакты</a><a href="admin.html">Studio</a></div></div><small>'+esc(data.copyright)+'</small></div></footer>'}
function shell(data,activePage){document.documentElement.style.setProperty("--accent",data.accent==="pink"?"#ff2f93":data.accent==="blue"?"#69b7ff":"#d8ff3f");document.getElementById("siteTopline").textContent=data.ticker;document.getElementById("siteNav").innerHTML=nav();document.getElementById("siteFooter").innerHTML=footer(data);document.title=data.siteName+" — MTV"}
function initIndex(){
const d=loadData();shell(d,"index.html");document.getElementById("heroTag").textContent=d.heroTag;document.getElementById("heroTitle").innerHTML=esc(d.heroTitle).replace(/\n/g,"<br>");document.getElementById("heroText").textContent=d.heroText;
document.getElementById("year").textContent=new Date().getFullYear();
}
function renderNews(){
const d=loadData();shell(d,"news.html");const grid=document.getElementById("newsGrid"),search=document.getElementById("newsSearch"),filters=document.getElementById("newsFilters");let category="ALL",items=d.news.filter(n=>n.published!==false);
function drawFilters(){const cats=["ALL",...new Set(items.map(n=>n.category||"MTV NEWS"))];filters.innerHTML=cats.map(c=>'<button class="filter '+(c==="ALL"?"active":"")+'" data-cat="'+esc(c)+'">'+esc(c==="ALL"?"Все":c)+'</button>').join("")+'<span id="liveStatus" class="filter" style="cursor:default">● LIVE · TELEGRAM</span>'}
function draw(){const q=search.value.trim().toLowerCase();const visible=items.filter(n=>!q||[n.title,n.body,n.category,n.source].join(" ").toLowerCase().includes(q)).filter(n=>category==="ALL"||n.category===category);grid.innerHTML=visible.length?visible.map(n=>'<article class="news-card"><div class="news-art" style="background:'+esc(n.color||"linear-gradient(135deg,#2a224b,#ec4d9e)")+'"><div class="letter">'+esc(n.art||"MTV")+'</div></div><div class="news-body"><div class="meta">'+esc(n.category||"MTV NEWS")+'</div><h3>'+esc(n.title||"Без заголовка")+'</h3><p>'+esc(n.body||"")+'</p><div class="news-date">'+esc(n.date||"Без даты")+(n.source?" · "+esc(n.source):"")+(n.featured?" · FEATURED":"")+'</div></div></article>').join(""):'<div class="empty">По вашему запросу ничего не найдено.</div>'}
async function syncTelegram(){try{const r=await fetch("/api/telegram-news?ts="+Date.now(),{cache:"no-store"});const j=await r.json();if(!r.ok||!j.ok)throw new Error(j.error||"Telegram unavailable");if(Array.isArray(j.items)&&j.items.length){items=j.items;drawFilters();category="ALL";draw();const st=document.getElementById("liveStatus");if(st)st.textContent="● LIVE · обновлено "+new Date(j.updatedAt||Date.now()).toLocaleTimeString("ru-RU")}}catch(e){const st=document.getElementById("liveStatus");if(st)st.textContent="○ Telegram · ожидание соединения";if(!items.length){items=d.news.filter(n=>n.published!==false);drawFilters();draw()}}}
filters.onclick=e=>{const b=e.target.closest("[data-cat]");if(!b)return;category=b.dataset.cat;filters.querySelectorAll("[data-cat]").forEach(x=>x.classList.toggle("active",x===b));draw()};search.oninput=draw;
drawFilters();draw();syncTelegram();setInterval(syncTelegram,5000);
}
function renderProjects(){const d=loadData();shell(d,"projects.html");const grid=document.getElementById("projectGrid");grid.innerHTML=d.programs.filter(p=>p.published!==false).map(p=>'<article class="project-card"><div class="project-body"><div class="project-number">'+esc(p.number||"MTV PROJECT")+'</div><div><h3>'+esc(p.title||"Проект MTV")+'</h3><p>'+esc(p.body||"")+'</p></div></div></article>').join("")||'<div class="empty">Пока нет опубликованных проектов.</div>'}
function renderAbout(){const d=loadData();shell(d,"about.html");document.getElementById("aboutText").textContent=d.aboutText;document.getElementById("year").textContent=new Date().getFullYear()}
function renderContacts(){const d=loadData();shell(d,"contacts.html");document.getElementById("emailLink").href="mailto:"+d.email;document.getElementById("emailText").textContent=d.email;document.getElementById("mtvLink").href=d.telegramMtv;document.getElementById("nextvLink").href=d.telegramNextv}
window.MTV={DEFAULT_DATA,clone,loadData,saveData,esc,initIndex,renderNews,renderProjects,renderAbout,renderContacts};
