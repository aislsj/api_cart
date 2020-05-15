// pages/integral/integral.js

import { Integral } from 'integral-model.js';
var integral = new Integral();
import { Good } from '../goods/goods-model.js';
var good = new Good();
var time = require('../../utils/time.js');
var app = getApp()
Page({

  data: {
    hislist_num:'',
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的积分', //导航栏 中间的标题
    },
    height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
  },

  //跳转回上个页面
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
  
    this._loadData();
  },

  _loadData:function(){
    //获取openId
    var openId = wx.getStorageSync('openId');
    if(openId){
      //获取我的积分
      good.getUserNumber(openId, (res) => {
        this.setData({
          mynumber: true
        })
        this.setData({
          'number': res.data.data
        })
      });


      //获取积分历史
      integral.getHistoryList(openId, (res) => {
        if (res.data.data[0]) {
          this.setData({
            'hislist': res.data.data
          })
        } else {
          this.setData({
            'hislist_num': true
          })
        }
        if (res.data.data[0]) {
          this.setData({
            'updatetime': time.formatTimeTwo(res.data.data[0].time, 'Y-M-D')
          });
        }
      });
    }else{
      this.setData({
        'hislist_num': true
      })
    }
  

  

   
  },
  
})