<?php
	#
	# this script dumps the transition info for a single zone ID
	#

	$zone_id = $_SERVER['argv'][1];

        $from = mktime(0,0,0,1,1,2015);
        $to   = mktime(0,0,0,1,1,2020);

	$tz = timezone_open($zone_id);
	$trans = timezone_transitions_get($tz, $from, $to);
	print_r($trans);
