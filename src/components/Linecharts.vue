<template>
    <div>
         
                    <el-select v-model="choseday">
                        <el-option value="today" label="當天">當天</el-option>
                        <el-option value="three" label="最近三天">最近三天</el-option>
                        <el-option value="weekday" label="最近一周">最近一周</el-option>
                        <el-option value="monthday" label="最近一个月">最近一个月</el-option>
                    </el-select>

                    <el-select v-model="pn">
                        <el-option value="selall" label="所有PN">所有PN</el-option>
                        <el-option v-for="list in pnlist" :value="list.PN" :key="list.PN">{{list.PN}}</el-option>
                    </el-select>

                    <el-button @click="search()" type="primary"> 查询
                    </el-button>

                    <el-button @click="reset()" type="primary"> 重置 </el-button>
                    <br>
                    <br>

                    <highcharts :options="container" v-loading.fullscreen.lock="fullscreenLoading">

                    </highcharts>
                
    </div>
</template>

<script>
    import { GetInfo, SearchInfo } from './.././api/index'
    export default {
        name: "",
        data() {
            return {
                fullscreenLoading: false,
                container: {
                    series: [{
                        name: "pn",
                        data: [0, 0, 0, 0]
                    },
                    {
                        name: '安装，实施人员',
                        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                    }, {
                        name: '工人',
                        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                        name: '销售',
                        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                        name: '项目开发',
                        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                        name: '其他',
                        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }
                    ],
                    title: {
                        text: "工站過站數量"
                    },
                    xAxis: {
                        title: {
                            text: "工站",
                            align: "high"
                        },
                        categories: []
                    },
                    yAxis: {
                        title: {
                            text: "數量",
                            align: "high"
                        }
                    },
                    chart: {
                        type: "line"
                        //column：柱状图
                    },
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
                flag: "0"
            }
        },
        created() {
            this.getpnlist();
        },
        methods: {
            getpnlist() {
                var params = {
                    mode: "GetPNInfo"
                };
                GetInfo(params)
                    .then((res) => {
                        this.pnlist = res.data.Table;
                    })
                    .catch(function (error) { console.log(error) })
            },

            search() {
                if (this.pn == "" || this.choseday == "") {
                    this.$message({
                        message: "PN和日期選擇不能為空！",
                        showClose: true,
                        type: "warning"
                    });
                }
                else {
                    this.fullscreenLoading = true;
                    this.container.series.length = 0;
                    this.container.xAxis.categories.length = 0;
                    this.ycount.length = 0;
                    if (this.choseday == "today") {
                        this.container.title.text = "當天工站過站數量"
                    }
                    if (this.choseday == "weekday") {
                        this.container.title.text = "最近一周工站過站數量";
                    }
                    if (this.choseday == "monthday") {
                        this.container.title.text = "最近一个月工站過站數量";
                    }
                    if (this.choseday == "three") {
                        this.container.title.text = "最近三天工站過站數量";
                    }

                    var params = {
                        choseday: this.choseday,
                        pn: this.pn
                    };
                    this.container.series.length = 0;
                    if (this.pn == "selall") {
                        params.mode = "selprocuder"
                        $.ajax({
                            url: "/api/SearchInfo",
                            type: "post",
                            data: params,
                            success: (data) => {
                                var res = JSON.parse(data);

                                for (var j = 0; j < this.pnlist.length; j++) {
                                    var arr = [];
                                    for (var i = 0; i < res.total; i++) {
                                        if (res.rows[i]["pn"] == this.pnlist[j].PN) {
                                            arr.push(res.rows[i]);
                                        }
                                    }
                                    for (var m = 0; m < arr.length; m++) {
                                        this.ycount[m] = arr[m].cou;//数量 
                                        this.container.xAxis.categories.push(arr[m].name);
                                    }
                                    this.container.series.push({ name: this.pnlist[j].PN, data: this.ycount.map(Number) });

                                }
                                this.fullscreenLoading = false;
                            },
                            error: function (error) { console.log(error) }
                        });
                    }
                    else {
                        params.mode = "selcount";
                        $.ajax({
                            url: "/api/SearchInfo",
                            type: "post",
                            data: params,
                            success: (data) => {
                                var model = JSON.parse(data);
                                for (var j = 0; j < model.total; j++) {
                                    this.ycount[j] = model.rows[j].count;//数量 
                                    this.container.xAxis.categories.push(model.rows[j].processname);
                                }
                                this.container.series.push({ name: params.pn, data: this.ycount.map(Number) });
                                this.fullscreenLoading = false;
                            },
                            error: function (error) { console.log(error); }
                        });
                    }
                }

            },

            reset() {

                this.container.series.length = 0;
                this.container.xAxis.categories.length = 0;
                this.ycount.length = 0;
                this.container.series.push({ name: "pn", data: [0, 0, 0, 0] });
                this.pn = "";
                this.choseday = "";
                this.$message({
                    type: "success",
                    message: "重置成功",
                    icon: true,
                    showClose: true
                });
            }
        }
    }


</script>