<?php
/**
 * The Header for our theme.
 */
  $settings = get_option( "ntl_theme_settings" );
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php wp_title(); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" /> 
<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/musicstyles/musicplayer.css" />
<link class="schanger" rel="stylesheet"  href="<?php echo get_template_directory_uri(); ?>/styles/<?php echo $settings['ntl_theme_bg']; ?>.css" type="text/css" />


<?php if ($settings['ntl_disable_audio'] != 'off') { ?>
<style type="text/css">
	div.innertab { background:#333; opacity:0.15; filter:alpha(opacity=15); } 
	span.mp3-finding, span.mp3-loading { opacity:1; filter:alpha(opacity=100); } 
	div.img_mp3j a:hover img { border-color:#34A2D9; } 
	span.mp3j-link-play, span.textbutton_mp3j:hover, div.transport-MI div { color:#768D99; } 
	span.mp3j-link-play:hover, span.textbutton_mp3j, div.transport-MI div:hover { color:#34A2D9; }
</style>

<script type="text/javascript"><!--
	var foxPP_indicator_tint = '#5CC9FF'; 
	var foxPP_screentext = '#525252'; 
	var foxPP_playlist_img = 'url("<?php echo get_template_directory_uri(); ?>/images/pl-darken1.png") repeat-x left 0px'; 
	var foxPP_playlist_colour = '#fafafa'; 
	var foxPP_playlist_opac = '1'; 
	var foxPP_playlist_text = '#525252'; 
	var foxPP_playlist_current = '#34A2D9'; 
	var foxPP_playlist_hover = '#768D99'; 
	var foxPP_playlist_divider = 'transparent; background-image:none';
	var foxPP_screen_background = '#333'; 
	var foxPP_screen_opac = '0.15'; 
	var foxPP_loader_bar_colour = '#34A2D9'; 
	var foxPP_loader_bar_opac = '0.7'; 
	var foxPP_posbar_colour = '#5CC9FF url("<?php echo get_template_directory_uri(); ?>/images/posbar-darken2-2.png") repeat-y right top'; 
	var foxPP_posbar_opac = '1'; 
	var foxPP_listBGa_hover = 'transparent '; 
	var foxPP_listBGa_current = 'transparent url("<?php echo get_template_directory_uri(); ?>/images/t40w.png") repeat';
//-->
</script>
<script type="text/javascript"><!--
	var popup_width = 450; 
	var silence_mp3 = "<?php echo get_template_directory_uri(); ?>/media/silence.mp3"; 
	var foxPP_bodycolour = "#fff"; 
	var foxPP_bodyimg = ""; var 
	foxPP_stylesheet = "<?php echo get_template_directory_uri(); ?>/musicstyles/player.css"; 
	var foxPP_fixedcss = "false"; 
	var popup_maxheight = "600";
//-->
</script>
<?php } ?>

<?php
if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' );
wp_enqueue_script( 'jquery' );
?>

<?php
wp_head();
?>


<?php if ($settings['ntl_disable_audio'] != 'off') { ?>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jfunc.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jplay.js"></script>
<?php } ?>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-55675421-1', 'auto');
  ga('send', 'pageview');

</script>
</head>


<body <?php body_class(); ?> >
    <!-- Adding the menu & logo -->
	<div class="mainlogo timerhide">
		<div class="container clear">
			<div id="access" role="navigation">
			<?php wp_nav_menu( array( 'container_class' => 'menu-header', 'theme_location' => 'primary' ) );  ?>
			</div>
			<a class="logo" href="<?php echo home_url(); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><img class="logoimg" src="<?php echo $settings['ntl_theme_logo']; ?>"></a>	
		</div>	
	</div>	
	
	
	
	<!-- Getting the slideshow above the menu -->
	
	<?php if ($settings['ntl_slide_type'] === 'content') { ?>
	<!-- Netlabs functions for adding the slideshow -->
	<?php if (is_home()){ ?>
	<div class="container clear slidecontainer">
			<?php lets_get_slideshow(); ?>
			
	</div>
	<?php } } ?>