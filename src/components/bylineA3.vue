<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <highcharts :options="container" v-loading="loading"></highcharts>
            </el-col>
        </el-row>
        <el-row :gutter="24" >
            <el-col :span="24">
                <el-table :data="tabledata" max-height="350px" stripe v-loading="loading2">
                    <template v-for="item in tablename">
                        <el-table-column :prop="item.label" :label="item.label">

                        </el-table-column>
                    </template>
                </el-table>
            </el-col>
        </el-row>





    </div>
</template>


<script>
    import { GetInfo, SearchInfo } from './.././api/index'
    export default {
        name: "",
        data() {
            return {
                loading2: false,
                loading: false,
                container: {
                    series: [],
                    title: {
                        text: "A3產線近兩周產出"
                    },
                    xAxis: {
                        title: {
                            text: "日期",
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
                pnlist: [{ sector: "OM1" }, { sector: "OM" }, { sector: "S1" }, { sector: "S2" }, { sector: "L1" }, { sector: "L2" }],
                titletxt: "",
                ycount: [],
                flag: "0",
                tabledata: [],
                tablename: [],
            }
        },
        created() {
            this.getpnlist();
            this.getstore();
        },
        methods: {
            getstore() {
                console.log(this.$store.getters.gettoday)
            },
            getpnlist() {
                var params = {
                    mode: "byline",
                    lineid: "A3",
                    today: this.$store.getters.gettoday
                };
                this.loading = true;
                this.loading2 = true;
                GetInfo(params)
                    .then((res) => {
                        this.loading=false;
                        var model = res.data.Table;
                        for (var j = 0; j < this.pnlist.length; j++) {
                            var arr = [];
                            for (var i = 0; i < model.length; i++) {
                                if (model[i]["sector"] == this.pnlist[j].sector) {
                                    arr.push(model[i]);
                                }
                            }
                            for (var m = 0; m < arr.length; m++) {
                                this.ycount[m] = arr[m].cou;//数量 
                                this.container.xAxis.categories.push(arr[m].prodate);

                            }
                            if (this.pnlist[j].sector == "OM1") {
                                this.pnlist[j].sector = "OM預期";
                            }
                            this.container.series.push({ name: this.pnlist[j].sector, data: this.ycount.map(Number) });
                        }
                    })
                    .catch(function (error) { console.log(error) })

                var params2 = {
                    mode: "bylinetable",
                    lineid: "A3",
                    today: this.$store.getters.gettoday
                };
 
                GetInfo(params2)
                    .then(res => {
                        this.loading2=false;
                        console.log(res.data)
                        this.tabledata = res.data.Table;
                        for (var key in res.data.Table[0]) { 
                            this.tablename.push({ label: key });
                        } 
                    })
                    .catch(function (error) { console.log(error) })
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
            },

        }
    }


</script>