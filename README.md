# Sensible Timezone Selection

[![Build Status](https://travis-ci.org/iamcal/lib_timezones.svg)](https://travis-ci.org/iamcal/lib_timezones) [![Coverage Status](https://coveralls.io/repos/github/iamcal/lib_timezones/badge.svg?branch=master)](https://coveralls.io/github/iamcal/lib_timezones?branch=master)

If the software you're building requires that users select their timezone, then 
you'll need to get a list of timezones from somewhere. These are some bad ways to do it:

*  Give them a list of GMT offsets from -12 to +12. This doesn't handle daylight 
   savings, nor the many timezones that are not a whole hour (or half hour)
   offset from GMT.
*  Free-form offset from GMT. This does not handle daylight savings.
*  GMT offset plus daylight savings toggle. Daylight savings starts and ends
   at different times in different places, and offsets the time by different
   amounts.
*  List the `zone.tab` zones. There are currently 589 of these (as of IANA tzdata v.2016e)
   and they are mostly incomprehensible to humans.
*  Give up.

That's where this library comes in. It contains a list of sensible, common, timezones
with a user-friendly label and their `zone.tab` identifier. Simply grab the list, show
the choices and store the `zone.tab` ID in your database. You can then use the ID 
directly for setting the zone when displaying dates for your user.


## Usage - Selecting a Timezone from PHP

Since the library is written in PHP, this is easiest:

    include('lib_timezones.php');

    echo "<select name=\"zone\">\n";

    $zones = timezones_list();
    foreach ($zones as $row){

    	$id = HtmlSpecialChars($row[1]);
    	$name = HtmlSpecialChars($row[0]);

    	echo "  <option value=\"{$id}\">{$name}</option>\n";
    }

    echo "</select>\n";

If you are getting timezone IDs from some other source, you can map it to one of the
choices like this:

    $zone = timezones_filter($any_zone_id);

Once you have a timezone ID, you can switch to it very simply:

    date_default_timezone_set($zone);

If you want to display a human readable zone label, there's a function for that too:

    echo "It's currently ".date('H:i')." ".timezones_label($zone);
    // e.g. "It's currently 10:32 Cuba Daylight Time"

The labnel will take into account daylight savings in the specified zone.


## Usage - Auto-detecting a Timezone from JavaScript

The JavaScript version of this data is available in `lib_timezones.js`, which also exports
a global function called `timezones_list()` in the same format as the PHP library.

Detecting the actual timezone (rather than just the current offset from GMT) is a pain in 
JavaScript. The JS library contains a function (`timezones_guess()`) that returns a best 
guess at the local timezone, as a `zone.tab` identifier.

    var timezone = timezones_guess();


## Usage in other languages

While the main library is written in PHP, exporting it in a format usable in other languages 
is trivial. If you'd like the data in a particular format, please send a pull request or open
an issue and I'll add it.


## Contributing

The list of which zones to shows as choices, along with which zone IDs should be mapped to each
other are defined in `data/static.php`. When you modify that file, you'll need to rebuild the
libraries as follows:

    npm install // first time only
    bower install // first time only
    grunt


## Timezone DB

To update to the latest version of the timezone DB:

    sudo pecl upgrade timezonedb
    grunt

This will rebuild the data files, embedding the timezone DB version into the file.   


## Caveats

*  Not every timezone is included here. There are many that don't have any residents or don't 
   have enough to make sense being included. If you want to convince me that one should be 
   added, please make your case.
*  Timezones change over time and a city/country that once shared daylight savings with another
   may stop doing so. This data is intended to be a living document, updated as important 
   timezone changes are made.
*  The JavaScript guessing function will not always pick the correct timezone - some timezones
   are very similar and it picks the most likely candidate for givens offsets. If you think
   the 'default' guess for a given offset is wrong, open a ticket.
