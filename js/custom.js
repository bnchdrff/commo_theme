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
    if ($('body').hasClass('page-get-started') || $('body').hasClass('page-get-involved')) {
      $('.view-get-started.view-display-id-page .attachment .frame-button a.frame-nav-number').hover(function() {
        $(this).stop('false', 'true').animate({width: '200px'}).addClass('active');
        $(this).siblings('.frame-button-title').stop('false', 'true').animate({width: '100%'});
      }, function() {
        $(this).delay('500').animate({width: '15px'}, 800, 'swing', function() {
          $(this).removeClass('active');
        });
        $(this).siblings('.frame-button-title').delay('500').animate({width: '0%'});
      });

      $(window).bind('hashchange', function(e) {
        var anchor = '#' + $.param.fragment();
        console.log(e);
        console.log(anchor + ' at ' + $(anchor).offset().top + ' , window: ' + $(window).scrollTop());
        $('html, body').stop(true, true).animate({
          scrollTop: $(anchor).offset().top
        }, 1500,'easeInOutExpo');
      });

      $('.view-get-started .attachment .frame-button a').bind('click', function(event){
        event.preventDefault();
        var anchor = $(this).attr('href');
        $('html, body').stop(true, true).animate({
          scrollTop: $(anchor).offset().top
        }, 1500,'easeInOutExpo', function () {
          $.bbq.pushState(anchor, 2);
        });
      });
      $.fn.fixer = function(pos) {
         var $fixed = $(this);
         var fixedTop = $fixed.position().top;
         var fixedHeight = $fixed.height();

         $(window).scroll(function(event) {
           $footer = $("#section-footer");
           var footerTop = $footer.position().top - pos;
           var scrollTop = $(window).scrollTop();
           var frameHeight = $('.views-row-1 .background').height();
           // Nav buttons positioning.
           if (scrollTop > 300) {
             $fixed.addClass('fixed');
             var topPosition = Math.max(0, fixedTop - scrollTop);
             topPosition = Math.min(topPosition, (footerTop - scrollTop) - fixedHeight);
             $fixed.css('top', topPosition);
           } else {
             $fixed.removeClass('fixed');
             $fixed.css('top', 0);
           }
           // Show Nav button as active if Frame is visible.
           $('.frame-anchor').each( function() {
             var anchorTop = $(this).offset().top;
             var frameId = $(this).attr('id');
             var frameNum = frameId.substr(frameId.length - 1);
             if ((anchorTop - 50 < scrollTop) && (anchorTop + frameHeight - 50 > scrollTop)) {
               $('.attachment .views-row-' + frameNum + ' a').addClass('active-frame');
             } else {
               $('.attachment .views-row-' + frameNum + ' a').removeClass('active-frame');
             }

           });
         });
      };
      $('.view-get-started .attachment').fixer(300);

      // Download page source code button
      $('#openwrt-source-btn').click(function() {
        $('#openwrt-source').slideToggle();
      });
    }

  })

})(jQuery);
