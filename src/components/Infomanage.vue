<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date">資料維護</i>
                </el-breadcrumb-item>
                <el-breadcrumb-item>Jquery版本</el-breadcrumb-item>
            </el-breadcrumb> 
        </div>
        <el-button @click="openpage" type="success">
            上傳Excel
        </el-button>
    </div>

</template>
<script>
    export default {
        data() {
            return {

            }
        },
        created() {
            // this.openpage();
        },
        methods: {
            openpage() {
                window.location.href = " http://10.98.5.58:9055/";
            }
        }
    }
</script>