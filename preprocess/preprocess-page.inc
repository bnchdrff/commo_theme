<?php

function kb_alpha_preprocess_page(&$vars) {
  drupal_add_js('https://www.google.com/jsapi', 'external');
  drupal_add_js(drupal_get_path('theme', 'kb') .'/js/jquery.timeago.js');
  drupal_add_css(drupal_get_path('theme', 'kb') . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE'), 'preprocess' => FALSE));

  if (arg(0) == 'get-started' || arg(0) == 'get-involved') {
    drupal_add_js(drupal_get_path('theme', 'kb') . '/js/jquery.easing.1.3.js');
    drupal_add_js(drupal_get_path('theme', 'kb') . '/js/jquery.ba-bbq.js');
  }
}
