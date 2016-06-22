
function timezones_list(){

	return _timezones_list;
}


//
// technique based on this article:
// http://blog.redfin.com/devblog/2007/08/getting_the_time_zone_from_a_web_browser.html
//

function timezones_guess(){
	var api_guess = _try_using_api();
	if (api_guess) {
		return api_guess;
	}
	
	var so = -1 * new Date(Date.UTC(2012, 6, 30, 0, 0, 0, 0)).getTimezoneOffset();
	var wo = -1 * new Date(Date.UTC(2012, 12, 30, 0, 0, 0, 0)).getTimezoneOffset();
	var key = so + ':' + wo;

	return _timezones_map[key] ? _timezones_map[key] : 'US/Pacific';
}

var _try_using_api = function() {
	var format, timezone;
    if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
        return;
    }

    format = Intl.DateTimeFormat();

    if (typeof format === "undefined" || typeof format.resolvedOptions === "undefined") {
        return;
    }

	timezone = format.resolvedOptions().timeZone;

	// Sometimes the API can return an abbreviation. The only abbreviation we
	// accept is 'EET', otherwise we want to make sure there is a '/' in the response
	if (timezone.indexOf("/") > -1 || timezone === 'EET') {
        return timezone;
    }
};

var _timezones_map = {
	'-660:-660':	'Pacific/Midway',
	'-600:-600':	'Pacific/Honolulu',
	'-480:-540':	'America/Anchorage',
	'-420:-480':	'America/Los_Angeles',
	'-420:-420':	'America/Phoenix',
	'-360:-420':	'America/Denver',
	'-360:-360':	'America/Regina',
	'-300:-360':	'America/Chicago',
	'-300:-300':	'America/Bogota',
	'-240:-300':	'America/Indiana/Indianapolis',
	'-270:-270':	'America/Caracas',
	'-240:-180':	'America/Santiago',
	'-180:-240':	'America/Halifax',
	'-240:-240':	'America/Manaus',
	'-150:-210':	'America/St_Johns',
	'-180:-120':	'America/Sao_Paulo',
	'-180:-180':	'America/Buenos_Aires',
	'-120:-180':	'America/Godthab',
	'-120:-120':	'America/Noronha',
	'0:-60':	'Atlantic/Azores',
	'-60:-60':	'Atlantic/Cape_Verde',
	'60:0':	'Europe/London',
	'0:0':	'Africa/Monrovia',
	'120:60':	'Europe/Amsterdam',
	'60:60':	'Africa/Algiers',
	'60:120':	'Africa/Windhoek',
	'180:120':	'EET',
	'120:120':	'Africa/Cairo',
	'180:180':	'Asia/Kuwait',
	'240:240':	'Asia/Muscat',
	'270:210':	'Asia/Tehran',
	'300:240':	'Asia/Baku',
	'270:270':	'Asia/Kabul',
	'300:300':	'Asia/Tashkent',
	'360:360':	'Asia/Dhaka',
	'330:330':	'Asia/Kolkata',
	'345:345':	'Asia/Katmandu',
	'420:420':	'Asia/Novosibirsk',
	'390:390':	'Asia/Rangoon',
	'480:480':	'Asia/Ulaanbaatar',
	'540:540':	'Asia/Tokyo',
	'600:600':	'Australia/Brisbane',
	'570:630':	'Australia/Adelaide',
	'570:570':	'Australia/Darwin',
	'600:660':	'Australia/Canberra',
	'720:720':	'Asia/Magadan',
	'660:660':	'Asia/Vladivostok',
	'720:780':	'Pacific/Auckland',
	'780:780':	'Pacific/Tongatapu',
	'780:840':	'Pacific/Apia'
};

