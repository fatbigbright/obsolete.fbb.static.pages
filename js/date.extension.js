(function(){
	    Date.prototype.getWeekOfMonth = function(){
        var dayOfWeek = this.getDay() + 1; 
        var day = this.getDate(); 
        return Math.ceil((day - dayOfWeek) / 7) + ((dayOfWeek >= 0) ? 1 : 0);
    };
    
    Date.prototype.getDayCountOfMonth = function(){
        var month = this.getMonth() + 1;
        var isLeapYear = (function(date){
            var year = date.getFullYear();
            if((year % 4 == 0) && (year % 100 != 0)){
                return true;
            } else if(year % 400 == 0){
                return true;
            } else {
                return false;
            }
        })(this);
        if(month == 1 || month == 3 || month == 5 || month == 7 ||
        month == 8 || month == 10 || month == 12){
            return 31;
        } else if(month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        } else {
            if(isLeapYear) return 29;
            else return 29;
        }
    };
    
    Date.prototype.isLastWeekOfMonth = function(){
        var dayOfWeek = this.getDay() + 1;
        var day = this.getDate();
        var dayCountOfMonth = this.getDayCountOfMonth();
        var currentWeekLeft = 7 - dayOfWeek;
        var currentMonthLeft = dayCountOfMonth - day;
        return currentWeekLeft >= currentMonthLeft;
    };
})();