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
// include('ibg.js');
// include('dynamic.js');
// include('animOnScroll.js');;
$(document).ready(function(){
	let pageTitle = $(".title");
	let firstMenuItem = $(".menu__item").eq(0);
	let secretCount;
	if (getCookieBackground("secretCount") == -1) {
		console.log("cookies is not found");
		secretCount = 0;
	} else {
		secretCount = getCookieBackground("secretCount");
	}
	function secret() {
		firstMenuItem.attr("data-secret", secretCount);
		secretCount++;
	};
	function secretTheme() {
		if (firstMenuItem.attr("data-secret") > 249) {
			$(".theme_secret").removeClass("hide");
		} else {
			if (getCookieBackground("bg") == "img/m7.jpg") {
				$(".background").css("background", "#222")
			};
		}
	};
	firstMenuItem.click(function() {
		document.cookie = `secretCount=${secretCount};max-age=48004800;`;
		secret();
		secretTheme();
	});
	function changePageTitle() {
		if (pageTitle.attr("id") == "week1") pageTitle.html("Неделя I");
		if (pageTitle.attr("id") == "week2") pageTitle.html("Неделя II");
		if (pageTitle.attr("id") == "bells") pageTitle.html("Расписание звонков");
		if (pageTitle.attr("id") == "duty1") pageTitle.html("Дежурные I");
		if (pageTitle.attr("id") == "duty2") pageTitle.html("Дежурные II");
	};
	function creatingItems() {
		for (let i = 0; i < $(".lesson").length; i++) {
			$(".lesson").eq(i).append("<div class='lesson__subject'></div><div class='lesson__teacher'><span></span></div>");
		};
	};
	function assignSubject(lesson, subject, name, surname, haveSecondTeacher = 0, secondName = "", secondSurname = "") {
		lesson.find(".lesson__subject").html(subject);
		lesson.find(".lesson__teacher").html(`<span>${name}</span> ${surname}`);
		if (haveSecondTeacher == 1) {
			lesson.append(`<div class='lesson__teacher'><span>${secondName}</span> ${secondSurname}</div>`)
		}
	};
	function changeScreens() {
		let item = $(".menu__item");
		let screen = $(".content__screen");
		let itemId = ["week1", "week2", "bells", "duty1", "duty2"];
		for (let i = 0; i < item.length; i++) {
			item.eq(i).attr("id", itemId[i]);
		}
		for (let i = 0; i < item.length; i++) {
			item.eq(i).attr("data-num", i);
		};
		item.click(function() {
			let itemIdVal = $(this).attr("id");
			pageTitle.attr("id", itemIdVal);
			changePageTitle();
			item.removeClass("_active");
			$(this).addClass("_active");
			let itemNum = $(this).attr("data-num");
			screen.removeClass("_active");
			screen.eq(itemNum).addClass("_active");
			document.cookie = `activeScreen=${itemNum}; max-age: 3600`;
		});
		function getCookieScreen(name) {
			name += "=";
			start = document.cookie.indexOf(name);
			if (start == -1) return -1;
			else start += name.length;
			end = document.cookie.indexOf(";", start);
			if (end == -1) end = document.cookie.length;
			return document.cookie.substring(start, end);
		};
		let cookieScreen = Number(getCookieScreen("activeScreen"));
		if (cookieScreen > -1) {
			item.removeClass("_active");
			item.eq(cookieScreen).addClass("_active");
			screen.removeClass("_active");
			screen.eq(cookieScreen).addClass("_active");
			let itemIdVal = $(".menu__item._active").attr("id");
			pageTitle.attr("id", itemIdVal);
			changePageTitle();
		};
	};
	function openBurger() {
		let btn = $(".header__burger");
		let cnt = $(".themes");
		btn.click(function() {
			if ($(".changes-btn").hasClass("_active")) {
				$(".changes-btn").removeClass("_active");
				$(".changes").removeClass("_active");
			};
			cnt.toggleClass("_active")
			$(this).toggleClass("_active");
		});
	};
	function openChanges() {
		let btn = $(".changes-btn");
		let cnt = $(".changes");
		if ($(".changes__content").attr("id") == "nothing") {
			$(".changes__content").html("<span class='no-changes'>Изменений нет</span>");
		}
		btn.click(function() {
			if ($(".header__burger").hasClass("_active")) {
				$(".header__burger").removeClass("_active");
				$(".themes").removeClass("_active");
			};
			cnt.toggleClass("_active")
			$(this).toggleClass("_active");
		});
	}
	function getCookieBackground(name) {
		name += "=";
		let start = document.cookie.indexOf(name);
		if (start == -1) return -1;
		else start += name.length;
		end = document.cookie.indexOf(";", start);
		if (end == -1) end = document.cookie.length;
		return document.cookie.substring(start, end);
	};
	function themesChange() {
		let theme = $(".theme");
		if (getCookieBackground("bg").length > -1) {
			if (getCookieBackground("bg").indexOf("img/") > -1) {
				$(".background").css("background", `url(${getCookieBackground("bg")}) 50% 50%/cover no-repeat fixed`);
			}
			if (getCookieBackground("bg").indexOf("rgb") > -1) {
				$(".background").css("background", getCookieBackground("bg"))
			}
		}
		theme.click(function() {
			if ($(this).find("img").length == 0) {
				let color = $(this).find("span").css("background-color");
				$(".background").css("background", color);
				document.cookie = `bg=${color}; max-age=4804800`;
			} else {
				let themePath = $(this).find("img").attr("src");
				document.cookie = `bg=${themePath}; max-age=4804800`;
				$(".background").css("background", `url(${themePath}) 50% 50%/cover no-repeat fixed`);
			}
		});
	};
	function alertChanges() {
		dc = $(".day_changes");
		btn = $(".changes-btn")
		if (dc.length > 0) {
			btn.addClass("_new");
			btn.click(function() {
				$(this).removeClass("_new");
			});
		}
	};
	secret();
	changePageTitle();
	creatingItems();
	assignSubject($(".computing"), "Информатика", "Юлия Геннадьевна", "Белашева");
	assignSubject($(".math"), "Математика", "Тамара Викторовна", "Кравцова");
	assignSubject($(".literature"), "Литература", "Светлана Юрьевна", "Ковалёва");
	assignSubject($(".pe"), "Физическая культура", "Андрей Иванович", "Белашев");
	assignSubject($(".history"), "История", "Ольга Михайловна", "Буденис");
	assignSubject($(".chemistry"), "Химия", "Константин Александрович", "Поморцев");
	assignSubject($(".russian"), "Русский язык", "Светлана Юрьевна", "Ковалёва");
	assignSubject($(".physics"), "Физика", "Ольга Николаевна", "Бреусова");
	assignSubject($(".social"), "Обществознание", "Ольга Михайловна", "Буденис");
	assignSubject($(".ls"), "ОБЖ", "Светлана Петровна", "Прихожая");
	assignSubject($(".nothing"), "В общем-то", "Пары нет", "");
	assignSubject($(".astronomy"), "Астрономия", "Ольга Николаевна", "Бреусова");
	assignSubject($(".technology"), "Технология", "Светлана Андреевна", "Ноженко");
	assignSubject($(".geography"), "География", "Наталья Михайловна", "Колычева");
	assignSubject($(".english"), "Английский язык", "Юлия Олеговна", "Ориховская", 1, "Лилия Андреевна", "Пилил");
	changeScreens();
	openBurger();
	openChanges();
	themesChange();
	alertChanges();
	secretTheme();
})