var _timezones_list = [
	["(UTC-11:00) Midway Island, American Samoa", 'Pacific/Midway'],
	["(UTC-10:00) Hawaii", 'Pacific/Honolulu'],
	["(UTC-09:00) Alaska", 'America/Anchorage'],
	["(UTC-08:00) Baja California", 'America/Tijuana'],
	["(UTC-08:00) Pacific Time (US and Canada)", 'America/Los_Angeles'],
	["(UTC-07:00) Arizona", 'America/Phoenix'],
	["(UTC-07:00) Chihuahua, La Paz, Mazatlan", 'America/Chihuahua'],
	["(UTC-07:00) Mountain Time (US and Canada)", 'America/Denver'],
	["(UTC-06:00) Central America", 'America/Belize'],
	["(UTC-06:00) Central Time (US and Canada)	", 'America/Chicago'],
	["(UTC-06:00) Guadalajara, Mexico City, Monterrey", 'America/Mexico_City'],
	["(UTC-06:00) Saskatchewan", 'America/Regina'],
	["(UTC-05:00) Bogota, Lima, Quito", 'America/Bogota'],
	["(UTC-05:00) Kingston, George Town", 'America/Jamaica'],
	["(UTC-05:00) Eastern Time (US and Canada)", 'America/New_York'],
	["(UTC-05:00) Indiana (East)", 'America/Indiana/Indianapolis'],
	["(UTC-04:30) Caracas", 'America/Caracas'],
	["(UTC-04:00) Asuncion", 'America/Asuncion'],
	["(UTC-04:00) Atlantic Time (Canada)", 'America/Halifax'],
	["(UTC-04:00) Cuiaba", 'America/Cuiaba'],
	["(UTC-04:00) Georgetown, La Paz, Manaus, San Juan", 'America/Manaus'],
	["(UTC-04:00) Santiago", 'America/Santiago'],
	["(UTC-03:30) Newfoundland and Labrador", 'America/St_Johns'],
	["(UTC-03:00) Brasilia", 'America/Sao_Paulo'],
	["(UTC-03:00) Buenos Aires", 'America/Buenos_Aires'],
	["(UTC-03:00) Cayenne, Fortaleza", 'America/Cayenne'],
	["(UTC-03:00) Greenland", 'America/Godthab'],
	["(UTC-03:00) Montevideo", 'America/Montevideo'],
	["(UTC-03:00) Salvador", 'America/Bahia'],
	["(UTC-02:00) Mid-Atlantic", 'America/Noronha'],
	["(UTC-01:00) Azores", 'Atlantic/Azores'],
	["(UTC-01:00) Cape Verde Islands", 'Atlantic/Cape_Verde'],
	["(UTC) Dublin, Edinburgh, Lisbon, London", 'Europe/London'],
	["(UTC) Casablanca", 'Africa/Casablanca'],
	["(UTC) Monrovia, Reykjavik", 'Africa/Monrovia'],
	["(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", 'Europe/Amsterdam'],
	["(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", 'Europe/Belgrade'],
	["(UTC+01:00) Brussels, Copenhagen, Madrid, Paris", 'Europe/Brussels'],
	["(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb", 'Europe/Warsaw'],
	["(UTC+01:00) West Central Africa", 'Africa/Algiers'],
	["(UTC+01:00) Windhoek", 'Africa/Windhoek'],
	["(UTC+02:00) Athens, Bucharest", 'Europe/Athens'],
	["(UTC+02:00) Beirut", 'Asia/Beirut'],
	["(UTC+02:00) Cairo", 'Africa/Cairo'],
	["(UTC+02:00) Damascus", 'Asia/Damascus'],
	["(UTC+02:00) Eastern Europe", 'EET'],
	["(UTC+02:00) Harare, Pretoria", 'Africa/Harare'],
	["(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius", 'Europe/Helsinki'],
	["(UTC+02:00) Istanbul", 'Asia/Istanbul'],
	["(UTC+02:00) Jerusalem", 'Asia/Jerusalem'],
	["(UTC+02:00) Kaliningrad", 'Europe/Kaliningrad'],
	["(UTC+02:00) Tripoli", 'Africa/Tripoli'],
	["(UTC+03:00) Amman", 'Asia/Amman'],
	["(UTC+03:00) Baghdad", 'Asia/Baghdad'],
	["(UTC+03:00) Kuwait, Riyadh", 'Asia/Kuwait'],
	["(UTC+03:00) Minsk", 'Europe/Minsk'],
	["(UTC+03:00) Moscow, St. Petersburg, Volgograd", 'Europe/Moscow'],
	["(UTC+03:00) Nairobi", 'Africa/Nairobi'],
	["(UTC+03:30) Tehran", 'Asia/Tehran'],
	["(UTC+04:00) Abu Dhabi, Muscat", 'Asia/Muscat'],
	["(UTC+04:00) Baku", 'Asia/Baku'],
	["(UTC+04:00) Izhevsk, Samara", 'Europe/Samara'],
	["(UTC+04:00) Port Louis", 'Indian/Mauritius'],
	["(UTC+04:00) Tbilisi", 'Asia/Tbilisi'],
	["(UTC+04:00) Yerevan", 'Asia/Yerevan'],
	["(UTC+04:30) Kabul", 'Asia/Kabul'],
	["(UTC+05:00) Tashkent, Ashgabat", 'Asia/Tashkent'],
	["(UTC+05:00) Ekaterinburg", 'Asia/Yekaterinburg'],
	["(UTC+05:00) Islamabad, Karachi", 'Asia/Karachi'],
	["(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi", 'Asia/Kolkata'],
	["(UTC+05:30) Sri Jayawardenepura", 'Asia/Colombo'],
	["(UTC+05:45) Kathmandu", 'Asia/Katmandu'],
	["(UTC+06:00) Astana", 'Asia/Almaty'],
	["(UTC+06:00) Dhaka", 'Asia/Dhaka'],
	["(UTC+06:00) Novosibirsk", 'Asia/Novosibirsk'],
	["(UTC+06:30) Yangon (Rangoon)", 'Asia/Rangoon'],
	["(UTC+07:00) Bangkok, Hanoi, Jakarta", 'Asia/Bangkok'],
	["(UTC+07:00) Krasnoyarsk", 'Asia/Krasnoyarsk'],
	["(UTC+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi", 'Asia/Chongqing'],
	["(UTC+08:00) Irkutsk", 'Asia/Irkutsk'],
	["(UTC+08:00) Kuala Lumpur, Singapore", 'Asia/Kuala_Lumpur'],
	["(UTC+08:00) Perth", 'Australia/Perth'],
	["(UTC+08:00) Taipei", 'Asia/Taipei'],
	["(UTC+08:00) Ulaanbaatar", 'Asia/Ulaanbaatar'],
	["(UTC+09:00) Osaka, Sapporo, Tokyo", 'Asia/Tokyo'],
	["(UTC+09:00) Seoul", 'Asia/Seoul'],
	["(UTC+09:00) Yakutsk", 'Asia/Yakutsk'],
	["(UTC+09:30) Adelaide", 'Australia/Adelaide'],
	["(UTC+09:30) Darwin", 'Australia/Darwin'],
	["(UTC+10:00) Brisbane", 'Australia/Brisbane'],
	["(UTC+10:00) Canberra, Melbourne, Sydney", 'Australia/Canberra'],
	["(UTC+10:00) Guam, Port Moresby", 'Pacific/Guam'],
	["(UTC+10:00) Hobart", 'Australia/Hobart'],
	["(UTC+10:00) Magadan", 'Asia/Magadan'],
	["(UTC+10:00) Vladivostok, Magadan", 'Asia/Vladivostok'],
	["(UTC+11:00) Chokirdakh", 'Asia/Srednekolymsk'],
	["(UTC+11:00) Solomon Islands, New Caledonia", 'Pacific/Guadalcanal'],
	["(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky", 'Asia/Anadyr'],
	["(UTC+12:00) Auckland, Wellington", 'Pacific/Auckland'],
	["(UTC+12:00) Fiji Islands, Kamchatka, Marshall Islands", 'Pacific/Fiji'],
	["(UTC+13:00) Nuku'alofa", 'Pacific/Tongatapu'],
	["(UTC+13:00) Samoa", 'Pacific/Apia']
];
