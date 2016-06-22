<?php
	include('../lib_timezones.php');

	header("Content-type: text/plain");

	date_default_timezone_set('America/Los_Angeles');


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



	$zones = timezones_list();

	$base_dates = array(
		array(0,0,0,12,31,2011),
		array(0,0,0,9,29,1991),
		array(0,0,0,10,7,1996),
		array(0,0,0,10,27,2008),
		array(0,0,0,4,3,2011),
		array(0,0,0,4,28,1980),
		array(0,0,0,3,26,1989),
		array(0,0,0,5,10,1987),
		array(0,0,0,4,6,1980),
		array(0,0,0,12,19,1982),
	);


	#
	# dump unmatched
	#

	if (false){

		$map = build_map($zones, $base_dates);

		$per = count($map) / count($zones);
		$per = round($per * 1000) / 10;

		echo "number of zones in list  : ".count($zones)."\n";
		echo "number of zones detected : ".count($map)."\n";
		echo "match rate : {$per}%\n";
		echo "\n";

		foreach ($map as $k => $v){
			if (count($v) == 1) continue;
			foreach (array_slice($v, 1) as $v2){
				echo "Can't detect $v2 (counts as $v[0])\n";
			}
		}

		exit;
	}


	#
	# optimizer
	#

	if (false){

		$best = array();

		for ($i=0; $i<7300; $i++){

			$d = array(0,0,0,1,1+$i,1995);

			$dates = $base_dates;
			$dates[] = $d;

			$k = date('Y-m-d', mktime($d[0], $d[1], $d[2], $d[3], $d[4], $d[5]));

			$map = build_map($zones, $dates);
			$num = count($map);
			$best[$num][] = $k;
		}

		ksort($best);

		foreach ($best as $k => $v){
			echo "$k - ".implode(',', $v)."\n";
		}

		exit;
	}


	#
	# brute crazy optimizer
	#

	if (false){

		$keep_dates = array();

		while (1){

			$best = array();

			for ($i=0; $i<35*365; $i++){

				$d = array(0,0,0,1,1+$i,1980);

				$dates = $keep_dates;
				$dates[] = $d;

				$k = gmdate('Y-m-d', gmmktime($d[0], $d[1], $d[2], $d[3], $d[4], $d[5]));

				$map = build_map($zones, $dates);
				$num = count($map);
				$best[$num][] = $k;
			}

			$keys = array_keys($best);
			sort($keys);
			$best_key = array_pop($keys);
			$best_d = $best[$best_key][0];

			$r = count($keep_dates);
			echo "round $r: best date was {$best_d}, matching {$best_key} uniques\n";

			list($y, $m, $d) = explode('-', $best_d);
			$keep_dates[] = array(0,0,0,$m,$d,$y);
		}
	}



	#
	# build our output blocks
	#

	$map = build_map($zones, $base_dates);


	$dates = '';
	foreach ($base_dates as $d){
		$dates .= "\tkey_parts.push(-1 * new Date(Date.UTC({$d[5]}, {$d[3]}, {$d[4]}, {$d[0]}, {$d[1]}, {$d[2]}, 0)).getTimezoneOffset());\n";
	}

	$map_lines = array();
	foreach ($map as $k => $v) $map_lines[] = "\t'$k':\t'{$v[0]}'";
	$map = "{\n".implode(",\n", $map_lines)."\n}";


	$zone_lines = array();
	foreach ($zones as $row) $zone_lines[] = "\t[\"{$row[0]}\", '{$row[1]}']";
	$list = "[\n".implode(",\n", $zone_lines)."\n]";


	#
	# output
	#

	$template = file_get_contents('timezones.js.template');

	$template = str_replace(array(
		'#DATES#',
		'#MAP#',
		'#LIST#',
	), array(
		$dates,
		$map,
		$list,
	), $template);

	echo $template;
