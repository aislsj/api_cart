var util = {};


function getQuery(url) {
  var theRequest = [];
  if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
        theRequest[i] = {
          'name': strs[i].split("=")[0],
          'value': unescape(strs[i].split("=")[1])
        }
      }
    }
  }
  return theRequest;
}
/*
* 获取链接某个参数
* url 链接地址
* name 参数名称
*/
function getUrlParam(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
  var r = url.split('?')[1].match(reg);  //匹配目标参数  
  if (r != null) return unescape(r[2]); return null; //返回参数值  
}



/*
* 获取用户信息
*/
util.getUserInfo = function (cb) {
  var login = function () {
    wx.login({
      success(res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://www.jxdqx.com/jxd/getOpenId',
            data: {
              code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            //获取返回的openId
            success: function (openIdRes) {
              // 判断openId是否获取成功
              if (openIdRes.data.data.openid != null & openIdRes.data.data.openid != undefined) {
                // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                wx.getUserInfo({
                  success: function (data) {
                   //存储登录会话session versions openId
                    wx.setStorageSync('session_key', openIdRes.data.data.session_key);
                    wx.setStorageSync('versions', '1')
                    wx.setStorageSync('openId', openIdRes.data.data.openid);
                    typeof cb == "function" && cb(openIdRes.data.data.openid);
                  }, 
                  fail: function (failData) {
                    console.info("用户拒绝授权");
                  }
                });
              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }


      }
    })

  };

  var app = wx.getStorageSync('userInfo');
  if (app.sessionid) {
    wx.checkSession({
      success: function () {
        typeof cb == "function" && cb(app);
      },
      fail: function () {
        app.sessionid = '';
        wx.removeStorageSync('userInfo');
        login();
      }
    })
  } else {
    //调用登录接口
    login();
  }
}

util.navigateBack = function (obj) {
  let delta = obj.delta ? obj.delta : 1;
  if (obj.data) {
    let pages = getCurrentPages()
    let curPage = pages[pages.length - (delta + 1)];
    if (curPage.pageForResult) {
      curPage.pageForResult(obj.data);
    } else {
      curPage.setData(obj.data);
    }
  }
  wx.navigateBack({
    delta: delta, // 回退前 delta(默认为1) 页面
    success: function (res) {
      // success
      typeof obj.success == "function" && obj.success(res);
    },
    fail: function (err) {
      // fail
      typeof obj.fail == "function" && obj.function(err);
    },
    complete: function () {
      // complete
      typeof obj.complete == "function" && obj.complete();
    }
  })
};

util.footer = function ($this) {
  let app = getApp();
  let that = $this;
  let tabBar = app.tabBar;
  for (let i in tabBar['list']) {
    tabBar['list'][i]['pageUrl'] = tabBar['list'][i]['pagePath'].replace(/(\?|#)[^"]*/g, '')
  }
  that.setData({
    tabBar: tabBar,
    'tabBar.thisurl': that.__route__
  })
};
/*
 * 提示信息
 * type 为 success, error 当为 success,  时，为toast方式，否则为模态框的方式
 * redirect 为提示后的跳转地址, 跳转的时候可以加上 协议名称  
 * navigate:/we7/pages/detail/detail 以 navigateTo 的方法跳转，
 * redirect:/we7/pages/detail/detail 以 redirectTo 的方式跳转，默认为 redirect
*/
util.message = function (title, redirect, type) {
  if (!title) {
    return true;
  }
  if (typeof title == 'object') {
    redirect = title.redirect;
    type = title.type;
    title = title.title;
  }
  if (redirect) {
    var redirectType = redirect.substring(0, 9), url = '', redirectFunction = '';
    if (redirectType == 'navigate:') {
      redirectFunction = 'navigateTo';
      url = redirect.substring(9);
    } else if (redirectType == 'redirect:') {
      redirectFunction = 'redirectTo';
      url = redirect.substring(9);
    } else {
      url = redirect;
      redirectFunction = 'redirectTo';
    }
  }

  if (!type) {
    type = 'success';
  }

  if (type == 'success') {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000,
      mask: url ? true : false,
      complete: function () {
        if (url) {
          setTimeout(function () {
            wx[redirectFunction]({
              url: url,
            });
          }, 1800);
        }

      }
    });
  } else if (type == 'error') {
    wx.showModal({
      title: '系统信息',
      content: title,
      showCancel: false,
      complete: function () {
        if (url) {
          wx[redirectFunction]({
            url: url,
          });
        }
      }
    });
  }
}

util.user = util.getUserInfo;
//封装微信等待提示，防止ajax过多时，show多次
util.showLoading = function () {
  var isShowLoading = wx.getStorageSync('isShowLoading');
  if (isShowLoading) {
    wx.hideLoading();
    wx.setStorageSync('isShowLoading', false);
  }

  wx.showLoading({
    title: '加载中',
    complete: function () {
      wx.setStorageSync('isShowLoading', true);
    },
    fail: function () {
      wx.setStorageSync('isShowLoading', false);
    }
  });
}

util.showImage = function (event) {
  var url = event ? event.currentTarget.dataset.preview : '';
  if (!url) {
    return false;
  }
  wx.previewImage({
    urls: [url]
  });
}

module.exports = util;