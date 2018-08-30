jQuery(document).ready(function($) {
			
	if ($("#bgimg").length != 0) { 
	 $(window).load(function() {
        $('.imgloader').hide();			
		$('#bgimg').fadeIn('fast');
    });
  } else {
  	$('.imgloader').hide();
  }
   
   resizeBg();  
	
	var the2Window     = $(window);
	
	
	function resizeBg() {
		    var imgwidth = $('#bgimg').width();
      		var imgheight = $('#bgimg').height();
 			var winwidth = $(window).width();
      		var winheight = $(window).height();
 
      		var widthratio = winwidth / imgwidth;
      		var heightratio = winheight / imgheight;
 
      		var widthdiff = heightratio * imgwidth;
      		var heightdiff = widthratio * imgheight;
      		
      	if(heightdiff>winheight) {
        $('#bgimg').css({
          width: winwidth+'px',
          height: heightdiff+'px'
        });
      } else {
       $('#bgimg').css({
          width: widthdiff+'px',
          height: winheight+'px'
        });		
      }
    }

    the2Window.resize(function() {
    	  resizeBg(); 
    }).trigger("resize");	
	
	// *************************** gallery *********************************
	
	$('.galinvoke').click(function() {
			$('.gallerytop').css('top', '0');
			$('a.galclose').show();
			$('.gloading').show();
			$('.galleryframe').css('bottom', '0');
			$('.goverlay').fadeIn('slow').find('.gloading').show();
			$('img.goleft').fadeIn('slow');
			$('img.goright').fadeIn('slow');
			var galno = $(this).attr('rel');
			var data = {action: 'netlabs_get_ajaxdata', type: 'get_photogal', gallery:galno};
			$.post(ajax_url, data, function(response) {	
				$('.galleryinside').html(response);
				$('.gallerysmallframe').each(function() {
					$(this).unbind('click').bind('click', myloader);
				});
				var firstimage = $('.gallerysmallframe:first').attr('rel');
				var firsttitle = $('.gallerysmallframe:first').attr('title');
				var img = new Image();
				$(img).bind('load', function() {			
					$('.goverlay').prepend(this);
					$(img).css('margin-top', Math.floor(((($(window).height()) - 140 - (($(img).height()+20)))/2)+40) + 'px');
					var offset = $(img).offset();
					var owidth = $(img).width()
					$('a.galclose').css('left' , (offset.left + owidth ) + 'px');
					$('a.galclose').css('top' , Math.floor(((($(window).height()) - 140 - (($(img).height()+20)))/2)+20) + 'px');
					$('p.gallerytitle').css('top' , Math.floor(((($(window).height()) - 140 + (($(img).height()+20)))/2)+20) + 'px');
					if ($(img).height() > $(window).height()) {
						$(img).css('height', ($(window).height() * 0.7) + 'px');
						$(img).css('width','auto');
						$('a.galclose').css('top' , Math.floor(((($(window).height()) - 140 - (($(window).height() * 0.7)+20))/2)+80) + 'px');
						$(img).css('margin-top', Math.floor(((($(window).height()) - 140 - (($(window).height() * 0.7)+20))/2)+40) + 'px');
					}
				}).attr('src', firstimage);
				var n = $('.gallerysmallframe').length;
				if (n < 9) {
				var margincall = (978 - (n*102))/2;
				} else {
					$('.galleryinside').css('width', n * 102 + 'px');
					$('.insideright').show();
				}
				$('.gallerysmallframe:first').css('margin-left', margincall + 'px');
				$('.gloading').hide();	
				$('p.gallerytitle').html(firsttitle);
			});
		});
		
		
		$('.galclose').click(function() {
			$('a.galclose').css('top','-10000px');
			$('.galleryframe').animate({'bottom': '-=100000'}, 1000)
			$('.goverlay').fadeOut('slow');
			$('.galleryinside').html('');
			$('.insideright').hide();
			$('.insideleft').hide();
			$('.galleryover').find('img.goleft').fadeOut('slow');
			$('.galleryover').find('img.goright').fadeOut('slow');
			$('.goverlay img').remove();
			$('p.gallerytitle').html('');
			return false;
		});
		
		$('.insideright').click(function() {
			var wholewidth = $('.galleryinside').width();
			var currposs = $('.galleryinside').position();
			var theabs = Math.abs(currposs.left);
			var onelength = 918;
			var tomove = (wholewidth - onelength - theabs);
			if (tomove > onelength) {
				$('.galleryinside').animate({left: '-=' + onelength}, 1000);
				$('.insideleft').show();
			} else {
				$('.galleryinside').animate({left: '-=' + tomove}, 1000);
				$('.insideleft').show();
				$('.insideright').hide();
			}
			return false;
		});
		
		$('.insideleft').click(function() {
			var wholewidth = $('.galleryinside').width();
			var currposs = $('.galleryinside').position();
			var theabs = Math.abs(currposs.left);
			var onelength = 918;
			if (theabs > onelength) {
				$('.galleryinside').animate({left: '+=' + onelength}, 1000);
				$('.insideright').show();
			} else {
				$('.galleryinside').animate({left: '+=' + theabs}, 1000);
				$('.insideleft').hide();
				$('.insideright').show();
			}
			return false;
		});
		
		
		$('.goleft').click(function() {
			var imginfo = $('.goverlay img').prop('src');			
			var reltarget = $('.gallerysmallframe[rel^="' + imginfo  + '"]');
			var next =  reltarget.next('.gallerysmallframe').length ? reltarget.next('.gallerysmallframe'): $('.gallerysmallframe:first');
			var relsend = $(next).attr('rel');
			var reltitle = $(next).attr('title');
			loadNewimg(relsend,reltitle);			
		});
		
		$('.goright').click(function() {
			var imginfo = $('.goverlay img').prop('src');			
			var reltarget = $('.gallerysmallframe[rel^="' + imginfo  + '"]');
			var next =  reltarget.prev('.gallerysmallframe').length ? reltarget.prev('.gallerysmallframe'): $('.gallerysmallframe:last');
			var relsend = $(next).attr('rel');
			var reltitle = $(next).attr('title');
			loadNewimg(relsend,reltitle);			
		});
		
		
		function myloader() {	
			var theclicker = $(this);
			var trel = $(theclicker).attr('rel');
			var ttitle = $(theclicker).attr('title');
			loadNewimg(trel,ttitle);	
		}
		

		function loadNewimg(trel, ttitle) {			
			cleanup();
			var img = new Image();
			$(img).bind('load', function() {			
				$('.goverlay').prepend(this);
				$(img).css('margin-top', Math.floor(((($(window).height()) - 140 - (($(img).height()+20)))/2)+40) + 'px');
				var offset = $(img).offset();
				var owidth = $(img).width()
				$('a.galclose').css('top' , Math.floor(((($(window).height()) - 140 - (($(img).height()+20)))/2)+20) + 'px');
				$('a.galclose').css('left' , (offset.left + owidth ) + 'px');
				$('a.galclose').fadeIn(0);
				if ($(img).height() > $(window).height()) {
					$(img).css('height', ($(window).height() * 0.7) + 'px');
					$(img).css('width','auto');
					$('a.galclose').css('top' , Math.floor(((($(window).height()) - 140 - (($(window).height() * 0.7)+20))/2)+80) + 'px');
					$(img).css('margin-top', Math.floor(((($(window).height()) - 140 - (($(window).height() * 0.7)+20))/2)+40) + 'px');
				}
				$('.gloading').hide();	
			}).attr('src', trel);
			$('p.gallerytitle').html(ttitle);
		};
		
		function cleanup() {
			$('.gloading').show();
			$('a.galclose').fadeOut(0);
			$('.goverlay img').remove();
			$('p.gallerytitle').html('');
		}
	
	
	// *************************** background *********************************
	
	
	if ($('.carousels').length) {
		
		var tcount = $('.carousels li').length;
		
		if (tcount == 3){
			$('.carousels ul').css('margin-left','118px');
		}
		
		if (tcount == 2){
			$('.carousels ul').css('margin-left','118px');
			$('.carousels li:first').css('margin-right','237px');
		}
		
		if (tcount == 1){
			$('.carousels ul').css('margin-left','355px');
		}
		
		
	}
	
	
	if (cstyle == 'image') {
	$('.box_skitter_large').skitter({
		interval: cdelay,
		animation: ctrans,
		animateNumberActive: {backgroundColor: ccol, color:'#fff'}
	});
	}
	
	
	$('a.viewlyrics').click(function() {
		var clicker = $(this).attr('rel');
		var clickinfo = $(clicker).html();
		$('.jqmWindow').fadeIn('slow');
		$('.jqminner').html(clickinfo);
		return false;
	});
	
	$('.jqmClose').click(function() {
		$('.jqmWindow').fadeOut('slow');
		$('.jqminner').html('');
		return false;
	});
	
	if ($(".upcomingevents_widget").length != 0) {

		var calofs = $(".upcomingevents_widget");	
		var coffset = calofs.offset();
		var remainder = (the2Window.width() - coffset.left)
		
		if (remainder < the2Window.width()/2 ) {
			$('.widgcontent').css('left','-320px');
		}	
	}
	
	// *************************** video player *********************************
	
	
	$('a.youtubeplayer').click(function() {
		var vidcode = $(this).attr('rel');
		var vidtext= '';
		$('ul#showslide').fadeOut('slow');
		$('.ntlc_prev').fadeOut('slow');
		$('.ntlc_next').fadeOut('slow');
		$('.vidholder').css('height','320px');
		$('.vidholder').css('width','474px');
		$('.vidholder').css('overflow','visible');
		vidtext = '<iframe width="474" height="260" src="http://www.youtube.com/embed/' + vidcode + '" frameborder="0" allowfullscreen allowTransparency="true" ></iframe>';
		$('.vidholder').append(vidtext);
		return false;
	});
	
	$('a.vimeoplayer').click(function() {
		var vidcode = $(this).attr('rel');
		var vidtext= '';
		$('ul#showslide').fadeOut('slow');
		$('.ntlc_prev').fadeOut('slow');
		$('.ntlc_next').fadeOut('slow');
		$('.vidholder').css('height','320px');
		$('.vidholder').css('width','474px');
		$('.vidholder').css('overflow','visible');
		vidtext = '<iframe src="http://player.vimeo.com/video/' + vidcode + '?title=0&amp;byline=0&amp;portrait=0" width="474" height="260" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>';
		$('.vidholder').append(vidtext);
		return false;
	});
	
	
	$('.vidclose').click(function() {
		$('.vidholder iframe').remove();
		$('.vidholder').css('height','0px');
		$('.vidholder').css('width','0px');
		$('.vidholder').css('overflow','hidden');
		$('ul#showslide').fadeIn('slow');
		$('.ntlc_prev').fadeIn('slow');
		$('.ntlc_next').fadeIn('slow');
	});
	
	
	
	
	
	// *************************** video gallery *********************************
	
	$('a.ytlink').click(function() {
		var vidcode = $(this).attr('rel');
		var vidtext= '';
		vidtext = '<iframe width="640" height="400" src="http://www.youtube.com/embed/' + vidcode + '" frameborder="0" allowfullscreen></iframe>';
		$('.vidplayerdiv').html(vidtext);
		return false;
		
	});
	
	$('a.vmlink').click(function() {
		var vidcode = $(this).attr('rel');
		var vidtext= '';
		vidtext = '<iframe src="http://player.vimeo.com/video/' + vidcode + '?byline=0&amp;portrait=0" width="640" height="400" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>';
		$('.vidplayerdiv').html(vidtext);
		return false;
		
	});
	
	
	if ($('.vidstrip').length > 0) {
		var n = $('.vidimg').length;
		$('.vidstripinner').css('width', n*116 +'px');
		if (n >= 8) {
			$('a.vidnext').show();
		} else {
			n = (818 - (n*116))/2;
			$('.vidstripinner').css('margin-left', n +'px');
		}
	}
	
	$('a.vidnext').click(function() {
		var n = $('.vidimg').length;
		var nwidth = n*116;
		var currposs = $('.vidstripinner').position();
		var onelength = 818;
		var theabs = nwidth - Math.abs(currposs.left) - onelength;
			if (theabs > onelength) {
				$('.vidstripinner').animate({left: '-=' + onelength}, 1000);
				$('.vidprev').show();
			} else {
				$('.vidstripinner').animate({left: '-=' + theabs}, 1000);
				$('.vidnext').hide();
				$('.vidprev').show();
			}
		return false;
		
	});
	
	$('a.vidprev').click(function() {
		var n = $('.vidimg').length;
		var nwidth = n*116;
		var currposs = $('.vidstripinner').position();
		var onelength = 818;
		var theabs = Math.abs(currposs.left);
			if (theabs >= onelength) {
				$('.vidstripinner').animate({left: '+=' + onelength}, 1000);
				$('.vidnext').show();
			} else {
				$('.vidstripinner').animate({left: '+=' + theabs}, 1000);
				$('.vidnext').show();
				$('.vidprev').hide();
			}
		return false;
		
	});
	
	
	
	
	// *************************** calendar *********************************
  
  	$('a.plink').live('click', function() {
  		$(this).addClass('currp');
  		ado();
  		return false;
  	});
  	
  	function ado() {
  		$('.imgloader').show();
  		var sender = $('.currp').attr('rel'), 
  			data = { action: 'netlabs_get_ajaxdata', type: 'get_cal', senddata: sender};
		$.post(ajax_url, data, function(response) {	
			$('.calselect').html(response);
			$('.imgloader').hide();
		});
  	}
	
	
	// *************************** calendar show address *********************************
	
	$("form#nets_dirform").live('mouseenter', function() {
		var p = $('span.cvenue');
		var position = p.position();
		$('.theaddress').css('left', position.left - 5 + 'px');
    	$(this).find('.theaddress').fadeIn('slow');
  	}).live('mouseleave', function() {
    	$(this).find('.theaddress').fadeOut('slow');
  	});


	
	// *************************** calendar show more *********************************
	
	
	$('a.cmoreinf').live('click', function() {
		$('.ccontent').each(function() {
			$(this).css('display','none');
		});
		$(this).closest('.calsingleentry').find('.ccontent').css('display','block');
		return false;
	});
	
	// *************************** Carousel *********************************

	
	$('.frontslide').jCarouselLite({
    	btnNext: ".ntlc_next",
    	btnPrev: ".ntlc_prev",
    	visible: 1,
    	auto: cdelay,
    	easing: "easeOutExpo",
    	pauseOnHover: true,
    	speed: 1200
    	
    });
    
    $('.carousel').jCarouselLite({
    	btnNext: ".ntlcc_next",
    	btnPrev: ".ntlcc_prev",
    	easing: "easeInOutCirc",
    	visible: 4,
    	pauseOnHover: true,
    	auto: cdelay,
    	speed: 1000
    	
    });
    
    $('.albmloader').jCarouselLite({
    	btnNext: ".ntlca_next",
    	btnPrev: ".ntlca_prev",
    	easing: "easeInOutCirc",
    	visible: 3,
    	pauseOnHover: true,
    	auto: 100000,
    	speed: 1000
    	
    });
	
	// *************************** tabs *********************************
	
	$('.tab_wrap ul li:first').addClass('current');
	
	$('.tcontentkeeper .tab:first').show();
	
	$('.tab_wrap ul li').click(function() {
		$('.tab_wrap ul li.current').removeClass('current');
		$(this).addClass('current');
		var slectr = $(this).children('a').attr('href');
		$('.tab:visible').hide();
		$(slectr).css('display','block');
		return false;		
	})
	
	$('.padder p:empty').css('display','none');
		
		
	// *************************** gallery widget *********************************
	
	var init = window.setInterval(dogal, 6000);
	
	function dogal() {
		var thisser = $('.gallwidgouter .gallwidg:last');
		var thismove = $('.gallwidgouter .gallwidg:first');
		$(thismove).hide();
		$(thisser).after(thismove);
		$(thismove).fadeIn(2000);
	}
	
	
	// *************************** drawer *********************************
	
	$('.drawer').click(function() {
		
		if ($(this).hasClass('currentdrawer')) {
			var theight = ($('.playlist-wrap-MI').height()) + 20;
			if (theight < 180) {
				theight = 180; 
			}
			$(this).removeClass('currentdrawer');
			$('.headtop').animate({height: '-='+theight}, 1000);
			
		} else {
			var theight = ($('.playlist-wrap-MI').height()) + 20;
			if (theight < 180) {
				theight = 180; 
			}
			$(this).addClass('currentdrawer');
			$('.headtop').animate({height: '+='+theight}, 1000);
			
		}
		
	});	
	
	
	$('a.albmoverlink').click(function() {
		var theattr = $(this).attr('rel');
		$.cookie("ntl_playalbum",  theattr, { expires: 7, path: '/' });
		window.location.reload();
	});						
});