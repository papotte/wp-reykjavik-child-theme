<?php
/**
 * Page intro container
 *
 * @package    Reykjavik
 * @copyright  WebMan Design, Oliver Juhas
 *
 * @since    1.0.0
 * @version  1.0.0
 */


// Helper variables

$class = (is_singular()) ? ('entry-header') : ('page-header');

$secondary_class = (is_front_page()) ? ('mb-none intro-container-page') : ('intro-container');
$wrapper_class = (is_front_page()) ? ('simple-intro content-area') : ('intro');

?>

<section id="intro-container" class="<?php echo esc_attr($class); ?> <?php echo esc_attr($secondary_class); ?>">

    <?php get_sidebar('intro'); ?>

    <div id="intro" class="<?php echo esc_attr($wrapper_class); ?>">
        <div class="intro-inner">
            <?php do_action('wmhook_reykjavik_intro'); ?>
        </div>
    </div>

</section>
