<template>
    <div class="add-wrap" id="con-add">
        <!-- {{$data.jobsDict|json}} -->
        <!-- <loading v-show="controlShow.loading"></loading> -->
        <div class="content">
            <div class="step">
                <div class="item-header">
                    <div class="dib va-mid headers">
                        <div class="line dib va-mid"></div>
                        <div class="header-name">会诊目的及方式</div>
                    </div>
                </div>
                <div class="step-body">
                    <div class="items">
                        <div class="items-name tr">会诊目的</div>
                        <div class="items-val dib va-mid pr a-val">
                            <div class="diy_select pp-list dib va-mid pr">
                                <div class="select-text ">
                                    <input type="hidden" name="" id="a" class="diy_select_input"/>
                                    <div class="diy_select_txt diy_select_btn"></div>
                                </div>
                                <div class="select-option">
                                    <ul class="diy_select_list pp">
                                        <li v-for="purpost in purpostDict" @click="pkVal('purpostDict',purpost)">{{purpost.itemname}}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="require">*</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name tr">会诊选择</div>
                        <div class="items-group-val dib va-top">
                            <div class="items-val">
                                <div class="diy_select to-hosp-list dib va-mid pr">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn">会诊医院</div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list to-hosp">
                                            <li v-for="phostp in parentHostp" @click="pkVal('parentHostp',phostp)">{{phostp.orgname}}</li>
                                        </ul>
                                    </div>
                                    <div class="require">*</div>
                                </div>
                            </div>
                            <div class="items-val">
                                <div class="diy_select to-dept-list dib va-mid pr">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn">会诊科室</div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list to-dept">
                                            <li v-for="dept in depts" @click="pkVal('depts',dept)">{{dept.deptname}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="items-val">
                                <div class="diy_select doc-list dib va-mid">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn">会诊医生</div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list doc">
                                            <li v-for="doctor in doctors" @click="pkVal('doctors',doctor)">{{doctor.username}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="items date-group">
                        <div class="items-name tr bdate">拟预约时间日期</div>
                        <div class="items-val dib va-mid pr">
                            <input id="book-date" readonly />
                            <div class="require">*</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step step-page1">
                <div class="item-header">
                    <div class="dib va-mid headers">
                        <div class="line dib va-mid"></div>
                        <div class="header-name">患者基本信息</div>
                    </div>
                </div>
                <div class="step-body">
                    <div class="items">
                        <div class="items-name tr">姓名</div>
                        <div class="items-val dib va-mid pr">
                            <input type="text" v-model="addOrder.username" lazy/>
                            <div class="require">*</div>
                            <img src="../../assets/images/consultation/s_pat@2x.png" class="pat-more" @click="getPatients">
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name tr">性别</div>
                        <div class="items-val dib va-mid pr">
                            <div class="diy_select sex-list dib va-mid">
                                <div class="select-text ">
                                    <input type="hidden" name="" id="a" class="diy_select_input"/>
                                    <div class="diy_select_txt diy_select_btn"></div>
                                </div>
                                <div class="select-option">
                                    <ul class="diy_select_list sex">
                                        <li @click="pkGender(0)">男</li>
                                        <li @click="pkGender(1)">女</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="require">*</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name tr">年龄</div>
                        <div class="items-val dib va-mid pr">
                            <input type="number" v-model="addOrder.age" v-on:keyup="setBirth"/>
                            <div class="require">*</div>
                        </div>
                    </div>
                    <div class="items pr">
                        <div class="items-name tr">出生日期</div>
                        <div class="items-val dib va-mid pr">
                            <input id="birth" readonly v-model="addOrder.dateofbirth" @click="pkBirth"/>
                            <div class="require">*</div>
                        </div>
                        <div class="more-div" v-on:click="userShow()" v-bind:class="{'less':moreUserInfo}">
                            <div class="more"></div>
                        </div>
                    </div>
                    <div class="more-group" v-show="moreUserInfo" v-cloak>
                        <div class="items">
                            <div class="items-name tr">民族</div>
                            <div class="items-val dib va-mid">
                                <div class="diy_select navt-list dib va-mid">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn"></div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list navt">
                                            <li v-for="nat in nation" @click="pkVal('nation',nat)">{{nat.nationname}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr">婚姻状态</div>
                            <div class="items-val dib va-mid">
                                <div class="diy_select marr-list dib va-mid">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn"></div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list marr">
                                            <li v-for="marr in marrDict" @click="pkVal('marrDict',marr)">{{marr.itemname}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr">省市区</div>
                            <div class="items-group-val dib va-top">
                                <div class="items-val">
                                    <div class="diy_select provs-list dib va-mid">
                                        <div class="select-text ">
                                            <input type="hidden" name="" id="a" class="diy_select_input"/>
                                            <div class="diy_select_txt diy_select_btn"></div>
                                        </div>
                                        <div class="select-option">
                                            <ul class="diy_select_list provs">
                                                <li v-for="prov in provs" @click="pkVal('provs',prov)">{{prov.areaname}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dib va-mid">省</div>
                                </div>
                                <div class="items-val">
                                    <div class="diy_select city-list dib va-mid">
                                        <div class="select-text ">
                                            <input type="hidden" name="" id="a" class="diy_select_input"/>
                                            <div class="diy_select_txt diy_select_btn"></div>
                                        </div>
                                        <div class="select-option">
                                            <ul class="diy_select_list city">
                                                <li v-for="ct in city" @click="pkVal('city',ct)">{{ct.areaname}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dib va-mid">市</div>
                                </div>
                                <div class="items-val">
                                    <div class="diy_select areas-list dib va-mid">
                                        <div class="select-text ">
                                            <input type="hidden" name="" id="a" class="diy_select_input"/>
                                            <div class="diy_select_txt diy_select_btn"></div>
                                        </div>
                                        <div class="select-option">
                                            <ul class="diy_select_list areas">
                                                <li v-for="ar in area" @click="pkVal('area',ar)">{{ar.areaname}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="dib va-mid">区</div>
                                </div>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr">住址</div>
                            <div class="items-val dib va-mid">
                                <input type="text" v-model="addOrder.address" lazy/>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr">职业</div>
                            <div class="items-val dib va-mid">
                                <div class="diy_select job-list dib va-mid">
                                    <div class="select-text ">
                                        <input type="hidden" name="" id="a" class="diy_select_input"/>
                                        <div class="diy_select_txt diy_select_btn"></div>
                                    </div>
                                    <div class="select-option">
                                        <ul class="diy_select_list job">
                                            <li v-for="job in jobsDict" @click="pkVal('jobsDict',job)">{{job.itemname}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr">工作单位</div>
                            <div class="items-val dib va-mid">
                                <input type="text" v-model="addOrder.commpany" lazy/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 第二步 -->
            <div class="step step-page2">
                <div class="item-header">
                    <div class="dib va-mid headers">
                        <div class="line dib va-mid"></div>
                        <div class="header-name">病历及检查信息</div>
                    </div>
                </div>
                <div class="step-body">
                    <div class="items">
                        <div class="items-name tr va-top">初步诊断</div>
                        <div class="items-val dib va-top ps-val first pr">
                            <textarea class="txt normal-txt" v-model="addOrder.clinicaldiagnosis" lazy></textarea>
                            <div class="require">*</div>
                        </div>
                    </div>
                    <div class="items">
                        <div class="items-name tr va-top ar-1">病历信息</div>
                        <div class="items-val ps-val dib va-top others pr">
                            <textarea class="txt" v-html="" lazy></textarea>
                            <div class="ps-files">
                                <ul class="ar-1">
                                    <li v-for="up in upLoads" data-href="up.ImagePath">
                                        <div :class="{'file-img': fileType.image, 'file-video': fileType.video, 'file-file': fileType.file}">{{up.description}}<span class="del">删除</span></div>
                                    </li>
                                </ul>
                            </div>
                            <div class="pa add-files">
                                <div class="add-menu" @click="showUpload(1)" v-if="!menuBtn.item1" v-cloak></div>
                                <div class="add-close" @click="closeUpload(1)" v-else="menuBtn.item1" v-cloak></div>
                            </div>
                            <ul class="pa up-menus" v-show="menuBtn.item1" v-cloak>
                                <li><div class="up-file" @click="upFile(upLoads)"></div></li>
                                <li><div class="up-img" @click="upImg(upLoads)"></div></li>
                                <li><div class="up-video" @click="upVideo(upLoads)"></div></li>
                            </ul>
                        </div>
                    </div>
                    <div class="items pr">
                        <div class="items-name tr va-top ar-2">检查检验</div>
                        <div class="items-val ps-val dib va-top others pr">
                            <textarea class="txt" v-html="" lazy></textarea>
                            <div class="ps-files">
                                <ul class="ar-2">
                                    <li v-for="up in upLoads2" data-href="up.ImagePath">
                                        <div v-bind:class="{'file-img': fileType.image, 'file-video': fileType.video, 'file-file': fileType.file}">{{up.description}}<span class="del">删除</span></div>
                                    </li>
                                </ul>
                            </div>
                            <div class="pa add-files">
                                <div class="add-menu" @click="showUpload(2)" v-if="!menuBtn.item2" v-cloak></div>
                                <div class="add-close" @click="closeUpload(2)" v-else="menuBtn.item2"  v-cloak></div>
                            </div>
                            <ul class="pa up-menus" v-show="menuBtn.item2" v-cloak>
                                <li><div class="up-file" @click="upFile(upLoads2)"></div></li>
                                <li><div class="up-img" @click="upImg(upLoads2)"></div></li>
                                <li><div class="up-video" @click="upVideo(upLoads2)"></div></li>
                            </ul>
                        </div>
                        <div class="more-div" v-on:click="detailShow()" v-bind:class="{'less':moreDetail}">
                            <div class="more"></div>
                        </div>
                    </div>
                    <div class="more-group" v-show="moreDetail" v-cloak>
                        <div class="items">
                            <div class="items-name tr va-top ar-3">家族史</div>
                            <div class="items-val ps-val dib va-top others pr">
                                <textarea class="txt" v-html="" lazy></textarea>
                                <div class="ps-files">
                                    <ul class="ar-3">
                                    </ul>
                                </div>
                                <div class="pa add-files">
                                    <div class="add-menu" @click="showUpload(3)" v-if="!menuBtn.item3" v-cloak></div>
                                    <div class="add-close" @click="closeUpload(3)" v-if="menuBtn.item3" v-cloak></div>
                                </div>
                                <ul class="pa up-menus" v-show="menuBtn.item3" v-cloak>
                                    <li><div class="up-file"></div></li>
                                    <li><div class="up-img"></div></li>
                                    <li><div class="up-video"></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr va-top ar-4">既往史</div>
                            <div class="items-val ps-val dib va-top others pr">
                                <textarea class="txt" v-html="" lazy></textarea>
                                <div class="ps-files">
                                    <ul class="ar-4">
                                    </ul>
                                </div>
                                <div class="pa add-files">
                                    <div class="add-menu" @click="showUpload(4)" v-if="!menuBtn.item4" v-cloak></div>
                                    <div class="add-close" @click="closeUpload(4)" v-if="menuBtn.item4" v-cloak></div>
                                </div>
                                <ul class="pa up-menus" v-show="menuBtn.item4" v-cloak>
                                    <li><div class="up-file"></div></li>
                                    <li><div class="up-img"></div></li>
                                    <li><div class="up-video"></div></li>
                                </ul>
                            </div>
                        </div>
                        <div class="items">
                            <div class="items-name tr va-top ar-5">其他说明</div>
                            <div class="items-val ps-val dib va-top others pr">
                                <textarea class="txt" v-html="" lazy></textarea>
                                <div class="ps-files">
                                    <ul class="ar-5">
                                    </ul>
                                </div>
                                <div class="pa add-files">
                                    <div class="add-menu" @click="showUpload(5)" v-if="!menuBtn.item5" v-cloak></div>
                                    <div class="add-close" @click="closeUpload(5)" v-if="menuBtn.item5" v-cloak></div>
                                </div>
                                <ul class="pa up-menus" v-show="menuBtn.item5" v-cloak>
                                    <li><div class="up-file"></div></li>
                                    <li><div class="up-img"></div></li>
                                    <li><div class="up-video"></div></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="group">
            <div class="submit-btn" id="show-modal" @click="submitOrder()"><img src="../../assets/images/consultation/s_save@2x.png">保存提交</div>
            <div class="cancel-btn"><img src="../../assets/images/consultation/cancel@2x.png">取消保存</div>
        </div>
        <div class="mask" v-show="mask" v-cloak>
            <div v-if="ymodules == 1" class="tip">提交失败!</div>
            <div v-else="ymodules == 2" class="errors">
                <div class="errors-header">错误提示</div>
                <ul id="error-tip"></ul>
                <div class="close">确定</div>
            </div>
            <div v-else="ymodules == 3" class="pat-box">
                <div class="box-header">患者</div>
                <div class="box-content">
                    <ul id="dept-list">
                        <li v-for="pat in patients" @click="pkVal('patients',pat)">
                            <label>
                                <div class="radios-bg" v-bind:class="{'radios-bg-selected': pkRadio}"></div>
                                <input type="radio" hidden="hidden">
                                <div class="dib">{{pat.bedid}}(
                                    <span>{{pat.bedname}},</span>
                                    <span v-if="pat.gender == '0'">男</span>
                                    <span v-else>女</span>)
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="box-footer">
                    <div class="submit2" @click="closeMask(1)"><img class="yes" src="../../assets/images/referral/s_finish@2x.png">确定</div>
                    <div class="cancel2" @click="closeMask(0)"><img src="../../assets/images/referral/s_cancel@2x.png">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/consultation/add.css'
    // import loading from '../../components/loading'
    import '../../../static/select.js'
    export default {
        data() {
            return {
                // what: 'what',
                addOrder: {
                    doctorid: '',
                    doctorname: '',
                    username: '',//患者姓名
                    gender: '',//性别
                    age: '',//年龄
                    dateofbirth: '',//出生日期
                    illness: '',//病情情况
                    clinicaldiagnosis: '',//初步诊断
                    patientdescriptionlist: '',//病历信息
                    pasthistorylist: '', //既往病史
                    familyhistorylist: '', //家族病史
                    physicalexaminationlist: '',//检查检验
                    consultationpurpose: '', //会诊目的
                    consultationparticipantid: '',//会诊参与人医生专家
                    consultationparticipantname: '',//会诊参与人医生专家姓名
                    consultationparticipantphone: '',//会诊医生联系方式
                    fromorgname: '',//申请医院名称
                    fromorgid: '',//申请医院id
                    fromdeptid: '',//申请科室id
                    fromdeptname: '',//申请科室名称
                    toorgid:'',//医院id
                    toorgname: '',//医院名称
                    todeptid: '',//科室id
                    todeptname: '',//科室名称
                    appointmenttime: '',//预约时间
                    nationtype: '',//民族
                    maritalstatus: '',//婚姻状况
                    province: '',//省
                    city: '',//市
                    area: '',//区
                    job: '',//职业
                    commpany: '',//单位
                    address: '',//住址
                    patientno: '',
                    bedid: ''
                },
                paramParent: {id: 'HTL00000002'},
                paramDepts: {id: ''},
                paramDoct: {
                    toorgid: '',//分析机构id
                    toorgdeptid: ''//分析机构部门号
                },
                paramCity: {},
                paramPatient: {
                    orgid: 'HTL00000002',
                    deptid: '56'
                },
                moreUserInfo: false,
                moreDetail: false,
                mask: false,
                ymodules: 0,
                dictionary: [],
                jobsDict: [],
                marrDict: [],
                purpostDict: [],
                provs: [],
                city: [],
                area: [],
                parentHostp: [],
                nation: [],
                depts: [],
                doctors: [],
                patients: [],
                pkRadio: false,
                upLoads: [],
                upLoads2: [],
                upLoads3: [],
                upLoads4: [],
                upLoads5: [],
                errorArr: [],
                menuBtn: {
                    item1: false,
                    item2: false,
                    item3: false,
                    item4: false,
                    item5: false
                },
                fileType: ['file','image','video']
            }
        },
        created: function(){
            // this.controlShow.loading = false;
            // this.controlShow.content = true;
            this.cbDict();
        },
        methods:{
            currUserInfo: function(res) {
                TOKEN = res.token;
                this.addOrder.doctorid = res.uid;
                this.addOrder.paramAdddoctorname = res.name;
                this.addOrder.fromorgid = this.paramPatient.orgid = this.paramParent.id = res.orgid;
                this.addOrder.fromdeptid = this.addOrder.paramPatient = res.deptid;
                this.addOrder.fromdeptname = res.deptname;
                this.addOrder.fromorgname = res.orgname;
            },
            userShow: function() {
                this.moreUserInfo == false ? this.moreUserInfo = true : this.moreUserInfo = false;
            },
            detailShow: function() {
                this.moreDetail == false ? this.moreDetail = true : this.moreDetail = false;
            },
            closeMask: function(key){
                this.mask = false;
                this.ymodules = 0;
                if(key == 1){//确定
                    // d
                }
            },
            cbDict: function(){
                var self = this, dictUrl = '/v1/telemedicine/dictionarieslist/';
                var dicts = [dictUrl+'telemedicinejob',dictUrl+'telemedicinemaritalstatus',dictUrl+'telemedicineconsultationpurpose'];
                var requetsArr = dicts.map(self.makeRequest);
                //字典信息 , 并发请求
                this.$http.all(requetsArr).then(function (posts) {
                    self.dictionary = posts;
                    for(var i=0; i<self.dictionary.length; i++){
                        var dictJson = self.dictionary[i].data;
                        self.getDictData(i,dictJson);
                    }
                });
                this.$http.post('/v1/telemedicine/provincelist',{})//省份
                         .then(function(res){
                            var json = res.data;
                            self.provs = json;
                         });
                this.$http.post('/v1/telemedicine/parentorg',self.paramParent)//获取上级医院
                         .then(function(res){
                            var json = res.data;
                            self.parentHostp = json;
                         });
                this.$http.post('/v1/telemedicine/nationlist',{})
                         .then(function(res){
                            var json = res.data;
                            self.nation = json;
                         });
            },
            makeRequest: function(urls){
                return this.$http.get(urls,{});
            },
            itemDict: function(item){
                if(item == 0) {
                    return this.jobsDict;
                } else if(item == 1){
                    return this.marrDict;
                } else if(item == 2){
                    return this.purpostDict;
                }
            },
            getDictData: function(item,data){
                for(var i=0; i<data.length; i++){
                    this.itemDict(item).push(data[i]);
                }
                setTimeout(this.scrollSelect,200);
            },
            pkGender: function(val) {
                this.addOrder.gender = val;
            },
            getCity: function(no,code){
                var param = {}, self = this;
                if(no != undefined) {
                    param.parentno = no;
                }
                if(code != undefined) {
                    param.areacode = code;
                }
                this.$http.post('/v1/telemedicine/citylist',param)
                         .then(function(res){
                            var json = res.data;
                            self.city = json;
                         });
            },
            getArea: function(no,code) {
                var param = {};
                if(no != undefined) {
                    param.parentno = no;
                }
                if(code != undefined) {
                    param.areacode = code;
                }
                this.$http.post('/v1/telemedicine/arealist',param)
                         .then(function(res){
                            var json = res.data;
                            app.$set('area', json);
                         });
            },
            getBirth: function(){
                var birthDatePick = mobiscroll.calendar('#birth', {
                    theme: 'default',
                    display: 'bottom',
                    mode: 'calendarBasic',
                    lang: 'zh',
                    dateFormat: 'yy-mm-dd',
                    // defaultValue: new Date(ageYear, (new Date().getMonth()+1), new Date().getDate()),
                    onSet: function (event, inst) {
                        var age = new Date().getFullYear() - event.valueText.split('-')[0];//推算年龄
                        $('#age').val(age);
                    }
                });
            },
            getAppor: function(){
                mobiscroll.datetime('#book-date', {
                    theme: 'default',
                    display: 'bottom',
                    lang: 'zh',
                    dateFormat: 'yy-mm-dd',
                    timeFormat: 'HH:ii',
                    min: new Date(new Date().getFullYear(),(new Date().getMonth()),new Date().getDate(),new Date().getHours(), new Date().getMinutes()+10),
                    max: new Date((new Date().getFullYear()+100), 11, 31)//最大值--百年后
                });
            },
            getPatients: function(){//患者信息列表
                var self = this;
                self.mask = true; self.ymodules = 3;
                this.$http.post('/v1/telemedicine/getpatientlist',this.paramPatient)
                         .then(function(res){
                            var json = res.data;
                            self.patients = json;
                         });
            },
            setPatient: function(val){
                this.pkRadio = true;
                this.addOrder.patientno  = val.bedid;
                this.addOrder.bedid = val.bedname;
                this.addOrder.username = val.username;
                this.addOrder.dateofbirth = val.dateofbirth;
                this.addOrder.gender = val.gender;
            },
            pkBirth: function(){
                var self = this;
                mobiscroll.calendar('#birth', {
                    theme: 'default',
                    display: 'bottom',
                    mode: 'calendarBasic',
                    lang: 'zh',
                    dateFormat: 'yy-mm-dd',
                    // defaultValue: new Date(ageYear, (new Date().getMonth()+1), new Date().getDate()),
                    onSet: function (event, inst) {
                        self.addOrder.age = new Date().getFullYear() - event.valueText.split('-')[0];//推算年龄
                    }
                });
            },
            setBirth: function(){
                if(this.addOrder.age != ''){
                    var ageYear = new Date().getFullYear() - this.addOrder.age;
                    this.addOrder.dateofbirth = ageYear+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
                    mobiscroll.calendar('#birth', {
                        theme: 'default',
                        display: 'center',
                        mode: 'calendarBasic',
                        lang: 'zh',
                        dateFormat: 'yy-mm-dd',
                        defaultValue: new Date(ageYear, (new Date().getMonth()+1), new Date().getDate()),
                    });
                } else {
                    this.addOrder.dateofbirth = '';
                }
            },
            pkHostp: function(id) {
                this.paramDepts.id = id;
                this.$http.post('/v1/telemedicine/dept',this.paramDepts)
                         .then(function(res){
                            var json = res.data;
                            app.$set('depts', json);
                         });
            },
            pkDoctor: function(){
                this.$http.post('/v1/telemedicine/getDocTList',this.paramDoct)
                         .then(function(res){
                            var json = res.data;
                            app.$set('doctors',json);
                         });
            },
            pkVal: function(key,val){
                var self = this;
                if(key == 'purpostDict') {
                    self.addOrder.consultationpurpose = val.itemname;
                } else if(key == 'jobsDict') {
                    self.addOrder.job = val.itemname;
                } else if(key == 'marrDict') {
                    self.addOrder.maritalstatus = val.itemname;
                } else if(key == 'provs') {
                    self.addOrder.province = val.areaname;
                    self.getCity(val.areano,val.areacode);
                } else if(key == 'city') {
                    self.addOrder.city = val.areaname;
                    self.getArea(val.areano,val.areacode);
                } else if(key == 'area') {
                    self.addOrder.area = val.areaname;
                } else if(key == 'parentHostp') {
                    self.addOrder.toorgname = val.orgname;
                    self.addOrder.toorgid = self.paramDoct.toorgid = val.id;
                    self.pkHostp(val.id);
                } else if(key == 'depts') {
                    self.addOrder.todeptname = val.deptname;
                    self.addOrder.todeptid = self.paramDoct.toorgdeptid = val.id;
                    self.pkDoctor();
                } else if(key == 'doctors') {
                    self.addOrder.consultationparticipantid = val.id;
                    self.addOrder.consultationparticipantname = val.username;
                    self.addOrder.consultationparticipantphone = val.mobile;
                } else if(key == 'nation') {
                    self.addOrder.nationtype = val.nationname;
                } else if(key == 'patients') {
                    self.setPatient(val);
                }
            },
            showUpload: function(key) {
                app.$set('menuBtn.item'+key , true);
            },
            closeUpload: function(key) {
                app.$set('menuBtn.item'+key , false);
            },
            upFile: function(arr) {
                _yx.Biz.chooseImage({
                    param:{
                        type: '3'
                    },
                    onSuccess:function(result){
                        var pName = result.fileName, hasFlag = false;
                        for(var i=0; i<arr.lenght; i++){
                            if(pName == arr[i].description && arr[i].isdel != '1'){
                                hasFlag = true;
                            }
                        }
                        if(!hasFlag){
                            arr.push({'type':'40', 'downloadurl':result.ImagePath, 'description': pName, 'codetype': code});
                        } else {
                            _yx.Device.notificationToast({"message":"文件名已存在，请更改文件名","duration":"300"});
                        }
                    },
                    onFail:function(result){console.log(result)}
                });
            },
            upImg: function(arr) {alert(JSON.stringify(_yx));
                _yx.Biz.chooseImage({
                    param:{
                        type: '1'
                    },
                    onSuccess:function(result){alert(JSON.stringify(result));
                        var pName = result.fileName, hasFlag = false;
                        for(var i=0; i<arr.lenght; i++){
                            if(pName == arr[i].description && arr[i].isdel != '1'){
                                hasFlag = true;
                            }
                        }
                        if(!hasFlag){
                            arr.push({'type':'20', 'downloadurl':result.ImagePath, 'description': pName, 'codetype': code});
                        } else {
                            _yx.Device.notificationToast({"message":"文件名已存在，请更改文件名","duration":"300"});
                        }
                    },
                    onFail:function(result){console.log(result)}
                });
            },
            upVideo: function(arr) {
                _yx.Biz.chooseImage({
                    param:{
                        type: '2'
                    },
                    onSuccess:function(result){
                        var pName = result.fileName, hasFlag = false;
                        for(var i=0; i<arr.lenght; i++){
                            if(pName == arr[i].description && arr[i].isdel != '1'){
                                hasFlag = true;
                            }
                        }
                        if(!hasFlag){
                            arr.push({'type':'10', 'downloadurl':result.ImagePath, 'description': pName, 'codetype': code});
                        } else {
                            _yx.Device.notificationToast({"message":"文件名已存在，请更改文件名","duration":"300"});
                        }
                    },
                    onFail:function(result){console.log(result)}
                });
            },
            submitOrder: function(){
                var self = this;
                // _yx.Device.notificationShowPreloader({"message": '正在提交...'});
                var addPram = JSON.stringify(self.addOrder);console.log(addPram);
                if(self.addOrder.consultationpurpose == ''){
                    self.errorArr.push();
                }
            }
        },
        comonents: {
            // loading
        }
    }
</script>