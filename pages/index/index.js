// pages/index/index.js
var http=require('../../fun/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jingdian:{},//经典老歌
    rege:{},//热歌
    xinge:{},//新歌 {name:'',pic_img:[]}
    yaogun:{},//摇滚

  },
  //跳转页面---------------------------
  tiao:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../musiclist/musiclist?type='+e.currentTarget.dataset.mtype,

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //请求数据---经典老歌22------------
  http(22,1,0,function(res){
    console.log(res);
    that.setData({
      jingdian:res
    })
  });
    // wx.request({
    //   method:'get',
    //   url: 'http://iwenwiki.com/api/music/list.php?type=22&count=1&offset=0',
    //   success:function(res){
    //     console.log(res.data);
    //     var obj={};
    //     obj.name=res.data.billboard.name;
    //     obj.pic_img=res.data.song_list[0].pic_big;
    //     that.setData({
    //       jingdian:obj
    //     })
    //   }
    // })

  //请求数据---热歌2---------------
  http(2,1,0,function(res){
    that.setData({
        rege: res
      })
  })
  // wx.request({
  //   url: 'http://iwenwiki.com/api/music/list.php?type=2&count=1&offset=0',
  //   success:function(res){
  //     console.log(res.data);
  //     var obj = {};
  //     obj.name = res.data.billboard.name;
  //     obj.pic_img = res.data.song_list[0].pic_big;
  //     that.setData({
  //       rege: obj
  //     })
  //   }
  // })
  //请求数据---新歌榜1---------------
  http(1,3,0,function(res){
    that.setData({
        xinge:res
      })
  })
  // wx.request({
  //   url: 'http://iwenwiki.com/api/music/list.php?type=1&count=3&offset=0',
  //   success: function (res) {
  //     console.log(res.data);
  //     var obj = {};
  //     obj.name = res.data.billboard.name;
  //     var songlist=res.data.song_list;
  //     var arr=[];
  //     for(var i=0;i<songlist.length;i++){
  //       arr.push(songlist[i].pic_big);
  //     }
  //     obj.pic_img=arr;
  //     that.setData({
  //       xinge:obj
  //     })
  //   }
  // })
//摇滚----11--------------
    http(11, 3, 0, function (res) {
      that.setData({
        yaogun: res
      })
    })
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/list.php?type=11&count=3&offset=0',
    //   success: function (res) {
    //     console.log(res.data);
    //     var obj = {};
    //     obj.name = res.data.billboard.name;
    //     var songlist = res.data.song_list;
    //     var arr = [];
    //     for (var i = 0; i < songlist.length; i++) {
    //       arr.push(songlist[i].pic_big);
    //     }
    //     obj.pic_img = arr;
    //     that.setData({
    //       yaogun: obj
    //     })
    //   }
    // })

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