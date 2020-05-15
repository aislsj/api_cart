import { Index } from 'index-model.js';
var index = new Index();
import { Config } from '../../utils/config.js';
var config = new Config();
import { Card } from '../cardroll/cardroll-model.js';
var card = new Card();
var app = getApp()

//计数器
var interval = null;

//值越大旋转时间越长  即旋转速度
var intime = 50;

Page({
    goHome: function(e) {
      wx.switchTab({
        url: '../home/home'
      })
    },
    getUserInfo: function() {
        var that = this
        _getUserInfo();
        function _getUserInfo() {
            wx.getUserInfo({
                success: function(res) {
                    that.setData({
                        userInfo: res.userInfo
                    })
                    that.update()
                }
            })
        }
    },
    data: {
        unregistered: true,
        statusBarHeight: app.globalData.statusBarHeight,
        color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        color2: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        //9张奖品图片
        btnconfirm: '/images/dianjichoujiang.png',
        myclick: 'clickLuck',
        luckPosition: 1,
        Prizename: "很遗憾,你未中奖!",
        lotteryHistoryId: '',
        stataus:'',//中奖概率
        nvabarData: {
          showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
          title: '抽奖活动', //导航栏 中间的标题
        },
        height: app.globalData.height * 2 + 20,   // 此页面 页面内容距最顶部的距离
    },
    onLoad: function() {
      this._loadData();
    },
    onShow() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    //获取抽奖内容 抽奖的图片
    _loadData: function () {
      this.setData({ 'number': 0 })

      this.setData({
        navH: app.globalData.navHeight
      })
      var openId = wx.getStorageSync('openId');
      if(openId){
        index.getUser(openId, (res) => {
          //获取剩余抽奖次数
          this.setData({
            'number': res.data.data.number
          })
          //获取剩余发送奖券次数
          this.setData({
            'sendnum': res.data.data.bestowal
          })
          this.setData({
            register: true
          })
        });
      }
      index.getSudokuConfigList((res) => {
        var data = res.data.data;
        this.setData({ 'image0': Config.imgUrl + data[0].lotteryConfig.img })
        this.setData({ 'image1': Config.imgUrl + data[1].lotteryConfig.img })
        this.setData({ 'image2': Config.imgUrl + data[2].lotteryConfig.img })
        this.setData({ 'image3': Config.imgUrl + data[3].lotteryConfig.img })
        this.setData({ 'image4': Config.imgUrl + data[4].lotteryConfig.img })
        this.setData({ 'image5': Config.imgUrl + data[5].lotteryConfig.img })
        this.setData({ 'image6': Config.imgUrl + data[6].lotteryConfig.img })
        this.setData({ 'image7': Config.imgUrl + data[7].lotteryConfig.img })
      });
    },

    
    input: function(e) {
        var data = e.detail.value;
        this.setData({
            luckPosition: data
        })
    },
    //点击抽奖按钮
    clickLuck:function(){
      var openId = wx.getStorageSync('openId');
      //判断是否登录
      if (!openId) {
        wx.reLaunch({
          url: '../login/login'
        })
      }
      //设置按钮不可点击
      this.setData({btnconfirm: '/images/dianjichoujiangd.png',myclick: '',})

      var openId = wx.getStorageSync('openId');
      //判断是否登录 之后判断是否有抽奖次数
      if(openId){
        index.getUser(openId, (res) => {
          if (res.data.data.number >= 1){
            this.setData({
              'number': res.data.data.number - 1
            })
            index.luckyDraw(openId, (res) => {
              console.log(res);
              if (res.data.lotteryHistory){
                this.setData({
                  lotteryHistoryId: res.data.lotteryHistory.id
                })
              }
              this.clickLuck_return(res.data)
            });
          }else{
            wx.showToast({
              title: '对不起，你的抽奖次数已用完',
              icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
              duration: 2000
            })
          }
        });
      }else{
        wx.reLaunch({
          url: '../login/login'
        })
      }
    },
    //点击抽奖获取抽奖结果
    clickLuck_return: function(data) {
        var e = this;
        //判断中奖位置格式
        if (e.data.luckPosition == null || isNaN(e.data.luckPosition) || e.data.luckPosition > 7)             {
            wx.showModal({
                title: '提示',
                content: '请填写正确数值',
                showCancel: false,
            })
            return;
        }
       
            //清空计时器
        clearInterval(interval);

        //奖品亮度重新归零
        this.setData({
          'color': this.data.color2
        })


        var index = 0;
        //循环设置每一项的透明度
        interval = setInterval(function() {
            if (index > 7) {
                index = 0;
                e.data.color[7] = 0.5
            } else if (index != 0) {
                e.data.color[index - 1] = 0.5
            }
            e.data.color[index] = 1
            e.setData({
                color: e.data.color,
            })
            index++;
        }, intime);

        //模拟网络请求时间  设为两秒
        var stoptime = 2000;
        this.setData({
          'Prizename': data.data.lotteryConfig.name
        })
        this.setData({
          'cardId': data.data.id
        })


        this.setData({
          stataus: data.data.lotteryConfig.def
        })
       
     

        //设置在哪里停 根据在哪里停判断是否中奖
        setTimeout(function() {
          e.stop(data.data.number);
        }, stoptime)
    },



  stop: function (which) {
   
        var e = this;
        //清空计数器
        clearInterval(interval);
        //初始化当前位置
        var current = -1;
        var color = e.data.color;
        for (var i = 0; i < color.length; i++) {
            if (color[i] == 1) {
                current = i;
            }
        }
        //下标从1开始
        var index = current + 1;
    e.stopLuck(which, index, intime, 10);
    },
    /**
     * which:中奖位置
     * index:当前位置
     * time：时间标记
     * splittime：每次增加的时间 值越大减速越快
     */
  stopLuck: function (which, index, time, splittime) {
    
        var e = this;
        //值越大出现中奖结果后减速时间越长
        var color = e.data.color;
        setTimeout(function() {
            //重置前一个位置
            if (index > 7) {
                index = 0;
                color[7] = 0.5
            } else if (index != 0) {
                color[index - 1] = 0.5
            }
            //当前位置为选中状态
            color[index] = 1
            e.setData({
                    color: color,
                })
                //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
                //直到旋转至中奖位置
            if (time < 400 || index != which) {
                //越来越慢
                splittime++;
                time += splittime;
                //当前位置+1
                index++;
                e.stopLuck(which, index, time, splittime);
            } else {
                //1秒后显示弹窗
                setTimeout(function() {
                  if (e.data.stataus == 0) {
                        //中奖
                        e.setData({
                          showModal: true,
                          btnconfirm: '/images/dianjichoujiang.png',
                          myclick: 'clickLuck',
                        })
                      // e.loadAnimation();
                    } else {
                      //未中奖
                      e.setData({
                        prizeModal: true,
                        btnconfirm: '/images/dianjichoujiang.png',
                        myclick: 'clickLuck',
                      })
                      // e.loadAnimation();
                    }
                }, 1000);
            }
        }, time);
    },
    //进入页面时缓慢切换
  loadAnimation: function (index = 0) {
      //奖品亮度重新归零
      this.setData({
        'color': this.data.color2
      })
      var e = this;
      interval = setInterval(function() {
            if (index > 7) {
                index = 0;
                e.data.color[7] = 0.5
            } else if (index != 0) {
                e.data.color[index - 1] = 0.5
            }
            e.data.color[index] = 1
            e.setData({
                color: e.data.color,
            })
            index++;
        }, 1000);
    },
  
   /**   
   * 预览图片  
   */
  changeYL: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  hidenoModal: function () {
    this.setData({
      prizeModal: false
    });
  },
  //未中奖后再次点击抽奖按钮
  clickLuck_two: function () {
    this.setData({
      prizeModal: false
    });
    this.clickLuck()
  },
  //查询卡卷详情
  showcardroll: function (event) {
    var id = card.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../volume/volume?id=' + id
    });
  },
  //查询所有卡卷
  card_roll: function (e) {
    wx.navigateTo({
      url: '../cardroll/cardroll',
    })
  },
  //分享
  onShareAppMessage: (res) => {
    var id = res.target.id
    //这里的path是当前页面的path，必须是以 / 开头的完整路径，后面拼接的参数 是分享页面需要的参数  不然分享出去的页面可能会没有内容
    return {
      title: '你的好友送了你一张优惠卷！',
      path: '/pages/receive/receive?id=' + id,
      imageUrl: '../../images/home/fenxiang.jpg',
      desc: '点击分享给朋友',
      success: (res) => {

        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })

      },
      fail: (res) => {
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },


  //验证本月的分享次数
  sendnonum: function () {
    wx.showToast({
      title: '你本月的分享次数已用完',
      icon: 'none',
      duration: 1500
    })
  },


})