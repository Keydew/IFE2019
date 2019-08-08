var colorSeq = ['steelblue', 'indianred', 'teal', 'sandybrown', 'plum', 'skyblue', 
				'coral','darkslateblue','darkolivegreen'];

var lineChart = {
    rowArr: null,
    wrap: null,

    Init: function(data, wrap) {
        this.rowArr = data;
        this.wrap = wrap;
        return this;
    },

    PaintTable: function() {
    	let index=[];
    	for(let i=0;i<this.rowArr.length;i++){
    		index.push(i);
    	}
        this.PaintByData(index);
    },

    PaintByData: function(iArr) {
        let height = 400,
            width = 550,
            axisX = 480,
            axisY = 300;
        let numX = this.rowArr[0].length,
            numY = 5;
        let lineGap = axisX / (numX - 1),
            highGap = axisY / numY,
            max = this.GetArrMax(iArr);

        //把canvas标签添加到div中
        let html = '<canvas id="line-canvas" height="' + height + 'px" width="' + width + 'px"></canvas>';
        this.wrap.innerHTML = html;

        //画X轴和Y轴
        let ctx = document.getElementById('line-canvas').getContext('2d');
        ctx.font = "16px 微软雅黑";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.beginPath;
        ctx.moveTo(50, 40);
        ctx.lineTo(50, 55 + axisY);
        ctx.moveTo(45, 50 + axisY);
        ctx.lineTo(60 + axisX, 50 + axisY);
        ctx.stroke();

        //画Y轴tag
        ctx.textAlign = "end";
        ctx.beginPath();
        for (let i = 0; i < numY; i++) {
            let y = 50 + i * highGap;
            ctx.moveTo(45, y);
            ctx.lineTo(50, y);
            ctx.fillText((numY - i) * max / numY, 45, y);
        }
        ctx.stroke();
        ctx.fillText('0', 45, axisY + 50);

        //画X轴tag
        ctx.beginPath();
        ctx.textAlign = "center";
        for (let i = 1; i <= numX; i++) {
            let x = (i - 1) * lineGap + 50;
            ctx.moveTo(x, axisY + 50);
            ctx.lineTo(x, axisY + 55);
            ctx.fillText(i + '月', x, axisY + 65);
        }
        ctx.stroke();

        //画销量的水平参考基准线
        ctx.strokeStyle = "rgba(0,0,0,.2)";
        ctx.beginPath();
        for (let i = 0; i < numY; i++) {
            let y = 50 + i * highGap;
            ctx.moveTo(50, y);
            ctx.lineTo(axisX + 55, y);
        }
        ctx.stroke();

        //画折线
        for (let i = 0; i < iArr.length; i++) {
            this.PaintSingleLine(iArr[i], ctx, axisY, numX, lineGap,max);
        }
    },

    PaintSingleLine: function(index, ctx, axisY, numX, lineGap, max) {
        //将销量计算转化为折线高度
        let highArr = [];
        for (let i = 0; i < this.rowArr[index].length; i++) {
            highArr.push(this.rowArr[index][i] * axisY / max);
        }
        //画折线
        ctx.strokeStyle = colorSeq[index];
        ctx.fillStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < numX; i++) {
            let x = i * lineGap + 50,
                y = 50 + axisY - highArr[i];

            if (i < numX - 1) {
                let nextX = (i + 1) * lineGap + 50,
                    nextY = 50 + axisY - highArr[i + 1];
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nextX, nextY);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(x + 3, y);
            ctx.arc(x, y, 3, 0, 2 * Math.PI, 0);
            ctx.stroke();
            ctx.fill();
        }
    },

    GetArrMax: function(iArr) {
        let maxArr = [];
        for (let i = 0; i < iArr.length; i++) {
            maxArr.push(Math.max.apply(Math, this.rowArr[iArr[i]]));
        }
        return Math.max.apply(Math, maxArr);
    }
}
