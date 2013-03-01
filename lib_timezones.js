
//
// technique based on this article:
// http://blog.redfin.com/devblog/2007/08/getting_the_time_zone_from_a_web_browser.html
//

function timezones_guess(){

	var so = -1 * new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0)).getTimezoneOffset();
	var wo = -1 * new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0)).getTimezoneOffset();
	var key = so + ':' + wo;

	return timezones_map[key] ? timezones_map[key] : 'US/Pacific';
}


var timezones_map = {"-660:-660":"Pacific\/Midway","-600:-600":"Pacific\/Honolulu","-480:-540":"America\/Anchorage","-420:-480":"America\/Tijuana","-420:-420":"America\/Phoenix","-360:-420":"America\/Chihuahua","-360:-360":"America\/Belize","-300:-360":"America\/Chicago","-300:-300":"America\/Bogota","-240:-300":"America\/New_York","-240:-240":"America\/Caracas","-240:-180":"America\/Asuncion","-180:-240":"America\/Halifax","-150:-210":"America\/St_Johns","-180:-120":"America\/Sao_Paulo","-180:-180":"America\/Buenos_Aires","-120:-180":"America\/Godthab","-120:-120":"America\/Noronha","0:-60":"Atlantic\/Azores","-60:-60":"Atlantic\/Cape_Verde","60:0":"Europe\/London","0:0":"Africa\/Casablanca","120:60":"Europe\/Amsterdam","60:60":"Africa\/Algiers","60:120":"Africa\/Windhoek","180:120":"Europe\/Athens","120:120":"Africa\/Harare","240:180":"Asia\/Baghdad","180:180":"Asia\/Kuwait","270:210":"Asia\/Tehran","240:240":"Asia\/Muscat","300:240":"Asia\/Baku","270:270":"Asia\/Kabul","300:300":"Asia\/Karachi","330:330":"Asia\/Kolkata","360:360":"Asia\/Colombo","345:345":"Asia\/Katmandu","360:300":"Asia\/Yekaterinburg","390:390":"Asia\/Rangoon","420:420":"Asia\/Bangkok","420:360":"Asia\/Novosibirsk","480:480":"Asia\/Chongqing","480:420":"Asia\/Krasnoyarsk","540:480":"Asia\/Ulaanbaatar","540:540":"Asia\/Tokyo","570:630":"Australia\/Adelaide","570:570":"Australia\/Darwin","600:600":"Australia\/Brisbane","600:660":"Australia\/Canberra","600:540":"Asia\/Yakutsk","660:660":"Pacific\/Guadalcanal","660:600":"Asia\/Vladivostok","720:780":"Pacific\/Auckland","720:720":"Pacific\/Fiji","720:660":"Asia\/Magadan","780:780":"Pacific\/Tongatapu"};
