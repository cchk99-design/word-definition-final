// 數據定義
const categories = [
    { id: "fruits", name: "🍎 水果" }, { id: "veggies", name: "🥦 蔬菜" },
    { id: "animals", name: "🐶 動物" }, { id: "colors", name: "🎨 顏色" },
    { id: "occupation", name: "👨‍⚕️ 職業" }, { id: "toilet", name: "🚽 浴室用品" },
    { id: "tableware", name: "🍽️ 餐具" }, { id: "drinks", name: "🍹 飲品" },
    { id: "toys", name: "🧸 玩具" }, { id: "electronic", name: "💻 電器" },
    { id: "furniture", name: "🛋️ 傢俬" }, { id: "stationery", name: "✏️ 文具" },
    { id: "clothing", name: "👕 衣物" }, { id: "transport", name: "🚗 交通工具" },
    { id: "places", name: "🏢 地點" }, { id: "accessories", name: "🕶️ 配飾" }
];

const vocabData = {
    fruits: ["龍眼", "哈密瓜", "士多啤梨","奇異果","提子","木瓜","楊桃","榴槤","橙","檸檬","火龍果","牛油果","芒果","荔枝","菠蘿","藍莓","蘋果","西瓜","車厘子","香蕉"], 
    veggies: ["黃椒", "南瓜","娃娃菜","椰菜","椰菜花","洋蔥","生菜","番薯","白菜","粟米","紅椒","紅蘿蔔","矮瓜/茄子","菜心","菠菜","番茄","薯仔","蘑菇","白蘿蔔","西蘭花","辣椒","青椒","青瓜","青豆"],
    animals: ["烏龜","企鵝", "倉鼠", "兔子", "北極熊","大象","天鵝","斑馬","樹熊","河馬","熊","熊貓","牛","狐狸","狗","獅子","羊","老虎","老鼠","蛇","袋鼠","豬","豹","貓","貓頭鷹","長頸鹿","雞","馬","猴子/馬騮","駱駝","鱷魚","鴨","鸚鵡","鹿","麻雀"],
    colors: ["啡色", "紅色","黃色","黑色","藍色","橙色","紫色","粉紅色","綠色","白色","灰色"],
    occupation: ["農夫", "侍應","郵差","司機","外賣員","速遞員","太空人","工程師","廚師","收銀員","消防員","清潔工人","老師","警察","護士","醫生"],
    toilet: ["馬桶", "地拖","廁紙","掃把","梘液","梳","毛巾","水桶","浴缸","牙刷","牙膏","花灑"],
    tableware: ["飲管", "刀","匙羹","叉","杯","煲","碗","碟","筷子","鑊鏟"],
    drinks: ["豆漿", "咖啡","朱古力奶","橙汁","檸檬茶","水","汽水","湯","牛奶","益力多","維他奶","茶"],
    toys: ["拼圖", "套圈","恐龍","機械人","水槍","波","火車","煮飯仔","熊仔/啤啤熊","玩具屋","琴","積木/Lego","積木","籃球","足球","玩具車","遙控車","風箏","鼓"],
    electronic: ["風筒", "冷氣機","吸塵機","微波爐","洗衣機","焗爐","燙斗","熱水壺","燈","雪櫃","電磁爐","電腦","電視機","電飯煲","風扇"],
    furniture: ["衣櫃", "床","書架","檯","梳化","櫃","凳"],
    stationery: ["顏色紙", "刨筆機/鉛筆刨","原子筆","擦膠","橡筋","水筆","漿糊筆","白膠漿","簿","膠水","膠紙","萬字夾","螢光筆","釘書機","鉛筆","鉛筆刨","鉸剪","間尺","顏色筆"],
    clothing: ["頸巾", "冷帽","外套","冷衫","領呔","風褸","帽","恤衫","手套/手襪","拖鞋","校服","泳衣","泳褲","皮帶","短褲","羽絨","衫/T-恤","裙","襪","長褲","雨褸","水鞋","波鞋/鞋"],
    transport: ["飛機", "單車","垃圾車","天星小輪","小巴","巴士","救護車","旅遊巴","消防車","地鐵","的士","直升機","警車","貨車","輕鐵","輪船","電單車","電車"],
    places: ["博物館", "廁所","超級市場","動物園","水族館","公園","睡房","學校","機場","地鐵站","商場","泳池","巴士站","廚房","沙灘","茶餐廳","警察局","消防局","客廳"],
    accessories: ["眼鏡", "頸鍊","手鍊","耳環","戒指","手錶","髮夾","銀包","書包","手袋","遮"]
};

