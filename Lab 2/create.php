<html>
<body>
Creating a contacts table.  
<?php

	// set your infomation.
	$host		=	'localhost';
	$user		=	'root';
	$pass		=	'';	
	$database	=	'mysqldb';
	
	$sql = 'CREATE TABLE `contacts` (
		`ID` int( 11 ) NOT NULL AUTO_INCREMENT,
		`contact_name` VARCHAR( 255 ) NOT NULL,
		`contact_profession` VARCHAR( 255 ) NOT NULL,
        `telephone_number` VARCHAR( 15 ) NOT NULL,
        `mobile_number` VARCHAR( 15 ) NOT NULL,
		PRIMARY KEY ( `ID` )
	    )';

	// connect to the mysql database server.
	$connect = @mysql_connect ( $host, $user, $pass ) ;

	if ( $connect )
	{
		// create the database.
		if ( ! @mysql_query ( "CREATE DATABASE $database" ) )
		{
			die ( mysql_error() );
		}
		else {
			mysql_select_db ( $database );
			if ( @mysql_query ( $sql ) )
			{
				echo 'Your new table was created successfully!';
			}
			else {
				die ( mysql_error() );
			}
		}
	}
	else {
		trigger_error ( mysql_error(), E_USER_ERROR );
	}

	

			
?>


</body>
</html>