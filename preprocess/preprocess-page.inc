<?php

function kb_alpha_preprocess_page(&$vars) {
  drupal_add_js('https://www.google.com/jsapi', 'external');
  drupal_add_js(drupal_get_path('theme', 'kb') .'/js/jquery.timeago.js');

  if (arg(0) == 'get-started' || arg(0) == 'get-involved') {
    drupal_add_js(drupal_get_path('theme', 'kb') . '/js/jquery.easing.1.3.js');
    drupal_add_js(drupal_get_path('theme', 'kb') . '/js/jquery.ba-bbq.js');
  }

  // Add special js and css for commo_ck_page nodes.
  if (isset($vars['node']) && $vars['node']->type == 'commo_ck_page') {
    drupal_add_js(drupal_get_path('theme', 'kb') . '/js/commo_kb.js', 'file');
    //drupal_add_js(array('commo_ck' => $settings), 'setting');
    $vars['scripts'] = drupal_get_js();
    drupal_add_css(drupal_get_path('theme', 'kb') . '/css/commo_kb.css');
    $vars['styles'] = drupal_get_css();
    // set title
    $vars['page']['content']['preface']['preface_first']['boxes_page_title']['content']['#markup'] = "<div id='boxes-box-page_title' class='boxes-box'><div class='boxes-box-content'><hr /><h1 id='page-title' class=page_title'>Commotion Construction Kit</h1></div></div>";
  }
}
