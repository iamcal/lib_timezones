<?php
	include('../data/static.php');
	include('lib.php');


	#
	# optimizer
	#

	if (false){

		$best = array();

		for ($i=0; $i<7300; $i++){

			$d = array(0,0,0,1,1+$i,1995);

			$dates = $timezones_probe_dates;
			$dates[] = $d;

			$k = date('Y-m-d', mktime($d[0], $d[1], $d[2], $d[3], $d[4], $d[5]));

			$map = build_map($timezones_list, $dates);
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

			for ($j=0; $j<24; $j+=6){
			for ($i=0; $i<20*365; $i++){

				$d = array($j,0,0,1,1+$i,2000);

				$dates = $keep_dates;
				$dates[] = $d;

				$k = gmdate('H-i-s-m-d-Y', gmmktime($d[0],$d[1],$d[2],$d[3],$d[4],$d[5]));

				$map = build_map($timezones_list, $dates);
				$num = count($map);
				$best[$num][] = $k;
			}
			}

			$keys = array_keys($best);
			sort($keys);
			$best_key = array_pop($keys);
			$best_d = $best[$best_key][0];

			$d = explode('-', $best_d);

			$r = count($keep_dates);
			echo "round $r: best date was {$best_d}, matching {$best_key} uniques - array($d[0],$d[1],$d[2],$d[3],$d[4],$d[5]),\n";

			$keep_dates[] = $d;
		}
	}
