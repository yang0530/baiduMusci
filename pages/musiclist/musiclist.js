// pages/musiclist/musiclist.js
//引入封装请求-----
var http = require('../../fun/http.js');
var getMusic=require('../../fun/getMusic.js');
//引入全局的app()
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '', //榜单图
    comment: '', //介绍
    songlist: [], //列表
    codeId: 0, //页面的类型
    num: 0, //请求的列表数据 15*num
    flag: false, //默认是关闭的
    musicName: '', //当前播放的音乐名字
    index:0,//

  },
  //1.点击音乐列表 播放音乐play-----------------------
  play: function(e) {
    var that = this;
    console.log(e.currentTarget.dataset.songid);
    //点击获取songid之后请求接口---获取音乐
    getMusic(e.currentTarget.dataset.songid,function(res){
      that.setData({
          musicName: res.songinfo.title,
          flag: true
      })
    })
    // wx.request({
    //   url: 'http://iwenwiki.com/api/music/play.php?mid=' + e.currentTarget.dataset.songid,
    //   success: function(res) {
    //     console.log(res.data.bitrate.file_link); //音乐地址mp3
    //     //调用小程序api 设置背景音乐
    //     // var BackgroundAudioManager=wx.getBackgroundAudioManager();
    //     app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link; //mp3
    //     app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
    //     app.globalData.musicName = res.data.songinfo.title;
    //     that.setData({
    //       musicName: res.data.songinfo.title,
    //       flag: true
    //     })

    //   }
    // })
  },
  //2.点击按钮控制音乐播放暂停-----
  controllMusic: function() {
    //判断当前音乐是否第暂停的
    if (app.globalData.BackgroundAudioManager.paused) {
      app.globalData.BackgroundAudioManager.play();
      this.setData({
        flag: true
      })
    } else {
      app.globalData.BackgroundAudioManager.pause();
      this.setData({
        flag: false
      })
    }
  },
//3.全部播放--------------------
  playAll:function(){
    var that=this;
      //1.获取当前的音乐列表 songlist  2.index
      //3.音乐播放 
      app.globalData.musicList=this.data.songlist;
      app.globalData.index=0;
    getMusic(app.globalData.musicList[app.globalData.index].songid,function(res){
      that.setData({
            musicName: res.songinfo.title,
            flag: true
          })
    })
      // wx.request({
      //   url: 'http://iwenwiki.com/api/music/play.php?mid=' + app.globalData.musicList[app.globalData.index].songid,
      //   success:function(res){
      //     app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
      //     app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
      //     app.globalData.musicName = res.data.songinfo.title;
      //     that.setData({
      //       musicName: res.data.songinfo.title,
      //       flag: true
      //     })
      //   }
      // })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.type);
    this.setData({
      codeId: options.type,
      musicName: app.globalData.musicName

    })
    //进入页面----判断音乐是否暂定---------------------
    console.log(app.globalData.BackgroundAudioManager.paused);
    // if (app.globalData.BackgroundAudioManager.paused == undefined || app.globalData.BackgroundAudioManager.paused) {
    //   this.setData({
    //     flag: false
    //   })
    // } else {
    //   this.setData({
    //     flag: true
    //   })
    // }
if(app.globalData.BackgroundAudioManager.paused==false){
  this.setData({
        flag: true
      })
}
    //进入页面---请求数据---------------------------
    http(options.type, 15, 0, function(res) {
      console.log(res); //{name:'',type:'',pic_img:[]}
      that.setData({
        img: res.img,
        comment: res.comment,
        songlist: res.songlist
      })
    })
  //---监听音乐播放完毕结束----------------------------------------------------
  app.globalData.BackgroundAudioManager.onEnded(function(){
    //播放完毕----播放下一首
    app.globalData.index++;//[0,...13,14]
    console.log(app.globalData.index,'下一首')
    if(app.globalData.musicList.length>app.globalData.index){
      //请求
      wx.request({
        url: 'http://iwenwiki.com/api/music/play.php?mid=' + app.globalData.musicList[app.globalData.index].songid,
        success: function (res) {
          app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link;
          app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
          app.globalData.musicName = res.data.songinfo.title;
          that.setData({
            musicName: res.data.songinfo.title,
            flag: true
          })
        }

      })
    }else{
      app.globalData.musicName=''
      app.globalData.musicList=[]
      app.globalData.index=0
      that.setData({
        flag:false
      })
    }


  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    console.log('下拉刷新');
    this.setData({
      songlist: [],
      num: 0
    })
    http(this.data.codeId, 15, 0, function(res) {
      //获取res里面的songlist 数据     
      that.setData({
        songlist: res.songlist
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    console.log('到底部了 加载更多');
    //1.获取数据
    this.data.num++
      console.log(this.data.num)
    http(this.data.codeId, 15, 15 * this.data.num, function(res) {
      //app.gllll-----
      that.setData({
        songlist: that.data.songlist.concat(res.songlist)
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})