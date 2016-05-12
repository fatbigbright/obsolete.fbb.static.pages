var allRooms = [
    {'Building': '2', 'Floor': '0', 'RoomNo': '01',   'favorite': false },
    {'Building': '2', 'Floor': '1', 'RoomNo': '01',   'favorite': false },
    {'Building': '2', 'Floor': '1', 'RoomNo': 'c.01', 'favorite': true },
    {'Building': '2', 'Floor': '2', 'RoomNo': '01',   'favorite': false },
    {'Building': '2', 'Floor': '2', 'RoomNo': 'c.02', 'favorite': false },
    {'Building': '2', 'Floor': '3', 'RoomNo': '10',   'favorite': false },
    {'Building': '2', 'Floor': '4', 'RoomNo': '01',   'favorite': false },
    {'Building': '2', 'Floor': '4', 'RoomNo': 'c.01', 'favorite': false },
    {'Building': '2', 'Floor': '4', 'RoomNo': '09',   'favorite': true },
    {'Building': '4', 'Floor': '0', 'RoomNo': '01',   'favorite': false },
    {'Building': '4', 'Floor': '1', 'RoomNo': '01',   'favorite': false },
    {'Building': '4', 'Floor': '2', 'RoomNo': '01',   'favorite': false },
    {'Building': '4', 'Floor': '3', 'RoomNo': 'c.05', 'favorite': false },
    {'Building': '4', 'Floor': '3', 'RoomNo': 'c.06', 'favorite': false },
    {'Building': '4', 'Floor': '4', 'RoomNo': '10',   'favorite': true },
];

var roomHelper = {
    getAllRooms: function(){
        return allRooms;
    },
    getFavRooms: function(){
        var favRooms = [];
        $.each(allRooms, function(key, room){
            if(room['favorite'] == true){
                favRooms.push({
                    'Building': room['Building'],
                    'Floor': room['Floor'],
                    'RoomNo': room['RoomNo'],
                    'favorite': true
                });
            }
        });
        return favRooms;
    },
    addFavRoom: function(favRoom, callback){
        $.each(allRooms, function(key, room){
            if(room['Building'] == favRoom['Building'] && 
               room['Floor'] == favRoom['Floor'] &&
               room['RoomNo'] == favRoom['RoomNo']){
                room['favorite'] = true;
                return false;  
            }
        });
        
        if(callback){
            callback();
        }
    },
    removeFromFavRoom: function(favRoom, callback){
        $.each(allRooms, function(key, room){
            if(room['Building'] == favRoom['Building'] && 
               room['Floor'] == favRoom['Floor'] &&
               room['RoomNo'] == favRoom['RoomNo']){
                room['favorite'] = false;
                return false;  
            }
        });
        
        if(callback){
            callback();
        }
    }
};

function refreshAllTable(){
    var allRooms = roomHelper.getAllRooms();
    $('table#all').jqGrid('clearGridData').jqGrid('setGridParam', {
        datatype: 'local',
        data: allRooms
    }).trigger('reloadGrid');
}

function refreshFavTable(){
    var favRooms = roomHelper.getFavRooms();
    $('table.table-favorite').jqGrid('clearGridData').jqGrid('setGridParam', {
        datatype: 'local',
        data: favRooms
    }).trigger('reloadGrid');
}

function refreshTables(){
    refreshAllTable();
    refreshFavTable();
}

function AddToFavorite(tableID, lineID){
    var favRooms = roomHelper.getFavRooms();
    var roomAddedModel = $(tableID).jqGrid('getRowData', lineID);
    var roomStr = roomAddedModel['Building'] + '.' + roomAddedModel['Floor'] + '.' + roomAddedModel['RoomNo'];
    if(favRooms.length < 3){
        roomHelper.addFavRoom(roomAddedModel, refreshTables);
    } else {
        $('div.fav-diag').find('input[type="hidden"]').val('');
        $('div.fav-diag').find('input#building').val(roomAddedModel['Building']);
        $('div.fav-diag').find('input#floor').val(roomAddedModel['Floor']);
        $('div.fav-diag').find('input#roomNo').val(roomAddedModel['RoomNo']);
        $('div.fav-diag').find('span#room').text(roomStr);
        $('div.fav-diag').dialog({
            autoOpen: false,
            height: 400,
            width: 1000,
            modal: true
        }).dialog('option', 'title', 'Add To Favorite').dialog('open');
    }    
}

function RemoveFromFavorite(tableID, lineID){
    var roomModel = $(tableID).jqGrid('getRowData', lineID);
    roomHelper.removeFromFavRoom(roomModel, refreshTables);
}

function ReplaceFavRoom(tableID, lineID){
    var roomToBeRemovedModel = $(tableID).jqGrid('getRowData', lineID);
    roomHelper.removeFromFavRoom(roomToBeRemovedModel);
    
    var roomToBeAdded = {
        'Building': $('div.fav-diag').find('input#building').val(),
        'Floor': $('div.fav-diag').find('input#floor').val(),
        'RoomNo': $('div.fav-diag').find('input#roomNo').val(),
        'Favorite': true
    };
    
    roomHelper.addFavRoom(roomToBeAdded, function(){
        refreshTables();
        $('div.fav-diag').dialog('close');
    });
}

(function(){
    Date.prototype.getDateStr = function(){
        var year = this.getFullYear();
        var month = this.getMonth() + 1;
        var day = this.getDate();
        
        var monthStr = month > 9 ? month.toString() : ('0' + month.toString());
        var dayStr = day > 9 ? day.toString() : ('0' + day.toString());
        
        return year.toString() + '-' + monthStr + '-' + dayStr;
    };
})();

