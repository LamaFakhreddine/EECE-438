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
		$query="UPDATE contacts 
                SET contact_name = '$_POST[contact_name]', contact_profession = '$_POST[contact_profession]' ,
                 telephone_number = '$_POST[telephone_number]', mobile_number = '$_POST[mobile_number]'
                WHERE id='$_GET[id]'";

		
		if ( @mysql_query ( $query ) )
			{
				echo 'Contact Updated Successfuly';
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