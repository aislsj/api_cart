
import { Addcart } from 'addcart-model.js';
var addcart = new Addcart();

import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的车辆', //导航栏 中间的标题
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


  onShow() {
    //调用函数、方法
    var that = this;
    this._loadData();
  },

  onLoad: function (options) {
    this._loadData();
  },

  _loadData: function () {
    this.setData({
      navH: app.globalData.navHeight
    })
    //获取openId
    var openId = wx.getStorageSync('openId');
    //获取车辆列表
    addcart.getCarList(openId,(res) => {
      this.setData({
        'cart': res.data.data
      })
    });
  },

  //修改车辆
  editCart: function (event){
    var id = addcart.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../cartinfo/cartinfo?id=' + id
    });
  },
 

  // 外面的弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  //个人添加车辆
  personal: function () {
    var openId = wx.getStorageSync('openId');
    if (!openId) {
      wx.reLaunch({
        url: '../login/login'
      })
    } 
    wx.navigateTo({
      url: '../cartinfo/cartinfo?type=1'
    });
  },

  //企业添加车辆
  enterprise: function () {
    var openId = wx.getStorageSync('openId');
    if (!openId) {
      wx.reLaunch({
        url: '../login/login'
      })
    } 
    wx.navigateTo({
      url: '../cartinfo/cartinfo?type=2'
    });
  },
})