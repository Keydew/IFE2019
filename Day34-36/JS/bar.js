var barChart = {
    saleArr: null,
    wrap: null,
    Init: function(data, wrap) {
        this.saleArr = data;
        this.wrap = wrap;
        return this;
    },
    PaintBar: function() {
        let height = 400,
            width = 550;
        let axisX = 450,
            axisY = 300,
            numX = 5,
            numY = this.saleArr.length;
        let barWidth = 20,
            barGap = 5;
        let max = Number(Math.max.apply(Math, this.saleArr).toPrecision(1));

        //将销量计算转化为柱形长度
        let colArr = [];
        for (let i in this.saleArr) {
            colArr.push(this.saleArr[i] * axisX / max);
        }

        let svg = "";
        svg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="' + height + 'px" width="' + width + '">';
        svg += '<path d="M 50 40 L 50 ' + (50 + axisY) + ' L ' + (50 + axisX + 10) + ' ' + (50 + axisY) + '" fill="transparent" stroke="black"/>';
        svg += '<text x="50" y="' + (50 + axisY + 20) + '" text-anchor="middle">' + 0 + '</text>'

        //画X轴基准线和tag
        for (let i = 1; i <= numX; i++) {
            let horizonX = 50 + axisX * i / numX;
            svg += '<text x="' + horizonX + '" y="' + (50 + axisY + 20) + '" text-anchor="middle">' + max * i / numX + '</text>'
            svg += '<path d="M ' + horizonX + ' ' + (50 + axisY) + ' L ' + horizonX + ' 50" stroke="lightgrey"/>';
            svg += '<path d="M ' + horizonX + ' ' + (50 + axisY) + ' L ' + horizonX + ' ' + (50 + axisY + 5) + '" stroke="black"/>';
        }

        //画柱形和Y轴tag
        for (let i = 1; i <= colArr.length; i++) {
            let y = 50 + (barWidth + barGap) * Number(i - 1);
            svg += '<text x="45" y="' + (y + barWidth - 5) + '" text-anchor="end">' + i + '月</text>'
            svg += '<rect x="50" y="' + y + '" width="' + colArr[i - 1] + '" height="20" fill="skyblue"/>';
        }
        svg += "</svg>";
        this.wrap.innerHTML = svg;
    }
}