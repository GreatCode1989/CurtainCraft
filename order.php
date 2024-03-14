<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$fio = $_POST['order-form__name'];
$telephone = $_POST['order-form__phone'];
$email = $_POST['order-form__email'];
$comment = $_POST['order-form__comment'];
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $msg = "ok";
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";                                          
    $mail->SMTPAuth   = true;
    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера GMAIL
    $mail->Username   = 'shtory.shtory.web'; // Логин на почте
    $mail->Password   = 'shtory.shtory2020'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('shtory.shtory.web@gmail.com', 'SHTORY'); // Адрес самой почты и имя отправителя
    // Получатель письма
    $mail->addAddress('shtory.shtory.web@yandex.ru');  
    // Прикрипление файлов к письму
if (!empty($_FILES['myfile']['name'][0])) {
    for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
        $filename = $_FILES['myfile']['name'][$ct];
        if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Не удалось прикрепить файл ' . $uploadfile;
        }
    }   
}
        // -----------------------
        // Само письмо
        // -----------------------
        $mail->isHTML(true);
    
        $mail->Subject = 'Заявка с сайта';
        $mail->Body    = "<b>Имя:</b> $fio <br>
        <b>Телефон:</b> $telephone<br>
        <b>E-mail:</b> $email<br>
        <b>Сообщение:</b> $comment<br><br>";
// Проверяем отравленность сообщения
if ($mail->send()) {
    echo "$msg";
} else {
echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
}
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
?>