function GenerateGraph(tableID, lineID){
    var date = new Date();
    $('input#toDate').val(date.getDateStr());
    date.setDate(date.getDate() - 3);
    $('input#fromDate').val(date.getDateStr());
    
    $('div.gen-diag').dialog({
        autoOpen: false,
        height: 300,
        width: 550,
        modal: true
    }).dialog('option', 'title', 'Generate Graph').dialog('open');
}

$(document).ready(function(){
    var search_filters = ['cn', 'bw', 'eq', 'ew', 'nc'];
    var allRooms = roomHelper.getAllRooms();
    
    var favRooms = roomHelper.getFavRooms();
    $.each(allRooms, function(key, room){
        if(room['favorite'] == true){
            favRooms.push({
                'Building': room['Building'],
                'Floor': room['Floor'],
                'RoomNo': room['RoomNo'],
                'favorite': true
            });
        }
    });
    
    $('div.fav-diag').on('dialogclose', function(){
        $('div.fav-diag').find('input[type="hidden"]').val('');
        $('div.fav-diag').find('span#room').text('');
    });
    
    $('div.fav-diag').find('div.bottom-bar input:button').unbind().bind('click', function(){
        $('div.fav-diag').dialog('close');
    });
    
    $('div.gen-diag').find('input:text').datepicker({ dateFormat: 'yy-mm-dd' });
    
    $('table#favorite').jqGrid({
        datatype: 'local',
        data: favRooms,
        width: 1024,
        height: 85,
        rownumbers: true,
        colNames: ['Building', 'Floor', 'Room No.', '', ''],
        colModel: [
            { name: 'Building', index: 'Building', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'Floor', index: 'Floor', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'RoomNo', index: 'RoomNo', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'generateBtn', index: 'generateBtn', sortable: false, search: false, align: 'center', width: 50},
            { name: 'UnfollowBtn', index: 'UnfollowBtn', sortable: false, search: false, align: 'center', width: 50}
        ],
        rowNum: 3, 
        caption: '',
        gridComplete: function(){
            var table = $('table#favorite');
            var lineIDs = table.jqGrid('getDataIDs');
            $.each(lineIDs, function(key, lineID){
                var lineModel = table.jqGrid('getRowData', lineID);
                var unfollowBtnElement = '<input type="button" value="Remove from Favorite" onclick="RemoveFromFavorite(\'table#favorite\', \'' + lineID + '\')">';
                var generateBtnElement = '<input type="button" value="Generate" onclick="GenerateGraph(\'table#favorite\', \'' + lineID + '\')">';
                table.jqGrid('setRowData', lineID, {generateBtn: generateBtnElement, UnfollowBtn: unfollowBtnElement});
            });
            table.find('input:button').button();
        }
    });
    
    $('table#favorite-diag').jqGrid({
        datatype: 'local',
        data: favRooms,
        width: 950,
        height: 85,
        rownumbers: true,
        colNames: ['Building', 'Floor', 'Room No.', ''],
        colModel: [
            { name: 'Building', index: 'Building', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'Floor', index: 'Floor', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'RoomNo', index: 'RoomNo', sortable: false, search: false, align: 'center', width: 50 },
            { name: 'ReplaceBtn', index: 'ReplaceBtn', sortable: false, search: false, align: 'center', width: 50}
        ],
        rowNum: 3, 
        caption: '', 
        gridComplete: function(){
            var table = $('table#favorite-diag');
            var lineIDs = table.jqGrid('getDataIDs');
            $.each(lineIDs, function(key, lineID){
                var lineModel = table.jqGrid('getRowData', lineID);
                var replaceBtnElement = '<input type="button" value="Replace" onclick="ReplaceFavRoom(\'table#favorite-diag\', \'' + lineID + '\')">';
                table.jqGrid('setRowData', lineID, { ReplaceBtn: replaceBtnElement });
            });
            table.find('input:button').button();
        }
    });
    
    $('article table.table-all').jqGrid({
        datatype: 'local',
        data: allRooms,
        width: 1024,
        height: 100,
        rownumbers: true,
        colNames: ['Building', 'Floor', 'Room No.', 'favorite', '', ''],
        colModel: [
            { name: 'Building', index: 'Building', sortable: false, search: true, align: 'center', width: 50, searchoptions: { sopt: search_filters } },
            { name: 'Floor', index: 'Floor', sortable: false, search: true, align: 'center', width: 50, searchoptions: { sopt: search_filters }  },
            { name: 'RoomNo', index: 'RoomNo', sortable: false, search: true, align: 'center', width: 50, searchoptions: { sopt: search_filters }  },
            { name: 'favorite', index: 'favorite', hidden: true },
            { name: 'generateBtn', index: 'generateBtn', sortable: false, search: false, align: 'center', width: 50},
            { name: 'followBtn', index: 'followBtn', sortable: false, search: false, align: 'center', width: 50}
        ],
        rowNum: 3, 
        caption: '',
        pager: '#all-pager',
        gridComplete: function(){
            var table = $('table#all');
            var lineIDs = table.jqGrid('getDataIDs');
            $.each(lineIDs, function(key, lineID){
                var lineModel = table.jqGrid('getRowData', lineID);
                var followBtnElement = '<input type="button" value="Add To Favorite" onclick="AddToFavorite(\'table#all\', \'' + lineID + '\')">';
                if(lineModel['favorite'] == true || lineModel['favorite'] == 'true'){
                    followBtnElement = '<span>Favorite</span>';
                }
                var generateBtnElement = '<input type="button" value="Generate" onclick="GenerateGraph(\'table#all\', \'' + lineID + '\')">';
                table.jqGrid('setRowData', lineID, { generateBtn: generateBtnElement, followBtn: followBtnElement });
            });
            table.find('input:button').button();
        }
    }).jqGrid('filterToolbar', { searchOperators: true });
    $('input:button').button();
});