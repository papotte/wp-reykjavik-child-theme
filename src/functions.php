<?php
// Exit if accessed directly
if (!defined('ABSPATH')) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if (!function_exists('chld_thm_cfg_locale_css')):
    function chld_thm_cfg_locale_css($uri)
    {
        if (empty($uri) && is_rtl() && file_exists(get_template_directory() . '/rtl.css'))
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter('locale_stylesheet_uri', 'chld_thm_cfg_locale_css');

function hap_hide_the_archive_title($title)
{
// Skip if the site isn't LTR, this is visual, not functional.
// Should try to work out an elegant solution that works for both directions.
    if (is_rtl()) {
        return $title;
    }
// Split the title into parts so we can wrap them with spans.
    $title_parts = explode(': ', $title, 2);
// Glue it back together again.
    if (!empty($title_parts[1])) {
        $title = wp_kses(
            $title_parts[1],
            array(
                'span' => array(
                    'class' => array(),
                ),
            )
        );
        $title = '<span class="screen-reader-text">' . esc_html($title_parts[0]) . ': </span>' . $title;
    }
    return $title;
}

add_filter('get_the_archive_title', 'hap_hide_the_archive_title');
