//获取表单选择项相应数组数据
function GetSelectArr() {
    let data = [];
    for (let i in sourceData) {
        let rec = sourceData[i];
        if (document.querySelector('#region-check-wrapper input[value="' + rec.region + '"]').checked &&
            document.querySelector('#product-check-wrapper input[value="' + rec.product + '"]').checked) {
            data.push(rec);
        }
    }
    return data;
}

function GetSaleArr(data) {
    let saleArr = [];
    for (let i = 0; i < data.length; i++) {
        saleArr.push(data[i].sale);
    }
    return saleArr;
}

//获取第一第二列列名
function GetColName() {
    let cols = [];
    if (JudgeCheckNum()) {
        cols.push(FormColObj("region", "地区"));
        cols.push(FormColObj("product", "商品"));
    } else {
        cols.push(FormColObj("product", "商品"));
        cols.push(FormColObj("region", "地区"));
    }
    return cols;
}

function FormColObj(code, name) {
    return { "code": code, "name": name };
}

//为了包裹生成表格html的函数，做好数据准备
function PrepChart(data, cols) {
    let fval = [];
    let fchecks = GetChecked(cols[0].code + '-check-wrapper');
    for (let i = 0; i < fchecks.length; i++) {
        fval.push(fchecks[i].value);
    }
    FormChart(data, cols, fval);
}

//根据传进的数据生成html内容，不使用DOM查询
//data:需要呈现的数组
//cols:第一第二列
//fval:第一列选择值
function FormChart(data, cols, fval) {
    let html = ""; //返回的表格html内容

    let fcol = cols[0].code, //第一列
        scol = cols[1].code; //第二列

    //表头
    html += '<table frame="box" rules="all" cellpadding="5px"><tr>';
    html += '<th>' + cols[0].name + '</th><th>' + cols[1].name + '</th>';
    for (let i = 1; i <= 12; i++) {
        html += '<th>' + i + '月</th>';
    }
    html += '</tr>';


    for (let i in fval) {
        //查询第一列每（大）行相应的数据
        let subObjs = [];
        for (let k in data) {
            if (data[k][fcol] == fval[i]) {
                subObjs.push(data[k]);
            }
        }

        html += '<tr><td rowspan=' + subObjs.length + '>' + fval[i] + '</td>';

        //子行
        for (let j = 0; j < subObjs.length; j++) {
            html += '<td>' + subObjs[j][scol] + '</td>';
            for (let m = 0; m < 12; m++) {
                html += '<td>' + subObjs[j].sale[m] + '</td>';
            }
            html += '</tr>';
            if (j != subObjs.length - 1) {
                html += '<tr>';
            }
        }
    }

    tableWrap.innerHTML = html;
    lineChart.Init(GetSaleArr(GetSelectArr()), lineWrap).PaintTable();

    //表格鼠标移入事件，只画出当前行的折线图
    tableWrap.childNodes[0].onmouseover = function(e) {
        if (e.target.tagName.toLowerCase() == "td") {
            let tr = e.target.parentNode;
            let index = 0;
            while(tr.previousSibling!=null){
                index++;
                tr=tr.previousSibling;
            }
            lineChart.PaintByData([index-1]);
        }
    };

    //表格鼠标移出事件，画出表格所有数据的折线图
    tableWrap.childNodes[0].onmouseout = function(e) {
        lineChart.PaintTable();
    }
}

//判断第一列
//true：地区
//false：商品
function JudgeCheckNum() {
    return GetChecked('region-check-wrapper').length == 1 &&
        GetChecked('product-check-wrapper').length > 1;
}

//获取不同表单选中的复选框
function GetChecked(wrapid) {
    return document.querySelectorAll('#' + wrapid + ' input[data-checktype="one"]:checked');
}