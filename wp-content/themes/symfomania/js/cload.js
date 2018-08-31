jQuery(document).ready(function($) {
	
	
	if ($("#bgimg").length != 0) { 
	 $('#bgimg').load(function() {
        $('.imgloader').hide();			
		$('#bgimg').fadeIn('fast', function() {
			resizeBg();    		
      	});
    });
   }
	
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
});