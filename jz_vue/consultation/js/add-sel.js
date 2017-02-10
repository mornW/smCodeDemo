// 调用fastClick 解决移动端300ms延迟
var attachFastClick = Origami.fastclick; attachFastClick(document.body);
var _yx = '';

//与原生通信
YXReady(function(yx) {
    yx.config({
        config:{"signtrue":"true"},
        onSuccess: function(res){//通信初始化返回状态
            _yx = yx;
            successToNative(yx);
        }
    });
});
//通信成功，处理信息
function successToNative(yx){
    yx.YXApi.getuserinfo({//用户信息返回
        param:{},
        onSuccess:function(result){
            app.currUserInfo(result);
        },
        onFail:function(result){console.log(result)}
    });
}

var app = new Vue({
    el: '#app',
    data: {
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
    },
    ready: function () {//初始化完成后执行的函数
        this.cbDict();
    },
    watch: {
        addOrder: function(val,oldVal) {
            console.log(val);
        }
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
            axios.all(requetsArr).then(function (posts) {
                self.dictionary = posts;
                for(var i=0; i<self.dictionary.length; i++){
                    var dictJson = self.dictionary[i].data;
                    self.getDictData(i,dictJson);
                }
            });
            getImJson.post('/v1/telemedicine/provincelist',{})//省份
                     .then(function(res){
                        var json = res.data;
                        self.provs = json;
                     });
            getImJson.post('/v1/telemedicine/parentorg',self.paramParent)//获取上级医院
                     .then(function(res){
                        var json = res.data;
                        self.parentHostp = json;
                     });
            getImJson.post('/v1/telemedicine/nationlist',{})
                     .then(function(res){
                        var json = res.data;
                        self.nation = json;
                     });
        },
        makeRequest: function(urls){
            return getImJson.get(urls,{});
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
            getImJson.post('/v1/telemedicine/citylist',param)
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
            getImJson.post('/v1/telemedicine/arealist',param)
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
            getImJson.post('/v1/telemedicine/getpatientlist',this.paramPatient)
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
            getImJson.post('/v1/telemedicine/dept',this.paramDepts)
                     .then(function(res){
                        var json = res.data;
                        app.$set('depts', json);
                     });
        },
        pkDoctor: function(){
            getImJson.post('/v1/telemedicine/getDocTList',this.paramDoct)
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
    }
});





