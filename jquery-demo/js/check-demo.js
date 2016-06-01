$(document).ready(function(){
  $('input:checkbox').unbind().bind('change', function(){
    var label = $(this).next();
    alert($(this).text() + ', ' + label.text() + ' : ' + $(this).prop('checked'));
  }).bind('change', function(){
    console.log('change' + new Date().getTime().toString());
  });

  var changeFunc = function(e){
    $('label#lbl').text(e.target.value);
  };
  $('input:text').unbind().bind('keydown', changeFunc).bind('keyup', changeFunc).bind('change', changeFunc);

  $('select#slt').unbind().bind('change', function(){
    $('label#lbl').text($(this).find('option:selected').text());
  });
});
