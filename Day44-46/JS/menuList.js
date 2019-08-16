let menuList = (function() {
    //菜单来源：同福客栈品菜大会
    let menulist = [new Course({
            name: "炭烤母猪蹄",
            price: 60,
            cost: 30
        }),
        new Course({
            name: "麻辣鱼鳞",
            price: 20,
            cost: 2
        }),
        new Course({
            name: "酥炸小黄瓜",
            price: 14,
            cost: 5
        }),
        new Course({
            name: "红烧胖大海",
            price: 30,
            cost: 14
        }),
        new Course({
            name: "酒酿萝卜皮",
            price: 18,
            cost: 6
        }),
        new Course({
            name: "清蒸黄花鱼",
            price: 50,
            cost: 25
        }),
        new Course({
            name: "泔水蛋花汤",
            price: 20,
            cost: 4
        }),
        new Course({
            name: "冰糖肥肠",
            price: 30,
            cost: 15
        })
    ];

    return {
        Select: function() {
            //随机选一道菜
            let index = Math.floor(Math.random() * menulist.length);
            return menulist[index];
        }
    };
})()