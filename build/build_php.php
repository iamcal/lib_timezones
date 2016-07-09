<?php
	#
	# load our data
	#

	include(dirname(__FILE__)."/../data/static.php");
	include(dirname(__FILE__)."/../data/dynamic.php");



	#
	# build up our output
	#

	$choices = "array(\n";
	$zone_choices = "array(\n";

	foreach ($timezones_list as $row){

		$fields = array();
		foreach ($row as $f) $fields[] = var_export($f, true);

		$choices .= "\t\t\tarray(".implode(', ', $fields)."),\n";

		$zone_choices .= "\t\t\t".var_export($row[1], true).",\n";
	}

	$choices .= "\t\t)";
	$zone_choices .= "\t\t)";


	function local_format_map($map){
		$out = "array(\n";
		foreach ($map as $k => $v){
			$out .= "\t\t\t".var_export($k, true)." => ".var_export($v, true).",\n";
		}
		return $out."\t\t)";
	}

	$manual_map = local_format_map($timezones_manual_map);
	$auto_map = local_format_map($timezones_exact_map);
	$fallback_map = local_format_map($timezones_fallback_map);


	#
	# output
	#

	$vars = array(
		'#CHOICES#'		=> $choices,
		'#ZONE-CHOICES#'	=> $zone_choices,
		'#MANUAL-MAP#'		=> $manual_map,
		'#AUTO-MAP#'		=> $auto_map,
		'#FALLBACK-MAP"'	=> $fallback_map,
	);

	$template = file_get_contents(dirname(__FILE__).'/timezones.php.template');

	$template = str_replace(array_keys($vars), $vars, $template);

	$fh = fopen(dirname(__FILE__).'/../lib/lib_timezones.php', 'w');
	fputs($fh, $template);
