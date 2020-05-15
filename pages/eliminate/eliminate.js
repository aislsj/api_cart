// pages/eliminate/eliminate.js

import { Eliminate } from 'eliminate-model.js';
var eliminate = new Eliminate();

import { Config } from '../../utils/config.js';
var config = new Config();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '管理员消卷', //导航栏 中间的标题
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
    var carId = options.carId;
    var lottery = options.lotteryHistoryId;
    this.setData({'carId': carId})
    this.setData({'lottery': lottery})
    this.setData({'url': Config.imgUrl})
    eliminate.getLotteryById(lottery, (res) => {
      this.setData({
        'card_roll': res.data.data.lotteryConfig
      })
    });

    
  },


  //消除卡卷
  ok: function (event) {
    var carid            = eliminate.getDataSet(event, 'carid');
    var lottery          = eliminate.getDataSet(event, 'lottery');
  
    wx.showModal({
      title: '提示',
      content: '你确定要消除这张消费卷吗?',
      success: function (res) {
        if (res.confirm) {
          eliminate.useLottery(carid, lottery, (res) => {
            if (res.data.status == 'true'){
              wx.showToast({
                title: '消卷成功',
                icon: 'success',
                duration: 2000
              })
              //延时定时器
              setTimeout(function () {
                //要延时执行的代码  
                wx.switchTab({
                  url: '../home/home'
                })
              }, 1000) //延迟时间 这里是1秒
            }else{
              wx.showToast({
                title: res.data.data,
                icon: 'none',
                duration: 2000
              })
            }
          });
        } else {
          wx.showToast({
            title: '你取消了消卷',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

   

  },
})