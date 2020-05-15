
import { Knowledge } from 'knowledge-model.js';
var knowledge = new Knowledge();

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
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '最新知识', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
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
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  _loadData:function(){

    //设置图片路径
    this.setData({
      'url': Config.imgUrl
    })

    //获取近期新闻
    home.getNews((res) => {
      console.log(res)
      this.setData({
        'News': res.data.data
      })
    });
  },
  
 //知识详情
  knowledge_info: function (event) {
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../knowledgeinfo/knowledgeinfo?id=' + id
    });
  },

})