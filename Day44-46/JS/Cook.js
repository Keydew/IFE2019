let theCook = (function() {
    let instance = null;

    function Cook(name, salary) {
        Employee.call(this, name, salary);
        this.courseList = []; //做菜任务队列
    }

    extend(Cook, Employee);
    Cook.prototype = {
        oneWork: function() {
            //做菜
            let course = this.courseList.shift();
            console.log("厨师-" + this.name + "做好了【" + course.name+"】");
            //呼叫服务员上菜
            theWaiter().callByCook(course);
        },

        //获取服务员的点单
        getOrder: function(courseArr) {
            console.log("厨师-" + this.name + "收到了订单");
            this.courseList = this.courseList.concat(courseArr);
            //开始做菜
            while (this.courseList.length > 0) {
                this.oneWork(this.courseList[0]);
            }
        }
    };

    return function(name, salary) {
        if (!instance) {
            instance = new Cook(name, salary);
        }
        return instance;
    };
})()