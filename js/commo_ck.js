/**
 * @file
 * Javascript for commo_kb_page nodes
 */

(function($) {

Drupal.behaviors.commo_kb_pdflink = {
  attach: function(context, settings) {
    // create sidebar block, two times!
    $('#region-sidebar-second .region-inner', context).once(function() {
      var pdf_link = $('.commo_ck-download-pdf-link', context).remove();
      var contact_link = $('.commo_ck-send-feedback', context).remove();
      var links = $('<section class="commo_ck-links block" />');
      links.append($(pdf_link));
      links.append(contact_link);
      $(this).append(links);
    });
  }
};

})(jQuery);
