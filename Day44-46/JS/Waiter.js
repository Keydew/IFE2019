let theWaiter = (function() {
    let instance = null;

    function Waiter(name, salary) {
        Employee.call(this, name, salary);
    }

    extend(Waiter, Employee);

    Waiter.prototype = {
        //完成一次工作
        oneWork: function(course) {
            if (course instanceof Array) {
                //若是数组，则是记录点菜传给厨师
                console.log("服务员-" + this.name + "将订单交给厨师");
                theCook().getOrder(course);

            } else {
                console.log("服务员-" + this.name + "正在将【" + course.name + "】上菜给客人");
                //若不是，则是上菜
                customerList.list[0].getCourse(course);
            }
        },
        //被顾客呼叫，获取顾客点菜
        callByCus: function(customer) {
            console.log("服务员-" + this.name + "被客人呼叫，开始点菜");
            this.oneWork(customer.OrderCourse());
        },
        //被厨师呼叫，上菜
        callByCook: function(course) {
            console.log("服务员-" + this.name + "被厨师呼叫上菜");
            this.oneWork(course);
        }

    };

    return function(name, salary) {
        if (!instance) {
            instance = new Waiter(name, salary);
        }
        return instance;
    };
})()