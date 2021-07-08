<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date">&nbsp;OM產出月報</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-date-picker v-model="month" type="month" placeholder="选择月" value-format="yyyy-MM"></el-date-picker>

        <el-button @click="search" type="primary"> 查询 </el-button>
        <el-button @click="reset" type="primary"> 重置 </el-button>
        <br>
        <br>

        <highcharts :options="container" v-loading="fullscreenLoading">

        </highcharts>
        <br>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header">
                        OM Gap統計
                        <el-tag type="danger">Gap&lt;5000</el-tag>
                        <el-tag type="info">5000&lt;Gap&lt;10000</el-tag>
                        <el-tag type="warning">10000&lt;Gap&lt;15000</el-tag>
                        <el-tag type="success">Gap&gt;15000</el-tag>

                    </div>
                    <el-table :data="tabledata" stripe border v-loading="load_table">
                        <!-- max-height="300px" -->
                        <el-table-column label="日期" prop="prodate"></el-table-column>
                        <el-table-column label="Daily Gap A1">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_a1<5000 ?'danger':((row.cou_a1>=5000 && row.cou_a1<9000)?'info':((row.cou_a1>=9000 && row.cou_a1<15000)?'warning':(row.cou_a1>=15000 ?'success':'')))">
                                    {{row.cou_a1}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Daily Gap A2">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_a2<5000 ?'danger':((row.cou_a2>=5000 && row.cou_a2<9000)?'info':((row.cou_a2>=9000 && row.cou_a2<15000)?'warning':(row.cou_a2>=15000 ?'success':'')))">
                                    {{row.cou_a2}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Daily Gap A3">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_a3<5000 ?'danger':((row.cou_a3>=5000 && row.cou_a3<9000)?'info':((row.cou_a3>=9000 && row.cou_a3<15000)?'warning':(row.cou_a3>=15000 ?'success':'')))">
                                    {{row.cou_a3}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Daily Gap A4">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_a4<5000 ?'danger':((row.cou_a4>=5000 && row.cou_a4<9000)?'info':((row.cou_a4>=9000 && row.cou_a4<15000)?'warning':(row.cou_a4>=15000 ?'success':'')))">
                                    {{row.cou_a4}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Gap Total">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_total<5000 ?'danger':((row.cou_total>=5000 && row.cou_total<9000)?'info':((row.cou_total>=9000 && row.cou_total<15000)?'warning':(row.cou_total>=15000 ?'success':'')))">
                                    {{row.cou_total}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="Cum Gap" prop="">
                            <template slot-scope="{row}">
                                <!-- <span>{{ row.Operate}}</span> -->
                                <el-tag
                                    :type=" row.cou_cumtotal<5000 ?'danger':((row.cou_cumtotal>=5000 && row.cou_cumtotal<9000)?'info':((row.cou_cumtotal>=9000 && row.cou_cumtotal<15000)?'warning':(row.cou_cumtotal>=15000 ?'success':'')))">
                                    {{row.cou_cumtotal}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>


<script>
    import { GetInfo, SearchInfo, Highcharts } from './.././api/index'
    export default {
        name: "",
        data() {
            return {
                month: "",
                wolist: "",
                fullscreenLoading: false,
                load_table: "",
                container: {
                    series: [
                        // {
                        //     name: '温度1',
                        //     type: 'line',

                        //     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 18.3, 13.9, 9.6],
                        // },
                        // {
                        //     name: '温度2',
                        //     type: 'column',
                        //     data: [11.0, 16.9, 19.5, 124.5, 118.2, 121.5, 123.3, 118.3, 113.9, 19.6],
                        // }
                    ],
                    title: {
                        text: "產出月報"
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
                                text: "OM Output/個",
                                align: "high"
                            },

                        },
                        {
                            title: {
                                text: "Cum OM Output/個",
                                align: "high"
                            },
                            opposite: true //左右Y軸 
                        },
                    ],
                    credits: {
                        enabled: false //去除右下角水印
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            }
                        },
                        column: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    }
                },
                tabledata: [],
                choseday: "",
                pn: "",
                pnlist: "",
                titletxt: "",
                ycount: [],
                y_pout: [],
                y_aout: [],
                y_pcumout: [],
                y_acumout: [],
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
            this.getmonth();
            this.getinfo();
        },
        methods: {
            search() {
                console.log(this.month);
                this.container.series.length = 0;
                this.container.xAxis.categories.length = 0;
                this.ycount.length = 0;
                this.y_aout.length = 0;
                this.y_pcumout.length = 0;
                this.y_acumout.length = 0;
                this.getinfo();
            },
            getmonth() {
                var aData = new Date();
                this.month = aData.getFullYear() + "-" + (aData.getMonth() + 1);
                console.log(this.month);
            },
            reset() {
                this.first = "";
                this.second = "";
            },
            getinfo() {
                var params = {
                    mode: "bymonth",
                    today: this.month
                }
                this.fullscreenLoading = true;
                GetInfo(params)
                    .then(res => {
                        this.fullscreenLoading = false;
                        for (var i = 0; i < res.data.Table.length; i++) {
                            this.container.xAxis.categories.push(res.data.Table[i].prodate);
                            this.y_pout[i] = res.data.Table[i].p_out;
                            this.y_aout[i] = res.data.Table[i].a_out;
                            this.y_pcumout[i] = res.data.Table[i].p_cumout;
                            this.y_acumout[i] = res.data.Table[i].a_cumout;
                        }
                        this.container.series.push({ name: "Plan Output Total", data: this.y_pout.map(Number), type: "column" });
                        this.container.series.push({ name: "Actual Output Total", data: this.y_aout.map(Number), type: "column" });
                        this.container.series.push({ name: "Cum Plan Output Total", data: this.y_pcumout.map(Number), yAxis: 1 });
                        this.container.series.push({ name: "Cum Actual Output Total", data: this.y_acumout.map(Number), yAxis: 1 });
                    })
                    .catch(function (error) { console.log(error) })

                var params = {
                    mode: "bymonthtable",
                    today: this.month
                }
                this.load_table = true;
                GetInfo(params)
                    .then(res => {
                        this.load_table = false;
                        console.log(res.data);
                        this.tabledata = res.data.Table;
                    })
                    .catch(function (error) { console.log(error) })
            },
        }
    }


</script>