function extend(Sub, Sup) {
    var F = function() {};
    F.prototype = Sup.prototype;
    Sub.prototype = new F();
    Sub.prototype.constructor = Sub;

    if (Sup.prototype.constructor === Object.prototype.constructor) {
        Sup.prototype.constructor = Sup;
    }
}