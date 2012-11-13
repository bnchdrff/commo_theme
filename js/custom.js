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
        // Load background images on Get Started
        $('.frame .background').each( function(i) {
          var full_bg = $(this).data('full');
          $(this).attr('src', full_bg);
          $(this).removeClass('mobile');
          $('.attachment-before').show();
        });
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
        $('.frame .background').each( function(i) {
          var mobile_bg = $(this).data('mobile');
          $(this).attr('src', mobile_bg);
          $(this).addClass('mobile');
          $('.attachment-before').hide();
        });
     }
      $('.logo-img img').fadeIn();
    });

    $(window).resize(function() {
      var intro_height = $('.comm-intro').height();
      $('.equal-height-container').height(intro_height + 20);
    });

    function getRSS() {
      var feed_url =
      'https://code.commotionwireless.net/activity.atom';
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

    // Get Started
    $('.view-get-started.view-display-id-page .attachment .frame-button a').hover(function() {
      $(this).stop().animate({width: '100%'});
    }, function() {
      $(this).delay('800').animate({width: '15px'});
    });

    $('.view-get-started .attachment .frame-button a').bind('click', function(event){
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500,'easeInOutExpo');
        event.preventDefault();
    });
    $.fn.fixer = function(pos) {
       var $fixed = $(this);
       var fixedTop = $fixed.position().top;
       var fixedHeight = $fixed.height();
       $footer = $("#section-footer");
       var footerTop = $footer.position().top - pos;

       $(window).scroll(function(event) {
         var scrollTop = $(window).scrollTop();
         if (scrollTop > 300) {
           $fixed.addClass('fixed');
           var topPosition = Math.max(0, fixedTop - scrollTop);
           topPosition = Math.min(topPosition, (footerTop - scrollTop) - fixedHeight);
           $fixed.css('top', topPosition);
         } else {
           $fixed.removeClass('fixed');
         }
       });
    };
    $('.view-get-started .attachment').fixer(300);

    // Download page source code button
    $('#openwrt-source-btn').click(function() {
      $('#openwrt-source').slideToggle();
    });

  })

})(jQuery);
