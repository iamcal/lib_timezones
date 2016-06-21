<?php
	include('../lib_timezones.php');

	header("Content-type: text/plain");

	date_default_timezone_set('America/Los_Angeles');

	$dates = array(
		array(0,0,0,6,30,2012),
		array(0,0,0,12,30,2012),
	);



	$probe_dates = array();
	foreach ($dates as $d){
		$date = date_create();
		date_timestamp_set($date, gmmktime($d[0], $d[1], $d[2], $d[3], $d[4], $d[5]));
		$probe_dates[] = $date;
	}

	$zones = timezones_list();
	$map = array();

	foreach ($zones as $row){

		$tz = timezone_open($row[1]);
		$bits = array();

		foreach ($probe_dates as $d){
			date_timezone_set($d, $tz);
			$off = date_offset_get($d) / 60;
			$bits[] = $off;
		}

		$key = implode(':', $bits);

		if ($row[2]){
			$map[$key] = $row[1];
		}else{
			if (!array_key_exists($key, $map)) $map[$key] = $row[1];
		}
	}

	$per = count($map) / count($zones);
	$per = round($per * 1000) / 10;

	echo "number of zones in list  : ".count($zones)."\n";
	echo "number of zones detected : ".count($map)."\n";
	echo "match rate : {$per}%\n";
	exit;


	$lines = file('timezones.js.template');
	echo implode('', $lines);


	# do our own pretty printing to this works
	# on older PHP.

	$map_lines = array();
	foreach ($map as $k => $v) $map_lines[] = "\t'$k':\t'$v'";

	$zone_lines = array();
	foreach ($zones as $row) $zone_lines[] = "\t[\"{$row[0]}\", '{$row[1]}']";

	echo "\nvar _timezones_map = {\n".implode(",\n", $map_lines)."\n};\n";
	echo "\nvar _timezones_list = [\n".implode(",\n", $zone_lines)."\n];\n";
