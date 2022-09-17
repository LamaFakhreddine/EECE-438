<html>
<head>
    <title>Display Contacts</title>
    <link rel="stylesheet" href="styles.css" />
    <!-- Add icons library -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div class="table">
        <h2 class="form-title" align="center">All Contacts</h2>
        <a class="update-btn" href="insert-form.html"><i class="fa fa-plus udpate-btn" aria-hidden="true"></i> Add</a>
        <table class="">
            <thead class="table-heading">
                <tr>
                    <th>#</th>
                    <th>Contact Name</th>
                    <th>Contact Profession</th>
                    <th>Telephone Number</th>
                    <th>Mobile Number</th>
                    <th></th>
                    <th></th>
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
                $sql = "SELECT * FROM `contacts` ORDER BY ID";
                
                if ( @mysql_query ( $sql) )
                {
                    $query = mysql_query ( $sql );

                    $row = mysql_fetch_assoc ( $query );
                   
                    do {
                        $id = $row['ID'];
                        echo   
                        "<tr>
                        <td name='id' align='center'>{$row['ID']}</td>
                        <td name='contact_name'>{$row['contact_name']}</td>
                        <td name='contact_profession'>{$row['contact_profession']}</td>
                        <td name='telephone_number'>{$row['telephone_number']}</td>
                        <td name='mobile_number'>{$row['mobile_number']}</td>
                       <td align='center'><a class='update-btn' href='update-form.php?action=get&id=$id'>
                            <i class='fa fa-pencil' aria-hidden='true'></i></a></td>
                        <td align='center'><a class='delete-btn' href='delete.php?action=delete&id=$id'>
                            <i class='fa fa-trash' aria-hidden='true'></i></a></td>
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
        </div>
</body>
</html>