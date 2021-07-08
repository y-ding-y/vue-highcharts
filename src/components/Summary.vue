<template>
    <div>


        <el-card>
            <el-date-picker v-model="today" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>

            <el-select v-model="shiftday">
                <el-option value="A005" label='白班'>白班</el-option>
                <el-option value="A006" label='夜班'>夜班</el-option>
                <el-option value="all" label='当天'>当天</el-option>
            </el-select>
            <el-button icon="el-icon-search" @click="Get_Summary" type="primary">Search</el-button>
            <el-button icon="el-icon-download" @click="saveImage" type="success">Down png</el-button>

            <span style="font-size: 14px;"> 背景色： </span>
            <el-color-picker v-model="colorpicker" show-alpha></el-color-picker>
            <span style="font-size: 14px;"> {{colorpicker}}</span>
            <br><br>
            <div ref="cardCanvas" style="width: 100%;height: 100%;">
                <h1>{{today}}({{shiftday_txt}})生产总结</h1>
                <el-form ref="form" :model="form" label-width="80px" v-bind:style="{background:colorpicker}">
                    <el-form-item>
                        <span>1、达成率:</span>
                        <span class="span100">{{formdata.per_total}}</span>。
                        <!-- <span>比{{yesterday}}(<span class="span100">{{formdata.per_yester}}</span>)<span
                                v-html="rescompare"> </span> </span> -->
                    </el-form-item>
                    <el-form-item>
                        <span>2、(OM)目标：</span><span class="span100">{{formdata.om_plan}}</span>,
                        <span>实际：</span><span class="span100">{{formdata.om_act}}</span>,
                        <span>GAP：</span><span class="span100">{{formdata.om_gap}}</span>
                        <span>(达成率：<span class="span100">{{per_om}}</span>)</span>。
                    </el-form-item>
                    <el-form-item>
                        <span>3、(S)目标：</span><span class="span100">{{formdata.s_plan}}</span>,
                        <span>实际：</span><span class="span100">{{formdata.s_act}}</span>,
                        <span>GAP：</span><span class="span100">{{formdata.s_gap}}</span>,
                        <span>(达成率：<span class="span100">{{per_s}}</span>)</span>。
                    </el-form-item>
                    <el-form-item>
                        <span>4、(L1)目标：</span><span class="span100">{{formdata.l1_plan}}</span>,
                        <span>实际：</span><span class="span100">{{formdata.l1_act}}</span>,
                        <span>GAP：</span><span class="span100">{{formdata.l1_gap}}</span>,
                        <span>(达成率：<span class="span100">{{per_l1}}</span>)</span>。
                    </el-form-item>
                    <el-form-item>
                        <span>5、(L2)目标：</span><span class="span100">{{formdata.l2_plan}}</span>,
                        <span>实际：</span><span class="span100">{{formdata.l2_act}}</span>,
                        <span>GAP：</span><span class="span100">{{formdata.l2_gap}}</span>,
                        <span>(达成率：<span class="span100">{{per_l2}}</span>)</span>。
                    </el-form-item>
                    <el-form-item>
                        <span>6、By产线达成率</span><br>
                        <span>A1:</span><span class="span100">{{formdata.A1}}</span><br>
                        <span>A2:</span><span class="span100">{{formdata.A2}}</span><br>
                        <span>A3:</span><span class="span100">{{formdata.A3}}</span><br>
                        <span>A4:</span><span class="span100">{{formdata.A4}}</span><br>
                        <span>A5:</span><span class="span100">{{formdata.A5}}</span><br>
                        <span>A6:</span><span class="span100">{{formdata.A6}}</span><br>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>




    </div>
</template>

<script>
    import html2canvas from 'html2canvas'
    import { GetInfo } from '@/api/index.js'
    import moment from 'moment'
    export default {
        data: function () {
            return {
                dataURL: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formdata: "",
                today: "",
                yesterday: "",
                shiftday: "A005",
                shiftday_txt: "白班",
                comparedata: "",
                rescompare: "",
                per_om: "",
                per_s: "",
                per_l1: "",
                per_l2: "",

                colorpicker: "rgba(198, 245, 255, 0.54)"
            }
        },
        
        created() {
            this.getdate();
            this.Get_Summary();
        },
        activated() {
            this.getdate();
            this.Get_Summary();
        },
        watch: {
            '$route'(val) {
            },
            shiftday() {
                if (this.shiftday == "A005") {
                    this.shiftday_txt = "白班"
                }
                else if (this.shiftday == "A006") {
                    this.shiftday_txt = "夜班";
                }
                else if (this.shiftday == "all") {
                    this.shiftday_txt = "当天";
                }
                this.Get_Summary();
            },
            today() {
                console.log(this.today);
                this.Get_Summary();
            },
          
        },
        methods: {
            getdate() {
                var aData = new Date();
                var month = aData.getMonth() + 1 < 10 ? "0" + (aData.getMonth() + 1) : (aData.getMonth() + 1);
                var day = aData.getDate() < 10 ? "0" + (aData.getDate()) : (aData.getDate());
                this.today = aData.getFullYear() + "-" + month + "-" + day;
            },
            /* 保存图片的方法（即按钮点击触发的方法） 第一个参数为需要保存的div的id名 第二个参数为保存图片的名称 */
            saveImage(divText, imgText) {
                let canvasID = this.$refs.cardCanvas
                html2canvas(canvasID)
                    .then(canvas => {
                        let dataURL = canvas.toDataURL('image/png')
                        this.dataURL = dataURL
                        this.saveFile(dataURL, this.today + this.shiftday_txt + "生产总结")
                    })
            },
            saveFile(data, filename) {
                let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
                saveLink.href = data
                saveLink.download = filename
                let event = document.createEvent('MouseEvents')
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                saveLink.dispatchEvent(event)
            },
            Get_Summary() {
                var params = {
                    mode: "summary",
                    today: this.today,
                    shiftday: this.shiftday
                }
                console.log(params);
                GetInfo(params)
                    .then(res => {
                        console.log(res.data.Table);
                        this.formdata = res.data.Table[0];
                        this.Get_yesterday();
                        if (this.formdata.per_compare == null) {
                            this.formdata.per_compare = "0%";
                            this.rescompare = "up<span class='span100'> " + this.formdata.per_compare + "</span>";
                        }
                        else {
                            this.rescompare = "up <span class='span100'>" + this.formdata.per_compare + "</span>";
                        }

                        this.per_om = this.handle_per(this.formdata.om_plan, this.formdata.om_act);
                        this.per_s = this.handle_per(this.formdata.s_plan, this.formdata.s_act);
                        this.per_l1 = this.handle_per(this.formdata.l1_plan, this.formdata.l1_act);
                        this.per_l2 = this.handle_per(this.formdata.l2_plan, this.formdata.l2_act);

                    })
                    .catch(function (error) { console.log(error) })
            },

            Get_yesterday() {
                this.yesterday = this.delDate(this.today);
            },
            delDate(time) {
                var dateTime = new Date(time);
                dateTime = dateTime.setDate(dateTime.getDate() - 1);
                // dateTime = new Date(dateTime);
                dateTime = moment(new Date(dateTime)).format("YYYY-MM-DD");
                return dateTime;
            },

            handle_per(cou_plan, cou_act) {
                var per_res;
                var res = Number(cou_act / cou_plan) * 100;
                if (Number(cou_plan) == 0) {
                    return "0%";
                }
                else {
                    return res.toFixed(2) + "%"
                }
            }

        }
    }
</script>

<style>
    .span100 {
        text-decoration: underline;
        font-weight: bold;
    }
</style>