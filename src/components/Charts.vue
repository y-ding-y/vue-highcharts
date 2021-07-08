<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">
                        扇形圖
                    </div>
                    <pie1></pie1>
                </el-card>
            </el-col>

            <!-- <el-col :span="6">
                <el-card shadow="hover"  style="background-color:rgba(122,122,212,0)">
                 
                </el-card>
            </el-col> -->
            <el-col :span="12">
                <el-card shadow="hover">
                    <div slot="header">
                        餅狀圖
                    </div>
                    <pie></pie>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header">
                        折線圖
                    </div>
                    <linecharts></linecharts>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header">
                        可下钻式竖状统计图
                    </div>
                    <columncharts></columncharts>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-card shadow="hover">
                    <div slot="header">
                        折线&竖状统计图
                    </div>
                    <collinecharts></collinecharts>
                </el-card>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    import pie1 from './Piecharts1.vue'
    import pie from './Piecharts.vue'
    import linecharts from './Linecharts.vue'
    import columncharts from './Columncharts.vue'
    import collinecharts from './Col&Linecharts.vue'

    export default {
        data() {
            return {

            }
        },
        components: {
            pie1,
            pie,
            linecharts,
            columncharts,
            collinecharts
        }
    }
</script>