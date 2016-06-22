<?php
	$now = new DateTime("now");

	$list = array();

	foreach (timezone_identifiers_list(DateTimeZone::ALL_WITH_BC) as $zone_id){

		$tz = timezone_open($zone_id);

		$off = timezone_offset_get($tz, $now);
		$sort_off = $off;

		$sign = $off >= 0 ? '+' : '-';
		$off = abs($off);

		$hours = floor($off / (60 * 60));
		$off -= $hours * 60 * 60;

		$mins = floor($off / 60);

		$lbl = sprintf('UTC%s%02d:%02d', $sign, $hours, $mins);

		$list[] = array(
			$zone_id,
			$sort_off,
			$lbl,
		);
	}

	usort($list, 'lsort');

	function lsort($a, $b){
		return $a[1] - $b[1];
	}

	foreach ($list as $row){

		echo "$row[2] - $row[0]<br />";
	}
