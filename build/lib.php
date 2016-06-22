<?php
	include('../lib_timezones.php');

	date_default_timezone_set('America/Los_Angeles');

	$zones = timezones_list();

	$base_dates = array(
		array(0,0,0,12,10,2007),
		array(0,0,0,04,03,2000),
		array(0,0,0,03,30,2008),
		array(0,0,0,03,26,2012),
		array(0,0,0,09,22,2004),
		array(0,0,0,10,26,2014),
		array(0,0,0,10,26,2008),
		array(0,0,0,10,29,2000),
		array(0,0,0,10,15,2001),
		array(0,0,0,11,10,2012),
		array(0,0,0,03,28,2010),
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
