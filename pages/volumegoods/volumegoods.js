
import { Volumegoods } from 'volumegoods-model.js';
var volumegoods = new Volumegoods();


import { Card } from '../cardroll/cardroll-model.js';
var card = new Card();

import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carId: '',
    lotteryHistoryId: '',
    orCodeImage: '../../images/cart_info/cart_image.jpg',
    carnum: 0,//用户拥有车辆
    group_array: '',//用户车辆
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '商品详情', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },
  //跳转回上个页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })

    //根据传过来的参数获取卡卷id
    var id = options.id;

    //获取商品信息
    volumegoods.getProductInfo(id, this.callBack);
    this.setData({
      lotteryHistoryId: id
    })
    var openId = wx.getStorageSync('openId');
    //获取用户车辆
    card.getUserCar(openId, (res) => {
      this.setData({
        carnum: res.data.data.length
      })
      this.setData({
        'group_array': res.data.data
      })
    })
    //设置图片路由
    this.setData({
      'url': Config.imgUrl
    })
  },
  //商品返回回执
  callBack: function (res) {
    this.setData({
      'cardInfo': res.data.data
    });
  },




  //点击使用卡卷
  orCode: function (event) {
    var id = this.data.lotteryHistoryId;
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