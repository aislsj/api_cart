
import { Home } from 'home-model.js';
var home = new Home();
import { Card } from '../cardroll/cardroll-model.js';
var card = new Card();
import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()
Page({
    data: {
      userInfo: wx.getStorageSync('userInfo'),
      result: '',
    },
    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    goBack: function() {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
     * 页面的初始数据
     */

    onShow() {
      //调用函数、方法
      var that = this;
      this._loadData();
    },



    /**
       * 用户点击右上角分享
       */
    onShareAppMessage: function () {

    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      this.setData({
        navH: app.globalData.navHeight
      })
     this._loadData()
    },
  
  login:function(){
    wx.navigateTo({
      url: '../login/login'
    });
  },



  _loadData: function () {
    var openId = wx.getStorageSync('openId');
    if (!openId) {
      this.setData({
        unregistered: true
      })
      this.setData({
        register: false
      })
    }else{
      wx.getUserInfo({
        success: function (res) {
          mythis.setData({
            'userInfo': res.userInfo
          })
        },
        fail: function () {
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })

      this.setData({
        register: true
      })
      this.setData({
        unregistered: false
      })
    }

    //获取user
    var mythis = this;
    //获取卡卷数量 
    card.Cardroll(openId, (res) => {
      this.setData({
        'ybm': res.data.data
      })
    });
    //获取该用户抽奖次数user.number
    home.getUser(openId, (res) => {
      this.setData({
        'user': res.data.data
      })
    });
    //获取该用户是否有未读消息user.number
    home.haveNewMessage(openId, (res) => {
      this.setData({
        'Message': res.data.data
      })
    });
    //线上路径
    this.setData({
      'url': Config.imgUrl
    })



  },

  //管理员扫码后跳转
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
       var data =  JSON.parse(res.result)
        wx.navigateTo({
          url: '../eliminate/eliminate?carId=' + data.carId + '&lotteryHistoryId=' + data.lotteryHistoryId
        })
        var result = res.result;
        _this.setData({
          result: result,
        })
      }
    })
  },


  


  //跳转方式 卡卷未使用
  card_roll: function (e) {
    wx.setStorageSync('cardroll', '0')
    wx.navigateTo({
      url: '../cardroll/cardroll'
    })
  },

  //跳转方式 卡卷已使用
  card_roll1: function (e) {
    wx.setStorageSync('cardroll', '1')
    wx.navigateTo({
      url: '../cardroll/cardroll'
    })
  },

  //跳转方式 卡卷已过期
  card_roll2: function (e) {
    wx.setStorageSync('cardroll', '2')
    wx.navigateTo({
      url: '../cardroll/cardroll'
    })
  },


  //跳转方式 我的兑换
  myexchange: function (e) {
    wx.navigateTo({
      url: '../goodsroll/goodsroll'
    })
  },

  

  goIndex: function (e) {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  goNew: function (e) {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  goCart: function (e) {
    wx.switchTab({
      url: '../cart/addcart'
    })
  },
  goShopping: function (e) {
    wx.switchTab({
      url: '../goods/goods'
    })
  },
  myIntegral: function (e) {
    wx.navigateTo({
      url: '../integral/integral'
    })
  },
  exchange: function (e) {
    wx.navigateTo({
      url: '../exchange/exchange'
    })
  },
  myIndex: function (e) {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  

   
})