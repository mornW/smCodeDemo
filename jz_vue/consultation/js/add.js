new Vue({
	el: '#add-app',
	data: {
		checked: false
	},
	ready: function(){
		this.getCustomers()
	},
	methods: {
		getProv: function(){
			this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
		}
	}
})