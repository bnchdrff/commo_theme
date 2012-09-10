(function($) {

  // can't be called in doc.ready or onload
  google.load("feeds", "1");

  $( document ).ready( function() {

    // Responsive adjustments
    $('body').bind('responsivelayout', function(ev, toFro) {
      if (toFro.from == 'mobile' || (toFro.to != 'mobile' && toFro.from === undefined)) {
        // larger than mobile
        var src = $('.logo-img img').attr('src');
        $('.logo-img img').attr('src', src.replace('Commotion_logo_mo.png', 'commotion_kbabout_measure-03.png'));
        if (!$('.region-menu .main-menu').hasClass('sf-menu')) {
          $('.region-menu .main-menu').addClass('sf-menu').addClass('sf-js-enabled').removeClass('menu-mobile');
          $('ul.sf-menu').superfish();
        }
      } else if (toFro.to == 'mobile') {
        // mobile version
        var src = $('.logo-img img').attr('src');
        $('.logo-img img').attr('src', src.replace('commotion_kbabout_measure-03.png', 'Commotion_logo_mo.png'));
        if ($('.region-menu .main-menu').hasClass('sf-menu')) {
          $('.region-menu .main-menu').removeClass('sf-menu').removeClass('sf-js-enabled');
          $('.region-menu .main-menu').unbind().addClass('menu-mobile');
          $('.region-menu .main-menu li').unbind();
          $('.region-menu .main-menu ul').unbind();
          $('.region-menu .main-menu li ul').removeAttr('style');
        }
      }
      $('.logo-img img').fadeIn();
    });

    $(window).resize(function() {
      var intro_height = $('.comm-intro').height();
      $('.equal-height-container').height(intro_height + 20);
    });

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

    // feedback & report buttons hover
    $('#boxes-box-feedback a').hover( function() {
      $('#boxes-box-feedback .boxes-box-content').toggleClass('hover');
    });
    $('#boxes-box-bug a').hover( function() {
      $('#boxes-box-bug .boxes-box-content').toggleClass('hover');
    });

    // front page hover
    $('.front #zone-content .pane-1 a').mouseover(function() { 
      $('.comm-intro').hide();
      $('.get-started').show();
    }).mouseout(function() {
      $('.get-started').hide();
      $('.comm-intro').show();
    });
    $('.front #zone-content .pane-2 a').mouseover(function() { 
      $('.comm-intro').hide();
      $('.get-involved').show();
    }).mouseout(function() {
      $('.get-involved').hide();
      $('.comm-intro').show();
    });

  })

})(jQuery);
