<html>
<body>

<?php

	// set your infomation.
	$host		=	'localhost';
	$user		=	'root';
	$pass		=	'';	
	$database	=	'mysqldb';
	
	
	// connect to the mysql database server.
	$connect = @mysql_connect ( $host, $user, $pass ) ;

	if ( $connect )
	{
		mysql_select_db ( $database, $connect );

		$query="INSERT INTO contacts (contact_name, contact_profession, telephone_number, mobile_number)
			VALUES
			('$_POST[contact_name]','$_POST[contact_profession]','$_POST[telephone_number]','$_POST[mobile_number]')";

		
		if ( @mysql_query ( $query ) )
			{
				echo 'Contact Added Successfuly';
			}
			else {
				die ( mysql_error() );
			}	
	        
	}
	else {
		trigger_error ( mysql_error(), E_USER_ERROR );
	}

	

        
			
?>


</body>
</html>