var app=getApp();
function getMusic(songid,fun){
  wx.request({
    url: 'http://iwenwiki.com/api/music/play.php?mid=' + songid,
    success: function (res) {
      console.log(res.data.bitrate.file_link); //音乐地址mp3
      //调用小程序api 设置背景音乐
      // var BackgroundAudioManager=wx.getBackgroundAudioManager();
      app.globalData.BackgroundAudioManager.src = res.data.bitrate.file_link; //mp3
      app.globalData.BackgroundAudioManager.title = res.data.songinfo.title;
      app.globalData.musicName = res.data.songinfo.title;
      // that.setData({
      //   musicName: res.data.songinfo.title,
      //   flag: true
      // })
      fun(res.data)
    }
  })
  
}
module.exports=getMusic;