let vocabItems = [];
let selectedIds = new Set();
let gameQueue = [];
let gameRecords = {};
let currentIdx = 0;
let currentFilter = "all";

function init() {
    let globalId = 1;
    Object.keys(vocabData).forEach(catId => {
        vocabData[catId].forEach((name, index) => {
            // 重要：使用 encodeURI 處理可能存在的空格或括號
            const rawPath = `images/vocab/${catId} (${index + 1}).png`;
            vocabItems.push({ 
                id: globalId++, 
                cat: catId, 
                name: name, 
                img: encodeURI(rawPath) 
            });
        });
    });
    
    const filterSelect = document.getElementById('category-filter');
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id; opt.textContent = cat.name;
        filterSelect.appendChild(opt);
    });
    renderBank();
}

function renderBank() {
    const container = document.getElementById('bank-content');
    container.innerHTML = '';
    categories.forEach(cat => {
        if (currentFilter !== "all" && currentFilter !== cat.id) return;
        const items = vocabItems.filter(i => i.cat === cat.id);
        if (items.length === 0) return;

        const header = document.createElement('div');
        header.className = 'category-header';
        header.innerHTML = `<h3>${cat.name}</h3><button class="select-all-btn" onclick="toggleCategory('${cat.id}')">全選 / 取消</button>`;
        
        const grid = document.createElement('div');
        grid.className = 'grid';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = `vocab-card ${selectedIds.has(item.id) ? 'selected' : ''}`;
            // 加入 onerror 備援機制
            card.innerHTML = `
                <div class="img-box">
                    <img src="${item.img}" onerror="this.src='https://via.placeholder.com/150?text=無圖片';">
                </div>
                <div class="label-text">${item.name}</div>
            `;
            card.onclick = () => {
                selectedIds.has(item.id) ? selectedIds.delete(item.id) : selectedIds.add(item.id);
                card.classList.toggle('selected');
                updateUI();
            };
            grid.appendChild(card);
        });
        container.appendChild(header);
        container.appendChild(grid);
    });
}

function syncLabelWithCheck() {
    const isChecked = document.getElementById('always-show-check').checked;
    const labelContainer = document.getElementById('label-container');
    labelContainer.className = isChecked ? "show-text" : "hide-text";
}

function loadStage() {
    const item = gameQueue[currentIdx];
    const imgEl = document.getElementById('current-img');
    
    // 先清空再賦值，強制瀏覽器重刷圖片
    imgEl.src = "";
    imgEl.src = item.img;
    
    document.getElementById('current-label').innerText = item.name;
    document.getElementById('game-progress').innerText = `${currentIdx + 1} / ${gameQueue.length}`;
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
    syncLabelWithCheck();
    
    document.getElementById('prev-btn').disabled = (currentIdx === 0);
    document.getElementById('next-btn').innerText = (currentIdx === gameQueue.length - 1) ? "完成 🏁" : "下一個 ➡️";
}

// ... 剩餘遊戲邏輯 (startSelectedGame, nextPhoto, showReport, exportReportAsImage 等) 與之前版本相同 ...

