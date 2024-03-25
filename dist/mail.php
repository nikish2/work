<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

// Данные
$name = $data['name'];
$email = $data['email'];
$tel = $data['tel'];

// Контент письма
$title = 'Заявка с сайта DZHUMYGA'; // Название письма
$body = '<p>Запрос на индивидуальное предложение</p>'.
         '<p>Имя: <strong>'.$name.'</strong></p>'.
         '<p>Почта: <strong>'.$email.'</strong></p>'.
         '<p>Телефон: <strong>'.$tel.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth = true;

  // Настройки почты отправителя
  $mail->Host = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username = 'rashkevich1978@gmail.com'; // Логин на почте
  $mail->Password = 'hmhi eqtj ciqr yihn'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  $mail->setFrom('rashkevich1978@gmail.com', 'Заявка с сайта'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('rashkevich1978@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение успешно отправлено');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo ('Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}');
}