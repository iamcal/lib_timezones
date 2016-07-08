<?php
	#
	# this needs to be valid php syntax, even though we're going to insert more stuff into it
	#

	include('timezones.php.template');


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

	$zones = timezones_list();

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


	#
	# build the output lines
	#

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
	# build up our output
	#

	$map = "\$map = array(\n";
	ksort($exacts);
	foreach ($exacts as $k => $v){
		$map .= "\t\t\t\"$k\" => \"$v\",\n";
	}
	$map .= "\t\t);\n";


	#
	# output
	#

	$template = file_get_contents(dirname(__FILE__).'/timezones.php.template');

	$template = str_replace(array(
		'#MAP#',
	), array(
		$map,
	), $template);

	echo $template;
