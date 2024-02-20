<?php
// your-server-endpoint.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Process the data, for example, send an email
    $to = 'your-email@example.com';
    $subject = 'New contact form submission';
    $body = "Name: $name\nEmail: $email\nMessage: $message";
    $headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    if(mail($to, $subject, $body, $headers)) {
        echo json_encode(['message' => 'Message sent successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Message sending failed.']);
    }
} else {
    // Not a POST request
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>





cock


cocaine



sfoster was here 25/02/2023 