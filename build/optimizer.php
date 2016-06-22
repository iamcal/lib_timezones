<?php
	include('lib.php');


	$zones = timezones_list();

	$base_dates = array(
		array(0,0,0,12,10,2007),
		array(0,0,0,04,27,1981),
		array(0,0,0,05,25,1996),
		array(0,0,0,03,10,1986),
		array(0,0,0,10,26,2014),
		array(0,0,0,10,28,1990),
		array(0,0,0,03,29,1981),
		array(0,0,0,05,08,1988),
		array(0,0,0,09,26,1993),
		array(0,0,0,12,19,1982),
		array(0,0,0,03,30,2007),
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

	if (true){

		$keep_dates = array();

		while (1){

			$best = array();

			for ($i=0; $i<15*365; $i++){

				$d = array(0,0,0,1,1+$i,2000);

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
