let options = data => {
    return {
        title: {
            text: '设备数量统计'
        },
        tooltip: {},
        legend: {
            data: ['入库数量', '入所数量', '安装数量'],
            show:true,
            right:'1'
        },
        xAxis: {
            name: '月份',
            nameTextStyle: {
                color:'black'
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine:{
                show:true,
                lineStyle:{
                    color: 'rgba(204,204,204,1)',
                    width: 2
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000000',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                }
            }
        },
        yAxis: {
            name: '数量',
            nameTextStyle: {
                color:'black'
            },
            axisLine:{
                show:true,
                lineStyle:{
                    color: 'rgba(204,204,204,1)',
                    width: 2
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000000',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                }
            }
        },
        series: data,
        grid: {
            left: '4%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        }
    }
}
class ColumnarOptions {

    constructor(data) {
        this.data = data
        this.options = options(this.data)
        return this
    }

    getOptions() {
        return this.options
    }
}


export default ColumnarOptions
