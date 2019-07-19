var main = document.getElementById("main-div");
var greet = document.getElementById("greet-div");
var back = document.getElementById("back-greet-div")

function ShowMain() {
    main.style.visibility = 'visible';

    main.classList.add("show-main");
    greet.style.visibility = 'hidden';
    var name = document.getElementById("name-text").value;

    back.style.visibility = 'visible';
    document.getElementById("greet-name").innerHTML = name == "" ? "不愿意透露姓名的陌生人" : name;

    var now = new Date().getHours();
    var hi;
    if(4<=now && now<=9){
        hi="早上好";
    }else if (10<=now && now<=11) {
        hi="上午好";
    }
    else if(now==12){
        hi="中午好";
    }
    else if(13<=now && now<=18){
        hi="下午好";
    }
    else if(19<=now && now<=22){
        hi="晚上好";
    }
    else{
        hi="晚安";
    }
    document.getElementById("greet-time").innerHTML=hi;
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