(function($) {

  // can't be called in doc.ready or onload
  google.load("feeds", "1");

  $( document ).ready( function() {

    function getRSS() {
      var feed_url = $('.field-name-git-commit-log-rss- .field-item a').attr('href');
      var feed = new google.feeds.Feed(feed_url);
      feed.setNumEntries(4); // specify number of entries to load
      feed.load(function(result) {
        if (!result.error) {
          $('.field-name-git-commit-log-rss-').prepend('<div class="activity"><span>Activity</span></div>');
          var container = $('.field-name-git-commit-log-rss-');
          var output = '<ul class="rss-feed-items">';
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            output += '<li><a target="_blank" href="' + entry.link + '" title="' + entry.title + '">' + entry.title + '</a>';
            if (entry.author.length > 0) {
              output += ' - ' + entry.author;
            }
            if (entry.publishedDate.length > 0) {
              var date = $.timeago(new Date(entry.publishedDate));
              output += ' - <span class="git-date" title="' + date + '" >' + date + '</div>';
            }
            /*if (entry.content.length > 0) {
              output += '<br />' + entry.content;
            }*/
            output += '</li>';
          }
          output += '</ul>';
          container.append(output);
        }
      });
    }
    google.setOnLoadCallback(getRSS);

  })

})(jQuery);
