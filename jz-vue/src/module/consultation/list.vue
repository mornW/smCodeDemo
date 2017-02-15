<template>
    <div class="list-wrap">
        <div id="boxs">
            <scroller style="top: 66px" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
                <div v-for="box in boxArr" @click="pkBox(box)" class="li-group">
                    <div class="box">
                        <div class="pat-item item ellipsis oh">
                            <div class="girl dib va-mid"></div>
                            <div class="pat dib va-mid">
                                <div class="name">{{box.username}}-{{box.status}}</div>
                                <div class="sex" v-if="box.gender == 0">m</div>
                                <div class="sex" v-else>f</div>
                                <div class="age">{{box.age}}y</div>
                            </div>
                        </div>
                        <div class="from-item item">{{box.fromorgname}}</div>
                        <div class="to-item item">{{box.toorgname}}</div>
                        <div class="date-item item">
                            <span>{{box.appointmenttime}}</span>
                        </div>
                        <div class="st-bar st3" v-if="box.status == '10'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box3@2x.png">
                                <div class="stc3">待修改</div>
                            </div>
                        </div>
                        <div class="st-bar st2" v-if="box.status == '20'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box2@2x.png">
                                <div class="stc2">待审核</div>
                            </div>
                        </div>
                        <div class="st-bar st4" v-if="box.status == '30'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box4@2x.png">
                                <div class="stc4">待会诊</div>
                            </div>
                        </div>
                        <div class="st-bar st1" v-if="box.status == '40'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box1@2x.png">
                                <div class="stc1">会诊中</div>
                            </div>
                        </div>
                        <div class="st-bar st6" v-if="box.status == '50'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box6@2x.png">
                                <div class="stc6">报告中</div>
                            </div>
                        </div>
                        <div class="st-bar st5" v-if="box.status == '60'" v-cloak>
                            <div class="st-ic">
                                <img src="../../assets/images/consultation/s_box1@2x.png">
                                <div class="stc5">已完成</div>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="mask" v-show="mask" v-cloak>
            <div class="filters-group">
                <div class="filter">
                    <div class="items">
                        <div class="items-name dib va-mid">开始日期</div>
                        <div class="items-val dib va-mid">
                            <input id="start-date" readonly />
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name dib va-mid">结束日期</div>
                        <div class="items-val dib va-mid">
                            <input id="end-date" readonly />
                        </div>
                    </div>
                    <div class="items-group">
                        <div class="items">
                            <div class="items-name dib va-mid">患者姓名</div>
                            <div class="items-val dib va-mid">
                                <input type="text" />
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name dib va-mid">医生姓名</div>
                            <div class="items-val dib va-mid select-zi2">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name dib va-mid">医院名称</div>
                        <div class="items-val dib va-mid">
                            <div class="diy_select hosps-list">
                                <div class="select-text ">
                                    <input type="hidden" name="" id="a" class="diy_select_input"/>
                                    <div class="diy_select_txt diy_select_btn"></div>
                                </div>
                                <div class="select-option">
                                    <ul class="diy_select_list hosps">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name dib va-mid">科室名称</div>
                        <div class="items-val dib va-mid">
                            <div class="diy_select">
                                <div class="select-text ">
                                    <input type="hidden" name="" id="a" class="diy_select_input"/>
                                    <div class="diy_select_txt diy_select_btn"></div>
                                </div>
                                <div class="select-option">
                                    <ul class="diy_select_list depts">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btns">
                    <div class="clean"><img class="yes" src="../../assets/images/consultation/s_clean@2x.png">清空</div>
                    <div class="search"><img src="../../assets/images/consultation/s_search@2x.png">查询</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/consultation/list.css'
    import '../../../static/select.js'
    import Scroller from 'vue-scroller'
    // import '../../../static/zepto.min.js'
    import $ from 'zepto'
    export default {
        components: {
          'scroller': Scroller
        },
        data() {
            return {
                mask: false,
                busy: false,
                pagenum: 1,
                pmList: {
                    username:"",//患者姓名
                    doctorid:"",
                    fromorgid:"",//医院id
                    fromdeptid:"",
                    toorgid:"",
                    todeptid:"",//科室id
                    consultationparticipantname: '',//会诊参与人医生专家姓名
                    starttime:'',//"2016-11-21 17:17:38",//开始时间
                    endtime:''//"2016-11-28 17:17:38",//结束时间
                },
                pmCount: {
                    username:"",
                    doctorid:"",
                    fromorgid:"",
                    fromdeptid:"",
                    toorgid:"",
                    todeptid:"",
                    starttime:"",
                    endtime:"",
                    consultationparticipantname: ''//会诊参与人医生专家姓名
                },
                boxArr: []
            }
        },
        create: function(){
            this.pmList.doctorid = this.pmCount.doctorid = '83e9b2f76cdd4a1fbcebb9dc2830fc70';
            this.pmList.fromorgid = this.pmCount.fromorgid = 'HTL00000002';
            this.pmList.fromdeptid = this.pmCount.fromdeptid = '56';
            this.Mounted();
        },
        mounted: function() {
            var self = this;
            self.$http.post('/v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=1',self.pmList)
                 .then(function(res){
                    var json = res.data.list;
                    self.boxArr = json;
                 });
            self.top = 66;
            self.bottom = 66;
            setTimeout(function(){
                self.$refs.my_scroller.resize();
            });
        },
        methods: {
            currUserInfo: function(res) {
                TOKEN = res.token;
                this.pmList.doctorid = this.pmCount.doctorid = res.uid;
                this.pmList.fromorgid = this.pmCount.fromorgid = res.orgid;
                this.pmList.fromdeptid = this.pmCount.fromdeptid = res.deptid;
            },
            pkBox: function(val){
                if(val.taskcode != undefined && val.taskcode != ''){console.log(val.taskcode);
                    // _yx.Biz.open({
                    //     url : "yixiu://startconsultation",
                    //     params: {
                    //         taskcode: con_id
                    //     },
                    //     onSuccess:function(result){log(result)},
                    //     onFail:function(result){log(result)}
                    // });
                }
            },
            refresh: function() {
                var self = this;
                var start = this.top - 1
                self.$http.post('/v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=1',self.pmList)
                    .then(function(res){
                        var json = res.data.list;
                        self.boxArr = json;
                    });
                this.top = this.top - 10;
                if (this.$refs.my_scroller)
                    this.$refs.my_scroller.finishPullToRefresh();
            },
            infinite: function() {console.log('load next');
                var self = this;
                self.$http.post('/v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=2',self.pmList)
                     .then(function(res){
                        var json = res.data.list;
                        self.boxArr.push(json);
                     });
                this.bottom = this.bottom + 10;
                // setTimeout(() => {
                    if (this.$refs.my_scroller)
                      this.$refs.my_scroller.resize();
                // })
            }
        }
    }
</script>