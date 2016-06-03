$(document).ready(function(){
  $('a#approve').unbind().bind('click', function(){
    $('div#approvement').dialog({
      autoOpen: false,
      width: "800",
      maxWidth: "800",
      modal: true,
      height: "auto"
    }).dialog('option', 'title', '审批操作').dialog('open');
  });
});
