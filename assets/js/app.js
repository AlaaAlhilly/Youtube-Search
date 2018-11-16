
function arrayOfEl(e,t){
    res=e;
    for(var n=0;n<t.length;n++){
      res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
        //   alert(t[n][r]);
        return t[n][r];
      })
    }
      return res
    }
function displayVideo(){
    var display = `<div class="videoContainer">
    <h2>{{video}}<h2>
    <iframe class="rs view" width="640" height="360" src="//www.youtube.com/embed/{{videoId}}" frameborder="0" allowfullscreen>
    </iframe></div>`;
    return display;

}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyAh9sn6135qdZ9ZxGV41J-_-bWC5tbGy5U');
}
 
// Called when the search button is clicked in the html code
$('.addVids').click(function() {
    var query = encodeURIComponent($("#targetVideo").val()).replace(/%20/g, "+");
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query,
        type: 'video',
        maxResults: 3,
        order: 'viewCount',
        publishedAfter: '2015-01-01T00:00:00Z'
    });
    request.execute(onSearchResponse);
});
function onSearchResponse(response) {

    var videoResult = response.items;
    $('#targetVideo').val('');
    $.each(videoResult,function(index,item){
        $(".imgs").append(arrayOfEl(displayVideo(), [{"video":item.snippet.title, "videoId":item.id.videoId}]));
    });
    resetHeight();
    $(window).on('resize',resetHeight);
}
function resetHeight(){
$('.rs').css('height',$('#targetVideo').width() * 9/16);
}