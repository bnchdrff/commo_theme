<?php

function kb_alpha_preprocess_node(&$vars) {

  if ($vars['type'] == 'project_page') {
    drupal_add_js(drupal_get_path('theme', 'kb') .'/js/js_feed_pull.js');
  }

}
