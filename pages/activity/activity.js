
import { Home } from '../home/home-model.js';
var home = new Home();
import { Config } from '../../utils/config.js';
var config = new Config();
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:"",
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '近期活动', //导航栏 中间的标题
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
    this._loadData();
  },



  _loadData: function () {
 
    //获取最近活动
    home.getActivityImg((res) => {
      //设置图片路径
      this.setData({
        'img': Config.imgUrl + res.data.data.details
      })
    });

    
  
  },
  
  // 禁止屏幕滚动
  preventTouchMove: function () {

  },




})