<template >
    <div > 
        <highcharts :options="container" >

        </highcharts>
    </div>

    <!-- v-loading.fullscreen.lock="fullscreenLoading" -->
</template>

<script>
    export default {
        name: "pie1",
        data() {
            return {
                container: {
                    //colors: ['#058D17', '#50B432', '#ED561B', '#32D100', '#24C5E5', '#64E762', '#F2555', '#F2F863', '#63F2C4'],
                    colors: ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'grey', 'yellowgreen', 'white'],
                    chart: { 
                        backgroundColor: {
                            linearGradient: [0, 0, 1, 1],
                            stops: [
                                [0, 'rgba(0,0,0,0)'],
                                [1, 'rgba(0,0,0,0)']
                            ]
                        },
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        style: {
                            color: '#fff',
                            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                        },
                        text: '浏览器占比',
                        align: 'center',
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                enabled: true,
                                style: {
                                    enabled: true,
                                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                    style: {
                                        color: 'black'
                                    }
                                },
                            }
                        },
                    },
                    series: [{
                        type: 'pie',
                        name: '浏览器占比',
                        innerSize: '0',
                        data: [
                            ['Firefox', 45.0],
                            ['IE', 26.8],
                            ['Chrome', 12.8],
                            ['Safari', 8.5],
                            ['Opera', 6.2],
                            {
                                name: '其他',
                                y: 0.7,
                                dataLabels: { 
                                    enabled: false// 数据比较少，没有空间显示数据标签，所以将其关闭
                                }
                            }
                        ]
                    }]
                }
            }
        }
    }
</script>