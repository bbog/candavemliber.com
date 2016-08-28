



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


var Data = {

    hollidays: [
        {
            name: 'Anul Nou',
            date: '01/01/2016'
        },
        {
            name: 'Anul Nou',
            date: '02/01/2016'
        },
        {
            name: 'Ziua Unirii Principatelor Române',
            date: '24/01/2016'
        },
        {
            name: 'Paştele',
            date: '01/05/2016'
        },
        {
            name: 'Ziua Muncii',
            date: '01/05/2016'
        },
        {
            name: 'Paştele',
            date: '02/05/2016'
        },
        {
            name: 'Rusalii',
            date: '19/06/2016'
        },
        {
            name: 'Rusalii',
            date: '20/06/2016'
        },
        {
            name: 'Adormirea Maicii Domnului',
            date: '15/08/2016'
        },
        {
            name: 'Sfântul Andrei',
            date: '30/11/2016'
        },
        {
            name: 'Ziua Naţională a României',
            date: '01/12/2016'
        },
        {
            name: 'Crăciunul',
            date: '25/12/2016'
        },
        {
            name: 'Crăciunul',
            date: '26/12/2016'
        }
    ],

    photos: {

        working: [
            {
                path: 'people-coffee-notes-tea.jpg',
                source: 'https://www.pexels.com/photo/people-notes-meeting-team-7095/'
            },
            {
                path: 'people-coffee-tea-meeting.jpg',
                source: 'https://www.pexels.com/photo/people-meeting-workspace-team-7097/'
            },
            {
                path: 'person-apple-laptop-notebook.jpg',
                source: 'https://www.pexels.com/photo/person-apple-laptop-notebook-1171/'
            },
            {
                path: 'startup-photos.jpg',
                source: 'https://www.pexels.com/photo/working-woman-person-technology-7375/'
            },
            {
                path: 'office-notes-notepad-entrepreneur-38556.jpeg',
                source: 'https://www.pexels.com/photo/iphone-desk-office-pen-38556/'
            },
            {
                path: 'bow-tie-businessman-fashion-man.jpg',
                source: 'https://www.pexels.com/photo/bow-tie-businessman-fashion-man-1702/'
            },
            {
                path: 'pexels-photo-52608.jpeg',
                source: 'https://www.pexels.com/photo/man-in-white-shirt-using-macbook-pro-52608/'
            },
            {
                path: 'medic-hospital-laboratory-medical-40559.jpeg',
                source: 'https://www.pexels.com/photo/clinic-doctor-health-hospital-40559/'
            },
            {
                path: 'startup-photos_2.jpg',
                source: 'https://www.pexels.com/photo/laptop-computer-macbook-apple-7361/'
            },
            {
                path: 'desk-office-workspace-coworking.jpg',
                source: 'https://www.pexels.com/photo/desk-office-workspace-coworking-7110/'
            },
            {
                path: 'pexels-photo-89724.jpeg',
                source: 'https://www.pexels.com/photo/people-apple-desk-technology-89724/'
            }
        ],

        holliday: [
            {
                path: 'pexels-photo.jpeg',
                source: 'https://www.pexels.com/photo/man-person-view-nature-9692/'
            },
            {
                path: 'pexels-photo-65977.jpeg',
                source: 'https://www.pexels.com/photo/nature-beach-water-blue-65977/'
            },
            {
                path: 'pexels-photo-61129.jpeg',
                source: 'https://www.pexels.com/photo/sunglasses-girl-swimming-pool-swimming-61129/'
            },
            {
                path: 'landscape-mountains-nature-man.jpg',
                source: 'https://www.pexels.com/photo/landscape-mountains-nature-man-1005/'
            },
            {
                path: 'pexels-photo-46082.jpeg',
                source: 'https://www.pexels.com/photo/man-in-black-shirt-and-gray-shorts-standing-on-cliff-under-white-and-blue-cloudy-sky-46082/'
            },
            {
                path: 'pexels-photo.jpg',
                source: 'https://www.pexels.com/photo/bridge-runners-morning-cloudy-29578/'
            },
            {
                path: 'nature-person-red-woman.jpg',
                source: 'https://www.pexels.com/photo/nature-person-red-woman-6552/'
            },
            {
                path: 'person-beach-holiday-vacation.jpg',
                source: 'https://www.pexels.com/photo/person-beach-holiday-vacation-5314/'
            },
            {
                path: 'pexels-photo-60219.jpeg',
                source: 'https://www.pexels.com/photo/nature-beach-vacation-ocean-60219/'
            },
            {
                path: 'pexels-photo-102734.jpeg',
                source: 'https://www.pexels.com/photo/woman-in-white-crop-top-besides-man-in-white-and-black-stripes-shirt-beside-body-otf-water-102734/'
            },
            {
                path: 'pexels-photo-26525.jpg',
                source: 'https://www.pexels.com/photo/mountains-hill-man-person-26525/'
            }
        ]
    },

    localization: {
        days: ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă']
    },

    messages: {
        working_day: 'Nu azi, astăzi se lucrează :( ',
        days_until_weekend: 'Mai sunt ##days zile până la weekend',
        day_until_weekend: 'Mai este o zi până la weekend',
        weekend_tomorrow: 'Dar nu dispera, mâine e weekend : D',
        weekend_day: 'Nu e sărbătoare dar azi nu se lucrează, e weekend! Woohoo'
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

        var index = 0,
            total_hollidays = holliday_rows.length,
            nearest_holliday_reached = false;
        for ( ; index < total_hollidays; index++) {

            var holliday_row = holliday_rows[index],
                holliday_cells = holliday_row.getElementsByTagName('td'),
                holliday_name_cell = holliday_cells[1];

            if (nearest_holliday_reached) {
                var row_class = 'days-list__holliday--future';
            } else if (nearest_holliday.name === holliday_name_cell.innerHTML) {
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
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}








