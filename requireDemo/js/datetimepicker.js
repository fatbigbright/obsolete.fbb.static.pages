require.config({
  map: {
    '*': {
      'css': '../../node_modules/require-css/css'
    }
  }, 
  paths: {
    'jquery': '../../node_modules/jquery/dist/jquery',
    'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap',
    'moment': '../../node_modules/eonasdan-bootstrap-datetimepicker/bower_components/moment/moment',
    'bootstrap-datetimepicker': '../../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min'
  },
  shim: {
    'bootstrap': [
      'jquery', 
      'css!../../node_modules/bootstrap/dist/css/bootstrap.css',
      'css!../../node_modules/bootstrap/dist/css/bootstrap-theme.css'
    ],
    'bootstrap-datetimepicker': [
      'bootstrap', 
      'moment',
      'css!../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
      'css!../css/datetimepicker.css'
    ]
  }
});

define(['jquery', 'moment', 'bootstrap-datetimepicker'], function($, moment){
  $(function(){
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
});