function startSelectedGame() {
    gameQueue = vocabItems.filter(item => selectedIds.has(item.id));
    gameRecords = {};
    if (document.getElementById('order-mode').value === 'random') gameQueue.sort(() => Math.random() - 0.5);
    currentIdx = 0;
    document.getElementById('bank-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadStage();
}

function nextPhoto() {
    if (currentIdx < gameQueue.length - 1) { currentIdx++; loadStage(); }
    else { showReport(); }
}

function prevPhoto() { if (currentIdx > 0) { currentIdx--; loadStage(); } }

function showReport() {
    const tbody = document.getElementById('report-body');
    tbody.innerHTML = '';
    gameQueue.forEach(item => {
        const r = gameRecords[item.id] || { 類別:0, 特徵:0, 地點:0, 用途:0 };
        tbody.innerHTML += `<tr><td><strong>${item.name}</strong></td>
            <td>${r.類別 ? '<span class="used-mark">✔</span>' : '-'}</td>
            <td>${r.特徵 ? '<span class="used-mark">✔</span>' : '-'}</td>
            <td>${r.地點 ? '<span class="used-mark">✔</span>' : '-'}</td>
            <td>${r.用途 ? '<span class="used-mark">✔</span>' : '-'}</td></tr>`;
    });
    document.getElementById('report-overlay').classList.remove('hidden');
}

function toggleFlip(el, hintType) {
    el.classList.toggle('flipped');
    if (el.classList.contains('flipped')) {
        const item = gameQueue[currentIdx];
        if (!gameRecords[item.id]) gameRecords[item.id] = { 類別:0, 特徵:0, 地點:0, 用途:0 };
        gameRecords[item.id][hintType] = 1;
    }
}

async function exportReportAsImage() {
    const canvas = document.getElementById('export-canvas');
    const ctx = canvas.getContext('2d');
    const name = document.getElementById('student-name').value || "未填寫";
    const table = document.getElementById('report-table');
    const cw = 120, ch = 50;
    const rows = table.rows.length, cols = table.rows[0].cells.length;
    canvas.width = cw * cols + 40; canvas.height = ch * rows + 180;
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#5D4037"; ctx.font = "bold 26px Microsoft JhengHei"; ctx.fillText("超級無敵大電視 - 練習紀錄", 20, 45);
    ctx.font = "bold 20px Microsoft JhengHei"; ctx.fillStyle = "#0288D1"; ctx.fillText(`學生姓名：${name}`, 20, 85);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = 20 + c * cw, y = 110 + r * ch;
            ctx.strokeStyle = "#CCC"; ctx.strokeRect(x, y, cw, ch);
            const text = table.rows[r].cells[c].innerText;
            ctx.fillStyle = (text === "✔") ? "#E53935" : "#333";
            ctx.font = "18px Microsoft JhengHei";
            ctx.fillText(text, x + (cw - ctx.measureText(text).width)/2, y + 32);
        }
    }
    ctx.fillStyle = "#666"; ctx.font = "italic 16px Microsoft JhengHei";
    ctx.fillText("註：勾號 (✔) 代表該題目曾翻開對應的提示卡。", 20, 110 + rows * ch + 40);
    const link = document.createElement('a');
    link.download = `紀錄_${name}.png`; link.href = canvas.toDataURL(); link.click();
}

function updateUI() { document.getElementById('selected-count').innerText = selectedIds.size; document.getElementById('start-btn').disabled = (selectedIds.size === 0); }
function toggleCategory(catId) { const items = vocabItems.filter(i => i.cat === catId); const allSelected = items.every(i => selectedIds.has(i.id)); items.forEach(i => allSelected ? selectedIds.delete(i.id) : selectedIds.add(i.id)); renderBank(); updateUI(); }
function resetSelection() { if (confirm("確定重設？")) { selectedIds.clear(); renderBank(); updateUI(); } }
function adjustZoom() { document.documentElement.style.setProperty('--card-size', document.getElementById('zoom-slider').value + 'px'); }
function filterCategory() { currentFilter = document.getElementById('category-filter').value; renderBank(); }
function closeReport() { document.getElementById('report-overlay').classList.add('hidden'); exitGame(); }
function exitGame() { document.getElementById('game-screen').classList.add('hidden'); document.getElementById('bank-screen').classList.remove('hidden'); }

init();
