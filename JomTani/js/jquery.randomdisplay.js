
jQuery(function($) {
$.fn.extend({
	randomdisplay : function(num) {
		return this.each(function() {
			var chn = $(this).children().hide().length;
			for(var i = 0; i < num && i < chn; i++) {
				var r = parseInt(Math.random() * (chn - i)) + i;
			$(this).children().eq(r).show().prependTo($(this));
			}
		});
	}
});
$(function(){
	$("[randomdisplay]").each(function() {
	$(this).randomdisplay($(this).attr("randomdisplay"));
	});
});
});