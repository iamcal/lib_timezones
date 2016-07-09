<?php
	include('../data/static.php');
	include('lib.php');


	#
	# dump unmatched
	#

	$map = build_map($timezones_list, $timezones_probe_dates);

	$per = count($map) / count($timezones_list);
	$per = round($per * 1000) / 10;

	echo "number of zones in list  : ".count($timezones_list)."\n";
	echo "number of zones detected : ".count($map)."\n";
	echo "match rate : {$per}%\n";
	echo "\n";

	foreach ($map as $k => $v){
		if (count($v) == 1) continue;
		foreach (array_slice($v, 1) as $v2){
			echo "Can't detect $v2 (counts as $v[0])\n";
		}
	}
