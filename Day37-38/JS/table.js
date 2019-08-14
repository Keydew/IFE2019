! function() {
    var table = function(wrap) {
        this.wrap = wrap;
    }

    //获取表单选择项相应数组数据
    function GetSelectArr() {
        let data = [];
        let regions = document.querySelectorAll('#region-check-wrapper input[data-checktype="one"]:checked'),
            products = document.querySelectorAll('#product-check-wrapper input[data-checktype="one"]:checked');
        let lsstr = localStorage.getItem("saleData");
        for (let i = 0; i < regions.length; i++) {
            for (let j = 0; j < products.length; j++) {
                data.push(GetItemObj(regions[i].value, products[j].value, lsstr));
            }
        }
        return data;
    }

    //获取单行的来源数据（先LocalStorage后JS文件）
    function GetItemObj(region, product, lsstr) {
        if (lsstr) {
            let lsdata = JSON.parse(lsstr);
            for (let i in lsdata) {
                if (lsdata[i].region == region && lsdata[i].product == product) {
                    return lsdata[i];
                }
            }
        }

        for (let i = 0; i < sourceData.length; i++) {
            if (sourceData[i].region == region && sourceData[i].product == product) {
                return sourceData[i];
            }
        }

    }

    //获取销量数组
    function GetSaleArr(data) {
        let saleArr = [];
        for (let i = 0; i < data.length; i++) {
            saleArr.push(data[i].sale);
        }
        return saleArr;
    }

    function FormColObj(code, name) {
        return { "code": code, "name": name };
    }

    //判断第一列
    //true：地区
    //false：商品
    function JudgeCheckNum() {
        return new checklist().GetChecked('region-check-wrapper').length == 1 &&
            new checklist().GetChecked('product-check-wrapper').length > 1;
    }

    //移除编辑样式
    function QuitEdit() {
        if (document.getElementsByClassName('edit-td')[0]) {
            RemoveEdit(document.getElementsByClassName('edit-td')[0]);
        }
    }

    function RemoveEdit(td) {
        let preVal = td.childNodes[0].getAttribute("prevalue");
        td.innerHTML = preVal;
        td.classList.remove("edit-td");
    }

    //保存编辑
    function SaveEdit(td) {
        let value = Number(td.childNodes[0].value);
        if (!value) {
            alert("输入的不是数字");
            RemoveEdit(td);
        } else {
            td.innerHTML = value;
            td.classList.remove("edit-td");

        }
    }

    table.prototype = {
        PrepChart: function() {
            let fval = [];

            //获取第一第二列
            this.cols = [];
            if (JudgeCheckNum()) {
                this.cols.push(FormColObj("region", "地区"));
                this.cols.push(FormColObj("product", "商品"));
            } else {
                this.cols.push(FormColObj("product", "商品"));
                this.cols.push(FormColObj("region", "地区"));
            }

            let fchecks = new checklist().GetChecked(this.cols[0].code + '-check-wrapper');
            for (let i = 0; i < fchecks.length; i++) {
                fval.push(fchecks[i].value);
            }
            this.FormChart(GetSelectArr(), fval, this.wrap);

            return this;
        },

        //根据传进的数据生成html内容，不使用DOM查询
        //data:需要呈现的数组
        //cols:第一第二列
        //fval:第一列选择值
        FormChart: function(data, fval, wrap) {
            let html = ""; //返回的表格html内容

            let fcol = this.cols[0].code, //第一列
                scol = this.cols[1].code; //第二列

            let tb = this;

            //表头
            html += '<table frame="box" rules="all"><tr>';
            html += '<th>' + this.cols[0].name + '</th><th>' + this.cols[1].name + '</th>';
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
                        html += '<td class="sale-td">' + subObjs[j].sale[m] + '</td>';
                    }
                    html += '</tr>';
                    if (j != subObjs.length - 1) {
                        html += '<tr>';
                    }
                }
            }

            wrap.innerHTML = html;
            let line = new lineChart({
                data: GetSaleArr(GetSelectArr()),
                wrap: lineWrap,
            });
            line.PaintTable();
            let bar = new barChart({
                data: GetSaleArr(GetSelectArr()),
                wrap: barWrap,
                width: 1100
            });
            bar.PaintBar();

            //表格鼠标移入事件，只画出当前行的折线图
            tableWrap.childNodes[0].onmouseover = function(e) {
                if (e.target.tagName.toLowerCase() == "td") {
                    let tr = e.target.parentNode;
                    let index = 0;
                    while (tr.previousSibling != null) {
                        index++;
                        tr = tr.previousSibling;
                    }
                    line.PaintByData([index - 1]);
                    bar.PaintBarByData([index - 1]);

                    //td鼠标悬浮时显示编辑图标
                    if (e.target.className.indexOf("sale-td") > -1 && e.target.className.indexOf("edit-td") == -1) {
                        e.target.classList.add("hover-sale-td");
                    }
                }
            };

            //表格鼠标移出事件，画出表格所有数据的折线图
            tableWrap.childNodes[0].onmouseout = function(e) {
                line.PaintTable();
                bar.PaintBar();

                //隐藏编辑图标
                if (e.target.className.indexOf("sale-td") > -1) {
                    e.target.classList.remove("hover-sale-td");
                }
            }

            //绑定表格单元格点击事件
            tableWrap.childNodes[0].onclick = function(e) {
                if (e.target.tagName.toLowerCase() == "td" || e.target.parentNode.className.indexOf("edit-td") > -1) {
                    //单元格(或正在编辑的单元格内容)点击，则阻止冒泡（防止冒泡到window.onclick重复消除编辑样式）
                    e.stopPropagation();

                    //鼠标悬浮状态的单元格被点击
                    if (e.target.className.indexOf("hover-sale-td") > -1) {
                        //移除原来编辑的单元格的编辑样式
                        QuitEdit();

                        //给当前点击的单元格添加编辑样式
                        e.target.classList.remove("hover-sale-td");
                        e.target.classList.add("edit-td");
                        let preVal = e.target.innerHTML;

                        let edit = "";
                        edit += '<input id="edit-input" type="text" prevalue="' + preVal + '" value="' + preVal + '"/>';
                        edit += '<a href="javascript:void(0);" id="ok-btn" class="edit-btn">√</a>';
                        edit += '<a href="javascript:void(0);" id="cancel-btn" class="edit-btn">×</a>';
                        e.target.innerHTML = edit;

                        //取消编辑
                        document.getElementById('cancel-btn').onclick = function(event) {
                            event.stopPropagation();
                            RemoveEdit(e.target);
                        }

                        //确认编辑
                        document.getElementById('ok-btn').onclick = function(event) {
                            event.stopPropagation();
                            SaveEdit(e.target);
                        }

                        document.getElementById('edit-input').onkeydown = function(event) {
                            if (event.keyCode == "27") {
                                RemoveEdit(e.target); //Esc取消
                            } else if (event.keyCode == "13") {
                                SaveEdit(e.target); //Enter确认
                                tb.SaveLS();
                            }
                        }
                    }
                }
            }

            window.onclick = function(e) {
                //移除原来编辑的单元格的编辑样式
                QuitEdit();
            }

            let numinput = document.getElementsByClassName('salenum');
            for (let i in numinput) {
                numinput[i].onblur = function(e) {
                    let num = e.target.value;
                    if (!Number(num)) {
                        alert("输入的不是数字");
                    }
                }
            }
        },

        SaveLS: function() {
            let data = {};
            let trs = this.wrap.querySelectorAll('tr:not(:first-of-type)');
            let name1 = "",
                name2 = "";
            for (let i = 0; i < trs.length; i++) {
                let children = trs[i].childNodes;

                let sale = [];
                for (let j = 1; j <= children.length; j++) {
                    let index = children.length - j;
                    if (j < 13) {
                        sale.unshift(children[index].innerHTML);
                    } else if (j == 13) {
                        name2 = children[index].innerHTML;
                    } else {
                        name1 = children[index].innerHTML;
                    }
                }
                data[i] = {
                    [this.cols[0].code]: name1,
                    [this.cols[1].code]: name2,
                    sale: sale
                };
            }

            localStorage.setItem("saleData", JSON.stringify(data));
            //重绘表、折线图和统计图
            this.PrepChart();
        }

    };
    window.table = table;
}();