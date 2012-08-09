<?php

function kb_alpha_preprocess_page(&$vars) {
  drupal_add_js('https://www.google.com/jsapi', 'external');
  drupal_add_js(drupal_get_path('theme', 'kb') .'/js/jquery.timeago.js');

}
