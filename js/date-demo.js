/// <reference path="../typings/jquery/jquery.d.ts"/>
$(document).ready(function(){
	$('input#txtDate').datepicker({
		onSelect: function(dateText, instance){
			var date = $(this).datepicker('getDate');
			$('label#lblGetDay').text(date.getDay().toString());
			$('label#lblGetDate').text(date.getDate().toString());
			$('label#lblGetWeekOfMonth').text(date.getWeekOfMonth());
			$('label#lblGetDayCountOfMonth').text(date.getDayCountOfMonth());
			$('label#lblIsLastWeekOfMonth').text(date.isLastWeekOfMonth() == true ? '最后一周' : '不是最后一周');
		}
	});
});
