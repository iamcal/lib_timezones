<?php
	#
	# Sources:
	#   http://technet.microsoft.com/en-us/library/cc749073(v=ws.10).aspx (beware, has many mistakes)
	#   http://www.worldtimezone.com/
	#   http://en.wikipedia.org/
	#   http://www.php.net/manual/en/timezones.php
	#   http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	#   My ailing brain
	#
	# Things to note:
	#   There are many cities called La Paz!
	#
	# Fields:
	#   [LABEL, TZ-ID, DEFAULT, NOTE]
	#

	function timezones_list(){

		return array(
			array('(GMT-11:00) Midway Island, Samoa',				'Pacific/Midway',		true,	'Samoa Standard Time'),
			array('(GMT-10:00) Hawaii',						'Pacific/Honolulu',		false,	'Hawaiian Standard Time'),
			array('(GMT-09:00) Alaska',						'America/Anchorage',		false,	'Alaskan Standard Time'),
			array('(GMT-08:00) Baja California',					'America/Tijuana',		false,	''),
			array('(GMT-08:00) Pacific Time (US and Canada)',			'America/Los_Angeles',		true,	'Pacific Standard Time'),
			array('(GMT-07:00) Arizona',						'America/Phoenix',		false,	'US Mountain Standard Time'),
			array('(GMT-07:00) Chihuahua, La Paz, Mazatlan',			'America/Chihuahua',		false,	'Mountain Standard Time (Mexico)'),
			array('(GMT-07:00) Mountain Time (US and Canada)',			'America/Denver',		true,	'Mountain Standard Time'),
			array('(GMT-06:00) Central America',					'America/Belize',		false,	'Central America Standard Time'),
			array('(GMT-06:00) Central Time (US and Canada)	',			'America/Chicago',		true,	'Central Standard Time'),
			array('(GMT-06:00) Guadalajara, Mexico City, Monterrey',		'America/Mexico_City',		false,	'Central Standard Time (Mexico)'),
			array('(GMT-06:00) Saskatchewan',					'America/Regina',		true,	'Canada Central Standard Time'),
			array('(GMT-05:00) Bogota, Lima, Quito',				'America/Bogota',		false,	'SA Pacific Standard Time'),
			array('(GMT-05:00) Eastern Time (US and Canada)',			'America/New_York',		false,	'Eastern Standard Time'),
			array('(GMT-05:00) Indiana (East)',					'America/Indiana/Indianapolis',	true,	'US Eastern Standard Time'),
			array('(GMT-04:30) Caracas',						'America/Caracas',		false,	''),
			array('(GMT-04:00) Asuncion',						'America/Asuncion',		false,	''),
			array('(GMT-04:00) Atlantic Time (Canada)',				'America/Halifax',		false,	'Atlantic Standard Time'),
			array('(GMT-04:00) Cuiaba',						'America/Cuiaba',		false,	''),
			array('(GMT-04:00) Georgetown, La Paz, Manaus, San Juan',		'America/Manaus',		true,	'SA Western Standard Time / Central Brazilian Standard Time'),
			array('(GMT-04:00) Santiago',						'America/Santiago',		true,	'Pacific SA Standard Time'),
			array('(GMT-03:30) Newfoundland and Labrador',				'America/St_Johns',		false,	'Newfoundland Standard Time'),
			array('(GMT-03:00) Brasilia',						'America/Sao_Paulo',		true,	'E. South America Standard Time'),
			array('(GMT-03:00) Buenos Aires	',					'America/Buenos_Aires',		true,	'SA Eastern Standard Time'),
			array('(GMT-03:00) Cayenne, Fortaleza',					'America/Cayenne',		false,	''),
			array('(GMT-03:00) Greenland',						'America/Godthab',		false,	'Greenland Standard Time'),
			array('(GMT-03:00) Montevideo',						'America/Montevideo',		false,	''),
			array('(GMT-03:00) Salvador',						'America/Bahia',		false,	''),
			array('(GMT-02:00) Mid-Atlantic',					'America/Noronha',		false,	'Mid-Atlantic Standard Time'),
			array('(GMT-01:00) Azores',						'Atlantic/Azores',		false,	'Azores Standard Time'),
			array('(GMT-01:00) Cape Verde Islands',					'Atlantic/Cape_Verde',		false,	'Cape Verde Standard Time'),
			array('(GMT) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',	'Europe/London',		false,	'GMT Standard Time'),
			array('(GMT) Casablanca, Monrovia',					'Africa/Casablanca',		false,	'Greenwich Standard Time'),
			array('(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',	'Europe/Amsterdam',		true,	'W. Europe Standard Time'),
			array('(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',	'Europe/Belgrade',		false,	'Central Europe Standard Time'),
			array('(GMT+01:00) Brussels, Copenhagen, Madrid, Paris',		'Europe/Brussels',		false,	'Romance Standard Time'),
			array('(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb',			'Europe/Warsaw',		false,	'Central European Standard Time'),
			array('(GMT+01:00) West Central Africa',				'Africa/Algiers',		false,	'W. Central Africa Standard Time'),
			array('(GMT+01:00) Windhoek',						'Africa/Windhoek',		false,	'Namibia Standard Time'),
			array('(GMT+02:00) Athens, Bucharest',					'Europe/Athens',		false,	'GTB Standard Time'),
			array('(GMT+02:00) Beirut',						'Asia/Beirut',			false,	''),
			array('(GMT+02:00) Cairo',						'Africa/Cairo',			false,	'Egypt Standard Time'),
			array('(GMT+02:00) Damascus',						'Asia/Damascus',		false,	''),
			array('(GMT+02:00) Eastern Europe',					'EET',				true,	'E. Europe Standard Time'),
			array('(GMT+02:00) Harare, Pretoria',					'Africa/Harare',		false,	'South Africa Standard Time'),
			array('(GMT+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',	'Europe/Helsinki',		false,	'FLE Standard Time'),
			array('(GMT+02:00) Istanbul',						'Asia/Istanbul',		false,	''),
			array('(GMT+02:00) Jerusalem',						'Asia/Jerusalem',		false,	'Israel Standard Time'),
			array('(GMT+03:00) Amman',						'Asia/Amman',			false,	''),
			array('(GMT+03:00) Baghdad',						'Asia/Baghdad',			false,	'Arabic Standard Time'),
			array('(GMT+03:00) Kalinigrad, Minsk',					'Europe/Kaliningrad',		false,	''),
			array('(GMT+03:00) Kuwait, Riyadh',					'Asia/Kuwait',			true,	'Arab Standard Time'),
			array('(GMT+03:00) Nairobi',						'Africa/Nairobi',		false,	'E. Africa Standard Time'),
			array('(GMT+03:30) Tehran',						'Asia/Tehran',			false,	'Iran Standard Time'),
			array('(GMT+04:00) Abu Dhabi, Muscat',					'Asia/Muscat',			true,	'Arabian Standard Time'),
			array('(GMT+04:00) Baku',						'Asia/Baku',			true,	'Azerbaijan Standard Time'),
			array('(GMT+04:00) Moscow, St. Petersburg, Volgograd',			'Europe/Moscow',		true,	'Russian Standard Time'),
			array('(GMT+04:00) Port Louis',						'Indian/Mauritius',		false,	''),
			array('(GMT+04:00) Tblisi',						'Asia/Tbilisi',			false,	'Georgian Standard Time'),
			array('(GMT+04:00) Yerevan',						'Asia/Yerevan',			false,	'Caucasus Standard Time'),
			array('(GMT+04:30) Kabul',						'Asia/Kabul',			false,	'Afghanistan Standard Time'),
			array('(GMT+05:00) Islamabad, Karachi',					'Asia/Karachi',			true,	'West Asia Standard Time'),
			array('(GMT+05:00) Tashkent',						'Asia/Tashkent',		false,	''),
			array('(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi',		'Asia/Kolkata',			false,	'India Standard Time'),
			array('(GMT+05:30) Sri Jayawardenepura',				'Asia/Colombo',			false,	'Sri Lanka Standard Time'),
			array('(GMT+05:45) Kathmandu',						'Asia/Katmandu',		false,	'Nepal Standard Time'),
			array('(GMT+06:00) Astana',						'Asia/Almaty',			false,	'Central Asia Standard Time'),
			array('(GMT+06:00) Dhaka',						'Asia/Dhaka',			true,	''),
			array('(GMT+06:00) Ekaterinburg',					'Asia/Yekaterinburg',		false,	'Ekaterinburg Standard Time'),
			array('(GMT+06:30) Yangon (Rangoon)',					'Asia/Rangoon',			false,	'Myanmar Standard Time'),
			array('(GMT+07:00) Bangkok, Hanoi, Jakarta',				'Asia/Bangkok',			false,	'SE Asia Standard Time'),
			array('(GMT+07:00) Novosibirsk',					'Asia/Novosibirsk',		false,	'Omsk Time'),
			array('(GMT+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi',		'Asia/Chongqing',		true,	'China Standard Time'),
			array('(GMT+08:00) Krasnoyarsk',					'Asia/Krasnoyarsk',		false,	'North Asia Standard Time'),
			array('(GMT+08:00) Kuala Lumpur, Singapore',				'Asia/Kuala_Lumpur',		false,	'Singapore Standard Time'),
			array('(GMT+08:00) Perth',						'Australia/Perth',		false,	'W. Australia Standard Time'),
			array('(GMT+08:00) Taipei',						'Asia/Taipei',			false,	'Taipei Standard Time'),
			array('(GMT+08:00) Ulaanbaatar',					'Asia/Ulaanbaatar',		true,	'North Asia East Standard Time'),
			array('(GMT+09:00) Irkutsk',						'Asia/Irkutsk',			false,	''),
			array('(GMT+09:00) Osaka, Sapporo, Tokyo',				'Asia/Tokyo',			true,	'Tokyo Standard Time'),
			array('(GMT+09:00) Seoul',						'Asia/Seoul',			false,	'Korea Standard Time'),
			array('(GMT+09:30) Adelaide',						'Australia/Adelaide',		false,	'Cen. Australia Standard Time'),
			array('(GMT+09:30) Darwin',						'Australia/Darwin',		false,	'AUS Central Standard Time'),
			array('(GMT+10:00) Brisbane',						'Australia/Brisbane',		true,	'E. Australia Standard Time'),
			array('(GMT+10:00) Canberra, Melbourne, Sydney',			'Australia/Canberra',		true,	'AUS Eastern Standard Time'),
			array('(GMT+10:00) Guam, Port Moresby',					'Pacific/Guam',			false,	'West Pacific Standard Time'),
			array('(GMT+10:00) Hobart',						'Australia/Hobart',		false,	'Tasmania Standard Time'),
			array('(GMT+10:00) Yakutsk',						'Asia/Yakutsk',			false,	'Yakutsk Standard Time'),
			array('(GMT+11:00) Solomon Islands, New Caledonia',			'Pacific/Guadalcanal',		false,	'Central Pacific Standard Time'),
			array('(GMT+11:00) Vladivostok',					'Asia/Vladivostok',		false,	'Vladivostok Standard Time'),
			array('(GMT+12:00) Auckland, Wellington',				'Pacific/Auckland',		false,	'New Zealand Standard Time'),
			array('(GMT+12:00) Fiji Islands, Kamchatka, Marshall Islands',		'Pacific/Fiji',			false,	'Fiji Standard Time'),
			array('(GMT+12:00) Magadan',						'Asia/Magadan',			false,	''),
			array('(GMT+13:00) Nuku\'alofa',					'Pacific/Tongatapu',		false,	'Tonga Standard Time'),
			array('(GMT+13:00) Samoa',						'Pacific/Apia',			false,	''),
		);
	}

