$(document).ready(function(){
    $('div.container').tabs({
        activate: function(event, ui){
            var currentTabID = ui.newPanel.attr('id');
            console.log('current tab id: ' + currentTabID);
        }
    }).tabs('option', 'active', 1);//activate the 2nd tab immediately
});