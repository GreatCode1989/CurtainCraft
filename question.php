<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$questionName = $_POST['question-name'];
$questionPhone = $_POST['question-phone'];
$questionEmail = $_POST['question-email'];
$questionItem = $_POST['question-ask'];
$questionWayPhone = $_POST['order-form__way-phone'];
$questionWayEmail = $_POST['order-form__way-email'];
if ($questionWayPhone == 'on') {
    $questionWayPhone = 'да';
} else {
    $questionWayPhone = 'нет';
}
if ($questionWayEmail == 'on') {
    $questionWayEmail = 'да';
} else {
    $questionWayEmail = 'нет';
}
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
    $mail->addAddress('shtory.shtory@gmail.com');  
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
    
        $mail->Subject = 'Задать вопрос';
        $mail->Body    = "<b>Имя:</b> $questionName <br>
        <b>Телефон:</b> $questionPhone<br>
        <b>E-mail:</b> $questionEmail<br>
        <b>Вопрос:</b> $questionItem<br>
        <b>Удобен ли телефон как способ связи:</b> $questionWayPhone<br>
        <b>Удобен ли e-mail как способ связи:</b> $questionWayEmail<br>";
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