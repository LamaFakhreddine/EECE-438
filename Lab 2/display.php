<html>
<head>
    <title>Display Contacts</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <table class="table">
        <thead class="table-heading">
            <tr>
                <th>#</th>
                <th>Contact Name</th>
                <th>Contact Profession</th>
                <th>Telephone Number</th>
                <th>Mobile Number</th>
            </tr>
        </thead>
        <tbody>
        
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
                $sql = "SELECT * FROM `contacts`";
                
                if ( @mysql_query ( $sql) )
                {
                    $query = mysql_query ( $sql );

                    $row = mysql_fetch_assoc ( $query );
                    do {
                        echo   
                        "<tr>
                        <td>{$row['ID']}</td>
                        <td>{$row['contact_name']}</td>
                        <td>{$row['contact_profession']}</td>
                        <td>{$row['telephone_number']}</td>
                        <td>{$row['mobile_number']}</td>
                    </tr>\n";
                    } while ( $row = mysql_fetch_assoc ( $query ) );

                }
                else {
                        die ( mysql_error() );
                }	  
            }
            else {
                trigger_error ( mysql_error(), E_USER_ERROR );
            }			
        ?>
    </tbody>
</table>

</body>
</html>