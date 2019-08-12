var barChart = {
    saleArr: null,
    wrap: null,
    height: 300,
    width: 1200,
    svg:'',

    PaintPart: function(index, iArr, x, barWidth, max, axisY, horizon) {
        let highArr = [];
        for (let i = 0; i < iArr.length; i++) {
            highArr.push(this.saleArr[iArr[i]][index] * axisY / max);
        }

        let subWidth = barWidth / iArr.length;
        for (let i = 0; i < highArr.length; i++) {
            this.svg += '<rect x="' + (x + i * subWidth) + '" y="' + (horizon - highArr[i]) +
                '" width="' + subWidth + '" height="' + highArr[i] + '" fill="' + colorSeq[iArr[i]] + '"/>';
            this.svg += '<text x="' + (x + barWidth / 2) + '" y="' + (horizon + 20) + '" text-anchor="middle">' + (i + 1) + '月</text>'
        }
    },

    //初始化柱状图工具
    Init: function(data, wrap, height, width) {
        this.saleArr = data;
        this.wrap = wrap;
        if (height) {
            this.height = height;
        }
        if (width) {
            this.width = width;
        }
        return this;
    },

    //画默认数据的柱状图
    PaintBar: function() {
        let index = [];
        for (let i = 0; i < this.saleArr.length; i++) {
            index.push(i);
        }
        this.PaintBarByData(index);
    },

    //根据传进的数据画柱状图
    PaintBarByData: function(iArr) {
        let axisX = this.width - 50,
            axisY = this.height - 60,
            numX = this.saleArr[0].length,
            numY = 5;

        let barWidth = axisX / 12 - 5,
            barGap = 5;

        //计算最大值
        let maxArr = [];
        for (let i = 0; i < iArr.length; i++) {
            maxArr.push(Number(Math.max.apply(Math, this.saleArr[iArr[i]])));
        }
        let max = Number(Math.max.apply(Math, maxArr));

        //画X轴和Y轴轴线
        this.svg = "";
        this.svg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="' + this.height + 'px" width="' + this.width + '">';
        this.svg += '<path d="M 30 10 L 30 ' + (20 + axisY) + ' L ' + (30 + axisX + 10) + ' ' + (20 + axisY) + '" fill="transparent" stroke="black"/>';
        this.svg += '<text x="30" y="' + (50 + axisY + 20) + '" text-anchor="middle">' + 0 + '</text>'

        //画Y轴基准线和tag
        for (let i = 0; i < numY; i++) {
            let horizon = 20 + axisY * i / numY;
            this.svg += '<text x="25" y="' + (horizon + 5) + '" text-anchor="end">' + max * (numY - i) / numY + '</text>'
            this.svg += '<path d="M 30 ' + horizon + ' L ' + (30 + axisX + 10) + ' ' + horizon + '" stroke="lightgrey"/>';
            this.svg += '<path d="M 30 ' + horizon + ' L 25 ' + horizon + '" stroke="black"/>';
        }

        //画柱形和X轴tag
        for (let i = 0; i < numX; i++) {
            let x = 30 + (barGap + barWidth) * i + barGap;
            let horizon = 20 + axisY;
            this.PaintPart(i, iArr, x, barWidth, max, axisY, horizon);
        }

        this.svg += "</svg>";
        this.wrap.innerHTML = this.svg;
    },
}