<template>
    <div>
        <el-row>
            <el-col>
                <el-card>
                    <el-table :data="tableData  " stripe border>
                        <el-table-column label="LineID" prop="LineID"></el-table-column>
                        <el-table-column label="ShiftID" prop="ShiftID"></el-table-column>
                        <el-table-column label="ProductDate" prop="ProductDate"></el-table-column>
                        <el-table-column label="SectorID" prop="SectorID"></el-table-column>
                        <el-table-column label="TimeID" prop="TimeID"></el-table-column>
                        <el-table-column label="TargetYieldQty" prop="TargetYieldQty"></el-table-column>
                        <el-table-column label="FactYieldQty" prop="FactYieldQty"></el-table-column>
                        <el-table-column label="DTTargetTime" prop="DTTargetTime"></el-table-column>
                        <el-table-column label="DTFactTime" prop="DTFactTime"></el-table-column>
                        <el-table-column label="LossReason" prop="LossReason"></el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import { GetInfo } from '@/api/index.js'
    export default {
        data() {
            return {
                tableData: [],
            }
        },
        created() {
            this.getinfo();
        },
        methods: {
            getinfo() {
                var params = {
                    mode: "searchbyday",
                    today: "2020-09-23"
                };
                GetInfo(params)
                    .then(res => {
                        var model = res.data.Table;
                        this.tableData = model;
                        console.log(res.data);
                    })
                    .catch(function (error) { console.log(error); })
            }
        }
    }
</script>