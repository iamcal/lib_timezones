<?php
	#
	# load our data
	#

	include(dirname(__FILE__)."/../data/static.php");
	include(dirname(__FILE__)."/../data/dynamic.php");


	#
	# build the output lines
	#

	if (count($timezones_nomap) || count($timezones_nomap_obsolete)){
		$broken = "// The follow zone IDs have no mapping to our choice list:\n";
		foreach ($timezones_nomap as $id){
			$broken .= "// $id\n";
		}
		foreach ($timezones_nomap_obsolete as $id){
			$broken .= "// $id (Obsolete)\n";
		}
	}


	#
	# build up our output
	#

	$map = "\$map = array(\n";
	foreach ($timezones_exact_map as $k => $v){
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
