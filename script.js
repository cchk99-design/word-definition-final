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

// 這裡填入你的 16 個類別名稱
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
    electronic: ["風筒", "冷氣機","吸塵機","微波爐","洗衣機","焗爐","燙斗","熱水壺","燈","雪櫃","電磁爐","電腦","電視機","電飯煲","鳳扇"],
    furniture: ["衣櫃", "床","書架","檯","梳化","櫃","凳"],
    stationery: ["顏色紙", "刨筆機/鉛筆刨","原子筆","擦膠","橡筋","水筆","漿糊筆","白膠漿","簿","膠水","膠紙","萬字夾","螢光筆","釘書機","鉛筆","鉛筆刨","鉸剪","間尺","顏色筆"],
    clothing: ["頸巾", "冷帽","外套","冷衫","領呔","風褸","帽","恤衫","手套/手襪","拖鞋","校服","泳衣","泳褲","皮帶","短褲","羽絨","衫/T-恤","裙","襪","長褲","雨褸","水鞋","波鞋/鞋"],
    transport: ["飛機", "單車","垃圾車","天星小輪","小巴","巴士","救護車","旅遊巴","消防車","地鐵","的士","直升機","警車","貨車","輕鐵","輪船","電單車","電車"],
    places: ["博物館", "廁所","超級市場","動物園","水族館","公園","睡房","學校","機場","地鐵站","商場","泳池","巴士站","廚房","沙灘","茶餐廳","警察局","消防局","客廳"],
    accessories: ["眼鏡", "頸鍊","手鍊","耳環","戒指","手錶","髮夾","銀包","書包","手袋","遮"]
};

const vocabItems = [];
let globalId = 1;
let currentFilter = "all";

// 初始化數據
Object.keys(vocabData).forEach(catId => {
    vocabData[catId].forEach((name, index) => {
        vocabItems.push({
            id: globalId++,
            cat: catId,
            name: name,
            img: `images/vocab/${catId} (${index + 1}).png` 
        });
    });
});

// 初始化分類選單
function initFilter() {
    const filterSelect = document.getElementById('category-filter');
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.textContent = cat.name;
        filterSelect.appendChild(opt);
    });
}

// 縮放功能
function adjustZoom() {
    const val = document.getElementById('zoom-slider').value;
    document.documentElement.style.setProperty('--card-size', val + 'px');
}

// 過濾功能
function filterCategory() {
    currentFilter = document.getElementById('category-filter').value;
    renderBank();
}

function renderBank() {
    const container = document.getElementById('bank-content');
    container.innerHTML = '';
    
    categories.forEach(cat => {
        // 如果不是全部且不匹配當前過濾器，則跳過
        if (currentFilter !== "all" && currentFilter !== cat.id) return;

        const items = vocabItems.filter(i => i.cat === cat.id);
        if (items.length === 0) return;

        const section = document.createElement('div');
        section.innerHTML = `<h3 style="text-align:left; margin-left:15px; border-left:5px solid #FFCC00; padding-left:10px;">${cat.name}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'grid';
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = `vocab-card ${selectedIds.has(item.id) ? 'selected' : ''}`;
            card.innerHTML = `<img src="${item.img}"><div class="label-text">${item.name}</div>`;
            card.onclick = () => {
                selectedIds.has(item.id) ? selectedIds.delete(item.id) : selectedIds.add(item.id);
                card.classList.toggle('selected');
                updateUI();
            };
            grid.appendChild(card);
        });
        section.appendChild(grid);
        container.appendChild(section);
    });
}

// 其他遊戲邏輯保持不變...
let selectedIds = new Set();
let gameQueue = [];
let currentIdx = 0;

function updateUI() {
    document.getElementById('selected-count').innerText = selectedIds.size;
    const btn = document.getElementById('start-btn');
    btn.disabled = selectedIds.size === 0;
    btn.className = `nav-btn ${selectedIds.size === 0 ? 'disabled' : ''}`;
}

function startSelectedGame() {
    gameQueue = vocabItems.filter(item => selectedIds.has(item.id));
    currentIdx = 0;
    document.getElementById('bank-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadStage();
}

function loadStage() {
    const item = gameQueue[currentIdx];
    document.getElementById('current-img').src = item.img;
    document.getElementById('current-label').innerText = item.name;
    document.getElementById('game-progress').innerText = `${currentIdx + 1} / ${gameQueue.length}`;
    document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('flipped'));
}

function nextPhoto() {
    if (currentIdx < gameQueue.length - 1) {
        currentIdx++; loadStage();
    } else { exitGame(); }
}

function exitGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
    window.scrollTo(0,0);
}

function toggleFlip(el) { el.classList.toggle('flipped'); }

// 啟動
initFilter();
renderBank();
