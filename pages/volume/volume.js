
import { Volume } from 'volume-model.js';
var time = require('../../utils/time.js');
var volume = new Volume();
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
      title: '卡卷详情', //导航栏 中间的标题
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
    volume.getProductInfo(id, this.callBack);
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
  },

  callBack: function (res) {
      this.setData({
        'endTime': time.formatTimeTwo(res.data.data.overdueTime, 'Y-M-D h:m:s')
      });
      this.setData({
        'startTime': time.formatTimeTwo(res.data.data.getTime, 'Y-M-D h:m:s')
      });
      this.setData({
        'cardInfo': res.data.data
      });

  },


  //选择车辆
  bindcarChange: function (e) {
    this.setData({
      teamname: this.data.group_array[e.detail.value].carNumber,
      teamid: this.data.group_array[e.detail.value].carId
    })
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })
    this.setData({
      carId: this.data.group_array[e.detail.value].carId
    })
  },


  //选择车辆后跳转到二维码页面
  personal: function (event) {
    var lotteryHistoryId = card.getDataSet(event, 'lot');
    var carId = card.getDataSet(event, 'car');
    if (!carId) {
      wx.showToast({
        title: '请选择车辆',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../orcode/orcode?lotteryHistoryId=' + lotteryHistoryId + '&carId=' + carId
      });
    }
  },


  onTabsItemTap: function (event) {
    var index = card.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
  },
  // // 外面的弹窗
  // orCode: function () {
  //   this.setData({
  //     showModal: true
  //   })
  // },




  // 外面的弹窗
  orCode: function () {
    var id = this.data.lotteryHistoryId;
    if (this.data.carnum == 1) {
      wx.navigateTo({
        url: '../orcode/orcode?lotteryHistoryId=' + id + '&carId=' + this.data.group_array[0].carId
      });
    } else if (this.data.carnum == 0) {
      wx.showToast({
        title: '你还没有添加过的车辆',
        icon: 'none',
        duration: 2000
      })
    }else {
      this.setData({
        showModal: true
      })
    }
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











})