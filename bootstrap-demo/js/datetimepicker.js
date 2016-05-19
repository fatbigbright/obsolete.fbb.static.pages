$(document).ready(function(){
  var calculate_week_range = function(e){
    var input = e.currentTarget;
    $('.datepicker-days table tbody tr').removeClass('week-active');
    var tr = $('.datepicker-days table tbody tr td.active.day').parent();
    tr.addClass('week-active');
    var date = e.date;
    var start_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    var end_date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
    var getDateStr = function(date){ return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()};
    var result_str = getDateStr(start_date) + ' ~ ' + getDateStr(end_date);
    $(input).val(result_str);
  };
  $('div#datetimepicker').datetimepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    minView: '3'
  }).on('change', function(e){
    var text = $(e.currentTarget).find('input').val();
    console.log(text);
  });
});
