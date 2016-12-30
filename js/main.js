//! version : 0.1.0
//! license : MIT, authors : Bogdan BUCUR, candeliber.com
var Util = {

    get: function (id) {
        return document.getElementById(id);
    },


    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },


    getDoubleDigitsFromValue: function (value) {

        value = value + '';
        if (value.length === 1) {
            value = '0' + value;
        }

        return value.split('');
    }
};


var DateUtil = {


    getNearestHolliday: function () {

        var current_timestamp = DateUtil.getCurrentTimestamp(),
            nearest_holliday = DateUtil.getNearestHollidayToTimestamp(current_timestamp, Data.hollidays);

        return nearest_holliday;
    },


    getNearestHollidayToTimestamp: function (timestamp, hollidays) {

        var date = moment(timestamp, 'X');

        var index = 0,
            total_hollidays = hollidays.length;
        for ( ; index < total_hollidays; index++) {

            var holliday = hollidays[index],
                holliday_date = moment(holliday.date, "DD/MM/YYYY"),
                difference = holliday_date.diff();



            if (difference > 0) {
                return holliday;
            }
        }
    },


    getTimeBetweenDates: function (first_date, second_date) {

        var diff = moment.preciseDiff(first_date, second_date, true);

        return diff;
    },


    getCurrentTimestamp: function () {
        return moment().unix();
    },


    getDayNameFromDate: function (date) {

        var day_index = moment(date, "DD/MM/YYYY").day(),
            day = Data.localization.days[day_index];

        return day;
    },


    isWeekend: function (moment_date) {

        var day_index   = moment_date.day(),
            is_saturday = (day_index === 6),
            is_sunday   = (day_index === 0); 

        if (is_saturday || is_sunday) {
            return true;
        } else {
            return false;
        }
    },


    getDaysUntilWeekend: function (moment_date) {

        var day_index = moment_date.day();
        if (day_index === 0 || day_index === 6) {
            return 0;
        } else {
            // -1 to exclude the current day
            var days_left = 6 - day_index - 1;
            return days_left;
        }
    }
};


var View = (function () {

    var bg_source = Util.get('bg_source'),
        bg_body   = document.body;

    var holliday_status = Util.get('holliday_status');

    var holliday_date = Util.get('holliday_date'),
        holliday_name = Util.get('holliday_name'),
        holliday_day  = Util.get('holliday_day');

    var months_first_digit   = Util.get('months_first_digit'),
        months_second_digit  = Util.get('months_second_digit'),
        days_first_digit     = Util.get('days_first_digit'),
        days_second_digit    = Util.get('days_second_digit'),
        hours_first_digit    = Util.get('hours_first_digit'),
        hours_second_digit   = Util.get('hours_second_digit'),
        minutes_first_digit  = Util.get('minutes_first_digit'),
        minutes_second_digit = Util.get('minutes_second_digit'),
        seconds_first_digit  = Util.get('seconds_first_digit'),
        seconds_second_digit = Util.get('seconds_second_digit');

    var hollidays_list_table = Util.get('days-list');

    return {
        bg_source: bg_source,
        bg_body: bg_body,
        holliday_status: holliday_status,
        holliday_date: holliday_date,
        holliday_name: holliday_name,
        holliday_day: holliday_day,
        months_first_digit: months_first_digit,
        months_second_digit: months_second_digit,
        days_first_digit: days_first_digit,
        days_second_digit: days_second_digit,
        hours_first_digit: hours_first_digit,
        hours_second_digit: hours_second_digit,
        minutes_first_digit: minutes_first_digit,
        minutes_second_digit: minutes_second_digit,
        seconds_first_digit: seconds_first_digit,
        seconds_second_digit: seconds_second_digit,
        hollidays_list_table: hollidays_list_table
    }
})();


