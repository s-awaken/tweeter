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

    const $avatar = $(`<img src="${data.user.avatars}"/>`);
    const $username = $('<p>').text(data.user.name);
    const $handle = $('<p>').text(data.user.handle);
    
    const $header = $('<header class="tweet-header">');

    $header.append($avatar, $username ,$handle);

    const $content = $('<p>').text(data.content.text);
    
    const $icons = $('<p>');
    $icons.append('<i class="fas fa-flag"></i>',
      '<i class="fas fa-retweet"></i>',
      '<i class="fas fa-thumbs-up"></i>');
    
    const dateCreated = new Date(data['created_at'] * 1000);
    const day =  dateCreated.toLocaleString("en-US", { day: "numeric" });
    
    const $date = $('<p>').text(`${day} days ago`);
    const $footer = $('<footer>');
    $footer.append($date, $icons);
    $tweet.append($header, $content, $footer);

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
            $(this).children('textarea').val('');
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