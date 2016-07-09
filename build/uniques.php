<?php
	include('../data/static.php');
	include('lib.php');


	#
	# find timezones on our list that are actually the same
	#

	$hashes = array();
	$tops = array();
	$labels = array();

	$from = mktime(0,0,0,1,1,2010);
	$to   = mktime(0,0,0,1,1,2020);

	$fd = date('Y-m-d', $from);
	$td = date('Y-m-d', $to);

	echo "Showing non-unique timezones from our choice list between $fd and $td:\n\n";

	foreach ($timezones_list as $row){

		if ($row[2]) $tops[$row[1]] = true;
		$labels[$row[1]] = $row[0];

		$tz = timezone_open($row[1]);
		$trans = timezone_transitions_get($tz, $from, $to);
		foreach ($trans as $k => $v){
			unset($trans[$k]['abbr']);
		}
		$hash = md5(serialize($trans));
		$hashes[$hash][] = $row[1];
	}


	foreach ($hashes as $zs){
		if (count($zs) <= 1) continue;
		$best = $zs[0];
		foreach ($zs as $z){
			if (isset($tops[$z])){
				$best = $z;
			}
		}

		echo "Using {$labels[$best]} for:\n";
		foreach ($zs as $z){
			if ($z == $best) continue;
			echo "\t{$labels[$z]}\n";
		}
		echo "\n";
	}

#	print_r($hashes);


