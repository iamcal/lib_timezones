<?php
	#
	# functions for building probe maps
	#


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

	function shrink_map($map){

		$out = array();

		foreach ($map as $k => $v){
			$bits = explode(':', $k);
			$key = $k;
			while (is_unique($key, array_keys($map))){
				$keep_key = $key;
				array_pop($bits);
				$key = implode(':', $bits);
			}
			$out[$keep_key] = $v;
		}

		return $out;
	}

	function is_unique($key, $keys){
		$num = 0;
		$l = strlen($key);
		foreach ($keys as $k){
			if (substr($k, 0, $l) == $key) $num++;
		}
		return $num <= 1;
	}
