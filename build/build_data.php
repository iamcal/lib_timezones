<?php
	#
	# first, load our manually defined data
	#

	include(dirname(__FILE__).'/../data/static.php');


	#
	# fir every zone this OS knows about, figure out a hash of unique transitions between 2 dates.
	# this allows us to map equivalent zones.
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


	#
	# build a list of A) zones that are valid choices B) which hashes map to those choices
	#

	$skip = array();
	$choices = array();
	foreach ($timezones_list as $row){
		$skip[$row[1]] = true;
		$hash = $hashes[$row[1]];
		if (!isset($choices[$hash]) || $row[2]) $choices[$hash] = $row[1];
	}



	#
	# for each non-chocie zone, either add it to the exact mapping table, or to the list of no-exact-match zones
	#

	$exacts = array();
	foreach ($hashes as $k => $v){
		if (isset($skip[$k])) continue;
		if (isset($choices[$v])){
			$exacts[$k] = $choices[$v];
		}else{
			$no_exact[] = $k;
		}
	}


	#
	# for no-exact-match zones, determine if they're obsolete
	#

	$core = array();
	foreach (timezone_identifiers_list() as $zone_id){
		$core[$zone_id] = 1;
	}


	$no_map_core = array();
	$no_map_obsolete = array();

	foreach ($no_exact as $id){
		if (isset($timezones_fallback_map[$id])) continue;
		if (isset($core[$id])){
			$no_map_core[] = $id;
		}else{
			$no_map_obsolete[] = $id;
		}
	}


	#
	# output our calculated data
	#

	$fh = fopen(dirname(__FILE__)."/../data/dynamic.php", "w");


	fputs($fh, "<"."?php\n");
	fputs($fh, "\$timezones_exact_map = ".var_export($exacts, true).";\n");
	fputs($fh, "\$timezones_nomap = ".var_export($no_map_core, true).";\n");
	fputs($fh, "\$timezones_nomap_obsolete = ".var_export($no_map_obsolete, true).";\n");
