//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    loadingHidden: true,
    fontSize: 10
  },
  goto_counter:function(){
      wx.navigateTo({url:"../pages/index/index"});
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  loadingTap: function(){
      this.setData({
        loadingHidden: false
      });
      var that = this;
      setTimeout(function(){
        that.setData({
            loadingHidden: true
        });
        that.update();
      }, 3000);
  },
  magnifyFontSize(){
      this.setData({
          fontSize:this.data.fontSize+1
      })
  },
  shrinkFontSize(){
      this.setData({
          fontSize:this.data.fontSize-1
      })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
