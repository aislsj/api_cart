import { Login } from 'login-model.js';
var login = new Login();

const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    AuthorizedLogin: '确认登录',
    UserPhone: '手机号授权',
    lee: "",
    flag: true,
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
    otherInfo: '',
    iscode: null,//用于存放验证码接口里获取到的code
    myuserinfo: null,//用于存放点击授权后获得的用户信息
    openId:'',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '登录', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  onLoad: function () {
    var that = this;
    //显示授权页面
    that.setData({
      isHide: true
    }); 
   
  },

  //用户点击了授权按钮
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      let user = e.detail.userInfo;
      //获取用户信息
      this.setData({
        myuserinfo: user
      })
      //授权成功后,调用登录方法
      that.wxlogin();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {}
      });
    }
  },

  //调用共通的登录方法
  wxlogin: function () { 
    var that = this;
    //获取用户的openID 再用openID判断是否注册 没注册过显示输入手机号页面注册 注册过根据receive判断是否是领劵页面的内容跳转到首页
    app.util.getUserInfo(
      function (openId) {
        login.getUser(openId, (res) => {
          if (res.data.data){
            var receive = wx.getStorageSync('receive');
            if (receive){
              wx.navigateBack({delta: 1 })
            }else{
              wx.reLaunch({url: '../home/home'})
            }
          }else{
            // 未注册的情况 删除openid缓存 注册后重新添加openid缓存
            wx.removeStorage({key: 'versions',success: function (res) {},})
            wx.removeStorage({key: 'openId',success: function (res) {that.setData({openId: openId})},})
            //显示手机号授权按钮
            that.setData({
              isHide: true,
              flag: (!that.data.flag),
              lee: true
            })
          }
        });
      });
  },

  goHome(){
    wx.switchTab({
      url: '../home/home'
    })
  },

  getPhoneNumber(e){
    var iv              = e.detail.iv;
    var encryptedData   = e.detail.encryptedData
    var session_key     = wx.getStorageSync('session_key');
  

    //发送授权获取的内容到后台解密获得手机号
    login.mobilePhone(iv, encryptedData, session_key, (res) => {
      var phone = res.data.data;
      var openId = this.data.openId
      //新用户注册手机号
      login.register(phone, this.data.myuserinfo, openId, (res) => {
        if (res.data.status == 'true') {
          wx.setStorageSync('openId', openId);
          wx.setStorageSync('versions', 1);
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          //使用循环 判断openId是否存入了缓存 存入了才跳转到index
          var a = setInterval(function () {
            var openId = wx.getStorageSync('openId');
            if (openId) {
              clearInterval(a)
              var receive = wx.getStorageSync('receive');
              if (receive) {
                wx.navigateBack({delta: 1})
              } else {
                wx.reLaunch({url: '../index/index' })
              }
            }
          }, 1000) 
        } else {
          wx.showToast({
            title: '注册失败！请联系管理员或重新注册！',
            icon: 'none',
            duration: 2000
          })
        }
      })
    })



  },




})
