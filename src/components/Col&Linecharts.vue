<template>
    <div>

        <el-date-picker placeholder='Start time' :picker-options="pickeroptions" v-model="first"
            value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>

        <el-date-picker placeholder='End time' :picker-options="pickeroptions2" v-model="second"
            value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>

        <el-button @click="search" type="primary"> 查询 </el-button>
        <el-button @click="reset" type="primary"> 重置 </el-button>
        <br>
        <br>

        <highcharts :options="container" v-loading.fullscreen.lock="fullscreenLoading">

        </highcharts>

    </div>
</template>


<script>
    import { GetInfo, SearchInfo, Highcharts } from './.././api/index'
    export default {
        name: "",
        data() {
            return {
                wolist: "",
                fullscreenLoading: false,
                container: {
                    series: [
                        // {
                        //     name: '温度1',
                        //     type: 'line',

                        //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 18.3, 13.9, 9.6],
                        // },
                        // {
                        //     name: '温度2',
                        //     type: 'line',
                        //     data: [11.0, 16.9, 19.5, 124.5, 118.2, 121.5, 123.3, 118.3, 113.9, 19.6],
                        // }
                    ],
                    title: {
                        text: "工单生产情况"
                    },
                    xAxis: {
                        title: {
                            text: "工单",
                            align: "high"
                        },
                        categories: [],
                        crosshair: true
                    },
                    yAxis: [
                        {
                            title: {
                                text: "数量/个",
                                align: "high"
                            },
                        },
                        // {
                        //     title: {
                        //         text: "产品 數量(右柱状)",
                        //         align: "high"
                        //     },
                        //     opposite: true //左右Y軸 
                        // },
                    ],
                    credits: {
                        enabled: false //去除右下角水印
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    }
                },
                choseday: "",
                pn: "",
                pnlist: "",
                titletxt: "",
                ycount: [],
                flag: "0",

                ycounts: [],
                first: "",
                second: "",
                pickeroptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                pickeroptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                }

            }
        },
        created() {
            this.getwo();
            this.getwip();
        },
        methods: {
            search() {
                console.log(this.first + "  " + this.second);

            },

            reset() {
                this.first = "";
                this.second = "";
            },

            //获取横坐标，工单
            getwo() {
                var params = {
                    mode: "selwo"
                }
                Highcharts(params)
                    .then(res => {
                        for (var i = 0; i < res.data.total; i++) {
                            this.container.xAxis.categories.push(res.data.rows[i].wo);
                            this.ycount[i] = res.data.rows[i].qty;
                        }
                        this.container.series.push({ name: "计划产量", data: this.ycount.map(Number) });
                    })
                    .catch(function (error) { console.log(error) });
            },

            //获取工单实际完成量
            getwip() {
                var params = {
                    mode: "colandline"
                }
                Highcharts(params)
                    .then(res => {
                        var model = res.data;
                        for (var i = 0; i < model.total; i++) {
                            this.ycount[i] = model.rows[i].Column1;
                        }
                        this.container.series.push({ name: "实际产量", data: this.ycount.map(Number), type: "column" });
                    })
                    .catch(function (error) { console.log(error) })
            }
        }
    }


</script>