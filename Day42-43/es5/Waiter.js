function Waiter(name, salary) {
    Employee.call(this, name, salary);
}

extend(Waiter, Employee);

Waiter.prototype.oneWork = function(course) {
    if (course instanceof Array) {
        //若是数组，则是记录点菜

    } else {
        //若不是，则是上菜

    }
};