<?php
	include(__DIR__."/testmore.php");

	plan(13);


	#
	# basic loading
	#

	require_ok(__DIR__."/../lib/lib_timezones.php", "able to load the library");



	#
	# choice list
	#

	$zones = timezones_list();

	ok(is_array($zones), "timezones_list() returns an array");
	cmp_ok(count($zones), '>=', 100, "timezones_list() returnsd at least 100 choices");
	is(count(array_shift($zones)), 5, "timezones_list() entries have 5 values");


	#
	# filtering
	#

	is(timezones_filter("Europe/London"), "Europe/London", "filtering a choice");
	is(timezones_filter("America/Guatemala"), "America/Belize", "filtering a manual override");
	is(timezones_filter("Africa/Abidjan"), "Africa/Monrovia", "filtering an automatic override");
	is(timezones_filter("America/Fort_Nelson"), "America/Phoenix", "filtering a fallback");
	is(timezones_filter("Fake/Zone"), null, "filtering a bad ID - null");
	is(timezones_filter("Fake/Zone", "wibble"), "wibble", "filtering a bad ID - default");


	#
	# labels
	#

	is(timezones_label("Pacific/Midway"), "Samoa Standard Time", "timezones_label() works for a non-DST zone");
	is(timezones_label("America/Anchorage", mktime(0,0,0,12,1,2015)), "Alaska Standard Time", "timezones_label() works during winter");
	is(timezones_label("America/Anchorage", mktime(0,0,0,4,1,2015)), "Alaska Daylight Time", "timezones_label() works during summer");

