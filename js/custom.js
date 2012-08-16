(function($) {

  // can't be called in doc.ready or onload
  google.load("feeds", "1");

  $( document ).ready( function() {

    function getRSS() {
      var feed_url =
      'https://code.commotionwireless.net/activity.atom?key=e43fd10eb7855d7011ba8375f64d60e031036342';
      var feed = new google.feeds.Feed(feed_url);
      feed.setNumEntries(4); // specify number of entries to load
      feed.load(function(result) {
        if (!result.error) {
          var container = $('#recent-activity-container');
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
            output += '</li>';
          }
          output += '</ul>';
          container.append(output);
        }
      });
    }
    if ( $('#recent-activity-container').length > 0) {
      google.setOnLoadCallback(getRSS);
    }

    $('#boxes-box-feedback a').hover( function() {
      $('#boxes-box-feedback .boxes-box-content').toggleClass('hover');
    });
    $('#boxes-box-bug a').hover( function() {
      $('#boxes-box-bug .boxes-box-content').toggleClass('hover');
    });

    // this could be done better....
    $('.front #zone-content .pane-2 a').mouseover(function() { 
      $('.comm-intro').hide();
      $('.get-started').show();
    }).mouseout(function() {
      $('.get-started').hide();
      $('.comm-intro').show();
    });
    $('.front #zone-content .pane-1 a').mouseover(function() { 
      $('.comm-intro').hide();
      $('.get-involved').show();
    }).mouseout(function() {
      $('.get-involved').hide();
      $('.comm-intro').show();
    });


  })

})(jQuery);
