/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const loadTweets = function() {
    
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        renderTweets(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  };


  const createTweetElement = function(data) {
    
    const $tweet = $('<div class="tweet">');

    const $username = $('<p>').text(data.user.name);
    const $avatar = $(`<img src="${data.user.avatars}"/>`);
    const $handle = $('<p>').text(data.user.handle);
    
    const $header = $('<header class="tweet-header">');

    $header.append($username, $avatar, $handle);

    const $content = $('<div>').text(data.content.text);

    const $date = $('<output>').text(data['created_at']);
    
    $tweet.append($header, $content, $date);

    return $tweet;
  };

  

  const renderTweets = function(tweets) {
    const $tweets = $(".tweets-container");
    for (const user in tweets) {
      const tweet = tweets[user];
      const $tweet = createTweetElement(tweet);
      $tweets.prepend($tweet);
    }
    
  };


  const $postTweet = $('#new-tweet');
  loadTweets();

  $postTweet.on('submit', function(event) {
    // prevent the default browser behaviour
    event.preventDefault();

    // serialize the form data for submission to the server
    const serializedData = $(this).serialize();
    
    const $output = $('output').val();
    const $tweetText = $('#tweet-text').val();
    console.log(parseInt($output));
    loadTweets();
    if ($tweetText !== "") {
      if (parseInt($output) >= 0) {
        $(this).children('input').val('');
        $.post('/tweets/', serializedData)
          .then((response) => {
            console.log(response);
          });
      } else {
        $("#tweet-error").text("Tweet too long").slideDown();
      }
    } else {
      $("#tweet-error").text("Tweet cannot be empty").slideDown();
    }
    // submit serialized data to the server via a POST request to `/api/posts`
  });



});