hideLoading();
var _yx = '';

var list = new Vue({
    el: '#app',
    data: {
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
    },
    ready: function(){
        this.pmList.doctorid = this.pmCount.doctorid = '83e9b2f76cdd4a1fbcebb9dc2830fc70';
        this.pmList.fromorgid = this.pmCount.fromorgid = 'HTL00000002';
        this.pmList.fromdeptid = this.pmCount.fromdeptid = '56';
        this.cbList();
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
        cbList: function(){
            var self = this;
            getImJson.post('/v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=1',self.pmList)
                     .then(function(res){
                        var json = res.data.list;console.log(json);
                        self.boxArr = json;
                     });
        },
        loadMore: function() {//nextPage
            console.log('loadMore');
            this.busy = true;
            setTimeout(function() {
                for (var i = 0, j = 10; i < j; i++) {
                  this.data.push({ name: count++ });
                }
                this.busy = false;
            }, 1000);
            // getImJson.post('/v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=1',self.pmList)
            //          .then(function(res){
            //             var json = res;
            //          });
        }
    }
});