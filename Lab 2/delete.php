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

		$query="DELETE FROM contacts WHERE id='$_GET[id]'";

		
		if ( @mysql_query ( $query ) )
			{
				echo 'Record Deleted Successfuly';
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