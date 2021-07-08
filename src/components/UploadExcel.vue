<template>
    <div>
        <el-upload ref="upload" action="#" :limit="200" multiple accept=".xls,.xlsx" :on-change="handleChange"
            :on-remove="handleRemove" :on-exceed="handleExceed" :file-list="fileList" :http-request="uploadFile"
            :auto-upload="false">
            <el-button slot="trigger" type="primary" size="small" align="right">选取文件</el-button>
            </el-button>
            <el-button type="success" style="margin-left: 100px;" size="small" @click="submitUpload">
                上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过700KB</div>
        </el-upload>
        <!-- <el-dialog title="上传部件" :visible.sync="isEditWinShow" custom-class="customWidth" :close-on-click-modal="false">
            <el-form label-width="100px">
                <el-row>
                    <el-col :span="24">
                        <el-upload ref="upload" action="#" :limit="200" multiple accept=".xls,.xlsx"
                            :on-change="handleChange" :on-remove="handleRemove" :on-exceed="handleExceed"
                            :file-list="fileList" :http-request="uploadFile" :auto-upload="false">
                            <el-button slot="trigger" type="primary" size="small" align="right">选取文件</el-button>
                            </el-button>
                            <el-button type="success" style="margin-left: 100px;" size="small" @click="submitUpload">
                                上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不超过700KB</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog> -->
        <!-- <uploadfile>

</uploadfile> -->
    </div>
</template>

<script>
    import uploadfile from './UploadFile.vue'
    import UploadFile from './.././api/index'

    export default {
        data() {
            return {
                isEditWinShow: true,
                fileList: [],
            }
        },
        components: {
            uploadfile
        },
        methods: {
            // 导入exel
            async importExcel() {
                this.isEditWinShow = true;
            },
            // 上传文件
            uploadFile(file) {
                this.fileData.append('files', file.file);
            },
            submitUpload() {
                const loading = this.$loading({
                    lock: true,
                    text: '数据提取中，请稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                console.log(this.fileList);
                if (this.fileList.length === 0) {
                    this.$message({
                        message: '请先选择文件',
                        type: 'warning'
                    });
                } else {
                    const isLt700K = this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 700);
                    if (!isLt700K) {
                        this.$message.error('请检查，上传文件大小不能超过700KB!');
                    } else {
                        var formData = new FormData(); //  用FormData存放上传文件
                        this.fileList.forEach(file => {
                            formData.append('partsInfoFile', file.raw, file.raw.name);
                        })                           //向webapi发起请求，等待后台接收
                        // axios.post(axiosbaseUrl_ex + '/PartsInfo/upload/', formData, {
                        //     headers: {
                        //         'Content-Type': 'multipart/form-data'
                        //     }
                        // }) 
                        UploadFile(formData)
                            .then((response) => {
                                if (response.status == "200") {
                                    setTimeout(() => {
                                        loading.close();
                                        this.getPartsList();
                                        this.$message({
                                            type: 'success',
                                            message: '导入成功!'
                                        });
                                        this.getPartsList();
                                        this.fileList = [];
                                        this.fileData = "";
                                        this.isEditWinShow = false;
                                        this.isLoading = false;
                                    }, 1000);
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: '导入失败，请检查模板是否正确'
                                    });
                                    this.isLoading = false;
                                }
                            },
                                error => {
                                    loading.close();
                                    this.$message.error('系统异常，请稍后再试');
                                    return Promise.reject(error);
                                }
                            )
                    }
                }
            },
            //移除
            handleRemove(file, fileList) {
                this.fileList = fileList;
            },
            // 选取文件超过数量提示
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择200个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            //监控上传文件列表
            handleChange(file, fileList) {
                let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
                if (existFile) {
                    this.$message.error('当前文件已经存在!');
                    fileList.pop();
                }
                this.fileList = fileList;
            }
        }
    }
</script>