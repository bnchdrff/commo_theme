(function($) {

  // can't be called in doc.ready or onload
  //google.load("feeds", "1");

  $( document ).ready( function() {
    var justLoaded = true;
    $.getStarted = {};
    $.getStarted.context = ( $('body').hasClass('page-get-started') || $('body').hasClass('page-get-involved') ) ? $('#block-system-main .view-get-started:eq(0)') : null;
    // Disable bg swap on Get Involved and for <IE 7
    if (($.browser.msie && parseInt($.browser.version, 10) <= 7) || $('.view-get-started').hasClass('view-display-id-page_1')) {
      $.getStarted.bgSwap = false;
    } else {
      $.getStarted.bgSwap = true;
    }


    // Responsive adjustments
   
    $('body').bind('responsivelayout', function(ev, toFro) {
      if (toFro.from == 'mobile' || (toFro.to != 'mobile' && toFro.from === undefined)) {
        // larger than mobile

      //  var $logo = $('#logo');
      //  var src = $logo.attr('src');
      //  $logo.attr('src', src.replace('Commotion_logo_mo.png', 'commotion_kbabout_measure-03.png')).fadeIn(0);

	if (!$('#region-menu .main-menu').hasClass('sf-menu')) {
          $('#region-menu .main-menu').addClass('sf-menu').addClass('sf-js-enabled').removeClass('menu-mobile');
          $('#region-menu ul.sf-menu').superfish();
        }
        if ($.getStarted.context) {
          if ($.getStarted.bgSwap) {
            // Load background images on Get Started.
            $('.frame .background', $.getStarted.context).each( function(i, el) {
              var full_bg = $(el).data('full');
              $(el).attr('src', full_bg + "?nocache=" + new Date().getTime()).fadeIn(0);
              $(el).removeClass('mobile');
            });
          }
          $('.attachment-before', $.getStarted.context).show();
        }
      } else if (toFro.to == 'mobile') {
        // mobile version

       // var $logo = $('#logo');
       // var src = $logo.attr('src');
       // $logo.attr('src', src.replace('commotion_kbabout_measure-03.png', 'Commotion_logo_mo.png')).fadeIn(0);

       if ($('#region-menu .main-menu').hasClass('sf-menu')) {
          $('#region-menu .main-menu').removeClass('sf-menu').removeClass('sf-js-enabled');
          $('#region-menu .main-menu').unbind().addClass('menu-mobile');
          $('#region-menu .main-menu li').unbind();
          $('#region-menu .main-menu ul').unbind();
          $('#region-menu .main-menu li ul').removeAttr('style');
        }
        if ($.getStarted.context) {
          if ($.getStarted.bgSwap) {
            // Get Started, swap in mobile version.
            $('.frame .background', $.getStarted.context).each( function(i, el) {
              var mobile_bg = $(el).data('mobile');
              $(el).attr('src', mobile_bg + "?nocache=" + new Date().getTime()).fadeIn(0);
              $(el).addClass('mobile');
            });
          } else {
            // Hack-ish to default to full on IE7 Get STarted.
            if ($.browser.msie && parseInt($.browser.version, 10) <= 7 && $('.view-get-started').hasClass('view-display-id-page')) {
              $('.frame .background', $.getStarted.context).each( function(i, el) {
                var mobile_bg = $(el).attr('hidden');
                $(el).attr('src', mobile_bg + "?nocache=" + new Date().getTime()).fadeIn(0);
              });
            }
          }
          $('.attachment-before', $.getStarted.context).hide();
        }
      }
      // Skip to slide. Needs to happen after mobile jazz.
      if (justLoaded && $.getStarted.context) {
        justLoaded = false;
        anchors = [];
        $('.frame-anchor', $.getStarted.context).each( function(index, anchor) {
          anchors.push('#' + $(anchor).attr("name"));
        });
        $.getStarted.anchors = anchors;
        scrollToFrame($.param.fragment(), true);
      }
    });

    $(window).resize(function() {
      var intro_height = $('.comm-intro').height();
      $('.equal-height-container').height(intro_height + 20);
    });


//    function getRSS() {
//     var feed_url = 'https://code.commotionwireless.net/activity.atom';
//      var feed = new google.feeds.Feed(feed_url);
//      feed.setNumEntries(4); // specify number of entries to load
//      feed.load(function(result) {
//        if (!result.error) {
//          var container = $('#recent-activity-container');
//          var output = '<ul class="rss-feed-items">';
//          for (var i = 0; i < result.feed.entries.length; i++) {
//            var entry = result.feed.entries[i];
//            output += '<li><a target="_blank" href="' + entry.link + '" title="' + entry.title + '">' + entry.title + '</a>';
//            if (entry.author.length > 0) {
//              output += ' - ' + entry.author;
//            }
//            if (entry.publishedDate.length > 0) {
//              var date = $.timeago(new Date(entry.publishedDate));
//              output += ' - <span class="git-date" title="' + date + '" >' + date + '</div>';
//            }
//            output += '</li>';
//          }
//          output += '</ul>';
//          container.append(output);
//        }
//      });
//    }
//    #if ( $('#recent-activity-container').length > 0) {
//	    #  google.setOnLoadCallback(getRSS);
//	    #}

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
    if ($.getStarted.context) {
      function scrollToFrame(frame, push) {
        // If no frame or invalid frame specified in hash, default to first.
        if (frame.charAt(0) != '#') {
          frame = '#' + frame;
        }
        if ($.inArray(frame, $.getStarted.anchors) == -1) {
          frame = $.getStarted.anchors[0];
        }

        $('html, body').stop(true, true).animate({
          scrollTop: $(frame).offset().top
        }, 1500,'easeInOutExpo', function () {
          // Update state if necessary.
          if (push) {
            $.bbq.pushState(frame, 2);
          }
        });
      }
      // Animate Nav popouts.
      $('.attachment .frame-button a.frame-nav-number', $.getStarted.context).hover(function() {
        $(this).stop('false', 'true').animate({width: '200px'}).addClass('active');
        $(this).siblings('.frame-button-title').stop('false', 'true').animate({width: '100%'});
      }, function() {
        $(this).delay('500').animate({width: '15px'}, 800, 'swing', function() {
          $(this).removeClass('active');
        });
        $(this).siblings('.frame-button-title').delay('500').animate({width: '0%'});
      });

      $(window).bind('hashchange', function(e) {
        scrollToFrame($.param.fragment(), false);
      });

      $('.attachment .frame-button a', $.getStarted.context).bind('click', function(event){
        event.preventDefault();
        var anchor = $(this).attr('href');
        scrollToFrame(anchor, true);
      });
      // Fix the nav buttons when appropriate.
      $.fn.fixer = function(pos) {
         var $fixed = $(this);
         if (typeof $fixed != 'object') {
           return;
         }
         var fixedTop = '0';
         var fixedHeight = $fixed.height();
         var zoneBegin = $('#zone-content-wrapper').offset().top;
         if ($(window).scrollTop() > zoneBegin) {
           $fixed.css('top', fixedTop);
           $fixed.addClass('fixed');
         }

         $(window).scroll(function(event) {
           $footer = $("#section-footer");
           var footerTop = $footer.position().top - pos;
           var scrollTop = $(window).scrollTop();
           var frameHeight = $('.views-row-1 .background', $.getStarted.context).height();
           // Nav buttons positioning.
           if (scrollTop > zoneBegin) {
             $fixed.addClass('fixed');
             var topPosition = Math.max(0, fixedTop - scrollTop);
             topPosition = Math.min(topPosition, (footerTop - scrollTop) - fixedHeight);
             $fixed.css('top', topPosition);
           } else {
             $fixed.removeClass('fixed');
             $fixed.css('top', 0);
           }
           // Show Nav button as active if Frame is visible.
           $('.frame-anchor', $.getStarted.context).each( function() {
             var anchorTop = $(this).offset().top;
             var frameId = $(this).attr('id');
             if ((anchorTop - 50 < scrollTop) && (anchorTop + frameHeight - 51 > scrollTop)) {
               $('.attachment a.' + frameId, $.getStarted.context).addClass('active-frame');
             } else {
               $('.attachment a.' + frameId, $.getStarted.context).removeClass('active-frame');
             }

           });
         });
      };
      $('.attachment', $.getStarted.context).fixer(300);

    }

  })

})(jQuery);
