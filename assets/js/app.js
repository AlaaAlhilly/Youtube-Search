function init(){
    gapi.client.setApiKey("AIzaSyAh9sn6135qdZ9ZxGV41J-_-bWC5tbGy5U");
    gapi.client.load("youtube","v3",function(){
        isLoad = true;
    });
}
function arrayOfEl(e,t){
    res=e;
    for(var n=0;n<t.length;n++){
      res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
        return t[n][r]
      })
    }
      return res
    }
function displayVideo(){
    var display = $(`<div class="videoContainer">
    <h2>{{video}<h2>
    <iframe class="rs view" width="640" height="360" src="//www.youtube.com/embed/{{videoId}}" frameborder="0" allowfullscreen>
    </iframe></div>`);
    return display;

}

$(function(){
    init();
    $('.addgiffs').click(function(e){
        e.preventDefault();
        var q = encodeURIComponent($('#targetVideo').val()).replace(/s/g,'+');
        var numberOfVids = 3;
        var videoReq = gapi.client.youtube.search.list({
            part: 'snippet',
            type: 'video',
            q: q,
            maxResults: numberOfVids,
            order: 'viewCount',
            publishedAfter: '2015-01-01T00:00:00Z'
        });
        videoReq.execute(function(snap){
            var videoResult = snap.result;
            $('#targetVideo').html('');
            $.each(videoResult.items,function(index,item){
                $("#imgs").append(arrayOfEl(displayVideo(), [{"video":item.snippet.title, "videoId":item.id.videoId}]));
            });
            restHeight();
        });
    });
    $(window).on('resize',resetHeight);
});
function resetHeight(){
$('.rs').css('height',$('#targetVideo').width() * 9/16);
}
