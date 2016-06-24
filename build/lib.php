<?php
	include(dirname(__FILE__).'/../lib/lib_timezones.php');

	date_default_timezone_set('America/Los_Angeles');

	$zones = timezones_list();

	$base_dates = array(
		array(0,0,0,9,22,2015),
		array(0,0,0,11,7,2011),
		array(0,0,0,4,7,2002),
		array(0,0,0,10,27,2008),
		array(0,0,0,10,3,2004),
		array(0,0,0,3,27,2016),
		array(0,0,0,10,28,2001),
		array(0,0,0,4,30,2010),
		array(0,0,0,11,10,2012),
		array(0,0,0,11,2,2015),
	);


	function build_map($zones, $dates){

		#
		# create each probe date
		#

		$probe_dates = array();
		foreach ($dates as $d){
			$date = date_create();
			date_timestamp_set($date, gmmktime($d[0], $d[1], $d[2], $d[3], $d[4], $d[5]));
			$probe_dates[] = $date;
		}


		#
		# build the map
		#

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

			if (array_key_exists($key, $map)){
				if ($row[2]){
					array_unshift($map[$key], $row[1]);
				}else{
					$map[$key][] = $row[1];
				}
			}else{
				$map[$key] = array($row[1]);
			}
		}

		return $map;
	}
