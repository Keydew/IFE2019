! function() {
    var checklist = function() {}

    checklist.prototype = {
        //动态生成复选框
        FormCheckWrap: function(wrap, checkArr) {
            this.wrap = wrap;
            this.checkArr = checkArr;
            let html = "";
            for (let i in this.checkArr) {
                html += '<label><input type="checkbox" data-checktype="one" value="' + this.checkArr[i] + '"/>' + this.checkArr[i] + '</label>';
            }
            html += '<label><input type="checkbox" data-checktype="all"/>全选</label>';
            this.wrap.innerHTML = html;

            let allcheck = document.querySelector('#' + this.wrap.id + ' input[data-checktype="all"]');
            let onechecks = document.querySelectorAll('#' + this.wrap.id + ' input[data-checktype="one"]');
            onechecks[0].checked = true; //默认选中第一个

            this.wrap.onclick = function(e) {
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
                            if (new checklist().GetChecked(this.id).length == onechecks.length) {
                                allcheck.checked = true;
                            }
                        } else {
                            //取消选中，检查是否都未选中，取消全选框选中状态
                            if (new checklist().GetChecked(this.id).length == 0) {
                                cb.checked = true;
                            }
                            if (allcheck.checked) {
                                allcheck.checked = false;
                            }
                        }
                    }

                    tb.PrepChart();
                }
            }
        },

        //获取不同表单选中的复选框
        GetChecked: function(wrapid) {
            return document.querySelectorAll('#' + wrapid + ' input[data-checktype="one"]:checked');
        },
    };
    window.checklist = checklist;
}()