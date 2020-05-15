
import { Goods } from 'goodsroll-model.js';
var goods = new Goods();


import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTabsIndex: 0,
    carId: '',
    lotteryHistoryId: '',
    orCodeImage: '../../images/cart_info/cart_image.jpg',
    carnum: 0,//用户拥有车辆
    group_array: '',//用户车辆
    goodsinfo_not_used:[],//用户未使用
    goodsinfo_used:[],//用户已使用
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的兑换', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      navH: app.globalData.navHeight
    })
    this._loadData();
  },

  onShow() {
  
  },

  _loadData: function () {
    var openId = wx.getStorageSync('openId');
    //获取我的卡卷
    goods.goodsroll(openId, (res) => {
      var data = res.data.data;
      this.data.goodsinfo_not_used = [];
      this.data.goodsinfo_used     = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i]['state'] == 0) {
          this.data.goodsinfo_not_used.push(data[i])
        }else{
          this.data.goodsinfo_used.push(data[i])
        }
      }
      this.setData({
        'notused': this.data.goodsinfo_not_used
      })
      this.setData({
        'used': this.data.goodsinfo_used
      })
    });
    //获取用户车辆
    goods.getUserCar(openId, (res) => {
      this.setData({
        carnum: res.data.data.length
      })
      this.setData({
        group_array: res.data.data
      })
    })
    //设置图片路径
    this.setData({
      'url': Config.imgUrl
    })
  },
  //切换选项卡
  onTabsItemTap: function (event) {
    var index = goods.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
    this._loadData();
  },

  //查询商品详情
  onShowMore: function (event) {
    var id = goods.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../volumegoods/volumegoods?id=' + id
    });
  },


  //点击使用卡卷
  orCode: function (event) {
    var id = goods.getDataSet(event, 'id');
    console.log(id)
    if (this.data.carnum == 0) {
      wx.showToast({
        title: '你还没有添加过的车辆',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../orcode/orcode?lotteryHistoryId=' + id + '&carId=' + this.data.group_array[0].carId
      });
    }
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

 


})