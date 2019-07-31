var regionWrap = document.getElementById('region-check-wrapper'),
    prodWrap = document.getElementById('product-check-wrapper'),
    tableWrap = document.getElementById('table-wrapper');

FormCheckWrap(regionWrap, ["华东", "华北", "华南"]);
FormCheckWrap(prodWrap, ["手机", "笔记本", "智能音箱"]);
PrepChart(GetSelectArr(), GetColName());