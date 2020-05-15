// pages/knowledgeinfo/knowledgeinfo.js
import { Home } from '../home/home-model.js';
var home = new Home();
var util = require("../../utils/util.js");
import { Knowledgeinfo } from 'knowledgeinfo-model.js';
var knowledgeinfo = new Knowledgeinfo();


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
      title: '养车宝典', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    console.log(id)


    //获取近期新闻
    var news = [];
    home.getNews((res) => {
      var cart = res.data.data
      for (var i = 0; i < cart.length; i++) {
        if (id == cart[i]['id']) {
          news = cart[i];
        }
      }
      //设置图片路径
      this.setData({
        'url': Config.imgUrl
      })

      console.log(news)
      this.setData({
        'News': news
      })
      this.setData({ 'time': util.formatTime(new Date(news['time'])) })
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  



})