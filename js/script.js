const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}


const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		if (iconMenu.classList.contains('_active')) {
			document.body.classList.remove('_lock');
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
		}
	}
}
/*БУРГЕР МЕНЮ*/


window.onscroll = function showHeader() {
	var header = document.querySelector('.header');
	if (window.pageYOffset > 50) {
		header.classList.add('header__fixed');
	} else {
		header.classList.remove('header__fixed');
	}
}
/*ФИКС ШАПКА*/

document.addEventListener('DOMContentLoaded', () => {

	const onScrollHeader = () => {

		const header = document.querySelector('.header')

		let prevScroll = window.pageYOffset
		let currentScroll

		window.addEventListener('scroll', () => {

			currentScroll = window.pageYOffset

			const headerHidden = () => header.classList.contains('header_hidden')

			if (currentScroll > prevScroll && !headerHidden()) {
				header.classList.add('header_hidden')
			}
			if (currentScroll < prevScroll && headerHidden()) {
				header.classList.remove('header_hidden')
			}

			prevScroll = currentScroll

		})

	}

	onScrollHeader()

});

//swiper:
new Swiper('.image-slider', {

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	loop: true,
});


//ОТПРАВКА ФОРМЫ:
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});

//Таймер
const day = document.getElementById("day");
const hrs = document.getElementById("hrs");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

const currentYear = new Date().getFullYear();
console.log(currentYear);

const newYear = new Date(`1 Jan ${currentYear + 1} 00:00:00`);
console.log(newYear);

function countdownTimer() {
	const todayDate = Date.now();
	console.log(todayDate);
	//Получим разницу между новым годом и текущей датой
	const gap = newYear - todayDate;
	console.log(gap);
	const d = Math.floor(gap / 1000 / 60 / 60 / 24);
	const h = Math.floor((gap / 1000 / 60 / 60) % 24);
	const m = Math.floor((gap / 1000 / 60) % 60);
	const s = Math.floor((gap / 1000) % 60);

	// console.log(d);
	// console.log(h);
	// console.log(m);
	// console.log(s);

	day.innerHTML = d < 10 ? "0" + d : d;
	hrs.innerHTML = h < 10 ? "0" + h : h;
	min.innerHTML = m < 10 ? "0" + m : m;
	sec.innerHTML = s < 10 ? "0" + s : s;
} setInterval(countdownTimer, 1000);