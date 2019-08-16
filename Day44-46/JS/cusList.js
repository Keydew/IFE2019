let customerList = (function() {
    let customers = [];
    return {
        list: customers,
        //新来顾客加入队列
        joinIn: function(customer) {
            for (let i = 0; i < customers.length; i++) {
                if (customers[i] === customer) {
                    console.log('客人' + customer.name + '已在队列中');
                    return;
                }
            }

            customers.push(customer);
        },
        //开始进入餐厅
        stepIn: function() {
            if (customers.length > 0) {
                customers[0].Seat();
            } else {
                console.log('没有客人了');
            }
        },
        //顾客用餐完毕离开
        finish: function() {
            customers.shift();
            if (customers.length > 0) {
                customers[0].Seat();
            } else {
                console.log('没有客人了');
            }

        }
    };
})();