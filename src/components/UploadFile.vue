<template>
    <div>

        <el-steps :active="active" finish-status="success" align-center>
            <el-step>
                <template slot="description">
                    <br>
                    <el-upload class="upload-demo" ref="upload" action :on-remove="handleRemove" :on-change="setfile"
                        :limit=1 key=key1 :file-list="fileList" :auto-upload="false">
                        <el-button type="primary">选取Excel文件</el-button>
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                    </el-upload>
                    <!-- <el-button type="primary" @click="clear">重新选取Excel</el-button> -->

                </template>
            </el-step>
            <el-step>
                <template slot="description">
                    <br>
                    <el-button type="success" ref="upload" @click="uploadexcel">點擊上傳 <i class="el-icon-upload"></i>
                    </el-button>
                </template>
            </el-step>
            <el-step>
                <template slot="description">
                    <br>
                    上傳成功
                </template>
            </el-step>
        </el-steps>
        <br>
        <!-- <el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize) " stripe
            v-loading.fullscreen.lock="loading">
            <el-table-column label="序號" align="center" width="100px">
                <template slot-scope="scope">
                    <span v-text="getIndex(scope.$index)"> </span>
                </template>
            </el-table-column>
            <el-table-column label="LineID" prop="LineID"></el-table-column>
            <el-table-column label="ShiftID" prop="ShiftID"></el-table-column>
            <el-table-column :formatter="dateFormat" label="ProductDate" prop="ProductDate">
            </el-table-column>
            <el-table-column label="SectorID" prop="SectorID"></el-table-column>
            <el-table-column label="TimeID" prop="TimeID"></el-table-column>
            <el-table-column label="TargetYieldQty" prop="TargetYieldQty"></el-table-column>
            <el-table-column label="FactYieldQty" prop="FactYieldQty"></el-table-column>
            <el-table-column label="DTTargetTime" prop="DTTargetTime"></el-table-column>
            <el-table-column label="DTFactTime" prop="DTFactTime"></el-table-column>
            <el-table-column label="LossReason" prop="LossReason"></el-table-column>
        </el-table> -->
        <el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize) " stripe
        v-loading.fullscreen.lock="loading">
        <el-table-column label="序號" align="center" width="100px">
            <template slot-scope="scope">
                <span v-text="getIndex(scope.$index)"> </span>
            </template>
        </el-table-column>
        <el-table-column label="LineID" prop="SO"></el-table-column>
        <el-table-column label="ShiftID" prop="Sales remark"></el-table-column>
        <el-table-column :formatter="dateFormat" label="ProductDate" prop="Life">
        </el-table-column>
        <el-table-column label="SectorID" prop=" 07/03confirmation "></el-table-column>
        <el-table-column label="TimeID" prop="Delivery_ID"></el-table-column>
        <el-table-column label="TargetYieldQty" prop="enableYN"></el-table-column>
        <el-table-column label="FactYieldQty" prop="createdate"></el-table-column>
        <el-table-column label="DTTargetTime" prop="Modifydate"></el-table-column> 
    </el-table>
        <div style="text-align: center;margin-top: 30px;">
            <el-pagination @size-change="handleSizeChange" @current-change="current_change"
                :page-sizes="[10, 20, 30, 50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>



    </div>
</template>

<script>
    import { readExcel } from './upload.js'
    import moment from 'moment'

    export default {
        data() {
            return {
                fileList: [],
                active: 0,
                filedata: "",
                tabledata: [],
                total: 0,
                pagesize: 10,
                currentPage: 1,
                key1: 1,
                loading: false,
            };
        },
        methods: {
            current_change: function (currentPage) {
                this.currentPage = currentPage;
            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            getIndex($index) {  //表格序号 
                return ((this.currentPage - 1) * this.pagesize + $index + 1)
            },
            dateFormat: function (row, column) {
                var date = row[column.property]
                if (date === undefined) {
                    return ''
                }
                return moment(date).format('YYYY-MM-DD')
            },
            clear() {
                ++this.key1;
                console.log(this.key1);
                this.fileList.length = 0;
                this.handleRemove();
                //    this.$refs.upload.clearFiles();  
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.tabledata.length = 0;
                this.total = 0;
                this.active = 0;
            },
            uploadexcel() {
                this.active = this.active + 1;
                console.log(this.filedata);
                var fd = new FormData();
                //this.$refs.upload.clearFiles()
                fd.append('username', 'root')
                fd.append('fafafa', this.filedata.raw);
                fd.append('mode', 'upfile_vue');
                console.log(this.filedata.raw);
                var that = this;
                this.loading = true;
                $.ajax({
                    url: '/api/UploadFile',
                    type: 'post',
                    processData: false,
                    contentType: false,
                    data: fd, //这儿的三个参数其实就是XMLHttpRequest里面带的信息。 
                    success: function (data) {
                        console.log(data);
                        that.loading = false;
                        //E:\------------------\网站程序\UploadExcel\UploadExcel\uploadfiles\357e80fa-e1a0-4c2a-a6b2-6dcf646e3265.xlsx
                        that.$message({ message: "上传成功", type: "success" })
                        that.active = that.active + 1;
                        console.log(that.active);
                    }
                })
            },
            setfile(file, fileList) {
                this.filedata = file;
				console.log(file);
                var rr = [];
                this.tabledata.length = 0;
                this.total = 0;
                rr = readExcel(file)
                this.loading = true;
                setTimeout(() => {
                    console.log(rr);
                    this.loading = false;
                    this.tabledata = rr[1].sheet;
                    this.total = rr[1].sheet.length;
                    //代码
                }, 1000);  //1秒后执行代码
                this.active = this.active + 1;

            },
        }
    }
</script>

<style>
    .el-upload {
        width: 120px;
        height: 35px
    }
</style>