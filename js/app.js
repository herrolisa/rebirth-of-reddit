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
  //add container for all reddit posts
  var $redditContainer = $('<div />');
  $redditContainer.attr('id', 'reddit-container');
  $('body').append($redditContainer);

  var posts = obj.data.children;
  for (var i = 0; i < posts.length; i++) {
    //create div element for each post
    var $redditPost = $('<div />').addClass('reddit-post');
    $redditContainer.append($redditPost);

    //url for img source or reddit post
    var postLink = posts[i].data.url;

    //thumbnail photos with link to original photo (or reddit post)
    // var thumbnail = posts[i].data.thumbnail;
    // if (thumbnail === 'self'){
    //   thumbnail = 'http://cdn9.staztic.com/app/a/6197/6197331/corgi-alex-1-l-140x140.png';
    // }
    var thumbnail = null;
    if (posts[i].data.hasOwnProperty('preview')){
      thumbnail = posts[i].data.preview.images[0].source.url;
    }else{
      thumbnail = 'http://cdn9.staztic.com/app/a/6197/6197331/corgi-alex-1-l-140x140.png';
    }

    var $imgElem = $('<img />');
    $imgElem.attr('src', thumbnail);
    $imgElem.addClass('thumbnail');
    var $imgLink = $('<a />');
    $imgLink.attr('href', postLink);
    $imgLink.attr('target', '_blank');
    $imgLink.append($imgElem);
    $redditPost.append($imgLink);

    //reddit title
    var title = posts[i].data.title;
    if (title.length > 19){
      title = title.substring(0, 18) + '...';
    }
    var $titleElem = $('<p />');
    var $titleLink = $('<a />');
    $titleLink.addClass('title');
    $titleLink.attr('href', postLink);
    $titleLink.attr('target', '_blank');
    $titleLink.append(title);
    $titleElem.append($titleLink);
    $redditPost.append($titleElem);

    //reddit author
    var author = posts[i].data.author;
    var $authorElem = $('<p />');
    var $authorLink = $('<a />');
    $authorLink.addClass('author');
    $authorLink.attr('href', 'https://www.reddit.com/user/' +author);
    $authorLink.attr('target', '_blank');
    $authorLink.append(author);
    $authorElem.append($authorLink);
    $redditPost.append($authorElem);

    //reddit comments
    var commentUrl = 'https://www.reddit.com' + posts[i].data.permalink;
    var comments = posts[i].data.num_comments;
    var isPlural = (comments > 1 || comments === 0) ? ' comments' : ' comment';
    var $commentElem = $('<p />');
    var $commentLink = $('<a />');
    $commentLink.addClass('comment');
    $commentLink.attr('href', commentUrl);
    $commentLink.attr('target', '_blank');
    $commentLink.append(comments + " " + isPlural);
    $commentElem.append($commentLink);
    $redditPost.append($commentElem);
  }
}