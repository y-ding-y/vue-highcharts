<template>
    <div>
        <el-button @click="downwxcel" type="success">下载Excel模板</el-button>
        <br>
        <el-divider></el-divider>
        <el-tag effect="plain" style="font-size: 18px;" ><i class="el-icon-warning-outline"></i>Excel模板說明：</el-tag>
        <el-table :data="tableData  " stripe border>
            <el-table-column label="">
                <template slot-scope="{row}">
                    <el-tag type="primary">{{row.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="LineID（產線）" prop="LineID"></el-table-column>
            <el-table-column label="ShiftID（班別）" prop="ShiftID"></el-table-column>
            <el-table-column label="ProductDate（日期）" prop="ProductDate"></el-table-column>
            <el-table-column label="SectorID（製程）" prop="SectorID"></el-table-column>
            <el-table-column label="TimeID（課別）" prop="TimeID"></el-table-column>
            <el-table-column label="TargetYieldQty（目標產量）" prop="TargetYieldQty"></el-table-column>
            <el-table-column label="FactYieldQty（實際產量）" prop="FactYieldQty"></el-table-column>
            <el-table-column label="DTTargetTime（D/T目標）" prop="DTTargetTime"></el-table-column>
            <el-table-column label="DTFactTime（D/T實際）" prop="DTFactTime"></el-table-column>
            <el-table-column label="LossReason（D/T項目）" prop="LossReason"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [{
                    name: "輸入：",
                    LineID: "A1,A2,A3,A4",
                    ShiftID: "A005,A006",
                    ProductDate: "yyyy-MM-dd",
                    SectorID: "OM,S1,S2,L1,L2",
                    TimeID: "T01,T02,T03,T04,T05,T06",
                    TargetYieldQty: "",
                    FactYieldQty: "",
                    DTTargetTime: "",
                    DTFactTime: "",
                    LossReason: "",
                },
                {
                    name: "示例：",
                    LineID: "A1",
                    ShiftID: "A005",
                    ProductDate: "2020-01-02",
                    SectorID: "OM",
                    TimeID: "T01",
                    TargetYieldQty: "4000",
                    FactYieldQty: "3484",
                    DTTargetTime: "29",
                    DTFactTime: "120",
                    LossReason: "",
                }, {
                    name: "說明：",
                    LineID: "A1：產線1\r\nA2：產線2\r\nA3：產線3\r\nA4：產線4\r\n",
                    ShiftID: "A005：白班\r\nA006：夜班\r\n",
                    ProductDate: "",
                    SectorID: "",
                    TimeID: "T01：第一節課\r\nT02：第二節課\r\nT03：第三節課\r\nT04：第四節課\r\nT05：第五節課\r\nT06：第六節課\r\n",
                    TargetYieldQty: "",
                    FactYieldQty: "",
                    DTTargetTime: "",
                    DTFactTime: "",
                    LossReason: "",
                },]
            }
        },
        created() {
            console.log(this.tableData);
        },
        methods: {
            downwxcel() {
                console.log("1");
                let elink = document.createElement('a');
                elink.href = "/api/UploadFile?mode=downexcel";
                elink.download = "moban.xls";
                elink.click();
            }

        }
    }
</script>

<style>
    .el-table .cell {
        white-space: pre-line;
    }
</style>