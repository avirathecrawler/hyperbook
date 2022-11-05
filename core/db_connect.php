<?php

define('MySQLUsername', 'hyperbook');

// connect directly (used from server)
//define('MySQLHost', '127.0.0.1');

//connect  via port forwarding ( used from dev machine )
define('MySQLHost','127.0.0.1:3307'); 

define('MySQLDb', 'WEBNOTES');
define('MySQLPwd', 'hyperbook');
mysql_connect(MySQLHost, MySQLUsername, MySQLPwd);
@mysql_select_db(MySQLDb) or die("Unable to select database");

?>