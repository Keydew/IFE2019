function Customer() {
    this.order = []
}

Customer.prototype = {
    //入座，呼叫服务员
    Seat: function() {
        console.log("客人入座，呼叫服务员");
        theWaiter().callByCus(this);
    },
    //点菜
    OrderCourse: function(courses) {
        let course = menuList.Select();
        this.order.push(course);
        console.log("客人点了【" + course.name + "】");
        return [course];
    },
    //吃
    Eat: function() {
        console.log("客人用餐完毕，离开");
        customerList.finish();
    },
    //被上菜
    getCourse: function(course) {
        for (let i = 0; i < this.order.length; i++) {
            if (course === this.order[i]) {
                console.log("客人的【" + course.name + "】已上菜");
                this.order.splice(i, 1);
                if (this.order.length == 0) {
                    this.Eat();
                    return;
                }
            }
        }
        console.log("菜上错啦");
    }
};