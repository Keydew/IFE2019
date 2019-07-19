var main = document.getElementById("main-div");
var greet = document.getElementById("greet-div");
var back = document.getElementById("back-greet-div")

function ShowMain() {
    main.style.visibility = 'visible';

    main.classList.add("show-main");
    greet.style.visibility = 'hidden';
    var name = document.getElementById("name-text").value;

    back.style.visibility = 'visible';
    document.getElementById("greet-name").innerHTML = name == "" ? "陌生人" : name;
}

function ShowMore(e) {
    var name = e.name;
    var eles = document.getElementsByName(name);
    eles.forEach(function(element, index) {
        if (element.tagName != "IMG") {
            element.classList.toggle("hide-detail");
        }
    });

    e.classList.toggle("up-btn");
}

function ShowImg() {
    if (document.getElementsByClassName("draw-img").length==0) {
        var img = document.createElement("div");
        img.classList.add('draw-img');

        var btn = document.getElementById("show-img-btn");
        var list = document.getElementById("hobby-list");
        var next = btn.parentNode.nextSibling;
        list.insertBefore(img,next);

        btn.parentNode.removeChild(btn);
    }
}