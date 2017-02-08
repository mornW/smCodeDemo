
var list = new Vue({
    el: '#app',
    data: {
        pagenum: 1,
        fromorgid: 'HTL00000002',
        fromdeptid: '56',
        doctorid: '83e9b2f76cdd4a1fbcebb9dc2830fc70',
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
        }
    },
    ready: function(){
        this.cbList();
    },
    methods: {
        cbList: function(){
            var self = this;///v1/telemedicine/getTelemedicineList.json?pagesize=10&pagenum=
            getImJson.defaults.baseURL = 'http://192.168.1.35:36/smCodeDemo';
            getImJson.get('/jsons/list.json',{})
                     .then(function(res){
                        var json = res.data;
                        self.pmList = json;
                     })
                     .catch(function(){});

        }
    }
});