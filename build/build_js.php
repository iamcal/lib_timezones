<?php
	#
	# load data and shared library functions
	#

        include(dirname(__FILE__)."/../data/static.php");
        include(dirname(__FILE__)."/../data/dynamic.php");
	include(dirname(__FILE__)."/lib.php");


	#
	# build our output blocks
	#

	$dates = '';
	foreach ($timezones_probe_dates as $d){
		$dates .= "\t\t\tkey_parts.push(-1 * new Date(Date.UTC({$d[5]}, {$d[3]}, {$d[4]}, {$d[0]}, {$d[1]}, {$d[2]}, 0)).getTimezoneOffset());\n";
	}

	$map_lines = array();
	foreach ($timezones_probe_map as $k => $v) $map_lines[] = "\t\t\t'$k':\t'{$v[0]}'";
	$map = "{\n".implode(",\n", $map_lines)."\n\t\t}";

	$zone_lines = array();
	foreach ($timezones_list as $row) $zone_lines[] = "\t\t\t[\"{$row[0]}\", '{$row[1]}']";
	$list = "[\n".implode(",\n", $zone_lines)."\n\t\t]";

	function local_format_map($map){
		$lines = array();
		foreach ($map as $k => $v){
			$k = json_encode($k);
			$v = json_encode($v);
			$lines[] = "\t\t\t{$k}: {$v}";
		}
		return "{\n".implode(",\n", $lines)."\n\t\t}";
	}

	$broken = "// The follow zone IDs have no mapping to our choice list:\n";
	foreach ($timezones_nomap as $id){
		$broken .= "\t\t// $id\n";
	}
	foreach ($timezones_nomap_obsolete as $id){
		$broken .= "\t\t// $id (Obsolete)\n";
	}


	#
	# output
	#

	$template = file_get_contents(dirname(__FILE__).'/timezones.js.template');

	$template = str_replace(array(
		'#DATES#',
		'#MAP#',
		'#LIST#',
		'#ALTS-MANUAL#',
		'#ALTS-AUTO#',
		'#ALTS-FALLBACK#',
		'#BROKEN#',
	), array(
		$dates,
		$map,
		$list,
		local_format_map($timezones_manual_map),
		local_format_map($timezones_exact_map),
		local_format_map($timezones_fallback_map),
		$broken,
	), $template);

	echo $template;
