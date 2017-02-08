
var app = new Vue({
    el: '#app',
    data: {
        // classA: 'class-a',
//      classB: 'class-b',
//      isA: false,
//      isB: true,
        pmUser: {
            username:'',
            age: '',
            genter: '',
            dateofbirth: '',
            address:'',
            idcard: '',
            mobile1: '',
            admissionsScene: '',
            patientdescription: '',
            medicalhistory: '',
            clinicaldiagnosis: '',
            consciousness: '',
            pupil: '',
            lightReflection: '',
            skin: '',
            externalCauses: '',
            prognosisOfHospital: '',
            visitsResults: ''
        }
        // jobs: [
        //      {text: '退休', value: '10'},
        //      {text: '工人', value: '20'}
        // ]
    },
    ready: function () {//初始化完成后执行的函数
        this.cbUser();
    },
    methods:{
        cbUser: function(){
            var self = this;
            getImJson.post('/v1/firstaid/getfirstAidinfo', {taskcode: '4cb7d68cce2e462d82220bfc413da2b9'})
                     .then(function (res) {
                        var json = res.data;
                        self.pmUser = json;
                        console.log(self.pmUser);
                    }).catch(function (error) {});
        },
        hell: function(){}
    }
})
