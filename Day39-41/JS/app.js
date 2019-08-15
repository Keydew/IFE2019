var regionWrap = document.getElementById('region-check-wrapper'),
    prodWrap = document.getElementById('product-check-wrapper'),
    tableWrap = document.getElementById('table-wrapper'),
    barWrap = document.getElementById('bar-wrapper'),
    lineWrap = document.getElementById('line-wrapper'),
    saveBtn = document.getElementById('save-btn');

//获取state状态值
function GetCheckState() {
    let index = location.href.indexOf("?");
    if (index > -1) {
        let str = decodeURIComponent(location.href.slice(index + 1));
        let arr = str.split("&");
        for (let i = 0; i < arr.length; i++) {
            document.querySelector('input[data-checktype][value="' + arr[i] + '"]').checked = true;
        }
    } else {
        let ck1 = document.querySelector('#region-check-wrapper input[data-checktype]'),
            ck2 = document.querySelector('#product-check-wrapper input[data-checktype]');
        ck1.checked = true;
        ck2.checked = true;
        history.pushState({}, null, "?" + ck1.value + "&" + ck2.value);
    }
}

new checklist().FormCheckWrap(regionWrap, ["华东", "华北", "华南"]);
new checklist().FormCheckWrap(prodWrap, ["手机", "笔记本", "智能音箱"]);
GetCheckState();
let tb = new table(tableWrap).PrepChart();