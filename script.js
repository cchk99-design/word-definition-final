// 1. 定義 16 個類別
const categories = [
    { id: "fruits", name: " 水果" }, { id: "veggies", name: " 蔬菜" },
    { id: "animals", name: " 動物" }, { id: "colors", name: " 顏色" },
    { id: "occupation", name: " 職業" }, { id: "toilet", name: " 浴室用品" },
    { id: "tableware", name: " 餐具" }, { id: "drinks", name: " 飲品" },
    { id: "toys", name: " 玩具" }, { id: "electronic", name: " 電器" },
    { id: "furniture", name: " 傢俬 1. 定義 16 個類別
const categories = [
    { id: "fruits", name: " 水果" }, { id: "veggies", name: " 蔬菜" },
    { id: "animals", name: " 動物" }, { id: "colors", name: " 顏色" },
    { id: "occupation", name: " 職業" }, { id: "toilet", name: " 浴室用品" },
    { id: "tableware", name: " 餐具" }, { id: "drinks", name: " 飲品" },
    { id: "toys", name: " 玩具" }, { id: "electronic", name: " 電器" },
    { id: "furniture", name: " 傢俬" }, { id: "stationery", name: " 文具" },
    { id: "clothing", name: " 衣物" }, { id: "transport", name: " 交通工具" },
    { id: "places", name: " 地點" }, { id: "accessories", name: " 配飾" }
];

// 2. 名稱對照表 (請按圖片編號 1, 2, 3 的順序填入)
const vocabData = {
    fruits: ["蘋果", "香蕉", "橙"], 
    veggies: ["菜心", "西蘭花"],
    animals: ["烏龜","企鵝", "倉鼠", "兔子", "北極熊","大象","天鵝","斑馬","樹熊","河馬","熊","熊貓","牛","狐狸","狗","獅子","羊","老虎","老鼠","蛇","袋鼠","豬","豹","貓","貓頭鷹","長頸鹿","雞","馬","猴子/馬騮","駱駝","鱷魚","鴨","鸚鵡","鹿","麻雀"],
    colors: ["啡色", "紅色","黃色","黑色","藍色","橙色","紫色","粉紅色","綠色","白色","灰色"],
    occupation: ["醫生", "老師"],
    toilet: ["牙刷", "毛巾"],
    tableware: ["筷子", "湯匙"],
    drinks: ["豆漿", "咖啡","朱古力奶","橙汁","檸檬茶","水","汽水","湯","牛奶","益力多","維他奶","茶"],
    toys: ["波波", "積木"],
    electronic: ["風筒", "冷氣機","吸塵機","微波爐","洗衣機","焗爐","燙斗","熱水壺","燈","雪櫃","電磁爐","電腦","電視機","電飯煲","鳳扇"],
    furniture: ["床", "沙發"],
    stationery: ["鉛筆", "尺子"],
    clothing: ["頸巾", "冷帽","外套","冷衫","領呔","風褸","帽","恤衫","手套/手襪","拖鞋","校服","泳衣","泳褲","皮帶","短褲","羽絨","衫/T-恤","裙","襪","長褲","雨褸","水鞋","波鞋/鞋"],
    transport: ["巴士", "的士"],
    places: ["公園", "學校"],
    accessories: ["眼鏡", "頸鍊","手鍊","耳環","戒指","手錶","髮夾","銀包","書包","手袋","遮",]
};

// 3. 自動生成清單
const vocabItems = [];
let globalId = 1;

Object.keys(vocabData).forEach(catId => {
    vocabData[catId].forEach((name, index) => {
        vocabItems.push({
            id: globalId++,
            cat: catId,
            name: name,
            img: `images/vocab/${catId} (${index + 1}).png` // Windows 格式
        });
    });
});

let selectedIds = new Set();
let gameQueue = [];
let currentIdx = 0;

function renderBank() {
    const container = document.getElementById('bank-content');
    container.innerHTML = '';
    categories.forEach(cat => {
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
    } else {
        exitGame();
    }
}

function exitGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('bank-screen').classList.remove('hidden');
    window.scrollTo(0,0);
}

function toggleFlip(el) { el.classList.toggle('flipped'); }

renderBank();
