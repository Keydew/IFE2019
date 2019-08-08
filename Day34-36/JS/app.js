var regionWrap = document.getElementById('region-check-wrapper'),
    prodWrap = document.getElementById('product-check-wrapper'),
    tableWrap = document.getElementById('table-wrapper'),
    barWrap = document.getElementById('bar-wrapper'),
    lineWrap = document.getElementById('line-wrapper');

FormCheckWrap(regionWrap, ["华东", "华北", "华南"]);
FormCheckWrap(prodWrap, ["手机", "笔记本", "智能音箱"]);
PrepChart(GetSelectArr(), GetColName());
barChart.Init(GetEastSale(), barWrap).PaintBar();