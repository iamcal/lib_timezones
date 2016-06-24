<?php
        ini_set( 'date.timezone', 'Europe/Berlin' );

        ob_start();
        phpinfo(INFO_MODULES);
        $info = ob_get_contents();
        ob_end_clean();

        $start = strpos( $info, 'Timezone Database Version' ) + 29;

	if ($start === false){
		echo "Seems there is no timezone DB installed";
		exit;
	}

        $end   = strpos( $info, "\n", $start );
        $installedVersion = substr( $info, $start, $end - $start );

	echo "Found installed version: {$installedVersion}\n";

        exec( 'pecl remote-info timezonedb', $output );
        $availableVersion = substr( $output[2], 12 );

	echo "Latest available version: {$availableVersion}\n";

	if ($availableVersion == $installedVersion){
		echo "OK: Latest version installed\n";
	}else{
		echo "FAIL: The installed timezonedb is not updated\n";
	}
