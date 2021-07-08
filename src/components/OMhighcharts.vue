<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-date-picker v-model="today" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
        
                <el-button @click="search" type="primary" icon="el-icon-search">Search</el-button>
 
                <el-card >
                    <highcharts :options="container" v-loading="loading"></highcharts>
                    <el-table :data="tabledata" max-height="350px" stripe v-loading="loading2">
                        <template v-for="item in tablename">
                            <el-table-column :prop="item.label" :label="item.label">
                            </el-table-column>
                        </template>
                    </el-table>
                </el-card> 
            </el-col>
        </el-row>

    </div>
</template>


<script>
    import { GetInfo, SearchInfo } from './.././api/index'
    export default { 
        data() {
            return {
                loading2: false,
                loading: false,
                container: {
                    series: [],
                    title: {
                        text: "OM產線近兩周產出"
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
                pnlist: [{ sector: "A1" }, { sector: "A2" }, { sector: "A3" }, { sector: "A4" }, { sector: "A5" } ],
                titletxt: "",
                ycount: [],
                flag: "0",
                tabledata: [],
                tablename: [],
                today: ""
            }
        },
        created() {
            this.getpnlist(); 
            this.getdate();
        },
        methods: {
            search(){
                this.container.series=[];
                this.container.xAxis.categories=[];
                this.tablename=[];
                this.getpnlist();
            },
            getdate() {
                var aData = new Date();
                var month = aData.getMonth() + 1 < 10 ? "0" + (aData.getMonth() + 1) : (aData.getMonth() + 1);
                var day = aData.getDate() < 10 ? "0" + (aData.getDate()) : (aData.getDate());
                this.today = aData.getFullYear() + "-" + month + "-" + day;
                console.log(this.today);
            },
            getpnlist() {
                var params = {
                    mode: "ombyline", 
                    today: this.today
                };
                this.loading = true;
                this.loading2 = true;
                GetInfo(params)
                    .then((res) => {
                        this.loading = false;
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
                            
                            this.container.series.push({ name: this.pnlist[j].sector, data: this.ycount.map(Number) });
                        }
                    })
                    .catch(function (error) { console.log(error) })

                var params2 = {
                    mode: "ombylinetable", 
                    today: this.today
                };

                GetInfo(params2)
                    .then(res => {
                        this.loading2 = false;
                        console.log(res.data)
                        this.tabledata = res.data.Table;
                        res.data.Table.splice(5,1);
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