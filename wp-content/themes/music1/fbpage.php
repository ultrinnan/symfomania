<?php
/**
 * The template for displaying about page with members
 *
 *
 */

/**
 Template Name: facebookpage
 */

require 'facebook.php';

$settings = get_option( "ntl_theme_settings" );

$facebook = new Facebook(array(
  'appId'  => $settings['ntl_facebook_api'],
  'secret' => $settings['ntl_facebook_secret'],
  'cookie' => true,
));

?>


<!doctype html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
  <head>
    <title><?php wp_title(); ?></title>
    <link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/fstyle.css?<?php echo time()?>" />
    <link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/musicstyles/musicplayer.css" />
    <link class="schanger" rel="stylesheet"  href="<?php echo get_template_directory_uri(); ?>/styles/f<?php echo $settings['ntl_theme_bg']; ?>.css" type="text/css" />
    
    <style type="text/css">
		div.innertab { background:#333; opacity:0.15; filter:alpha(opacity=15); } 
		div.playlist-colour { background: #282521; }
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
		var foxPP_listBGa_hover = 'transparent url("<?php echo get_template_directory_uri(); ?>/images/t30w.png") repeat'; 
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
       
    <script src="<?php echo home_url(); ?>/wp-includes/js/jquery/jquery.js" type="text/javascript"></script>
    <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery.jplayer.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/mp3j-functions.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/mp3-jplayer.js"></script>
    
    
    <?php
    $thevfont = str_replace(' ','+', $settings['ntl_font_primary']);
	$thesfont = str_replace(' ','+', $settings['ntl_font_secondary']);	
	$familycode = $settings['ntl_font_primary'];
	$familycode2 = $settings['ntl_font_secondary']; 
	?>
	<link href="http://fonts.googleapis.com/css?family=<?php echo $thevfont; ?>&v2" rel="stylesheet" type="text/css">
	<link href="http://fonts.googleapis.com/css?family=<?php echo $thesfont; ?>&v2" rel="stylesheet" type="text/css">
	<style>
	.smallfont, .songname, .songartist, .widget_netlabs_fpnews_widget h4, .widget_netlabs_fpnews_widget a, .singletweet_widget a{ font-family: '<?php echo $familycode2; ?>', arial, serif; font-weight: bold; }
	ul#header_menu a, .vfont, span.cdayname{ font-family: '<?php echo $familycode; ?>', arial, serif; font-weight: bold; }
	</style>
	
	<style>

		
		ul.morenews li a:hover, ul.morenews li a.current, ul.xoxo .widget-title, .latestnews_widget a, .singletweet_widget p a, div.jp-play-time, .latestnews_widget a
		{color: <?php echo $settings['ntl_theme_color']; ?>;}
		 .btitle, .gotocal a{background: <?php echo $settings['ntl_theme_color']; ?>;}
			
	</style>
	
	<!--[if IE 7.0]>
	<style>
		ul.morenews li a{line-height: 30px;}
	</style>
 	<![endif]-->
	
	<?php if ($settings['ntl_facebook_previewmode'] == "off") { ?>
	<style>html {height: 100%;overflow: hidden; /* Hides scrollbar in IE */}</style>
	<?php } ?>
		
  </head>
<body>
<div id="outer">
	
	
	<div id="menubg" class="clear">
		<div class="fbmenu">
			<?php if(has_nav_menu('facebook')){		
				wp_nav_menu( array( 'menu_class' => 'menu', 'menu_id' => 'header_menu', 'theme_location' => 'facebook', 'container' => '' ) );
			} ?>
			<?php if($settings['ntl_fb_showplayer']!= 'off'){ ?>
				<?php echo lets_get_musicplayer();  ?>
			<?php } ?>	
			<div class="clear"></div>
		</div>		
	</div>
	
	
	<?php  $post_thumbnail_id = get_post_thumbnail_id( $post_id ); 
	$aimg = wp_get_attachment_image_src( $post_thumbnail_id, 'full', $icon );?> 
	
	
	
	<div id="fbbody" style="background: url(<?php echo $aimg[0]; ?>) top center;">
		<div class="clear"></div>
		<a class="logo clear" href="<?php echo home_url(); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><img class="logoimg" src="<?php echo $settings['ntl_theme_logo']; ?>"></a>	
		<div class="clear"></div>
		<ul class="morenews"></ul>				
	</div>
	
	
	<div id="fbbottomouter">
		<div id="fbbottom">
		
			<?php if ( is_active_sidebar( 'fbleft' ) ) : ?>	
				<div id="primary" class="fbleft widget-area" role="complementary">					
					<ul class="xoxo">	
						<?php dynamic_sidebar( 'fbleft' ); ?>
					</ul>
				</div>
			<?php endif; ?>			
		</div>
	</div>
</div>


<div id="fb-root"></div>


<script src="http://connect.facebook.net/en_US/all.js"></script>
<script>
	FB.init({
 		appId  : '<?php echo $settings['ntl_facebook_api']; ?>',
 		status : true, // check login status
 		cookie : true, // enable cookies to allow the server to access the session
 		xfbml  : true// parse XFBML
 	});
 	FB.Canvas.setAutoResize(7);
</script>
 
 
<script type="text/javascript">
	jQuery(document).ready(function($) {
		ajax_url = '<?php echo admin_url("admin-ajax.php"); ?>';
		base_url = '<?php echo home_url(); ?>';
		ssl_url = '<?php echo $settings['ntl_facebook_ssl']; ?>';
		btpath = '<?php echo get_template_directory_uri(); ?>/images/';
		surl = '<?php echo get_template_directory_uri(); ?>/js/';
		<?php if ( $settings['ntl_auto_play'] != 'off') { ?>
		autop = true;
		<?php } else { ?>
		autop = false;	
		<?php } ?>	
	});			
</script>



<?php if ($settings['ntl_disable_audio'] != 'off') { ?>
<script type="text/javascript"><!--
	var foxpathtoswf = "<?php echo get_template_directory_uri(); ?>/js";
	var foxpathtoimages = "<?php echo get_template_directory_uri(); ?>/images/";
	var FoxAnimSlider = false;
	var fox_playf = "true";
//--></script>
<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/jquery.ui.core.min.js'></script>
<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/jquery.ui.widget.min.js'></script>
<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/jquery.ui.mouse.min.js'></script>
<script type='text/javascript' src='<?php echo get_template_directory_uri(); ?>/js/jquery.ui.slider.min.js'></script>
<?php } ?>


<script src="<?php echo get_template_directory_uri(); ?>/js/fcustoms.js" type="text/javascript"></script>



</body>
</html>