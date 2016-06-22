
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
	
	var key_parts = [];
	key_parts.push(-1 * new Date(Date.UTC(2011, 12, 31, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1991, 9, 29, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1996, 10, 7, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(2008, 10, 27, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(2011, 4, 3, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1980, 4, 28, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1989, 3, 26, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1987, 5, 10, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1980, 4, 6, 0, 0, 0, 0)).getTimezoneOffset());
	key_parts.push(-1 * new Date(Date.UTC(1982, 12, 19, 0, 0, 0, 0)).getTimezoneOffset());

	var key = key_parts.join(':');

	return _timezones_map[key] ? _timezones_map[key] : 'US/Pacific';
}

var _try_using_api = function() {
	try {
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
	    } else {
			return
		}
	} catch {
		return;
	}
};

var _timezones_map = {
	'-660:-660:-660:-660:-660:-660:-660:-660:-660:-660':	'Pacific/Midway',
	'-600:-600:-600:-600:-600:-600:-600:-600:-600:-600':	'Pacific/Honolulu',
	'-540:-480:-480:-480:-480:-540:-540:-480:-600:-600':	'America/Anchorage',
	'-480:-420:-420:-480:-420:-420:-480:-420:-480:-480':	'America/Tijuana',
	'-480:-420:-420:-420:-420:-420:-480:-420:-480:-480':	'America/Los_Angeles',
	'-420:-420:-420:-420:-420:-420:-420:-420:-420:-420':	'America/Phoenix',
	'-420:-360:-300:-420:-420:-360:-360:-360:-360:-360':	'America/Chihuahua',
	'-420:-360:-360:-360:-360:-360:-420:-360:-420:-420':	'America/Denver',
	'-360:-360:-360:-360:-360:-360:-360:-360:-360:-300':	'America/Belize',
	'-360:-300:-300:-300:-300:-300:-360:-300:-360:-360':	'America/Chicago',
	'-360:-360:-300:-360:-360:-360:-360:-360:-360:-360':	'America/Mexico_City',
	'-360:-360:-360:-360:-360:-360:-360:-360:-360:-360':	'America/Regina',
	'-300:-300:-300:-300:-300:-300:-300:-300:-300:-300':	'America/Bogota',
	'-300:-300:-300:-300:-300:-240:-300:-300:-300:-300':	'America/Jamaica',
	'-300:-240:-240:-240:-240:-240:-300:-240:-300:-300':	'America/New_York',
	'-300:-300:-300:-240:-240:-300:-300:-300:-300:-300':	'America/Indiana/Indianapolis',
	'-270:-240:-240:-270:-270:-240:-240:-240:-240:-240':	'America/Caracas',
	'-180:-240:-180:-180:-180:-240:-180:-240:-240:-180':	'America/Asuncion',
	'-240:-180:-180:-180:-180:-180:-240:-180:-240:-240':	'America/Halifax',
	'-180:-240:-180:-180:-240:-240:-240:-240:-240:-240':	'America/Cuiaba',
	'-240:-240:-240:-240:-240:-240:-240:-240:-240:-240':	'America/Manaus',
	'-180:-240:-240:-180:-180:-240:-240:-240:-240:-180':	'America/Santiago',
	'-210:-150:-150:-150:-150:-150:-210:-150:-210:-210':	'America/St_Johns',
	'-120:-180:-120:-120:-180:-180:-180:-180:-180:-180':	'America/Sao_Paulo',
	'-180:-180:-180:-120:-180:-180:-180:-180:-180:-180':	'America/Buenos_Aires',
	'-180:-180:-180:-180:-180:-180:-180:-180:-180:-180':	'America/Cayenne',
	'-180:-120:-120:-180:-120:-120:-180:-120:-180:-180':	'America/Godthab',
	'-120:-180:-180:-120:-180:-120:-180:-180:-120:-180':	'America/Montevideo',
	'-120:-180:-120:-180:-180:-180:-180:-180:-180:-180':	'America/Bahia',
	'-120:-120:-120:-120:-120:-120:-120:-120:-120:-120':	'America/Noronha',
	'-60:0:0:-60:0:0:-60:0:0:-60':	'Atlantic/Azores',
	'-60:-60:-60:-60:-60:-60:-60:-60:-60:-60':	'Atlantic/Cape_Verde',
	'0:60:60:0:60:60:0:60:60:0':	'Europe/London',
	'0:0:0:0:60:0:0:0:0:0':	'Africa/Casablanca',
	'0:0:0:0:0:0:0:0:0:0':	'Africa/Monrovia',
	'60:120:120:60:120:120:60:120:60:60':	'Europe/Amsterdam',
	'60:120:120:60:120:60:60:120:60:60':	'Europe/Belgrade',
	'60:120:120:60:120:120:60:120:120:60':	'Europe/Warsaw',
	'60:60:60:60:60:60:60:60:0:60':	'Africa/Algiers',
	'120:120:120:120:60:120:120:120:120:120':	'Africa/Windhoek',
	'120:180:180:120:180:180:120:180:180:120':	'Europe/Athens',
	'120:180:120:120:180:120:120:180:120:120':	'Asia/Beirut',
	'120:180:120:120:120:120:120:180:120:120':	'Africa/Cairo',
	'120:180:120:180:180:120:120:180:120:120':	'Asia/Damascus',
	'120:180:180:120:180:120:120:180:120:120':	'EET',
	'120:120:120:120:120:120:120:120:120:120':	'Africa/Harare',
	'120:120:180:120:180:240:180:180:240:180':	'Asia/Istanbul',
	'120:120:120:120:180:120:120:180:120:120':	'Asia/Jerusalem',
	'180:120:180:120:180:180:180:240:180:180':	'Europe/Kaliningrad',
	'120:120:60:120:120:120:60:120:120:60':	'Africa/Tripoli',
	'120:120:120:180:180:120:120:180:120:120':	'Asia/Amman',
	'180:240:180:180:180:180:240:240:180:180':	'Asia/Baghdad',
	'180:180:180:180:180:180:180:180:180:180':	'Asia/Kuwait',
	'180:120:180:120:180:180:240:240:180:180':	'Europe/Minsk',
	'240:120:240:180:240:180:240:240:180:180':	'Europe/Moscow',
	'210:210:210:210:270:270:210:210:270:210':	'Asia/Tehran',
	'240:240:240:240:240:240:240:240:240:240':	'Asia/Muscat',
	'240:180:300:240:300:240:300:300:240:240':	'Asia/Baku',
	'240:180:300:240:240:240:240:300:240:240':	'Europe/Samara',
	'240:240:240:300:240:240:240:240:240:300':	'Indian/Mauritius',
	'240:180:300:240:240:240:300:300:240:240':	'Asia/Tbilisi',
	'240:180:240:240:300:240:300:300:240:240':	'Asia/Yerevan',
	'270:270:270:270:270:270:270:270:270:270':	'Asia/Kabul',
	'300:300:300:300:300:360:420:420:360:360':	'Asia/Tashkent',
	'360:240:360:300:360:300:360:360:300:300':	'Asia/Yekaterinburg',
	'300:300:300:360:300:300:300:300:300:300':	'Asia/Karachi',
	'330:330:330:330:330:330:330:330:330:330':	'Asia/Kolkata',
	'330:330:390:330:330:330:330:330:330:330':	'Asia/Colombo',
	'345:345:345:345:345:330:345:345:330:330':	'Asia/Katmandu',
	'360:300:420:360:360:360:420:420:360:360':	'Asia/Almaty',
	'360:360:360:360:360:360:360:360:360:360':	'Asia/Dhaka',
	'420:360:420:360:420:420:480:480:420:420':	'Asia/Novosibirsk',
	'390:390:390:390:390:390:390:390:390:390':	'Asia/Rangoon',
	'420:420:420:420:420:420:420:420:420:420':	'Asia/Bangkok',
	'480:360:480:420:480:420:480:480:420:420':	'Asia/Krasnoyarsk',
	'480:480:480:480:480:480:480:540:480:480':	'Asia/Chongqing',
	'540:420:540:480:540:480:540:540:480:480':	'Asia/Irkutsk',
	'480:480:480:480:480:450:480:480:450:480':	'Asia/Kuala_Lumpur',
	'480:480:480:540:480:480:480:480:480:480':	'Australia/Perth',
	'480:480:480:480:480:480:480:480:480:480':	'Asia/Taipei',
	'480:480:480:480:480:480:540:540:480:480':	'Asia/Ulaanbaatar',
	'540:540:540:540:540:540:540:540:540:540':	'Asia/Tokyo',
	'540:540:540:540:540:540:540:600:540:540':	'Asia/Seoul',
	'600:480:600:540:600:540:600:600:540:540':	'Asia/Yakutsk',
	'630:570:570:630:570:570:570:570:570:630':	'Australia/Adelaide',
	'570:570:570:570:570:570:570:570:570:570':	'Australia/Darwin',
	'600:600:600:600:600:600:600:600:600:600':	'Australia/Brisbane',
	'660:600:600:660:600:600:600:600:600:660':	'Australia/Canberra',
	'660:600:660:660:600:600:600:600:600:660':	'Australia/Hobart',
	'720:600:720:660:720:660:720:720:660:660':	'Asia/Magadan',
	'660:540:660:600:660:600:660:660:600:600':	'Asia/Vladivostok',
	'660:660:660:660:660:660:660:660:660:660':	'Pacific/Guadalcanal',
	'720:660:780:720:720:780:780:780:780:720':	'Asia/Anadyr',
	'780:720:780:780:720:720:720:720:720:780':	'Pacific/Auckland',
	'780:720:720:720:720:720:720:720:720:720':	'Pacific/Fiji',
	'780:780:780:780:780:780:780:780:780:780':	'Pacific/Tongatapu',
	'840:-660:-660:-660:-660:-660:-660:-660:-660:-660':	'Pacific/Apia'
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
