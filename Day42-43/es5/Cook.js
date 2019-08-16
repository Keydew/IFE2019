function Cook(name, salary) {
    Employee.call(this, name, salary);
}

extend(Cook, Employee);
Cook.prototype.oneWork = function(course) {
    //做菜
}