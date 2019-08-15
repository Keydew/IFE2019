var regionWrap = document.getElementById('region-check-wrapper'),
    prodWrap = document.getElementById('product-check-wrapper'),
    tableWrap = document.getElementById('table-wrapper'),
    barWrap = document.getElementById('bar-wrapper'),
    lineWrap = document.getElementById('line-wrapper'),
    saveBtn = document.getElementById('save-btn');

function GetHash() {
    if (location.hash) {
        let arr = decodeURIComponent(location.hash).split("#");
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]) {
                document.querySelector('input[data-checktype="one"][value="' + arr[i] + '"]').checked = true;
            }
        }
    } else {
        //默认选中第一个
        let ck1 = document.querySelector('#region-check-wrapper input[data-checktype="one"]'),
            ck2 = document.querySelector('#product-check-wrapper input[data-checktype="one"]');
        ck1.checked = true;
        ck2.checked = true;
        location.hash = '#' + ck1.value + '#' + ck2.value;
    }
}

new checklist().FormCheckWrap(regionWrap, ["华东", "华北", "华南"]);
new checklist().FormCheckWrap(prodWrap, ["手机", "笔记本", "智能音箱"]);
GetHash();
let tb = new table(tableWrap).PrepChart();