$.ajax({
  method: 'GET',
  url: 'https://www.reddit.com/r/corgi.json',
  dataType: 'json'
})
.done(function(jsonData) {
  display(jsonData);
})
.fail(function() {
  //Handle errors
  handleError();
})
.always(function() {
  //Always update the UI with status
});

function display(obj) {
  var posts = obj.data.children;
  for (var i = 0; i < posts.length; i++) {
    //url for img source or reddit post
    var postLink = posts[i].data.url;

    //thumbnail photos
    var thumbnail = posts[i].data.thumbnail;
    var displayThumbnail = '<img src="' + posts[i].data.thumbnail + '">';
    if (thumbnail === 'self'){
      displayThumbnail = '<img src="http://cdn9.staztic.com/app/a/6197/6197331/corgi-alex-1-l-140x140.png">';
    }

    //reddit title
    var title = posts[i].data.title;
    var displayTitle = title;
    if (title.length > 17){
      displayTitle = title.substring(0, 16) + "...";
    }

    //reddit author
    var author = posts[i].data.author;

    var commentLink = 'https://www.reddit.com' + posts[i].data.permalink;
    var comments = posts[i].data.num_comments;
    var isPlural = (comments > 1 || comments === 0) ? ' comments' : ' comment';

    //append elements to page
    $('#reddit-feed').append('<div class="reddit-post"><div class="thumbnails"><a href="' + postLink + '">' + displayThumbnail + '</a></div><div class="snippet"><a href="' + postLink + '">' + displayTitle + '</a><p>' + '<a href="https://www.reddit.com/user/' + author + '">' + author + '</a>' + '</p><a href="' + commentLink + '">' + comments + isPlural + '</a></div></div>');
  }
}