
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
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '首页', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
    latitude: "",
    longitude: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    this._loadData();
  },


  _loadData: function () {
    var openId = wx.getStorageSync('openId');
    //设置图片路径
    this.setData({
      'url': Config.imgUrl
    })

    //获取最近活动
    home.getActivityImg((res) => {
      this.setData({
        'Activity': res.data.data.title
      })
    });
    //获取近期新闻
    home.getNews((res) => {
      this.setData({
        'News': res.data.data
      })
    });
    //获取轮播图图片
    home.getShufflings((res) => {
      this.setData({
        'Shufflings': res.data.data
      })
    });

    //获取该用户抽奖次数user.number
    home.getUser(openId, (res) => {
      console.log(res.data.data)
      this.setData({
        'user': res.data.data
      })
    });

  },
  freeTell: function () {
    wx.makePhoneCall({
      phoneNumber: Config.phone
    })
  },
  myIndex: function (e) {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  //活动
  activity: function (event) {
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../activity/activity?id=' + id
    });
  },

  
  goproduct: function () {
    wx.switchTab({
      url: '../goods/goods'
    })
  },


  //打开地图
  openmap:function(){
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.595972,//要去的纬度-地址
          longitude: 103.967823,//要去的经度-地址
          name: "双凤汽车维修中心",
          address: '双凤汽车维修中心'
        })
      }
    })
  },




  //跳转最新知识
  more_knowledge:function(){
    wx.navigateTo({
      url: '../knowledge/knowledge'
    });
  },


  knowledge_info: function (event){
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../knowledgeinfo/knowledgeinfo?id=' + id
    });
  },


 


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})