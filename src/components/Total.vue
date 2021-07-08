<template>
    <div>
        <el-date-picker v-model="today" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>

        <el-button type="primary" @click="searchtotal" icon="el-icon-search">Search</el-button>
        <br><br>
        <el-row :gutter="24">
            <el-col :span="8">
                <el-card>
                    <div style="background-color:rgb(209, 186, 219);text-align: center;height: 30px;line-height: 30px;">
                        {{today}}總產出
                    </div>
                    <el-table :data="tableyesterday" :span-method="objectSpanMethod" border v-loading="load_yes"
                        :row-class-name="tableRowClassName" :cell-class-name="handle_cellstyle">
                        <el-table-column prop="lineid" label="產線" width="50px"></el-table-column>
                        <el-table-column prop="name" label="項目" width="50px"></el-table-column>
                        <el-table-column prop="S1" label="S1" width="70px"></el-table-column>
                        <el-table-column prop="S2" label="S2" width="70px"></el-table-column>
                        <el-table-column prop="L1" label="L1" width="70px"></el-table-column>
                        <el-table-column prop="L2" label="L2" width="70px"></el-table-column>
                        <el-table-column prop="OM" label="OM" width="70px"></el-table-column>
                        <el-table-column prop="per" label="綜合達成"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div style="background-color:rgb(155, 228, 228);text-align: center;height: 30px;line-height: 30px;">
                        {{today}}白班產出
                    </div>
                    <el-table :data="tabletoday1" :span-method="objectSpanMethod" border v-loading="load_a005"
                        :row-class-name="tableRowClassName" :cell-class-name="handle_cellstyle">
                        <el-table-column prop="lineid" label="產線" width="50px"></el-table-column>
                        <el-table-column prop="name" label="項目" width="50px"></el-table-column>
                        <el-table-column prop="S1" label="S1" width="70px"></el-table-column>
                        <el-table-column prop="S2" label="S2" width="70px"></el-table-column>
                        <el-table-column prop="L1" label="L1" width="70px"></el-table-column>
                        <el-table-column prop="L2" label="L2" width="70px"></el-table-column>
                        <el-table-column prop="OM" label="OM" width="70px"></el-table-column>
                        <el-table-column prop="per" label="綜合達成"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div style="background-color:rgb(211, 211, 211);text-align: center;height: 30px;line-height: 30px;">
                        {{today}}夜班產出
                    </div>
                    <el-table :data="tabletoday2" border :span-method="objectSpanMethod" v-loading="load_a006"
                        :row-class-name="tableRowClassName" :cell-class-name="handle_cellstyle">
                        <el-table-column prop="lineid" label="產線" width="50px"></el-table-column>
                        <el-table-column prop="name" label="項目" width="50px"></el-table-column>
                        <el-table-column prop="S1" label="S1" width="70px"></el-table-column>
                        <el-table-column prop="S2" label="S2" width="70px"></el-table-column>
                        <el-table-column prop="L1" label="L1" width="70px"></el-table-column>
                        <el-table-column prop="L2" label="L2" width="70px"></el-table-column>
                        <el-table-column prop="OM" label="OM" width="70px"></el-table-column>
                        <el-table-column prop="per" label="綜合達成"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { GetInfo } from '@/api/index.js'
    import moment from 'moment'

    export default {
        data() {
            return {
                today: "",
                yesterday: "",

                tabletoday1: [],
                tabletoday2: [],
                tableyesterday: [],

                load_yes: false,
                load_a005: false,
                load_a006: false,
            }
        },
        created() {
            this.getdate();
            this.searchtotal();
        },
        activated() {
            this.getdate();
            this.searchtotal();
        },
        methods: {
            getdate() {
                var aData = new Date();
                var month = aData.getMonth() + 1 < 10 ? "0" + (aData.getMonth() + 1) : (aData.getMonth() + 1);
                var day = aData.getDate() < 10 ? "0" + (aData.getDate()) : (aData.getDate());
                this.today = aData.getFullYear() + "-" + month + "-" + day;
                this.yesterday = aData.getFullYear() + "-" + month + "-" + (day - 1);
            },
            searchtotal() {
                var params = {
                    mode: "bytotal",
                    today: this.today,
                    shiftday: "A005",
                };
                this.load_a005 = true;
                GetInfo(params)
                    .then(res => {
                        this.load_a005 = false;
                        var model = res.data.Table;
                        this.tabletoday1 = model;
                    })
                    .catch(function (error) { console.log(error) })

                var params2 = {
                    mode: "bytotal",
                    today: this.today,
                    shiftday: "A006",
                };
                this.load_a006 = true;
                GetInfo(params2)
                    .then(res => {
                        this.load_a006 = false;
                        var model = res.data.Table;
                        this.tabletoday2 = model;
                    })
                    .catch(function (error) { console.log(error) })

                this.yesterday = this.delDate(this.today);
                var params3 = {
                    mode: "bytotal",
                    today: this.today,
                    shiftday: "All",
                };
                this.load_yes = true;
                console.log(this.yesterday);
                GetInfo(params3)
                    .then(res => {
                        this.load_yes = false;
                        console.log(res.data.Table);
                        var model = res.data.Table;
                        this.tableyesterday = model;
                    })
                    .catch(function (error) { console.log(error) })


            },

            //合并表格_列
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex % 3 === 0) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
                if (columnIndex === 7) {
                    if (rowIndex % 3 === 0) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            delDate(time) {
                var dateTime = new Date(time);
                dateTime = dateTime.setDate(dateTime.getDate() - 1);
                // dateTime = new Date(dateTime);
                dateTime = moment(new Date(dateTime)).format("YYYY-MM-DD");
                return dateTime;
            },

            tableRowClassName({ row, rowIndex }) {
                if (row.lineid == "Total") {
                    return 'warning-row';
                }
                return '';

            },

            handle_cellstyle({ row, column, rowIndex, columnIndex }) {
                if (columnIndex == 7) {
                    if (Number(row.per.replace("%", "")) >= 95) {
                        return 'success-cell';
                    }
                    if (Number(row.per.replace("%", "")) < 95 &&Number(row.per.replace("%", "")) >= 90) {
                        return 'danger-cell';
                    }
                    if(Number(row.per.replace("%", "")) < 90)
                    {
                        return 'error-cell'
                    }
                }
                return '';

            }

        }
    }
</script>

<style>
    .el-table .warning-row {
        background: rgb(254, 255, 172);
    }

    .el-table .success-row {
        background: #38860d;
    }

    .success-cell {
        background: rgb(17, 199, 26);
        color: rgb(0, 0, 0);
    }

    .danger-cell {
        background: rgb(255, 206, 73);
        color: rgb(0, 0, 0);
    }

    .error-cell{
        background: rgb(218, 31, 31);
        color: rgb(0, 0, 0);
    }

    .el-table tr {
        pointer-events: none;
    }


</style>