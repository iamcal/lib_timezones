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
	# for every zone not on our choice list, we need to know if it maps exactly (or roughly) to a choice we provide
	#

	$from = mktime(0,0,0,1,1,2015);
	$to   = mktime(0,0,0,1,1,2020);

	$hashes = array();
	foreach (timezone_identifiers_list(DateTimeZone::ALL_WITH_BC) as $zone_id){
		if ($zone_id == 'leap-seconds.list') continue;
		if ($zone_id == 'localtime') continue;

		$tz = timezone_open($zone_id);
		$trans = timezone_transitions_get($tz, $from, $to);
		foreach ($trans as $k => $v){
			unset($trans[$k]['abbr']);
		}

		$hash = md5(serialize($trans));
		$hashes[$zone_id] = $hash;
	}

	$skip = array();
	$choices = array();
	foreach ($zones as $row){
		$skip[$row[1]] = true;
		$hash = $hashes[$row[1]];
		if (!isset($choices[$hash]) || $row[2]) $choices[$hash] = $row[1];
	}

	$exacts = array();
	foreach ($hashes as $k => $v){
		if (isset($skip[$k])) continue;
		if (isset($choices[$v])){
			$exacts[$k] = $choices[$v];
		}else{
			$no_exact[] = $k;
		}
	}

	$core = array();
	foreach (timezone_identifiers_list() as $zone_id){
		$core[$zone_id] = 1;
	}

	$exact_lines = array();
	foreach ($exacts as $k => $v){
		$k = json_encode($k);
		$v = json_encode($v);
		$exact_lines[] = "\t{$k}: {$v}";
	}
	$exact = "{\n".implode(",\n", $exact_lines)."\n}";

	$broken = "// The follow zone IDs have no mapping to our choice list:\n";
	foreach ($no_exact as $id){
		if (isset($core[$id])){
			$broken .= "// $id\n";
		}else{
			$broken .= "// $id (Obsolete)\n";
		}
	}


	#
	# output
	#

	$template = file_get_contents('timezones.js.template');

	$template = str_replace(array(
		'#DATES#',
		'#MAP#',
		'#LIST#',
		'#EXACT#',
		'#BROKEN#',
	), array(
		$dates,
		$map,
		$list,
		$exact,
		$broken,
	), $template);

	echo $template;
