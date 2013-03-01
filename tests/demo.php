<!DOCTYPE html>
<html lang="en">
<title>Key Event Test</title>
</head>
<body>

<p>This page should show a timezone picker.</p>

<?php
    include('../lib_timezones.php');

    echo "<select id=\"zone\">\n";

    $zones = timezones_list();
    foreach ($zones as $row){

    	$id = HtmlSpecialChars($row[1]);
    	$name = HtmlSpecialChars($row[0]);

    	echo "  <option value=\"{$id}\">{$name}</option>\n";
    }

    echo "</select>\n";
?>

<p>If you have JavaScript enabled, it should auto-select your current timezone.</p>

<script src="../timezones.js"></script>
<script>

window.onload = function(){

	var zone = timezones_guess();

	var select = document.getElementById('zone');

	for (var i=0; select.options.length; i++){

		if (select.options[i].value == zone){
			select.selectedIndex = i;
			break;
		}
	}
};

</script>

</body>
</html>
