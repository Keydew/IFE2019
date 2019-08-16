var ifeRestaurant = new Restaurant({
    name: "饕餮食馆",
    cash: 100000,
    seats: 1,
    staff: []
});

let waiter = theWaiter("张三", 6000);
let cook = theCook("李四", 10000);

ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);

customerList.joinIn(new Customer());
customerList.joinIn(new Customer());
customerList.joinIn(new Customer());
customerList.stepIn();