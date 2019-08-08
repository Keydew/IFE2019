//动态生成复选框
function FormCheckWrap(wrap, checkArr) {
    let html = "";
    for (let i in checkArr) {
        html += '<label><input type="checkbox" data-checktype="one" value="' + checkArr[i] + '"/>' + checkArr[i] + '</label>';
    }
    html += '<label><input type="checkbox" data-checktype="all"/>全选</label>';
    wrap.innerHTML = html;

    let allcheck = document.querySelector('#' + wrap.id + ' input[data-checktype="all"]');
    let onechecks = document.querySelectorAll('#' + wrap.id + ' input[data-checktype="one"]');
    onechecks[0].checked = true; //默认选中第一个

    wrap.onclick = function(e) {
        if (e.target.tagName.toLowerCase() == "input" && e.target.type == "checkbox") {
            let cb = e.target;
            if (cb.getAttribute('data-checktype') == "all") {
                //全选
                if (cb.checked) {
                    //选中，选中所有复选框
                    for (let i = 0; i < onechecks.length; i++) {
                        onechecks[i].checked = true;
                    }
                } else {
                    //默认不能直接取消全选
                    cb.checked = true;
                }
            } else if (cb.getAttribute('data-checktype') == "one") {
                //单个
                if (cb.checked) {
                    //选中，检查是否全选
                    if (GetChecked(wrap.id).length == onechecks.length) {
                        allcheck.checked = true;
                    }
                } else {
                    //取消选中，检查是否都未选中，取消全选框选中状态
                    if (GetChecked(wrap.id).length == 0) {
                        cb.checked = true;
                    }
                    if (allcheck.checked) {
                        allcheck.checked = false;
                    }
                }
            }

            PrepChart(GetSelectArr(), GetColName());
        }
    }
}

//获取不同表单选中的复选框
function GetChecked(wrapid) {
    return document.querySelectorAll('#' + wrapid + ' input[data-checktype="one"]:checked');
}