//测试TOKEN
var TOKEN = 'ZTEwYWRjMzk0OWJhNTlhYmJlNTZlMDU3ZjIwZjg4MzpiZTYxNjI3NS02YzZiLTQ2NmQtYjllMS0wYjBlZWQwYmYzYzA6MTQ3OTk2OTYyMTE5OTow';

//开发 [接口域名]
var yxImApi = 'http://121.42.153.1:8080/imservice' , yxApi = 'http://192.168.1.44:8080/service';

//测试 [接口域名]
// var yxImApi = 'http://121.42.153.1:8080/imservice' , yxApi = 'http://121.42.153.1:8080/service';

//正式 [接口域名]
// var yxImApi = 'http://121.42.153.1:8080/yxservice' , yxApi = 'http://120.27.43.72:8080/service';

// axios.defaults.baseURL = yxApi;
// axios.defaults.ImURL = yxImApi;
// axios.defaults.headers.common['Authorization'] = TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

//配置
var getImJson = axios.create({
  baseURL: yxImApi,
  timeout: 3000,
  headers: {'Authorization': TOKEN, 'Content-Type' : 'application/json'}
});

var getJson = axios.create({
  baseURL: yxApi,
  timeout: 3000,
  headers: {'Authorization': TOKEN, 'Content-Type' : 'application/json'}
});

//与app建立通信
function YXReady(callback) {
    if (window.JSBridge) {
        callback(JSBridge)
    } else {
        document.addEventListener('YXReady', function() {
            callback(JSBridge)
        }, false)
    }
}