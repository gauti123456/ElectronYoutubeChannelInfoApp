const youtubeChannelId = require("get-youtube-channel-id");
const form = document.getElementById("form");
let result;
let username
let channelId;
const API_KEY = "### // Your YOUTUBE API KEY // ###";
let user;


form.addEventListener("submit", function(e) {
    e.preventDefault();
  let id = document.getElementById("channelId").value;
  console.log(id);
  result = youtubeChannelId(id);
  result.then(function(data) {
    console.log(data);
    if (!data.username) {
        channelId = data.id;
        console.log(channelId)
        getData(channelId)
    } else {
      username = data.username;
        convertUserNameToId(username);
    }
  });

    
});



function convertUserNameToId(username) {
  const url =
    "https://www.googleapis.com/youtube/v3/channels?key=" +
    API_KEY +
    "&forUsername=" +
    username +
    "&part=id";
  $.get(url, function(data) {
    channelId = data.items[0].id;

    getData(channelId);
  });
}

function getData(id) {
    clearFields()
  const url =
    "https://www.googleapis.com/youtube/v3/channels?key=" +
    API_KEY +
    "&id=" +
    id +
    "&part=snippet,contentDetails,statistics";

  $.get(url, function(data) {
    console.log(data);

    user = `
            <h2>${data.items[0].snippet.title}</h2>
            <img src="${data.items[0].snippet.thumbnails.default.url}" class="img-circle"/>
            <h2 id="subscribers">Subscribers:${data.items[0].statistics.subscriberCount}</h2>
            <h2 id="subscribers">Total Views:${data.items[0].statistics.viewCount}</h2>
            <h2 id="subscribers">Total Videos:${data.items[0].statistics.videoCount}</h2>
            `;
    $("#result").html(user);
  });
}


function clearFields() {
    $("#channelId").val("")
    $("#result").empty()
}
