"use strict";

function timezones_list(){
	var tz = new TimezoneDetector();
	return tz.getList();
}

function timezones_guess(){
	var tz = new TimezoneDetector();
	var opts = {};
	if (arguments.length > 0) opts.default = arguments[0];
	var ret = tz.detect(opts);
	return ret.zoneId;
}

function timezones_get_canonical(alt_tz, default_tz){
	var tz = new TimezoneDetector();
	return tz.getCanonicalTimezone(alt_tz, default_tz);
}

;(function() {

	var root = this;
	var previous_detector = root.TimezoneDetector;

	var tz = function(){

		var self = this;

		self.getList = function(){

			return _list;
		}

		self.detect = function(opts){

			var out = {
				'zoneId' : 'America/Los_Angeles',
				'method' : 'gave_up',
			};

			if (opts && opts.default){
				out.zoneId = opts.default;
				out.method = 'default';
			}


			out.intl = _try_using_api();
			var api_guess = out.intl.zoneId;

			if (api_guess){
				// is this one of our choices?
				for (var i=0; i<_list.length; i++){
					if (_list[i][1] == api_guess){
						out.zoneId = api_guess;
						out.method = 'intlapi_exact';
						return out;
					}
				}
				// does it map to a manual equivalent?
				if (_manual_alts[api_guess]){
					out.zoneId = _manual_alts[api_guess];
					out.method = 'intl_api_manual';
					return out;
				}
				// does it map to an automatic equivalent?
				if (_auto_alts[api_guess]){
					out.zoneId = _auto_alts[api_guess];
					out.method = 'intl_api_equivalent';
					return out;
				}
				// does it map to a fallback equivalent?
				if (_fallback_alts[api_guess]){
					out.zoneId = _fallback_alts[api_guess];
					out.method = 'intl_api_fallback';
					return out;
				}
			}

			// use auto-detection via probe dates
			out.probe = _try_using_probe();

			if (out.probe.zoneId){
				out.zoneId = out.probe.zoneId;
				out.method = 'date_probe';
				return out;
			}

			//console.log('no match for TZ on key '+key);

			return out;
		}

		self.getCanonicalTimezone = function(alt_tz, default_tz) {
			// check list
			for (var i=0; i<_list.length; i++) {
				if(_list[i][1] == alt_tz) return alt_tz
			}

			// check auto alts
			if(_auto_alts[alt_tz]) return _auto_alts[alt_tz];

			//check manual alts
			if(_manual_alts[alt_tz]) return _manual_alts[alt_tz];

			return default_tz;
		}

		var _try_using_api = function(){

			var out = {
				'zoneId'	: null,
				'hasIntl'	: false,
				'hasDateTime'	: false,
				'hasOptions'	: false,
			};

			try {
				if (typeof Intl === "undefined") return out;

				out.hasIntl = true;

				if (typeof Intl.DateTimeFormat === "undefined") return out;
				var format = Intl.DateTimeFormat();
				if (typeof format === "undefined") return out;

				out.hasDateTime = true;

				if (typeof format.resolvedOptions === "undefined") return out;

				out.hasOptions = true;
				out.zoneId = format.resolvedOptions().timeZone;

			}catch (e){
				return out;
			}

			return out;
		};

		var _try_using_probe = function(){

			var key_parts = [];
			key_parts.push(-1 * new Date(Date.UTC(2008, 10, 27, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2010, 4, 30, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2001, 10, 28, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2002, 4, 7, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2004, 10, 3, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2011, 11, 7, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2012, 11, 10, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2015, 9, 22, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2015, 11, 2, 0, 0, 0, 0)).getTimezoneOffset());
			key_parts.push(-1 * new Date(Date.UTC(2016, 3, 27, 0, 0, 0, 0)).getTimezoneOffset());


			for (var i=1; i<=key_parts.length; i++){

				var key = key_parts.slice(0,i).join(':');
				if (_map[key]){
					return {
						'zoneId'	: _map[key],
						'probeKey'	: key,
						'fullKey'	: key_parts.join(':')
					};
				}
			}

			return {
				'zoneId'	: null,
				'fullKey'	: key_parts.join(':')
			};
		}


		var _map = {
			'-660:-660:-660:-660:-660:-660':	'Pacific/Midway',
			'-540':	'America/Adak',
			'-600':	'Pacific/Honolulu',
			'-570':	'Pacific/Marquesas',
			'-480:-480':	'America/Anchorage',
			'-480:-420':	'America/Tijuana',
			'-420:-420:-420:-480':	'America/Los_Angeles',
			'-420:-420:-420:-420':	'America/Phoenix',
			'-420:-360':	'America/Chihuahua',
			'-360:-360:-360:-420':	'America/Denver',
			'-360:-360:-360:-360':	'America/Regina',
			'-300:-300:-300:-360':	'America/Chicago',
			'-300:-360':	'Pacific/Easter',
			'-360:-300:-360:-360:-300:-360:-360:-300:-360':	'America/Mexico_City',
			'-300:-300:-300:-300:-300:-300:-300:-300':	'America/Bogota',
			'-360:-300:-360:-360:-300:-360:-360:-300:-300':	'America/Cancun',
			'-240:-240:-240:-300:-240:-300:-300:-240:-300':	'America/New_York',
			'-300:-300:-300:-300:-300:-300:-300:-240':	'America/Port-au-Prince',
			'-300:-240':	'America/Havana',
			'-240:-240:-300':	'America/Indiana/Indianapolis',
			'-180:-240:-180:-180':	'America/Asuncion',
			'-180:-180:-180:-240':	'America/Halifax',
			'-270':	'America/Caracas',
			'-180:-240:-180:-240:-240:-180:-180:-240':	'America/Cuiaba',
			'-240:-240:-240:-240':	'America/Manaus',
			'-180:-240:-180:-240:-240:-180:-180:-180':	'America/Santiago',
			'-240:-240:-240:-300:-240:-300:-300:-240:-240':	'America/Grand_Turk',
			'-150':	'America/St_Johns',
			'-180:-180:-120:-180:-180:-180':	'America/Fortaleza',
			'-120:-180:-120':	'America/Sao_Paulo',
			'-180:-180:-180:-180':	'America/Cayenne',
			'-120:-180:-180:-180:-180':	'America/Buenos_Aires',
			'-180:-120':	'America/Godthab',
			'-120:-180:-180:-180:-120':	'America/Montevideo',
			'-120:-120:-120':	'America/Miquelon',
			'-180:-180:-120:-180:-180:-120':	'America/Bahia',
			'-120:-120:-60':	'America/Noronha',
			'-60:0':	'Atlantic/Azores',
			'-60:-60':	'Atlantic/Cape_Verde',
			'0:0:0:0:0:0:0:60':	'Africa/Casablanca',
			'0:60':	'Europe/London',
			'0:0:0:0:0:0:0:0':	'Africa/Monrovia',
			'60:120':	'Europe/Amsterdam',
			'60:60':	'Africa/Algiers',
			'120:60':	'Africa/Windhoek',
			'180:180:120:180:180':	'Asia/Amman',
			'120:180:180':	'Europe/Athens',
			'120:180:120:180:180:120:120:180:120':	'Asia/Beirut',
			'120:180:120:120:120:120:120:120':	'Africa/Cairo',
			'180:180:120:180:120':	'Asia/Damascus',
			'120:180:120:120:120:120:120:180':	'Asia/Gaza',
			'120:120:120:120:120:120:120':	'Africa/Harare',
			'120:180:120:180:120':	'Asia/Jerusalem',
			'120:180:120:180:180:180:180:120':	'Europe/Kaliningrad',
			'120:120:120:120:120:120:60':	'Africa/Tripoli',
			'180:180:180:240':	'Asia/Baghdad',
			'120:180:120:180:180:120:120:180:180':	'Asia/Istanbul',
			'180:180:180:180':	'Asia/Kuwait',
			'120:180:120:180:180:180:180:180':	'Europe/Minsk',
			'180:240:180:240:240:240:240:180:180:180':	'Europe/Moscow',
			'210':	'Asia/Tehran',
			'240:240:240:240':	'Asia/Muscat',
			'180:240:180:240:240:240:240:180:180:240':	'Europe/Astrakhan',
			'240:300:240:300:300:240:240:300':	'Asia/Baku',
			'240:240:240:300:300':	'Europe/Samara',
			'300:240':	'Indian/Mauritius',
			'240:240:240:300:240':	'Asia/Tbilisi',
			'240:300:240:300:300:240:240:240':	'Asia/Yerevan',
			'270':	'Asia/Kabul',
			'300:300':	'Asia/Tashkent',
			'300:360':	'Asia/Yekaterinburg',
			'360:300':	'Asia/Karachi',
			'330:330:330':	'Asia/Kolkata',
			'330:330:360':	'Asia/Colombo',
			'345':	'Asia/Katmandu',
			'360:360:360:420':	'Asia/Almaty',
			'360:360:360:360':	'Asia/Dhaka',
			'390':	'Asia/Rangoon',
			'360:420:360:420:420:420:420:360:360:360':	'Asia/Novosibirsk',
			'420:420:420:420':	'Asia/Bangkok',
			'360:420:360:420:420:420:420:360:360:420':	'Asia/Barnaul',
			'420:420:420:480':	'Asia/Hovd',
			'420:480':	'Asia/Krasnoyarsk',
			'360:420:420':	'Asia/Tomsk',
			'480:480:480:480':	'Asia/Chongqing',
			'480:540':	'Asia/Irkutsk',
			'540:480':	'Australia/Perth',
			'480:480:480:540':	'Asia/Ulaanbaatar',
			'540:540:540:540:540:540:540:510':	'Asia/Pyongyang',
			'585':	'Australia/Eucla',
			'540:600:540:600:600:600:600:480':	'Asia/Chita',
			'540:540:540:540:540:540:540:540':	'Asia/Tokyo',
			'540:600:540:600:600:600:600:540':	'Asia/Yakutsk',
			'630':	'Australia/Adelaide',
			'570':	'Australia/Darwin',
			'600:600:600:600:600:600:600:600':	'Australia/Brisbane',
			'660:600:660:600:600':	'Australia/Canberra',
			'660:600:660:600:660':	'Australia/Hobart',
			'600:660:600:660:660:660:660:600:600:600':	'Asia/Vladivostok',
			'660:630':	'Australia/Lord_Howe',
			'600:600:600:600:600:600:600:660':	'Pacific/Bougainville',
			'660:720:660:720:720:720:720:660':	'Asia/Srednekolymsk',
			'660:720:660:720:720:720:720:600':	'Asia/Magadan',
			'690':	'Pacific/Norfolk',
			'600:660:600:660:660:660:660:600:600:660':	'Asia/Sakhalin',
			'660:660':	'Pacific/Guadalcanal',
			'720:720:720:780':	'Asia/Anadyr',
			'780:720':	'Pacific/Auckland',
			'720:720:720:720':	'Pacific/Fiji',
			'825':	'Pacific/Chatham',
			'780:780':	'Pacific/Tongatapu',
			'-660:-660:-660:-660:-660:-600':	'Pacific/Apia',
			'840':	'Pacific/Kiritimati'
		};

		var _list = [
			["(UTC-11:00) Midway Island, American Samoa", 'Pacific/Midway'],
			["(UTC-10:00) Aleutian Islands", 'America/Adak'],
			["(UTC-10:00) Hawaii", 'Pacific/Honolulu'],
			["(UTC-09:30) Marquesas Islands", 'Pacific/Marquesas'],
			["(UTC-09:00) Alaska", 'America/Anchorage'],
			["(UTC-08:00) Baja California", 'America/Tijuana'],
			["(UTC-08:00) Pacific Time (US and Canada)", 'America/Los_Angeles'],
			["(UTC-07:00) Arizona", 'America/Phoenix'],
			["(UTC-07:00) Chihuahua, La Paz, Mazatlan", 'America/Chihuahua'],
			["(UTC-07:00) Mountain Time (US and Canada)", 'America/Denver'],
			["(UTC-06:00) Central America", 'America/Belize'],
			["(UTC-06:00) Central Time (US and Canada)	", 'America/Chicago'],
			["(UTC-06:00) Easter Island", 'Pacific/Easter'],
			["(UTC-06:00) Guadalajara, Mexico City, Monterrey", 'America/Mexico_City'],
			["(UTC-06:00) Saskatchewan", 'America/Regina'],
			["(UTC-05:00) Bogota, Lima, Quito", 'America/Bogota'],
			["(UTC-05:00) Chetumal", 'America/Cancun'],
			["(UTC-05:00) Eastern Time (US and Canada)", 'America/New_York'],
			["(UTC-05:00) Haiti", 'America/Port-au-Prince'],
			["(UTC-05:00) Havana", 'America/Havana'],
			["(UTC-05:00) Indiana (East)", 'America/Indiana/Indianapolis'],
			["(UTC-04:00) Asuncion", 'America/Asuncion'],
			["(UTC-04:00) Atlantic Time (Canada)", 'America/Halifax'],
			["(UTC-04:00) Caracas", 'America/Caracas'],
			["(UTC-04:00) Cuiaba", 'America/Cuiaba'],
			["(UTC-04:00) Georgetown, La Paz, Manaus, San Juan", 'America/Manaus'],
			["(UTC-04:00) Santiago", 'America/Santiago'],
			["(UTC-04:00) Turks and Caicos", 'America/Grand_Turk'],
			["(UTC-03:30) Newfoundland", 'America/St_Johns'],
			["(UTC-03:00) Araguaina", 'America/Fortaleza'],
			["(UTC-03:00) Brasilia", 'America/Sao_Paulo'],
			["(UTC-03:00) Cayenne, Fortaleza", 'America/Cayenne'],
			["(UTC-03:00) City of Buenos Aires", 'America/Buenos_Aires'],
			["(UTC-03:00) Greenland", 'America/Godthab'],
			["(UTC-03:00) Montevideo", 'America/Montevideo'],
			["(UTC-03:00) Saint Pierre and Miquelon", 'America/Miquelon'],
			["(UTC-03:00) Salvador", 'America/Bahia'],
			["(UTC-02:00) Fernando de Noronha", 'America/Noronha'],
			["(UTC-01:00) Azores", 'Atlantic/Azores'],
			["(UTC-01:00) Cabo Verde Islands", 'Atlantic/Cape_Verde'],
			["(UTC) Casablanca", 'Africa/Casablanca'],
			["(UTC) Dublin, Edinburgh, Lisbon, London", 'Europe/London'],
			["(UTC) Monrovia, Reykjavik", 'Africa/Monrovia'],
			["(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", 'Europe/Amsterdam'],
			["(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", 'Europe/Belgrade'],
			["(UTC+01:00) Brussels, Copenhagen, Madrid, Paris", 'Europe/Brussels'],
			["(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb", 'Europe/Warsaw'],
			["(UTC+01:00) West Central Africa", 'Africa/Algiers'],
			["(UTC+01:00) Windhoek", 'Africa/Windhoek'],
			["(UTC+02:00) Amman", 'Asia/Amman'],
			["(UTC+02:00) Athens, Bucharest", 'Europe/Athens'],
			["(UTC+02:00) Beirut", 'Asia/Beirut'],
			["(UTC+02:00) Cairo", 'Africa/Cairo'],
			["(UTC+02:00) Damascus", 'Asia/Damascus'],
			["(UTC+02:00) Gaza, Hebron", 'Asia/Gaza'],
			["(UTC+02:00) Harare, Pretoria", 'Africa/Harare'],
			["(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius", 'Europe/Helsinki'],
			["(UTC+02:00) Jerusalem", 'Asia/Jerusalem'],
			["(UTC+02:00) Kaliningrad", 'Europe/Kaliningrad'],
			["(UTC+02:00) Tripoli", 'Africa/Tripoli'],
			["(UTC+03:00) Baghdad", 'Asia/Baghdad'],
			["(UTC+03:00) Istanbul", 'Asia/Istanbul'],
			["(UTC+03:00) Kuwait, Riyadh", 'Asia/Kuwait'],
			["(UTC+03:00) Minsk", 'Europe/Minsk'],
			["(UTC+03:00) Moscow, St. Petersburg, Volgograd", 'Europe/Moscow'],
			["(UTC+03:00) Nairobi", 'Africa/Nairobi'],
			["(UTC+03:30) Tehran", 'Asia/Tehran'],
			["(UTC+04:00) Abu Dhabi, Muscat", 'Asia/Muscat'],
			["(UTC+04:00) Astrakhan, Ulyanovsk", 'Europe/Astrakhan'],
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
			["(UTC+06:30) Yangon (Rangoon)", 'Asia/Rangoon'],
			["(UTC+07:00) Novosibirsk", 'Asia/Novosibirsk'],
			["(UTC+07:00) Bangkok, Hanoi, Jakarta", 'Asia/Bangkok'],
			["(UTC+07:00) Barnaul, Gorno-Altaysk", 'Asia/Barnaul'],
			["(UTC+07:00) Hovd", 'Asia/Hovd'],
			["(UTC+07:00) Krasnoyarsk", 'Asia/Krasnoyarsk'],
			["(UTC+07:00) Tomsk", 'Asia/Tomsk'],
			["(UTC+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi", 'Asia/Chongqing'],
			["(UTC+08:00) Irkutsk", 'Asia/Irkutsk'],
			["(UTC+08:00) Kuala Lumpur, Singapore", 'Asia/Kuala_Lumpur'],
			["(UTC+08:00) Perth", 'Australia/Perth'],
			["(UTC+08:00) Taipei", 'Asia/Taipei'],
			["(UTC+08:00) Ulaanbaatar", 'Asia/Ulaanbaatar'],
			["(UTC+08:30) Pyongyang", 'Asia/Pyongyang'],
			["(UTC+08:45) Eucla", 'Australia/Eucla'],
			["(UTC+09:00) Chita", 'Asia/Chita'],
			["(UTC+09:00) Osaka, Sapporo, Tokyo", 'Asia/Tokyo'],
			["(UTC+09:00) Seoul", 'Asia/Seoul'],
			["(UTC+09:00) Yakutsk", 'Asia/Yakutsk'],
			["(UTC+09:30) Adelaide", 'Australia/Adelaide'],
			["(UTC+09:30) Darwin", 'Australia/Darwin'],
			["(UTC+10:00) Brisbane", 'Australia/Brisbane'],
			["(UTC+10:00) Canberra, Melbourne, Sydney", 'Australia/Canberra'],
			["(UTC+10:00) Guam, Port Moresby", 'Pacific/Guam'],
			["(UTC+10:00) Hobart", 'Australia/Hobart'],
			["(UTC+10:00) Vladivostok", 'Asia/Vladivostok'],
			["(UTC+10:30) Lord Howe Island", 'Australia/Lord_Howe'],
			["(UTC+11:00) Bougainville Island", 'Pacific/Bougainville'],
			["(UTC+11:00) Chokirdakh", 'Asia/Srednekolymsk'],
			["(UTC+11:00) Magadan", 'Asia/Magadan'],
			["(UTC+11:00) Norfolk Island", 'Pacific/Norfolk'],
			["(UTC+11:00) Sakhalin", 'Asia/Sakhalin'],
			["(UTC+11:00) Solomon Islands, New Caledonia", 'Pacific/Guadalcanal'],
			["(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky", 'Asia/Anadyr'],
			["(UTC+12:00) Auckland, Wellington", 'Pacific/Auckland'],
			["(UTC+12:00) Fiji Islands", 'Pacific/Fiji'],
			["(UTC+12:45) Chatham Islands", 'Pacific/Chatham'],
			["(UTC+13:00) Nuku'alofa", 'Pacific/Tongatapu'],
			["(UTC+13:00) Samoa", 'Pacific/Apia'],
			["(UTC+14:00) Kiritimati Island", 'Pacific/Kiritimati']
		];

		var _manual_alts = {
			"America\/Guatemala": "America\/Belize",
			"America\/Indianapolis": "America\/Indiana\/Indianapolis",
			"America\/La_Paz": "America\/Manaus",
			"UTC": "Africa\/Monrovia",
			"Atlantic\/Reykjavik": "Africa\/Monrovia",
			"Europe\/Berlin": "Europe\/Amsterdam",
			"Europe\/Budapest": "Europe\/Belgrade",
			"Europe\/Paris": "Europe\/Brussels",
			"Africa\/Lagos": "Africa\/Algiers",
			"Europe\/Bucharest": "Europe\/Athens",
			"Africa\/Johannesburg": "Africa\/Harare",
			"Europe\/Kiev": "Europe\/Helsinki",
			"Europe\/Istanbul": "Asia\/Istanbul",
			"Asia\/Riyadh": "Asia\/Kuwait",
			"Asia\/Dubai": "Asia\/Muscat",
			"Asia\/Calcutta": "Asia\/Kolkata",
			"Asia\/Shanghai": "Asia\/Chongqing",
			"Asia\/Singapore": "Asia\/Kuala_Lumpur",
			"Australia\/Sydney": "Australia\/Canberra",
			"Pacific\/Port_Moresby": "Pacific\/Guam",
			"Asia\/Kamchatka": "Asia\/Anadyr"
		}
		var _auto_alts = {
			"Africa\/Abidjan": "Africa\/Monrovia",
			"Africa\/Accra": "Africa\/Monrovia",
			"Africa\/Addis_Ababa": "Europe\/Moscow",
			"Africa\/Asmara": "Europe\/Moscow",
			"Africa\/Asmera": "Europe\/Moscow",
			"Africa\/Bamako": "Africa\/Monrovia",
			"Africa\/Bangui": "Africa\/Algiers",
			"Africa\/Banjul": "Africa\/Monrovia",
			"Africa\/Bissau": "Africa\/Monrovia",
			"Africa\/Blantyre": "Africa\/Windhoek",
			"Africa\/Brazzaville": "Africa\/Algiers",
			"Africa\/Bujumbura": "Africa\/Windhoek",
			"Africa\/Ceuta": "Europe\/Amsterdam",
			"Africa\/Conakry": "Africa\/Monrovia",
			"Africa\/Dakar": "Africa\/Monrovia",
			"Africa\/Dar_es_Salaam": "Europe\/Moscow",
			"Africa\/Djibouti": "Europe\/Moscow",
			"Africa\/Douala": "Africa\/Algiers",
			"Africa\/El_Aaiun": "Africa\/Casablanca",
			"Africa\/Freetown": "Africa\/Monrovia",
			"Africa\/Gaborone": "Africa\/Windhoek",
			"Africa\/Johannesburg": "Africa\/Windhoek",
			"Africa\/Kampala": "Europe\/Moscow",
			"Africa\/Khartoum": "Africa\/Windhoek",
			"Africa\/Kigali": "Africa\/Windhoek",
			"Africa\/Kinshasa": "Africa\/Algiers",
			"Africa\/Lagos": "Africa\/Algiers",
			"Africa\/Libreville": "Africa\/Algiers",
			"Africa\/Lome": "Africa\/Monrovia",
			"Africa\/Luanda": "Africa\/Algiers",
			"Africa\/Lubumbashi": "Africa\/Windhoek",
			"Africa\/Lusaka": "Africa\/Windhoek",
			"Africa\/Malabo": "Africa\/Algiers",
			"Africa\/Maputo": "Africa\/Windhoek",
			"Africa\/Maseru": "Africa\/Windhoek",
			"Africa\/Mbabane": "Africa\/Windhoek",
			"Africa\/Mogadishu": "Europe\/Moscow",
			"Africa\/Ndjamena": "Africa\/Algiers",
			"Africa\/Niamey": "Africa\/Algiers",
			"Africa\/Nouakchott": "Africa\/Monrovia",
			"Africa\/Ouagadougou": "Africa\/Monrovia",
			"Africa\/Porto-Novo": "Africa\/Algiers",
			"Africa\/Sao_Tome": "Africa\/Monrovia",
			"Africa\/Timbuktu": "Africa\/Monrovia",
			"Africa\/Tunis": "Africa\/Algiers",
			"America\/Anguilla": "America\/Manaus",
			"America\/Antigua": "America\/Manaus",
			"America\/Araguaina": "America\/Buenos_Aires",
			"America\/Argentina\/Buenos_Aires": "America\/Buenos_Aires",
			"America\/Argentina\/Catamarca": "America\/Buenos_Aires",
			"America\/Argentina\/ComodRivadavia": "America\/Buenos_Aires",
			"America\/Argentina\/Cordoba": "America\/Buenos_Aires",
			"America\/Argentina\/Jujuy": "America\/Buenos_Aires",
			"America\/Argentina\/La_Rioja": "America\/Buenos_Aires",
			"America\/Argentina\/Mendoza": "America\/Buenos_Aires",
			"America\/Argentina\/Rio_Gallegos": "America\/Buenos_Aires",
			"America\/Argentina\/Salta": "America\/Buenos_Aires",
			"America\/Argentina\/San_Juan": "America\/Buenos_Aires",
			"America\/Argentina\/San_Luis": "America\/Buenos_Aires",
			"America\/Argentina\/Tucuman": "America\/Buenos_Aires",
			"America\/Argentina\/Ushuaia": "America\/Buenos_Aires",
			"America\/Aruba": "America\/Manaus",
			"America\/Atikokan": "America\/Bogota",
			"America\/Atka": "America\/Adak",
			"America\/Bahia_Banderas": "America\/Mexico_City",
			"America\/Barbados": "America\/Manaus",
			"America\/Belem": "America\/Buenos_Aires",
			"America\/Blanc-Sablon": "America\/Manaus",
			"America\/Boa_Vista": "America\/Manaus",
			"America\/Boise": "America\/Denver",
			"America\/Cambridge_Bay": "America\/Denver",
			"America\/Campo_Grande": "America\/Manaus",
			"America\/Catamarca": "America\/Buenos_Aires",
			"America\/Cayman": "America\/Bogota",
			"America\/Coral_Harbour": "America\/Bogota",
			"America\/Cordoba": "America\/Buenos_Aires",
			"America\/Costa_Rica": "America\/Regina",
			"America\/Creston": "America\/Phoenix",
			"America\/Curacao": "America\/Manaus",
			"America\/Danmarkshavn": "Africa\/Monrovia",
			"America\/Dawson_Creek": "America\/Phoenix",
			"America\/Detroit": "America\/New_York",
			"America\/Dominica": "America\/Manaus",
			"America\/Edmonton": "America\/Denver",
			"America\/Eirunepe": "America\/Bogota",
			"America\/El_Salvador": "America\/Regina",
			"America\/Ensenada": "America\/Los_Angeles",
			"America\/Fort_Nelson": "America\/Phoenix",
			"America\/Fort_Wayne": "America\/New_York",
			"America\/Glace_Bay": "America\/Halifax",
			"America\/Goose_Bay": "America\/Halifax",
			"America\/Grenada": "America\/Manaus",
			"America\/Guadeloupe": "America\/Manaus",
			"America\/Guatemala": "America\/Regina",
			"America\/Guayaquil": "America\/Bogota",
			"America\/Guyana": "America\/Manaus",
			"America\/Hermosillo": "America\/Phoenix",
			"America\/Indiana\/Knox": "America\/Chicago",
			"America\/Indiana\/Marengo": "America\/New_York",
			"America\/Indiana\/Petersburg": "America\/New_York",
			"America\/Indiana\/Tell_City": "America\/Chicago",
			"America\/Indiana\/Vevay": "America\/New_York",
			"America\/Indiana\/Vincennes": "America\/New_York",
			"America\/Indiana\/Winamac": "America\/New_York",
			"America\/Indianapolis": "America\/New_York",
			"America\/Inuvik": "America\/Denver",
			"America\/Iqaluit": "America\/New_York",
			"America\/Jamaica": "America\/Bogota",
			"America\/Jujuy": "America\/Buenos_Aires",
			"America\/Juneau": "America\/Anchorage",
			"America\/Kentucky\/Louisville": "America\/New_York",
			"America\/Kentucky\/Monticello": "America\/New_York",
			"America\/Knox_IN": "America\/Chicago",
			"America\/Kralendijk": "America\/Manaus",
			"America\/La_Paz": "America\/Manaus",
			"America\/Lima": "America\/Bogota",
			"America\/Louisville": "America\/New_York",
			"America\/Lower_Princes": "America\/Manaus",
			"America\/Maceio": "America\/Buenos_Aires",
			"America\/Managua": "America\/Regina",
			"America\/Marigot": "America\/Manaus",
			"America\/Martinique": "America\/Manaus",
			"America\/Matamoros": "America\/Chicago",
			"America\/Mazatlan": "America\/Chihuahua",
			"America\/Mendoza": "America\/Buenos_Aires",
			"America\/Menominee": "America\/Chicago",
			"America\/Merida": "America\/Mexico_City",
			"America\/Metlakatla": "America\/Anchorage",
			"America\/Moncton": "America\/Halifax",
			"America\/Monterrey": "America\/Mexico_City",
			"America\/Montreal": "America\/New_York",
			"America\/Montserrat": "America\/Manaus",
			"America\/Nassau": "America\/New_York",
			"America\/Nipigon": "America\/New_York",
			"America\/Nome": "America\/Anchorage",
			"America\/North_Dakota\/Beulah": "America\/Chicago",
			"America\/North_Dakota\/Center": "America\/Chicago",
			"America\/North_Dakota\/New_Salem": "America\/Chicago",
			"America\/Nuuk": "America\/Godthab",
			"America\/Ojinaga": "America\/Denver",
			"America\/Panama": "America\/Bogota",
			"America\/Pangnirtung": "America\/New_York",
			"America\/Paramaribo": "America\/Buenos_Aires",
			"America\/Port_of_Spain": "America\/Manaus",
			"America\/Porto_Acre": "America\/Bogota",
			"America\/Porto_Velho": "America\/Manaus",
			"America\/Puerto_Rico": "America\/Manaus",
			"America\/Punta_Arenas": "America\/Buenos_Aires",
			"America\/Rainy_River": "America\/Chicago",
			"America\/Rankin_Inlet": "America\/Chicago",
			"America\/Recife": "America\/Buenos_Aires",
			"America\/Resolute": "America\/Chicago",
			"America\/Rio_Branco": "America\/Bogota",
			"America\/Rosario": "America\/Buenos_Aires",
			"America\/Santa_Isabel": "America\/Los_Angeles",
			"America\/Santarem": "America\/Buenos_Aires",
			"America\/Santo_Domingo": "America\/Manaus",
			"America\/Scoresbysund": "Atlantic\/Azores",
			"America\/Shiprock": "America\/Denver",
			"America\/Sitka": "America\/Anchorage",
			"America\/St_Barthelemy": "America\/Manaus",
			"America\/St_Kitts": "America\/Manaus",
			"America\/St_Lucia": "America\/Manaus",
			"America\/St_Thomas": "America\/Manaus",
			"America\/St_Vincent": "America\/Manaus",
			"America\/Swift_Current": "America\/Regina",
			"America\/Tegucigalpa": "America\/Regina",
			"America\/Thule": "America\/Halifax",
			"America\/Thunder_Bay": "America\/New_York",
			"America\/Toronto": "America\/New_York",
			"America\/Tortola": "America\/Manaus",
			"America\/Vancouver": "America\/Los_Angeles",
			"America\/Virgin": "America\/Manaus",
			"America\/Winnipeg": "America\/Chicago",
			"America\/Yakutat": "America\/Anchorage",
			"America\/Yellowknife": "America\/Denver",
			"Antarctica\/Davis": "Asia\/Novosibirsk",
			"Antarctica\/DumontDUrville": "Australia\/Brisbane",
			"Antarctica\/Macquarie": "Australia\/Canberra",
			"Antarctica\/Mawson": "Asia\/Tashkent",
			"Antarctica\/McMurdo": "Pacific\/Auckland",
			"Antarctica\/Palmer": "America\/Buenos_Aires",
			"Antarctica\/Rothera": "America\/Buenos_Aires",
			"Antarctica\/South_Pole": "Pacific\/Auckland",
			"Antarctica\/Syowa": "Europe\/Moscow",
			"Antarctica\/Vostok": "Asia\/Dhaka",
			"Arctic\/Longyearbyen": "Europe\/Amsterdam",
			"Asia\/Aden": "Europe\/Moscow",
			"Asia\/Aqtau": "Asia\/Tashkent",
			"Asia\/Aqtobe": "Asia\/Tashkent",
			"Asia\/Ashgabat": "Asia\/Tashkent",
			"Asia\/Ashkhabad": "Asia\/Tashkent",
			"Asia\/Atyrau": "Asia\/Tashkent",
			"Asia\/Bahrain": "Europe\/Moscow",
			"Asia\/Bishkek": "Asia\/Dhaka",
			"Asia\/Brunei": "Asia\/Ulaanbaatar",
			"Asia\/Calcutta": "Asia\/Kolkata",
			"Asia\/Choibalsan": "Asia\/Ulaanbaatar",
			"Asia\/Chungking": "Asia\/Ulaanbaatar",
			"Asia\/Dacca": "Asia\/Dhaka",
			"Asia\/Dili": "Asia\/Tokyo",
			"Asia\/Dubai": "Asia\/Baku",
			"Asia\/Dushanbe": "Asia\/Tashkent",
			"Asia\/Famagusta": "Europe\/Athens",
			"Asia\/Harbin": "Asia\/Ulaanbaatar",
			"Asia\/Hebron": "Asia\/Gaza",
			"Asia\/Ho_Chi_Minh": "Asia\/Novosibirsk",
			"Asia\/Hong_Kong": "Asia\/Ulaanbaatar",
			"Asia\/Jakarta": "Asia\/Novosibirsk",
			"Asia\/Jayapura": "Asia\/Tokyo",
			"Asia\/Kamchatka": "Asia\/Anadyr",
			"Asia\/Kashgar": "Asia\/Dhaka",
			"Asia\/Kathmandu": "Asia\/Katmandu",
			"Asia\/Khandyga": "Asia\/Tokyo",
			"Asia\/Kuching": "Asia\/Ulaanbaatar",
			"Asia\/Macao": "Asia\/Ulaanbaatar",
			"Asia\/Macau": "Asia\/Ulaanbaatar",
			"Asia\/Makassar": "Asia\/Ulaanbaatar",
			"Asia\/Manila": "Asia\/Ulaanbaatar",
			"Asia\/Nicosia": "Europe\/Athens",
			"Asia\/Novokuznetsk": "Asia\/Novosibirsk",
			"Asia\/Omsk": "Asia\/Dhaka",
			"Asia\/Oral": "Asia\/Tashkent",
			"Asia\/Phnom_Penh": "Asia\/Novosibirsk",
			"Asia\/Pontianak": "Asia\/Novosibirsk",
			"Asia\/Qatar": "Europe\/Moscow",
			"Asia\/Qostanay": "Asia\/Dhaka",
			"Asia\/Qyzylorda": "Asia\/Tashkent",
			"Asia\/Riyadh": "Europe\/Moscow",
			"Asia\/Saigon": "Asia\/Novosibirsk",
			"Asia\/Samarkand": "Asia\/Tashkent",
			"Asia\/Shanghai": "Asia\/Ulaanbaatar",
			"Asia\/Singapore": "Asia\/Ulaanbaatar",
			"Asia\/Tel_Aviv": "Asia\/Jerusalem",
			"Asia\/Thimbu": "Asia\/Dhaka",
			"Asia\/Thimphu": "Asia\/Dhaka",
			"Asia\/Ujung_Pandang": "Asia\/Ulaanbaatar",
			"Asia\/Ulan_Bator": "Asia\/Ulaanbaatar",
			"Asia\/Urumqi": "Asia\/Dhaka",
			"Asia\/Ust-Nera": "Australia\/Brisbane",
			"Asia\/Vientiane": "Asia\/Novosibirsk",
			"Asia\/Yangon": "Asia\/Rangoon",
			"Atlantic\/Bermuda": "America\/Halifax",
			"Atlantic\/Canary": "Europe\/London",
			"Atlantic\/Faeroe": "Europe\/London",
			"Atlantic\/Faroe": "Europe\/London",
			"Atlantic\/Jan_Mayen": "Europe\/Amsterdam",
			"Atlantic\/Madeira": "Europe\/London",
			"Atlantic\/Reykjavik": "Africa\/Monrovia",
			"Atlantic\/South_Georgia": "America\/Noronha",
			"Atlantic\/St_Helena": "Africa\/Monrovia",
			"Atlantic\/Stanley": "America\/Buenos_Aires",
			"Australia\/ACT": "Australia\/Canberra",
			"Australia\/Broken_Hill": "Australia\/Adelaide",
			"Australia\/Currie": "Australia\/Canberra",
			"Australia\/LHI": "Australia\/Lord_Howe",
			"Australia\/Lindeman": "Australia\/Brisbane",
			"Australia\/Melbourne": "Australia\/Canberra",
			"Australia\/NSW": "Australia\/Canberra",
			"Australia\/North": "Australia\/Darwin",
			"Australia\/Queensland": "Australia\/Brisbane",
			"Australia\/South": "Australia\/Adelaide",
			"Australia\/Sydney": "Australia\/Canberra",
			"Australia\/Tasmania": "Australia\/Canberra",
			"Australia\/Victoria": "Australia\/Canberra",
			"Australia\/West": "Asia\/Ulaanbaatar",
			"Australia\/Yancowinna": "Australia\/Adelaide",
			"Brazil\/Acre": "America\/Bogota",
			"Brazil\/DeNoronha": "America\/Noronha",
			"Brazil\/East": "America\/Buenos_Aires",
			"Brazil\/West": "America\/Manaus",
			"CST6CDT": "America\/Chicago",
			"Canada\/Atlantic": "America\/Halifax",
			"Canada\/Central": "America\/Chicago",
			"Canada\/Eastern": "America\/New_York",
			"Canada\/Mountain": "America\/Denver",
			"Canada\/Newfoundland": "America\/St_Johns",
			"Canada\/Pacific": "America\/Los_Angeles",
			"Canada\/Saskatchewan": "America\/Regina",
			"Chile\/Continental": "America\/Santiago",
			"Chile\/EasterIsland": "Pacific\/Easter",
			"Cuba": "America\/Havana",
			"EST5EDT": "America\/New_York",
			"Egypt": "Africa\/Windhoek",
			"Etc\/GMT": "Africa\/Monrovia",
			"Etc\/GMT+0": "Africa\/Monrovia",
			"Etc\/GMT+1": "Atlantic\/Cape_Verde",
			"Etc\/GMT+10": "Pacific\/Honolulu",
			"Etc\/GMT+11": "Pacific\/Midway",
			"Etc\/GMT+2": "America\/Noronha",
			"Etc\/GMT+3": "America\/Buenos_Aires",
			"Etc\/GMT+4": "America\/Manaus",
			"Etc\/GMT+5": "America\/Bogota",
			"Etc\/GMT+6": "America\/Regina",
			"Etc\/GMT+7": "America\/Phoenix",
			"Etc\/GMT-0": "Africa\/Monrovia",
			"Etc\/GMT-1": "Africa\/Algiers",
			"Etc\/GMT-10": "Australia\/Brisbane",
			"Etc\/GMT-11": "Pacific\/Bougainville",
			"Etc\/GMT-12": "Asia\/Anadyr",
			"Etc\/GMT-13": "Pacific\/Tongatapu",
			"Etc\/GMT-14": "Pacific\/Kiritimati",
			"Etc\/GMT-2": "Africa\/Windhoek",
			"Etc\/GMT-3": "Europe\/Moscow",
			"Etc\/GMT-4": "Asia\/Baku",
			"Etc\/GMT-5": "Asia\/Tashkent",
			"Etc\/GMT-6": "Asia\/Dhaka",
			"Etc\/GMT-7": "Asia\/Novosibirsk",
			"Etc\/GMT-8": "Asia\/Ulaanbaatar",
			"Etc\/GMT-9": "Asia\/Tokyo",
			"Etc\/GMT0": "Africa\/Monrovia",
			"Etc\/Greenwich": "Africa\/Monrovia",
			"Etc\/UCT": "Africa\/Monrovia",
			"Etc\/UTC": "Africa\/Monrovia",
			"Etc\/Universal": "Africa\/Monrovia",
			"Etc\/Zulu": "Africa\/Monrovia",
			"Europe\/Andorra": "Europe\/Amsterdam",
			"Europe\/Belfast": "Europe\/London",
			"Europe\/Berlin": "Europe\/Amsterdam",
			"Europe\/Bratislava": "Europe\/Amsterdam",
			"Europe\/Bucharest": "Europe\/Athens",
			"Europe\/Budapest": "Europe\/Amsterdam",
			"Europe\/Busingen": "Europe\/Amsterdam",
			"Europe\/Copenhagen": "Europe\/Amsterdam",
			"Europe\/Gibraltar": "Europe\/Amsterdam",
			"Europe\/Guernsey": "Europe\/London",
			"Europe\/Isle_of_Man": "Europe\/London",
			"Europe\/Istanbul": "Europe\/Moscow",
			"Europe\/Jersey": "Europe\/London",
			"Europe\/Kiev": "Europe\/Athens",
			"Europe\/Kirov": "Europe\/Moscow",
			"Europe\/Lisbon": "Europe\/London",
			"Europe\/Ljubljana": "Europe\/Amsterdam",
			"Europe\/Luxembourg": "Europe\/Amsterdam",
			"Europe\/Madrid": "Europe\/Amsterdam",
			"Europe\/Malta": "Europe\/Amsterdam",
			"Europe\/Mariehamn": "Europe\/Athens",
			"Europe\/Monaco": "Europe\/Amsterdam",
			"Europe\/Nicosia": "Europe\/Athens",
			"Europe\/Oslo": "Europe\/Amsterdam",
			"Europe\/Paris": "Europe\/Amsterdam",
			"Europe\/Podgorica": "Europe\/Amsterdam",
			"Europe\/Prague": "Europe\/Amsterdam",
			"Europe\/Riga": "Europe\/Athens",
			"Europe\/Rome": "Europe\/Amsterdam",
			"Europe\/San_Marino": "Europe\/Amsterdam",
			"Europe\/Sarajevo": "Europe\/Amsterdam",
			"Europe\/Saratov": "Asia\/Baku",
			"Europe\/Simferopol": "Europe\/Moscow",
			"Europe\/Skopje": "Europe\/Amsterdam",
			"Europe\/Sofia": "Europe\/Athens",
			"Europe\/Stockholm": "Europe\/Amsterdam",
			"Europe\/Tallinn": "Europe\/Athens",
			"Europe\/Tirane": "Europe\/Amsterdam",
			"Europe\/Ulyanovsk": "Asia\/Baku",
			"Europe\/Uzhgorod": "Europe\/Athens",
			"Europe\/Vaduz": "Europe\/Amsterdam",
			"Europe\/Vatican": "Europe\/Amsterdam",
			"Europe\/Vienna": "Europe\/Amsterdam",
			"Europe\/Vilnius": "Europe\/Athens",
			"Europe\/Zagreb": "Europe\/Amsterdam",
			"Europe\/Zaporozhye": "Europe\/Athens",
			"Europe\/Zurich": "Europe\/Amsterdam",
			"Factory": "Africa\/Monrovia",
			"GB": "Europe\/London",
			"GB-Eire": "Europe\/London",
			"GMT0": "Africa\/Monrovia",
			"Greenwich": "Africa\/Monrovia",
			"Hongkong": "Asia\/Ulaanbaatar",
			"Iceland": "Africa\/Monrovia",
			"Indian\/Antananarivo": "Europe\/Moscow",
			"Indian\/Chagos": "Asia\/Dhaka",
			"Indian\/Christmas": "Asia\/Novosibirsk",
			"Indian\/Cocos": "Asia\/Rangoon",
			"Indian\/Comoro": "Europe\/Moscow",
			"Indian\/Kerguelen": "Asia\/Tashkent",
			"Indian\/Mahe": "Asia\/Baku",
			"Indian\/Maldives": "Asia\/Tashkent",
			"Indian\/Mayotte": "Europe\/Moscow",
			"Indian\/Reunion": "Asia\/Baku",
			"Iran": "Asia\/Tehran",
			"Israel": "Asia\/Jerusalem",
			"Jamaica": "America\/Bogota",
			"Japan": "Asia\/Tokyo",
			"Kwajalein": "Asia\/Anadyr",
			"Libya": "Africa\/Windhoek",
			"MST7MDT": "America\/Denver",
			"Mexico\/BajaNorte": "America\/Los_Angeles",
			"Mexico\/BajaSur": "America\/Chihuahua",
			"Mexico\/General": "America\/Mexico_City",
			"NZ": "Pacific\/Auckland",
			"NZ-CHAT": "Pacific\/Chatham",
			"Navajo": "America\/Denver",
			"PRC": "Asia\/Ulaanbaatar",
			"PST8PDT": "America\/Los_Angeles",
			"Pacific\/Chuuk": "Australia\/Brisbane",
			"Pacific\/Efate": "Pacific\/Bougainville",
			"Pacific\/Enderbury": "Pacific\/Tongatapu",
			"Pacific\/Fakaofo": "Pacific\/Tongatapu",
			"Pacific\/Funafuti": "Asia\/Anadyr",
			"Pacific\/Galapagos": "America\/Regina",
			"Pacific\/Johnston": "Pacific\/Honolulu",
			"Pacific\/Kanton": "Pacific\/Tongatapu",
			"Pacific\/Kosrae": "Pacific\/Bougainville",
			"Pacific\/Kwajalein": "Asia\/Anadyr",
			"Pacific\/Majuro": "Asia\/Anadyr",
			"Pacific\/Nauru": "Asia\/Anadyr",
			"Pacific\/Niue": "Pacific\/Midway",
			"Pacific\/Noumea": "Pacific\/Bougainville",
			"Pacific\/Pago_Pago": "Pacific\/Midway",
			"Pacific\/Palau": "Asia\/Tokyo",
			"Pacific\/Pohnpei": "Pacific\/Bougainville",
			"Pacific\/Ponape": "Pacific\/Bougainville",
			"Pacific\/Port_Moresby": "Australia\/Brisbane",
			"Pacific\/Rarotonga": "Pacific\/Honolulu",
			"Pacific\/Saipan": "Australia\/Brisbane",
			"Pacific\/Samoa": "Pacific\/Midway",
			"Pacific\/Tahiti": "Pacific\/Honolulu",
			"Pacific\/Tarawa": "Asia\/Anadyr",
			"Pacific\/Truk": "Australia\/Brisbane",
			"Pacific\/Wake": "Asia\/Anadyr",
			"Pacific\/Wallis": "Asia\/Anadyr",
			"Pacific\/Yap": "Australia\/Brisbane",
			"Poland": "Europe\/Amsterdam",
			"Portugal": "Europe\/London",
			"ROC": "Asia\/Ulaanbaatar",
			"ROK": "Asia\/Tokyo",
			"Singapore": "Asia\/Ulaanbaatar",
			"SystemV\/AST4": "America\/Manaus",
			"SystemV\/AST4ADT": "America\/Halifax",
			"SystemV\/CST6": "America\/Regina",
			"SystemV\/CST6CDT": "America\/Chicago",
			"SystemV\/EST5": "America\/Bogota",
			"SystemV\/EST5EDT": "America\/New_York",
			"SystemV\/HST10": "Pacific\/Honolulu",
			"SystemV\/MST7": "America\/Phoenix",
			"SystemV\/MST7MDT": "America\/Denver",
			"SystemV\/PST8PDT": "America\/Los_Angeles",
			"SystemV\/YST9YDT": "America\/Anchorage",
			"Turkey": "Europe\/Moscow",
			"US\/Alaska": "America\/Anchorage",
			"US\/Aleutian": "America\/Adak",
			"US\/Arizona": "America\/Phoenix",
			"US\/Central": "America\/Chicago",
			"US\/East-Indiana": "America\/New_York",
			"US\/Eastern": "America\/New_York",
			"US\/Hawaii": "Pacific\/Honolulu",
			"US\/Indiana-Starke": "America\/Chicago",
			"US\/Michigan": "America\/New_York",
			"US\/Mountain": "America\/Denver",
			"US\/Pacific": "America\/Los_Angeles",
			"US\/Samoa": "Pacific\/Midway",
			"UTC": "Africa\/Monrovia",
			"Universal": "Africa\/Monrovia",
			"W-SU": "Europe\/Moscow",
			"Zulu": "Africa\/Monrovia"
		};
		var _fallback_alts = {

		};

		// The follow zone IDs have no mapping to our choice list:
		// Africa/Juba
		// America/Dawson
		// America/Whitehorse
		// Antarctica/Casey
		// Antarctica/Troll
		// Europe/Chisinau
		// Europe/Dublin
		// Europe/Volgograd
		// Pacific/Gambier
		// Pacific/Pitcairn
		// CET (Obsolete)
		// Canada/Yukon (Obsolete)
		// EET (Obsolete)
		// EST (Obsolete)
		// Eire (Obsolete)
		// Etc/GMT+12 (Obsolete)
		// Etc/GMT+8 (Obsolete)
		// Etc/GMT+9 (Obsolete)
		// Europe/Tiraspol (Obsolete)
		// GMT (Obsolete)
		// GMT+0 (Obsolete)
		// GMT-0 (Obsolete)
		// HST (Obsolete)
		// MET (Obsolete)
		// MST (Obsolete)
		// SystemV/PST8 (Obsolete)
		// SystemV/YST9 (Obsolete)
		// UCT (Obsolete)
		// WET (Obsolete)


		return self;
	}

	// export
	if (typeof exports !== 'undefined'){
		if (typeof module !== 'undefined' && module.exports){
			exports = module.exports = tz;
		}
		exports.TimezoneDetector = tz;
	}else if (typeof define === 'function' && define.amd){
		define(function() { return tz; })
	}else{
		root.TimezoneDetector = tz;
	}

}).call(function(){
	return this || (typeof window !== 'undefined' ? window : global);
}());
