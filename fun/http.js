function http(type, count, num, fun) {
  //界面交互
  wx.showLoading({
    title: '数据拼命加载中',
  })
  wx.request({
    method: 'get',
    url: 'http://iwenwiki.com/api/music/list.php?type=' + type + '&count=' + count + '&offset=' + num,
    success: function(res) {
      console.log(res);
      //隐藏
      wx.hideLoading();
      wx.showToast({
        title: '数据加载成功',
      })
      console.log(res.data);
      var obj = {};
      obj.name = res.data.billboard.name; //歌榜名字name
      obj.type = res.data.billboard.billboard_type; //歌榜标示
      obj.img = res.data.billboard.pic_s192; //榜单图片
      obj.comment = res.data.billboard.comment; //榜单介绍
      obj.songlist = []; //存储歌榜列表信息 [{name:''，author:'',img},{}]

      // obj.pic_img = res.data.song_list[0].pic_big;
      var songlist = res.data.song_list;
      console.log(songlist)
      if (songlist) {
        var arr = [];
        for (var i = 0; i < songlist.length; i++) {
          var song = {};
          arr.push(songlist[i].pic_big);
          song.title = songlist[i].title;
          song.author = songlist[i].author;
          song.pic_big = songlist[i].pic_big;
          song.songid = songlist[i].song_id;//音乐id
          obj.songlist.push(song);
        }
      }
        obj.pic_img = arr; //obj.pic_img=[]  [1] [1,2,3]

        //obj={pic_img:[],songlist:[],name,type,...}
        fun(obj);
        // return obj;
      }
    
  })
}
module.exports = http;

//http(22,1,0,function(res){ })