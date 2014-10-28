<?php
	$from = mktime(0,0,0,1,1,2014);
	$to   = mktime(0,0,0,1,1,2020);

	$now = new DateTime("now");

	$offsets = array();
	$sames = array();

	$core = array();
	foreach (timezone_identifiers_list() as $zone_id){
		$core[$zone_id] = 1;
	}

	foreach (timezone_identifiers_list(DateTimeZone::ALL_WITH_BC) as $zone_id){

		list($off, $base, $sum) = get_tz_info($zone_id);

		$offsets[$sum] = $off;
		$bases[$sum] = $base;

		$sames[$sum][] = $zone_id;
	}

	asort($offsets);

	echo "<pre>";

	foreach ($offsets as $k => $v){

		$sign = '+';
		if ($v < 0){ $sign = '-'; $v = -$v; }

		$offset_h = floor($v / 3600);
		$v -= 3600 * $offset_h;

		$offset_m = floor($v / 60);
		$v -= 60 * $offset_m;

		$offset = 'UTC'.$sign.sprintf('%02d:%02d', $offset_h, $offset_m);

		echo "$offset\n";
		#echo "  base: {$bases[$k]}\n";
		#echo "  zones: ".implode(', ', $sames[$k])."\n\n";

		#$num = count($sames[$k]);
		#echo "  {$num} : ".implode(', ', $sames[$k])."\n\n";

		foreach ($sames[$k] as $zone){
			if ($core[$zone]){
				echo "  $zone\n";
			}else{
				echo "  $zone (Obsolete)\n";
			}
		}
		echo "\n";

	}


	function get_tz_info($tz_name){

		global $from, $to, $now;

		$tz = timezone_open($tz_name);
		$trans = timezone_transitions_get($tz, $from, $to);
		$off = timezone_offset_get($tz, $now);

		$bits = array($off);
		foreach ($trans as $row){
			$bits[] = $row['ts'];
			$bits[] = $row['time'];
		}
		$base = implode('|', $bits);
		$sum = md5($base);

		return array($off, $base, $sum);
	}
