// include('libs/isotope.pkgd.min.js');
// include('libs/imagesloaded.pkgd.min.js');
// include('libs/nouislider.min.js');
// include('libs/jquery.inputmask.min.js');
// include('libs/wNumb.min.js');
// include('libs/slick.min.js');;
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else{
		document.querySelector('body').classList.add('no-webp');
	}
});;
function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
		ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();;
// include('dynamic.js');
// include('animOnScroll.js');;
$(document).ready(function(){
	if (document.cookie.length > 0) {
		let cookieVal = readCookie("background");
		function readCookie(name) {
			let cookieName = name+"=";
			let split = document.cookie.split(";");
			for (let i = 0; i < split.length; i++) {
				let c = split[i];
				while (c.charAt(0) == "") {
					c = c.substring(1, c.length);
				}
				if (c.indexOf(cookieName) == 0) {
					return c.substring(cookieName.length, c.length);
				}
			}
		};
		$(".page__background").css("background-image", `url(${cookieVal})`)
	}
	$(".header__btn").click(function() {
		$(this).toggleClass("_active");
		$(".header__body").toggleClass("_active");
		$("body").toggleClass("_lock")
	});
	function changeTheme() {
		$(".theme").click(function() {
			let picturePath = $(this).find("img").attr("src");
			$(".page__background").css("background-image", `url(${picturePath})`)
			document.cookie = `background=${picturePath}; max-age=4804800`;
		});
	};
	changeTheme()
	function changeItems(element, itemLesson, name, surname, newTeacher = 0, newTeacherName = "", newTeacherSurname = "") {
		let lesson = $(".day__lesson");
		let item = $(".day__item");
		let teacher = $(".day__teacher");
		element.find(item).html(itemLesson);
		element.find(teacher).html(`<span>${name}</span> ${surname}`);
		if (newTeacher === 1) {
			element.append(`<div class="day__teacher"><span>${newTeacherName}</span> ${newTeacherSurname}</div>`)
		}
	};
	changeItems($('.computing'), "Информатика", "Юлия Геннадьевна", "Белашева");
	changeItems($(".math"), "Математика", "Тамара Викторовна", "Кравцова");
	changeItems($(".literature"), "Литература", "Светлана Юрьевна", "Ковалёва");
	changeItems($(".pe"), "Физическая культура", "Андрей Иванович", "Белашев");
	changeItems($(".history"), "История", "Ольга Михайловна", "Буденис");
	changeItems($(".chemistry"), "Химия", "Константин Александрович", "Поморцев");
	changeItems($(".russian"), "Русский язык", "Светлана Юрьевна", "Ковалёва");
	changeItems($(".physics"), "Физика", "Ольга Николаевна", "Бреусова");
	changeItems($(".social"), "Обществознание", "Ольга Михайловна", "Буденис");
	changeItems($(".ls"), "ОБЖ", "Светлана Петровна", "Прихожая");
	changeItems($(".native"), "Родной русский", "Юлия Олеговна", "Ориховская");
	changeItems($(".nothing"), "В общем-то", "Пары нет", "");
	changeItems($(".biology"), "Биология", "Константин Александрович", "Поморцев");
	changeItems($(".astronimy"), "Астрономия", "Ольга Николаевна", "Бреусова");
	changeItems($(".english"), "Английский язык", "Юлия Олеговна", "Ориховская", 1, "Лилия Андреевна", "Пилил");
	function changeScreens() {
		let menuItem = $(".menu__item");
		for (let i = 0; i < menuItem.length; i++) {
			menuItem.eq(i).attr("data-num", i);
		};
		menuItem.click(function() {
			let screen = $(".screen");
			let itemQty = $(this).attr("data-num");
			let title = $(".page__title");
			menuItem.removeClass("_active");
			$(this).addClass("_active");
			screen.removeClass("_active");
			screen.eq(itemQty).addClass("_active");
			if (screen.eq(0).hasClass("_active")) title.html("Неделя I")
				if (screen.eq(1).hasClass("_active")) title.html("Неделя II")
					if (screen.eq(2).hasClass("_active")) title.html("Расписание звонков")
						if (screen.eq(3).hasClass("_active")) title.html("Дежурные неделя I")
							if (screen.eq(4).hasClass("_active")) title.html("Дежурные неделя II")
						});
	};
	changeScreens();
})