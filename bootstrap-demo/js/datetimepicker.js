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
  var dateformat = 'YYYY-MM-DD';
  $('div#datetimepicker').datetimepicker({
    format: dateformat,
    //keepOpen: true,
    //showClose: true,
    //debug: true
  }).on('dp.change', function(e){
    //var text = $(e.currentTarget).find('input').val();
    //console.log(text);
    var value = $(e.currentTarget).find('input').val();
    var firstDate = moment(value, dateformat).day(0).format(dateformat);
    var lastDate =  moment(value, dateformat).day(6).format(dateformat);
    $(e.currentTarget).find('input').val(firstDate + " - " + lastDate);
  }).on('dp.show', function(e){
    //$('.bootstrap-datetimepicker-widget tr:has(td.active)').css('background-color', '#337ab7');
    $('.bootstrap-datetimepicker-widget tr:has(td.active) td').addClass('active');
  });
});