var ViewUtil = {

    /**
     * Sets a random background image and makes sure the link in the footer 
     * points to the original source 
     */
    setBackground: function () {

        var current_date = moment(DateUtil.getCurrentTimestamp(), 'X'),
            is_weekend = DateUtil.isWeekend(current_date);

        if (is_weekend) {
            var photos = Data.photos.holliday,
                photos_folder = 'holliday';
        } else {
            var photos = Data.photos.working,
                photos_folder = 'working';
        }


        var random_index = Util.getRandomInt(0, photos.length),
            bg_image = photos[random_index];

        View.bg_body.style.backgroundImage = 'url(\'img/' + photos_folder + '/' + bg_image.path + '\')';
        View.bg_source.href = bg_image.source;
    },


    setHollidayStatus: function () {

        var current_date = moment(DateUtil.getCurrentTimestamp(), 'X'),
            is_weekend = DateUtil.isWeekend(current_date);

        if (is_weekend) {
            var message = Data.messages.weekend_day;
        } else {
            var message = Data.messages.working_day,
                days_until_weekend = DateUtil.getDaysUntilWeekend(current_date);

            var weekend_status = '';
            switch (days_until_weekend) {
                case 0:
                    weekend_status = Data.messages.weekend_tomorrow;
                    break;

                case 1:
                    weekend_status = Data.messages.day_until_weekend;
                    break;

                default:
                    weekend_status = Data.messages.days_until_weekend.replace('##days', days_until_weekend);
                    break;


            }

            message += weekend_status;
        }

        View.holliday_status.innerHTML = message;
    },


    /**
     * Sets the name and the date of the nearest holliday
     * inside the string "Următoarea zi liberă este pe data de (...)"
     */
    setNearestHolliday: function () {

        var holliday = DateUtil.getNearestHolliday(),
            day_name = DateUtil.getDayNameFromDate(holliday.date);

        ViewUtil.nearest_holliday = holliday;

        holliday_date.innerHTML = holliday.date;
        holliday_name.innerHTML = holliday.name;
        holliday_day.innerHTML  = day_name;
    },


    initCountdown: function () {

        var holliday = ViewUtil.nearest_holliday,
            holliday_date = moment(holliday.date, "DD/MM/YYYY");


        setInterval(function updateCountdown() {

            var current_date  = moment(DateUtil.getCurrentTimestamp(), 'X'),
                difference = DateUtil.getTimeBetweenDates(holliday_date, current_date);


            var months_digits = Util.getDoubleDigitsFromValue(difference.months);
            View.months_first_digit.innerHTML  = months_digits[0];
            View.months_second_digit.innerHTML = months_digits[1];

            var days_digits = Util.getDoubleDigitsFromValue(difference.days);
            View.days_first_digit.innerHTML  = days_digits[0];
            View.days_second_digit.innerHTML = days_digits[1];

            var hours_digits = Util.getDoubleDigitsFromValue(difference.hours);
            View.hours_first_digit.innerHTML  = hours_digits[0];
            View.hours_second_digit.innerHTML = hours_digits[1];

            var minutes_digits = Util.getDoubleDigitsFromValue(difference.minutes);
            View.minutes_first_digit.innerHTML  = minutes_digits[0];
            View.minutes_second_digit.innerHTML = minutes_digits[1];

            var seconds_digits = Util.getDoubleDigitsFromValue(difference.seconds);
            View.seconds_first_digit.innerHTML  = seconds_digits[0];
            View.seconds_second_digit.innerHTML = seconds_digits[1];
            

        }, 1000);
    },


    updateHollidaysList: function () {

        var nearest_holliday = DateUtil.getNearestHolliday(),
            hollidays_list_table = View.hollidays_list_table,
            tbody = hollidays_list_table.getElementsByTagName('tbody')[0],
            holliday_rows = tbody.getElementsByTagName('tr');

        var nearest_holliday_index;
        Data.hollidays.forEach(function (holliday, index) {
            if (holliday === nearest_holliday) {
                nearest_holliday_index = index;
            }
        });


        var index = 0,
            total_hollidays = holliday_rows.length,
            nearest_holliday_reached = false;
        for ( ; index < total_hollidays; index++) {

            var holliday_row = holliday_rows[index],
                holliday_cells = holliday_row.getElementsByTagName('td'),
                holliday_name_cell = holliday_cells[1];

            if (nearest_holliday_reached) {
                var row_class = 'days-list__holliday--future';
            } else if (index === nearest_holliday_index) {
                var row_class = 'days-list__holliday--current';
                nearest_holliday_reached = true;
            } else {
                var row_class = 'days-list__holliday--past';
            }


            holliday_row.setAttribute('class', row_class);
        }
    }
}


ViewUtil.setBackground();
ViewUtil.setHollidayStatus();
ViewUtil.setNearestHolliday();
ViewUtil.initCountdown();
ViewUtil.updateHollidaysList();



// Register the service worker for offline access
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js?v011').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}








