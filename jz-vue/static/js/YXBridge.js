//
//  YXBridge.js
//  YXBridge
//
;(function(w,doc) {
    if(w.JSBridge)return;
    var JSBRIDGE_URL_SCHEME  = 'jsbridgeurlscheme';
    var JSBRIDGE_URL_MESSAGE = '__JSB_URL_MESSAGE__';
    var JSBRIDGE_URL_EVENT   = '__JSB_URL_EVENT__';
    var JSBRIDGE_URL_API     = '__JSB_URL_API__';
    var ua                  = navigator.userAgent;
    var isIOSDevice         = /iP(hone|od|ad)/g.test(ua);
    var isAndroidDevice     = /Android/g.test(ua);
    var sendMessageQueue    = [];
    var receiveMessageQueue = [];
    var messageHandlers     = {};
    var responseCallbacks   = {};
    var apiData             = null;
    var uniqueId            = 1;
    var messagingIframe;
    var state               = false;
    var yxapis              = ["YXApi.version","YXApi.runtimeinfo","YXApi.getuserinfo","Biz.attachUpdateSuccess","Biz.open","Biz.consultationListRefresh","Biz.consulationInfoRefresh","Biz.share","Biz.chooseImage","Biz.previewImage","Biz.uploadImage","Biz.downloadImage","Biz.yxscan","Biz.openFile","Device.notificationAlert","Device.notificationConfirm","Device.notificationPrompt","Device.notificationVibrate","Device.notificationShowPreloader","Device.notificationHidePreloader","Device.notificationToast","Device.notificationActionSheet","Device.notificationModal","Device.watchShake","Device.clearShake","Device.getGeolocation","Device.mapLocate","Device.mapview","Device.deviceinfo","Device.networktype","Biz.navigationSetTitle"];
    var runtimeVersion      = ua.match(/Acmedcare\(\w+\/([a-zA-Z0-9.-]+)\)/);
    null === runtimeVersion && (runtimeVersion = ua.match(/YXApp\/([a-zA-Z0-9.-]+)/));
    var version             = runtimeVersion && runtimeVersion[1];

// PRIVATE METHODS

    function YXLog() {
        if (typeof console != 'undefined') {
            //console.log("YX:JS: LOG: ",arguments);
        }
    }
    function YXLogException(e,m) {
        if (typeof console != 'undefined') {
            //console.error("YX:JS: EXCEPTION: ",arguments);
        }
    }

    function getIFrameSrc(param) {
        return JSBRIDGE_URL_SCHEME + '://' + JSBRIDGE_URL_MESSAGE + '/'+ param;
    }

    function callObjCAPI(name,data) {
        // Should not called triggerNativeCall as iFrame needs to be deleted in order to get the retvalue.
        var iframe = document.createElement("IFRAME");
        apiData = {api:name};
        if(data) apiData["data"] = data;
        iframe.setAttribute("src", getIFrameSrc(JSBRIDGE_URL_API));
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;

        var ret = JSBridge.nativeReturnValue;
        JSBridge.nativeReturnValue = undefined;
        if(ret) return decodeURIComponent(ret);
    };

    function triggerNativeCall() {
        if(isIOSDevice) {
            messagingIframe.src = getIFrameSrc(JSBRIDGE_URL_EVENT);
        } else {
            if(isAndroidDevice){
                AndroidAPI.ProcessJSEventQueue(_fetchJSEventQueue());
            }
            else{
                console.log('not mobile plamtform!!!');
            }
        }
    }

    function doSend(message, responseCallback) {
        if (responseCallback) {
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
            responseCallbacks[callbackId] = responseCallback;
            message['callbackId'] = callbackId;
        }
        sendMessageQueue.push(message);
        triggerNativeCall();
    }

    function dispatchMessageFromNative(messageJSON) {
        setTimeout(function _timeoutDispatchMessageFromObjC() {
            var message = JSON.parse(messageJSON);
            var messageHandler;
            var responseCallback;

            if (message.responseId) {
                responseCallback = responseCallbacks[message.responseId];
                if(!responseCallback){return;}
                responseCallback(message.responseData);
                delete responseCallbacks[message.responseId];
            } else {
                if (message.callbackId) {
                    var callbackResponseId = message.callbackId;
                    responseCallback = function(responseData) {
                        doSend({responseId:callbackResponseId, responseData:responseData});
                    }
                }
                try {
                    var handler = ((message.eventName)?(messageHandlers[message.eventName]):(JSBridge.bridgeHandler));
                    if(handler) {
                    	handler(message.data, responseCallback);
                    }
                } catch(e) {
                    YXLogException(e,"dispatchMessageFromNative");
                }
            }
        });
    }

    function getReturnObject(apiName, status, dataJson) {
        var outJson = {status : status};
        if(apiName) outJson["apiName"] = apiName;
        if(dataJson) outJson["data"] = dataJson;
        return outJson;
    }

// PUBLIC METHODS
    function init(bridgeHandler) {
        if(JSBridge.bridgeHandler){YXLogException(e,"init");}
        JSBridge.bridgeHandler  = bridgeHandler;
        var receivedMessages    = receiveMessageQueue;
        receiveMessageQueue     = null;
        for(var i=0; i<receivedMessages.length; i++) {
            dispatchMessageFromNative(receivedMessages[i]);
        }
    }

    function config(params){
        //init
        init(function(message, responseCallback) {
            // console.log('JS got a message', message)
        })

        var config = params.config;
        send('config', config, function(responseData) {
            console.log('response data',responseData['data']);
            var resdata = responseData['data'];
            //alert(resdata['signtrue']);
            state = resdata['signtrue']=='true'? true: false;
            if(state){
               params.onSuccess(state);
            }
            else{
               params.onFail(state);
            }
            //alert(state);
            console.log('response data',state);
        });
        //state = true;
    }

    function send(eventName, data, responseCallback) {
        var dataToSend = {};
        if(eventName) dataToSend["eventName"] = eventName;
        dataToSend["data"] = {status : "true"};
        if(data) dataToSend["data"]["data"] = data;
        doSend(dataToSend, responseCallback);
    }

    function registerEvent(eventName, handler) {
        messageHandlers[eventName] = handler;
    }

    function deRegisterEvent(eventName, handler) {
        if(messageHandlers[eventName]) {
            delete messageHandlers[eventName];
        }
    }

    function callAPI(name, data, responseCallback) {
        try {
            if(data) {
                if(responseCallback) {
                    var cbID = "cbID" + (+new Date);
                    responseCallbacks[cbID] = responseCallback;
                    data["callbackID"] = cbID;
                }
                try{data = JSON.stringify(data);}catch(e){}
            }

            if(isIOSDevice) {
                if(data) name += ":";
                return callObjCAPI(name,data);
            } else {
                if(isAndroidDevice){
                    if(data)
                        return AndroidAPI.ProcessJSAPIRequest(name,data);
                    return AndroidAPI.ProcessJSAPIRequest(name,null);
                }
                else
                {
                    console.log("no mobile plamtform....");
                }
            }
        } catch(e) {
            YXLogException(e,"Invalid API:"+name);
        }
    }

    function callAPICallback(apiCallback, outJson, status) {
        if(apiCallback) {
            apiCallback(getReturnObject(null,((status)?(status):("true")),outJson));
        }
    }
    function callEventCallback(responseCallback, outJson, inJson) {
        if(responseCallback) {
            responseCallback(getReturnObject(((inJson)?(inJson["eventName"]):(null)),"true", outJson));
        }
    }

    function _fetchJSEventQueue() {
        try {
            var messageQueueString = JSON.stringify(sendMessageQueue);
            sendMessageQueue = [];
            return messageQueueString;
        } catch(e) {
            YXLogException(e,"_fetchJSEventQueue");
        }
        return [];
    }

    function _handleMessageFromNative(messageJSON) {
        if(receiveMessageQueue) {
            receiveMessageQueue.push(messageJSON);
        } else {
            dispatchMessageFromNative(messageJSON);
        }
    }

    function _getAPIData() { return JSON.stringify(apiData); }

    function _invokeJSCallback(cbID,removeAfterExecute,config) {
        if(cbID) {
            var cb = responseCallbacks[cbID];
            if(cb) {
                if(removeAfterExecute) delete(responseCallbacks[cbID]);
                var data = config;
                if(isAndroidDevice) {
                    try {data = JSON.parse(config);}catch(e){}
                }
                if(data.callbackID) delete(data.callbackID);
                cb.call(null, data);
            }
        }
    };

    var getParams = function(responseCallback){
        if (state) {
            send("getparams",{},responseCallback)
        }
        else{
            console.log("signtrue error!!");
            alert("signtrue error");
        }
    }

    var setDirtyflat = function(params,responseCallback){
        if (state) {
            send("setdirtyflat",params,responseCallback)
        }
        else{
            console.log("signtrue error!!");
            alert("signtrue error");
        }
    }


    w.JSBridge = {
        config  : config.bind(this),
        _fetchJSEventQueue      : _fetchJSEventQueue.bind(this),
        _handleMessageFromNative: _handleMessageFromNative.bind(this),
        _getAPIData             : _getAPIData.bind(this),
        _invokeJSCallback       : _invokeJSCallback.bind(this),
        registerEvent           : registerEvent.bind(this)
    }


    function callFunc(name,params) {
        console.log("METHOD:",name,"PARAM:",params);
        // var arr = name.split('.');
        // var method = "";
        // switch(arr[0]){
        //     case "yxapi":
        //         method = "YXApi."+arr[1];
        //         break;
        //     case "biz":
        //         method = "Biz."+arr[1];
        //         break;
        //     case "device":
        //         method = "Device."+arr[1];
        //         break;
        //     default:
        //         method = name;
        //         break;
        // }
        var param = params || {};
        if (state) {
            callAPI(name,param,function(responseData){
                var result = responseData['status'];
                var resdata = responseData['data'];
                if(result=='true'){
                    params.onSuccess(resdata);
                }
                else
                {
                    params.onFail(resdata);
                }
            });
        }
        else{
            console.log("signtrue error!!");
            alert("signtrue error");
            //params.onFail('signtrue error!!');
        }

    }

    var initMethod = function(method, func) {
        var arr = method.split('.');
        var namespace = JSBridge;
        for (var i = 0, k = arr.length; i < k; i++) {
            if (i === k - 1) {
                namespace[arr[i]] = func;
            }
            if (typeof namespace[arr[i]] == 'undefined') {
                namespace[arr[i]] = {};
            }
            namespace = namespace[arr[i]];
        }
    }

    yxapis.forEach(function(name) {
        initMethod(name,function(param) {
            callFunc(name, param)
        })
    }),

    messagingIframe = doc.createElement('iframe');
    messagingIframe.style.display = 'none';
    triggerNativeCall();
    doc.documentElement.appendChild(messagingIframe);

    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('YXReady');
    readyEvent.bridge = JSBridge;
    JSBridge.getParams = getParams;
    JSBridge.setDirtyflat = setDirtyflat;
    doc.dispatchEvent(readyEvent);
    JSBridge.version = version;
    yx = JSBridge;

})(window,document);
