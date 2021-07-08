<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item separator="/">
                    <i class="el-icon-date">&nbsp;各產線推移圖</i>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-select v-model="lineid" multiple style="width: 350px;">
            <el-option value="A1">A1</el-option>
            <el-option value="A2">A2</el-option>
            <el-option value="A3">A3</el-option>
            <el-option value="A4">A4</el-option>
            <el-option value="A5">A5</el-option>
            <el-option value="A6">A6</el-option>
        </el-select>

        <el-date-picker v-model="today" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
        </el-date-picker>

        <el-button @click="search" type="primary" icon="el-icon-search">Search</el-button>
        <br><br>
        <el-row :gutter="24" v-if="a1">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a1 :key="key1"></a1>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24" v-if="a2">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a2 :key="key2"></a2>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24" v-if="a3">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a3 :key="key3"></a3>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24" v-if="a4">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a4 :key="key4"></a4>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24" v-if="a5">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a5 :key="key5"></a5>
                </el-card>
            </el-col>
        </el-row>
        <br>
        <el-row :gutter="24" v-if="a6">
            <el-col :span="24">
                <el-card shodow="hover">
                    <a6 :key="key6"></a6>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { GetInfo, SearchInfo } from './.././api/index'

    import a1 from './bylineA1'
    import a2 from './bylineA2'
    import a6 from './bylineA6'
    import a3 from './bylineA3'
    import a4 from './bylineA4'
    import a5 from './bylineA5'

    export default {
        name: "",
        data() {
            return {
                a1: true,
                a2: true,
                a3: true,
                a4: true,
                a5: true,
                a6: true,
                key1: 1,
                key2: 1,
                key3: 1,
                key4: 1,
                key5: 1,
                key6: 1,

                fullscreenLoading: false,
                container: {
                    series: [],
                    title: {
                        text: "工站過站數量"
                    },
                    xAxis: {
                        title: {
                            text: "工站",
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
                        //column：柱状图
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
                pnlist: [{ sector: "OM1" }, { sector: "OM" }, { sector: "S1" }, { sector: "S2" }, { sector: "L1" }, { sector: "L2" }],
                titletxt: "",
                ycount: [],
                flag: "0",
                lineid: ["A1", "A2", "A3", "A4", "A5","A6"],
                today: ""
            }
        },
        created() {
            this.getdate();
        },
        components: {
            a1, a2, a3, a4, a5,a6
        },
        watch: {
            lineid() {
                this.$store.commit("setlineid", this.lineid);
                this.a1 = this.a2 = this.a3 = this.a4 = this.a5=this.a6 = false;
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A1") {
                        this.a1 = true;
                    }
                }
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A2") {
                        this.a2 = true;
                    }
                }
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A3") {
                        this.a3 = true;
                    }
                }
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A4") {
                        this.a4 = true;
                    }
                }
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A5") {
                        this.a5 = true;
                    }
                }
                for (var i = 0; i < this.lineid.length; i++) {
                    if (this.lineid[i] == "A6") {
                        this.a6 = true;
                    }
                }
            },
            today() {
                this.$store.commit("settoday", this.today)
            }
        },
        methods: {
            getdate() {
                var aData = new Date();
                var month = aData.getMonth() + 1 < 10 ? "0" + (aData.getMonth() + 1) : (aData.getMonth() + 1);
                var day = aData.getDate() < 10 ? "0" + (aData.getDate()) : (aData.getDate());
                this.today = aData.getFullYear() + "-" + month + "-" + day;
                console.log(this.today);
            },
            search() {
                console.log(this.$store.getters.getlineid)
                console.log(this.today);
                ++this.key1;
                ++this.key2;
                ++this.key3;
                ++this.key4;
                ++this.key5;
                ++this.key6;
            }
        }
    }


</script>