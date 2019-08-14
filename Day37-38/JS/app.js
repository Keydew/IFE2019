var regionWrap = document.getElementById('region-check-wrapper'),
    prodWrap = document.getElementById('product-check-wrapper'),
    tableWrap = document.getElementById('table-wrapper'),
    barWrap = document.getElementById('bar-wrapper'),
    lineWrap = document.getElementById('line-wrapper'),
    saveBtn = document.getElementById('save-btn');

new checklist().FormCheckWrap(regionWrap, ["华东", "华北", "华南"]);
new checklist().FormCheckWrap(prodWrap, ["手机", "笔记本", "智能音箱"]);
let tb = new table(tableWrap).PrepChart();

saveBtn.onclick = function(e) {
    //移除原来编辑的单元格的编辑样式
    window.onclick();
    tb.SaveLS();
    e.stopPropagation();
    alert("保存成功");
}