<?php
	#
	# Sources:
	#   http://technet.microsoft.com/en-us/library/cc749073(v=ws.10).aspx (beware, has many mistakes)
	#   http://www.worldtimezone.com/
	#   http://en.wikipedia.org/
	#   http://www.php.net/manual/en/timezones.php
	#   http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	#   http://www.timeanddate.com/
	#   My ailing brain
	#
	# Things to note:
	#   There are many cities called La Paz!
	#
	# Fields:
	#   [DROPDOWN-LABEL, TZ-ID, DEFAULT-FOR-OFFSET, LABEL, DST-LABEL]
	#


	$timezones_list = array(

		array('(UTC-11:00) Midway Island, American Samoa',			'Pacific/Midway',		true,	'Samoa Standard Time',			null),
		array('(UTC-10:00) Aleutian Islands',					'America/Adak',			false,	'Hawaii-Aleutian Standard Time',	'Hawaii-Aleutian Daylight Time'),
		array('(UTC-10:00) Hawaii',						'Pacific/Honolulu',		true,	'Hawaii-Aleutian Standard Time',	null),
		array('(UTC-09:30) Marquesas Islands',					'Pacific/Marquesas',		true,	'Marquesas Time',			null),
		array('(UTC-09:00) Alaska',						'America/Anchorage',		false,	'Alaska Standard Time',			'Alaska Daylight Time'),
		array('(UTC-08:00) Baja California',					'America/Tijuana',		false,	'Pacific Standard Time',		'Pacific Daylight Time'),
		array('(UTC-08:00) Pacific Time (US and Canada)',			'America/Los_Angeles',		true,	'Pacific Standard Time',		'Pacific Daylight Time'),
		array('(UTC-07:00) Arizona',						'America/Phoenix',		false,	'Mountain Standard Time',		'Mountain Daylight Time'),
		array('(UTC-07:00) Chihuahua, La Paz, Mazatlan',			'America/Chihuahua',		false,	'Mountain Standard Time',		'Mountain Daylight Time'),
		array('(UTC-07:00) Mountain Time (US and Canada)',			'America/Denver',		true,	'Mountain Standard Time',		'Mountain Daylight Time'),
		array('(UTC-06:00) Central America',					'America/Belize',		false,	'Central Standard Time',		null),
		array('(UTC-06:00) Central Time (US and Canada)	',			'America/Chicago',		true,	'Central Standard Time',		'Central Daylight Time'),
		array('(UTC-06:00) Easter Island',					'Pacific/Easter',		false,	'Easter Island Standard Time',		'Easter Island Summer Time'),
		array('(UTC-06:00) Guadalajara, Mexico City, Monterrey',		'America/Mexico_City',		false,	'Central Standard Time',		'Central Daylight Time'),
		array('(UTC-06:00) Saskatchewan',					'America/Regina',		true,	'Central Standard Time',		'Central Daylight Time'),
		array('(UTC-05:00) Bogota, Lima, Quito',				'America/Bogota',		false,	'South America Pacific Standard Time',	null), # Colombia Time / Peru Time / Ecuador Time
		array('(UTC-05:00) Chetumal',						'America/Cancun',		false,	'Eastern Standard Time',		null),
		array('(UTC-05:00) Eastern Time (US and Canada)',			'America/New_York',		true,	'Eastern Standard Time',		'Eastern Daylight Time'),
		array('(UTC-05:00) Haiti',						'America/Port-au-Prince',	false,	'Eastern Standard Time',		null),
		array('(UTC-05:00) Havana',						'America/Havana',		false,	'Cuba Standard Time',			'Cuba Daylight Time'),
		array('(UTC-05:00) Indiana (East)',					'America/Indiana/Indianapolis',	false,	'Eastern Standard Time',		'Eastern Daylight Time'),
		array('(UTC-04:00) Asuncion',						'America/Asuncion',		false,	'Paraguay Time',			'Paraguay Summer Time'),
		array('(UTC-04:00) Atlantic Time (Canada)',				'America/Halifax',		false,	'Atlantic Standard Time',		'Atlantic Daylight Time'),
		array('(UTC-04:00) Caracas',						'America/Caracas',		false,	'Venezuelan Standard Time',		null),
		array('(UTC-04:00) Cuiaba',						'America/Cuiaba',		false,	'Amazon Time',				'Amazon Summer Time'),
		array('(UTC-04:00) Georgetown, La Paz, Manaus, San Juan',		'America/Manaus',		true,	'Atlantic Standard Time',		null), # Guyana Time / Bolivia Time / Amazon Time
		array('(UTC-04:00) Santiago',						'America/Santiago',		true,	'Chile Standard Time',			'Chile Summer Time'),
		array('(UTC-04:00) Turks and Caicos',					'America/Grand_Turk',		false,	'Atlantic Standard Time',		null),
		array('(UTC-03:30) Newfoundland',					'America/St_Johns',		false,	'Newfoundland Standard Time',		'Newfoundland Daylight Time'),
		array('(UTC-03:00) Araguaina',						'America/Fortaleza',		false,	'Brasilia Time',			null),
		array('(UTC-03:00) Brasilia',						'America/Sao_Paulo',		true,	'Brasilia Time',			'Brasilia Summer Time'),
		array('(UTC-03:00) Cayenne, Fortaleza',					'America/Cayenne',		false,	'French Guiana Time',			null), # also Brasilia Time
		array('(UTC-03:00) City of Buenos Aires',				'America/Buenos_Aires',		true,	'Argentina Time',			null),
		array('(UTC-03:00) Greenland',						'America/Godthab',		false,	'West Greenland Time',			'Western Greenland Summer Time'),
		array('(UTC-03:00) Montevideo',						'America/Montevideo',		false,	'Uruguay Time',				'Uruguay Summer Time'),
		array('(UTC-03:00) Saint Pierre and Miquelon',				'America/Miquelon',		false,	'Pierre & Miquelon Standard Time',	'Pierre & Miquelon Daylight Time'),
		array('(UTC-03:00) Salvador',						'America/Bahia',		false,	'Brasilia Time',			'Brasilia Summer Time'),
		array('(UTC-01:00) Azores',						'Atlantic/Azores',		false,	'Azores Time',				'Azores Summer Time'),
		array('(UTC-01:00) Cabo Verde Islands',					'Atlantic/Cape_Verde',		false,	'Cape Verde Time',			null),
		array('(UTC) Casablanca',						'Africa/Casablanca',		false,	'Western European Time',		'Western European Summer Time'),
		array('(UTC) Dublin, Edinburgh, Lisbon, London',			'Europe/London',		false,	'Greenwich Mean Time',			'British Summer Time'), # lisbon really does WEST in the summer, but is included here
		array('(UTC) Monrovia, Reykjavik',					'Africa/Monrovia',		false,	'Greenwich Mean Time',			null),
		array('(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',	'Europe/Amsterdam',		true,	'Central European Time',		'Central European Summer Time'),
		array('(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',	'Europe/Belgrade',		false,	'Central European Time',		'Central European Summer Time'),
		array('(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',		'Europe/Brussels',		false,	'Central European Time',		'Central European Summer Time'),
		array('(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb',			'Europe/Warsaw',		false,	'Central European Time',		'Central European Summer Time'),
		array('(UTC+01:00) West Central Africa',				'Africa/Algiers',		false,	'Central European Time',		null),
		array('(UTC+01:00) Windhoek',						'Africa/Windhoek',		false,	'West Africa Time',			'West Africa Summer Time'),
		array('(UTC+02:00) Amman',						'Asia/Amman',			false,	'Arabia Standard Time',			'Arabia Standard Time'), # uses DST, but has the same name in winter and summer
		array('(UTC+02:00) Athens, Bucharest',					'Europe/Athens',		false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Beirut',						'Asia/Beirut',			false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Cairo',						'Africa/Cairo',			false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Damascus',						'Asia/Damascus',		false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Gaza, Hebron',					'Asia/Gaza',			false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Harare, Pretoria',					'Africa/Harare',		false,	'Central Africa Time',			null),
		array('(UTC+02:00) Helsinki, Kiev, Riga, Sofia, Tallinn, Vilnius',	'Europe/Helsinki',		false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Istanbul',						'Asia/Istanbul',		false,	'Eastern European Time',		'Eastern European Summer Time'),
		array('(UTC+02:00) Jerusalem',						'Asia/Jerusalem',		false,	'Israel Standard Time',			'Israel Daylight Time'),
		array('(UTC+02:00) Kaliningrad',					'Europe/Kaliningrad',		false,	'Eastern European Time',		null), # RTZ1
		array('(UTC+02:00) Tripoli',						'Africa/Tripoli',		false,	'Eastern European Time',		null),
		array('(UTC+03:00) Baghdad',						'Asia/Baghdad',			false,	'Arabia Standard Time',			null),
		array('(UTC+03:00) Kuwait, Riyadh',					'Asia/Kuwait',			true,	'Arabia Standard Time',			null),
		array('(UTC+03:00) Minsk',						'Europe/Minsk',			false,	'Further-eastern European Time',	null),
		array('(UTC+03:00) Moscow, St. Petersburg, Volgograd',			'Europe/Moscow',		true,	'Moscow Time',				null), # RTZ2
		array('(UTC+03:00) Nairobi',						'Africa/Nairobi',		false,	'East Africa Time',			null),
		array('(UTC+03:30) Tehran',						'Asia/Tehran',			false,	'Iran Standard Time',			'Iran Daylight Time'),
		array('(UTC+04:00) Abu Dhabi, Muscat',					'Asia/Muscat',			true,	'Gulf Standard Time',			null),
		array('(UTC+04:00) Astrakhan, Ulyanovsk',				'Europe/Astrakhan',		false,	'Moscow Standard Time',			'Moscow Standard Time +1'), # weird name: http://www.timeanddate.com/news/time/russia-astrakhan-time-zone.html
		array('(UTC+04:00) Baku',						'Asia/Baku',			true,	'Azerbaijan Time',			'Azerbaijan Summer Time'),
		array('(UTC+04:00) Izhevsk, Samara',					'Europe/Samara',		false,	'Samara Time',				null), # RTZ3
		array('(UTC+04:00) Port Louis',						'Indian/Mauritius',		false,	'Mauritius Time',			null),
		array('(UTC+04:00) Tbilisi',						'Asia/Tbilisi',			false,	'Georgia Standard Time',		null),
		array('(UTC+04:00) Yerevan',						'Asia/Yerevan',			false,	'Armenia Time',				'Armenia Summer Time'),
		array('(UTC+04:30) Kabul',						'Asia/Kabul',			false,	'Afghanistan Time',			null),
		array('(UTC+05:00) Tashkent, Ashgabat',					'Asia/Tashkent',		true,	'Uzbekistan Time',			null),
		array('(UTC+05:00) Ekaterinburg',					'Asia/Yekaterinburg',		false,	'Yekaterinburg Time',			null), # RTZ4
		array('(UTC+05:00) Islamabad, Karachi',					'Asia/Karachi',			false,	'Pakistan Standard Time',		null),
		array('(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',		'Asia/Kolkata',			false,	'India Standard Time',			null),
		array('(UTC+05:30) Sri Jayawardenepura',				'Asia/Colombo',			false,	'ISri Lanka Standard Time',		null), # matches India Standard Time since 2006
		array('(UTC+05:45) Kathmandu',						'Asia/Katmandu',		false,	'Nepal Time',				null),
		array('(UTC+06:00) Astana',						'Asia/Almaty',			false,	'Alma-Ata Time',			null),
		array('(UTC+06:00) Dhaka',						'Asia/Dhaka',			true,	'Bangladesh Standard Time',		null),
		array('(UTC+06:00) Novosibirsk',					'Asia/Novosibirsk',		false,	'Novosibirsk Time',			null), # RTZ5
		array('(UTC+06:30) Yangon (Rangoon)',					'Asia/Rangoon',			false,	'Myanmar Time',				null),
		array('(UTC+07:00) Bangkok, Hanoi, Jakarta',				'Asia/Bangkok',			false,	'Indochina Time',			null),
		array('(UTC+07:00) Barnaul, Gorno-Altaysk',				'Asia/Barnaul',			false,	'Moscow Standard Time +4',		null),
		array('(UTC+07:00) Hovd',						'Asia/Hovd',			false,	'Hovd Time',				'Hovd Summer Time'),
		array('(UTC+07:00) Krasnoyarsk',					'Asia/Krasnoyarsk',		false,	'Krasnoyarsk Time',			null), # RTZ6
		array('(UTC+07:00) Tomsk',						'Asia/Tomsk',			false,	'Moscow Standard Time +4',		null),
		array('(UTC+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi',		'Asia/Chongqing',		true,	'China Standard Time',			null),
		array('(UTC+08:00) Irkutsk',						'Asia/Irkutsk',			false,	'Irkutsk Time',				null), # RTZ7
		array('(UTC+08:00) Kuala Lumpur, Singapore',				'Asia/Kuala_Lumpur',		false,	'Singapore Standard Time',		null), # Malaysia Time
		array('(UTC+08:00) Perth',						'Australia/Perth',		false,	'Australian Western Standard Time',	null),
		array('(UTC+08:00) Taipei',						'Asia/Taipei',			false,	'Taiwan Standard Time',			null),
		array('(UTC+08:00) Ulaanbaatar',					'Asia/Ulaanbaatar',		true,	'Ulaanbaatar Time',			null),
		array('(UTC+08:30) Pyongyang',						'Asia/Pyongyang',		false,	'Pyongyang Time',			null),
		array('(UTC+08:45) Eucla',						'Australia/Eucla',		false,	'Australian Central Western Standard Time',	null),
		array('(UTC+09:00) Chita',						'Asia/Chita',			false,	'Yakutsk Time',				null),
		array('(UTC+09:00) Osaka, Sapporo, Tokyo',				'Asia/Tokyo',			true,	'Japan Standard Time',			null),
		array('(UTC+09:00) Seoul',						'Asia/Seoul',			false,	'Korea Standard Time',			null),
		array('(UTC+09:00) Yakutsk',						'Asia/Yakutsk',			false,	'Yakutsk Time',				null), # RTZ8
		array('(UTC+09:30) Adelaide',						'Australia/Adelaide',		false,	'Australian Central Standard Time',	'Australian Central Daylight Time'),
		array('(UTC+09:30) Darwin',						'Australia/Darwin',		false,	'Australian Central Standard Time',	'Australian Central Daylight Time'),
		array('(UTC+10:00) Brisbane',						'Australia/Brisbane',		true,	'Australian Eastern Standard Time',	'Australian Eastern Daylight Time'),
		array('(UTC+10:00) Canberra, Melbourne, Sydney',			'Australia/Canberra',		true,	'Australian Eastern Standard Time',	'Australian Eastern Daylight Time'),
		array('(UTC+10:00) Guam, Port Moresby',					'Pacific/Guam',			false,	'West Pacific Standard Time',		null), # Chamorro Standard Time / Papua New Guinea Time
		array('(UTC+10:00) Hobart',						'Australia/Hobart',		false,	'Australian Eastern Standard Time',	'Australian Eastern Daylight Time'),
		array('(UTC+10:00) Vladivostok',					'Asia/Vladivostok',		false,	'Vladivostok Time',			null), # RTZ9
		array('(UTC+10:30) Lord Howe Island',					'Australia/Lord_Howe',		false,	'Lord Howe Standard Time',		'Lord Howe Daylight Time'),
		array('(UTC+11:00) Bougainville Island',				'Pacific/Bougainville',		false,	'Bougainville Standard Time',		null),
		array('(UTC+11:00) Chokirdakh',						'Asia/Srednekolymsk',		false,	'Srednekolymsk Time',			null), # RTZ10
		array('(UTC+11:00) Magadan',						'Asia/Magadan',			false,	'Magadan Time',				null),
		array('(UTC+11:00) Norfolk Island',					'Pacific/Norfolk',		false,	'Norfolk Time',				null),
		array('(UTC+11:00) Sakhalin',						'Asia/Sakhalin',		false,	'Sakhalin Time',			null),
		array('(UTC+11:00) Solomon Islands, New Caledonia',			'Pacific/Guadalcanal',		false,	'Central Pacific Standard Time',	null), # Solomon IslandsTime / New Caledonia Time
		array('(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky',			'Asia/Anadyr',			false,	'Kamchatka Time',			null), # RTZ11
		array('(UTC+12:00) Auckland, Wellington',				'Pacific/Auckland',		false,	'New Zealand Standard Time',		'New Zealand Daylight Time'),
		array('(UTC+12:00) Fiji Islands',					'Pacific/Fiji',			false,	'Fiji Time',				'Fiji Summer Time'),
		array('(UTC+12:45) Chatham Islands',					'Pacific/Chatham',		false,	'Chatham Island Standard Time',		'Chatham Island Daylight Time'),
		array('(UTC+13:00) Nuku\'alofa',					'Pacific/Tongatapu',		false,	'Tonga Standard Time',			null),
		array('(UTC+13:00) Samoa',						'Pacific/Apia',			false,	'West Samoa Time',			null), # DST name is same as non
		array('(UTC+14:00) Kiritimati Island',					'Pacific/Kiritimati',		false,	'Line Islands Time',			null),
	);

	# mappings of zones that Windows returns, but we don't have in our master list.
	# we explicitly list them here because we can't always do an automated mapping
	# of their equivilence - these are resolved first, before automatic ones, which
	# are before the final fallback mappings

	$timezones_manual_map = array(
		"America/Guatemala"	=> "America/Belize",
		"America/Indianapolis"	=> "America/Indiana/Indianapolis",
		"America/La_Paz"	=> "America/Manaus",
		"UTC"			=> "Africa/Monrovia",
		"Atlantic/Reykjavik"	=> "Africa/Monrovia",
		"Europe/Berlin"		=> "Europe/Amsterdam",
		"Europe/Budapest"	=> "Europe/Belgrade",
		"Europe/Paris"		=> "Europe/Brussels",
		"Africa/Lagos"		=> "Africa/Algiers",
		"Europe/Bucharest"	=> "Europe/Athens",
		"Africa/Johannesburg"	=> "Africa/Harare",
		"Europe/Kiev"		=> "Europe/Helsinki",
		"Europe/Istanbul"	=> "Asia/Istanbul",
		"Asia/Riyadh"		=> "Asia/Kuwait",
		"Asia/Dubai"		=> "Asia/Muscat",
		"Asia/Calcutta"		=> "Asia/Kolkata",
		"Asia/Shanghai"		=> "Asia/Chongqing",
		"Asia/Singapore"	=> "Asia/Kuala_Lumpur",
		"Australia/Sydney"	=> "Australia/Canberra",
		"Pacific/Port_Moresby"	=> "Pacific/Guam",
		"Asia/Kamchatka"	=> "Asia/Anadyr",
	);

	$timezones_fallback_map = array(
	);
