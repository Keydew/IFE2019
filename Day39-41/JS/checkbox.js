! function() {
    var checklist = function() {};

    //取消选中时修改state
    function CancelCheckHash(cb) {
        let str = decodeURIComponent(location.href.slice(location.href.indexOf('?') + 1));

        let arr = str.split('&');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == cb.value) {
                arr.splice(i, 1);
            }
        }
        history.pushState(null, null, '?'+arr.join('&'));
    }

    //选中后修改state
    function CheckHash(cb) {
        let str = decodeURIComponent(location.href.slice(location.href.indexOf('?') + 1));
        str += "&" + cb.value;

        history.pushState(null, null, '?'+str);
    }

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

            this.wrap.onclick = function(e) {
                if (e.target.tagName.toLowerCase() == "input" && e.target.type == "checkbox") {
                    let cb = e.target;
                    if (cb.getAttribute('data-checktype') == "all") {
                        //全选
                        if (cb.checked) {
                            //选中，选中所有复选框
                            for (let i = 0; i < onechecks.length; i++) {
                                if (!onechecks[i].checked) {
                                    onechecks[i].checked = true;
                                    CheckHash(onechecks[i]);
                                }
                            }
                        } else {
                            //默认不能直接取消全选
                            cb.checked = true;
                        }
                    } else if (cb.getAttribute('data-checktype') == "one") {
                        //单个
                        if (cb.checked) {
                            CheckHash(cb);
                            //选中，检查是否全选
                            if (new checklist().GetChecked(this.id).length == onechecks.length) {
                                allcheck.checked = true;
                            }
                        } else {
                            //不允许都不选
                            if (new checklist().GetChecked(this.id).length == 0) {
                                cb.checked = true;
                            } else {
                                CancelCheckHash(cb);
                                //取消全选
                                if (allcheck.checked) {
                                    allcheck.checked = false;
                                }
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
        }
    };
    window.checklist = checklist;
}()