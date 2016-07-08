<?php
	include(dirname(__FILE__).'/lib.php');


	#
	# build our output blocks
	#

	$map = build_map($zones, $base_dates);
	$map = shrink_map($map);


	$dates = '';
	foreach ($base_dates as $d){
		$dates .= "\t\t\tkey_parts.push(-1 * new Date(Date.UTC({$d[5]}, {$d[3]}, {$d[4]}, {$d[0]}, {$d[1]}, {$d[2]}, 0)).getTimezoneOffset());\n";
	}

	$map_lines = array();
	foreach ($map as $k => $v) $map_lines[] = "\t\t\t'$k':\t'{$v[0]}'";
	$map = "{\n".implode(",\n", $map_lines)."\n\t\t}";


	$zone_lines = array();
	foreach ($zones as $row) $zone_lines[] = "\t\t\t[\"{$row[0]}\", '{$row[1]}']";
	$list = "[\n".implode(",\n", $zone_lines)."\n\t\t]";


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
		if ($tz){
			$trans = timezone_transitions_get($tz, $from, $to);
			if ($trans === false){
				$STDERR = fopen('php://stderr', 'w+');
				fwrite($STDERR, "ERROR: failed to get transition data for zone {$zone_id}\n");
			}else{
				foreach ($trans as $k => $v){
					unset($trans[$k]['abbr']);
				}
			}
		}else{
			$STDERR = fopen('php://stderr', 'w+');
			fwrite($STDERR, "ERROR: unable to open zone {$zone_id}\n");
			$trans = array();
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
	ksort($exacts);
	foreach ($exacts as $k => $v){
		$k = json_encode($k);
		$v = json_encode($v);
		$exact_lines[] = "\t\t\t{$k}: {$v}";
	}
	$exact = "{\n".implode(",\n", $exact_lines)."\n\t\t}";

	$broken = "// The follow zone IDs have no mapping to our choice list:\n";
	foreach ($no_exact as $id){
		if (isset($core[$id])){
			$broken .= "\t\t// $id\n";
		}else{
			$broken .= "\t\t// $id (Obsolete)\n";
		}
	}


	#
	# output
	#

	$template = file_get_contents(dirname(__FILE__).'/timezones.js.template');

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
