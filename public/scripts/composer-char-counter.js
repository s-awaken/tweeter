$(document).ready(function() {
  const $tweetText = $('#tweet-text');
  $tweetText.keyup(function() {
    const max = 140;
    let len = $(this).val().length;
    if (max > len) {
      $('.counter').text(max - len).css('color', '#566573');
    } else if (max === len) {
      $('.counter').text(max - len).css('color', 'blue');
    } else {
      $('.counter').text(max - len).css('color', 'red');
    }
  });
});