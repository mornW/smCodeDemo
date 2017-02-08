var app = new Vue({
	el: '#app',
	data: {
		addOrder: {
			username:'',
            age: '',
            genter: '',
            dateofbirth: ''
		},
		paramParent: {id: 'HTL00000002'},
		paramCity: {},
		moreUserInfo: false,
		moreDetail: false,
		dictionary: [],
		jobsDict: [],
		marrDict: [],
		purpostDict: [],
		provs: [],
		city: [],
		area: [],
		parentHostp: []
	},
	ready: function () {//初始化完成后执行的函数
        this.cbDict();
    },
	methods:{
		userShow: function() {
			this.moreUserInfo == false ? this.moreUserInfo = true : this.moreUserInfo = false;
		},
		detailShow: function() {
			this.moreDetail == false ? this.moreDetail = true : this.moreDetail = false;
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
					self.dictData(i,dictJson);
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
		dictData: function(item,data){
			for(var i=0; i<data.length; i++){
				this.itemDict(item).push(data[i]);
			}
			setTimeout(this.scrollSelect,200);
		},
		cbProv: function(){
			// '/v1/telemedicine/citylist'
		},
		submitOrder: function(){
			var self = this;
			for(var i=0; i<self.addOrder.length; i++) {
				if(self.addOrder[i]){}
			}
		},
		scrollSelect: function(){
			mobiscroll.select('#job', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200
			});
			mobiscroll.select('#marr', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200
			});
			mobiscroll.select('#purpost', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200
			});
			mobiscroll.select('#phostp', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200
			});
			mobiscroll.select('#prov', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200,
			    onSet: function(event, inst){
			    	console.log(event.valueText);
			    	getImJson.post('/v1/telemedicine/citylist',self.paramCity)//获取上级医院
					 .then(function(res){
					 	var json = res.data;
					 	self.parentHostp = json;
					 });
			    }
			});
			mobiscroll.select('#ar', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200,
			    onSet: function(event, inst){
			    	console.log(event.valueText);
			    	getImJson.post('/v1/telemedicine/citylist',self.paramCity)//获取上级医院
					 .then(function(res){
					 	var json = res.data;
					 	self.parentHostp = json;
					 });
			    }
			});
			mobiscroll.select('#ct', {
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    minWidth: 200,
			    onSet: function(event, inst){
			    	console.log(event.valueText);
			   //  	getImJson.post('/v1/telemedicine/citylist',self.paramCity)//获取上级医院
					 // .then(function(res){
					 // 	var json = res.data;
					 // 	self.parentHostp = json;
					 // });
			    }
			});
		}
	}
});




