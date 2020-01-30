<?php
    if(!isset[$_POST['submit']]){
        echo "Error - you need to submit the form!";
    }
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    if(empty($name)||empty($visitor_email)){
        echo "Name and Email are mandatory!";
        exit;
    }
    
    $email_subject = "New Form From Portfolio!";
    $email_body = "Email from: $visitor_email\n
                    Message: $message\n";
    $to = "ywjeon1314@gmail.com";
    $headers = "From: $email_from \r\n";

    mail($to, $email_subject, $email_body, $headers);

?>