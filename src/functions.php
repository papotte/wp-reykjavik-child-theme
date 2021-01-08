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

function c_social_links_icons()
{

    return array(
        'podcasts.apple.' => 'apple',
        'podcasts.google.' => 'gpodcasts',
        'behance.net' => 'behance',
        'bitbucket.org' => 'bitbucket',
        'codepen.io' => 'codepen',
        'deviantart.com' => 'deviantart',
        'digg.com' => 'digg',
        'docker.com' => 'dockerhub',
        'dribbble.com' => 'dribbble',
        'dropbox.com' => 'dropbox',
        'facebook.com' => 'facebook',
        'flickr.com' => 'flickr',
        'foursquare.com' => 'foursquare',
        'plus.google.' => 'google-plus',
        'google.' => 'google',
        'github.com' => 'github',
        'instagram.com' => 'instagram',
        'linkedin.com' => 'linkedin',
        'mailto:' => 'envelope',
        'medium.com' => 'medium',
        'paypal.com' => 'paypal',
        'pscp.tv' => 'periscope',
        'tel:' => 'phone',
        'pinterest.com' => 'pinterest',
        'getpocket.com' => 'get-pocket',
        'reddit.com' => 'reddit',
        '/feed' => 'rss',
        'skype.com' => 'skype',
        'skype:' => 'skype',
        'slack.com' => 'slack',
        'slideshare.net' => 'slideshare',
        'snapchat.com' => 'snapchat',
        'soundcloud.com' => 'soundcloud',
        'spotify.com' => 'spotify',
        'stackoverflow.com' => 'stack-overflow',
        'stumbleupon.com' => 'stumbleupon',
        'trello.com' => 'trello',
        'tripadvisor.' => 'tripadvisor',
        'tumblr.com' => 'tumblr',
        'twitch.tv' => 'twitch',
        'twitter.com' => 'twitter',
        'vimeo.com' => 'vimeo',
        'vine.co' => 'vine',
        'vk.com' => 'vk',
        'wa.me' => 'whatsapp',
        'wordpress.org' => 'wordpress',
        'wordpress.com' => 'wordpress',
        'xing.com' => 'xing',
        'yelp.com' => 'yelp',
        'youtube.com' => 'youtube',
    );

} // /social_links_icons
add_action('after_setup_theme', 'c_turnoff_social_icons');

function c_turnoff_social_icons()
{
    remove_filter('wmhook_reykjavik_svg_get_social_icons', __CLASS__ . '::social_links_icons');
    add_filter('wmhook_reykjavik_svg_get_social_icons', __CLASS__, 'c_social_links_icons');
}

