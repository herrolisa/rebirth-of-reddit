$.ajax({
  method: "GET",
  url: "https://www.reddit.com/r/aww.json",
  dataType: "json"
})
.done(function(jsonData) {
  for (var i = 0; i < jsonData.data.children.length; i++) {
    $("#reddit-content").append("<img src=\"" + jsonData.data.children[i].data.thumbnail + "\">" + "<br>");
    $("#reddit-content").append("<a href=\"https://www.reddit.com" + jsonData.data.children[i].data.permalink + "\">" + jsonData.data.children[i].data.title + "</a>" + "<br>");
    $("#reddit-content").append(jsonData.data.children[i].data.author + "<br><br>");
  }
    })
.fail(function() {
  //Handle errors
  handleError();
})
.always(function() {
  //Always update the UI with status
});