<html>
<head>
    <title>Update Contacts</title>
    <link rel="stylesheet" href="styles.css" />
    <!-- Add icons library -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
    <div class="row">
        <div class="form">
            <h2 class="form-title">
                Update Contact
            </h2>
            
            <div>
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
                $result = mysql_query("SELECT * FROM contacts WHERE id=$_GET[id]")
                OR die(mysql_error());

                while($row = mysql_fetch_assoc($result)) {
                    $id = $row['ID']; 
                    echo 
                    "<form action='save.php?id=$id' method='post'>
                        <input type='text' value='{$row['contact_name']}' name='contact_name' required/>
                        <input type='text' value='{$row['contact_profession']}' name='contact_profession' required/>
                        <input type='text' value='{$row['telephone_number']}' name='telephone_number' required/>
                        <input type='text' value='{$row['mobile_number']}' name='mobile_number' required/>
                        <div style='display: flex; margin-top: 10px;'>
                            <input type='submit' style='margin-right:10px'/>
                            <input type='reset' />
                        </div>    
                    </form>";                 
                } 
            }
            else {
                trigger_error ( mysql_error(), E_USER_ERROR );
            }			
        ?>
                
            </div>
        </div>
    </div>
            
    
</body>
</html>