//app.js
App({
  onLaunch: function () {
    //进入小程序 创建一个背景音乐对象
    var bg = wx.getBackgroundAudioManager();
    // console.log(this); this.setData()
    this.globalData.BackgroundAudioManager=bg;
  },
  globalData: {
    BackgroundAudioManager:'',//声明一个空的全局的背景音乐变量
    musicName:'',//全局的当前的音乐播放名字
    musicList:[],//全局的音乐列表
    index:0,//播放的位置
  }
})