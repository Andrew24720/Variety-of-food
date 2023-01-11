<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('mihailiukandrei@gmail.com', 'Пользователь сайта');
	//Кому отправить
	$mail->addAdress('mihailiukandrei@gmail.com');
	//Тема письма
	$mail->Subject = 'Письмо от пользователя';

	$body = '<h1>Встречайте новое письмо</h1>';

	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].</p>;
	}
	if(trim(!empty($_POST['Email']))){
		$body.='<p><strong>Email:</strong> '.$_POST['name'].</p>;
	}
	if(trim(!empty($_POST['Message']))){
		$body.='<p><strong>Message:</strong> '.$_POST['name'].</p>;
	}

//Отправляем
if (!$mail->send()) {
	$message = 'Ошибка';
} else{
	$message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);