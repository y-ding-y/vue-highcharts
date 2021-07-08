<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date">資料維護</i>
                </el-breadcrumb-item>
                <el-breadcrumb-item>vue版本</el-breadcrumb-item>
            </el-breadcrumb>
        </div> 
        <el-row>
            <el-col>
                <el-card >
                    <el-tabs>
                        <el-tab-pane label="上传Excel文件">
                            <el-button @click="reupload" type="warning" ><i class="el-icon-refresh"></i>&nbsp;重置</el-button>
                            <uploadexcel :key=key1></uploadexcel>
                        </el-tab-pane>
                        <el-tab-pane label="下载Excel模板">
                            <downexcel></downexcel>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import uploadexcel from './UploadFile.vue'
    import downexcel from './Downexcel.vue'
    export default {
        data() {
            return {
                key1: 1
            }
        },
        components: {
            uploadexcel,
            downexcel
        },
        methods: {
            reupload() {
                ++this.key1;
            },
        },

    }
</script>