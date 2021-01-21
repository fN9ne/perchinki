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
/* код выполняемый после загрузки страницы */
$(document).ready(function(){

	/* глобальные переменные */
	let title = $(".current-tab");
	let lesson = $(".lesson");
	let tab = $(".tab");
	let screen = $(".screen");
	let screensId = ["week1", "week2", "bell", "duty1", "duty2", "game"];
	let burgerBtn = $(".header__burger");
	let changesBtn = $(".changes-btn");
	let themes = $(".themes");
	let theme = $(".theme");
	let changes = $(".changes");
	let dayChanges = $(".day_changes");

	/* подключение функций */
	/* функция для получения значения куки */
function getCookie(name) {
	name += "=";
	let beg = document.cookie.indexOf(name);
	if (beg == -1) return -1;
	else beg += name.length;
	let end = document.cookie.indexOf(";", beg);
	if (end == -1) end = document.cookie.length;
	return document.cookie.substring(beg, end);
};
/* функция смены заголовка страницы */
function changeTitle() {
	if (title.attr("id") == "week1") title.text("Неделя I");
	if (title.attr("id") == "week2") title.text("Неделя II");
	if (title.attr("id") == "bell") title.text("Расписание звонков");
	if (title.attr("id") == "duty1") title.text("Дежурные I");
	if (title.attr("id") == "duty2") title.text("Дежурные II");
	if (title.attr("id") == "game") title.text("Игра");
};
/* функция по заполнению наименования пар и имён преподавателей */
function fillLessons(lesson, subject, name, surname, haveSecondTeacher = 0, secondName = "", secondSurname = "") {
	if (lesson.length == 0) {
		console.log("нет ни одной пары " + subject + " :/");
	} else {
		lesson.find(".lesson__subject").html(subject);
		lesson.find(".lesson__teacher").html(`<span>${name}</span> ${surname}`);
		if (haveSecondTeacher == 1) {
			lesson.append(`<div class='lesson__teacher'><span>${secondName}</span> ${secondSurname}</div>`)
		}
	}
};;

	/* переменные из функций */
	let screenCookie = getCookie("active_screen");
	let bgCookie = getCookie("background");

	/* изменение заголовка страницы */
	changeTitle();

	/* создание блоков с наименованием пары и именем преподавателя */
	$(".screen:not(.duty)").find(lesson).each(function() {
		$(this).append("<div class='lesson__subject'></div><div class='lesson__teacher'><span></span></div>");
	});
	changes.find(lesson).each(function() {
		$(this).append("<div class='lesson__subject'></div><div class='lesson__teacher'><span></span></div>");
	});

	/* присовение табам id с соответствующим экраном,
	присовение табам порядкого номера  */
	tab.each(function(i) {
		$(this).attr("id", screensId[i]);
		$(this).attr("data-num", i);
	});

	/* изменение экрана при загрузке */
	if (screenCookie > -1) {
		tab.removeClass("active");
		tab.eq(screenCookie).addClass("active");
		screen.removeClass("active");
		screen.eq(screenCookie).addClass("active");
		let currentTabId = $(".tab.active").attr("id");
		title.attr("id", currentTabId);
		changeTitle();
	};


	// document.cookie = "total_damage=-1;max-age=-1;"
	// document.cookie = "strange=-1;max-age=-1;"
	// document.cookie = "damage=-1;max-age=-1;"

	// GAME
	let enemy = $(".game__button");
	let count = $(".game__counter").find("p");
	let damage = 0;
	let total = 0;
	let power = $(".game__power").find("p");
	let buff = $(".game__buy");
	let lvl = enemy.attr("data-strange");
	let td = $(".game__total").find("p");
	if (getCookie("damage") == -1) {
		console.log("damage = 0");
	} else {
		damage = getCookie("damage");
		total = getCookie("total_damage");
		count.html(separateNumber(damage));
		td.html(separateNumber(total));
	}
	if (getCookie("strange") == -1) {
		power.html(1);
		console.log("ваша сила = 1");
	} else {
		lvl = getCookie("strange");
		enemy.attr("data-strange", getCookie("strange"));
		power.html(separateNumber(getCookie("strange")));
	}
	enemy.click(function() {
		$("#audio")[0].play();
		damage = Number(damage) + Number(lvl);
		total = Number(total) + Number(lvl);
		td.html(separateNumber(total));
		count.html(separateNumber(damage));
		document.cookie = `damage=${damage};max-age=48004800;`;
		document.cookie = `total_damage=${total};max-age=48004800;`;
		achieveLvls();
	});
	buff.click(function() {
		let buffUp = $(this).attr("data-buy-name").substring(5);
		let buffCost = $(this).attr("data-buy-cost");
		if (buffCost > damage) {
			console.log("не хватает урона");
		} else {
			lvl = Number(lvl) + Number(buffUp);
			damage = Number(damage) - Number(buffCost);
			enemy.attr("data-strange", lvl);
			power.html(separateNumber(lvl));
			count.html(separateNumber(damage));
			document.cookie = `damage=${damage};max-age=48004800;`
			document.cookie = `strange=${lvl};max-age=48004800`;
			document.cookie = `total_damage=${total};max-age=48004800;`;
		}
	});
	function separateNumber(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
			val = val.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
		}
		return val;
	}




	// REWARDS
	let level = theme.attr("data-level");
	function achieveLvls() {
		// lvl 1
		if (total >= 100) {
			$(".game").attr("data-level", 1);
			$(".theme[data-level=1]").addClass("active");
		};
		// lvl 2
		if (total >= 1000) {
			$(".game").attr("data-level", 2);
			$(".theme[data-level=2]").addClass("active");
		};
		// lvl 3
		if (total >= 5000) {
			$(".game").attr("data-level", 3);
			$(".theme[data-level=3]").addClass("active");
		};
		// lvl 4
		if (total >= 25000) {
			$(".game").attr("data-level", 4);
			$(".theme[data-level=4]").addClass("active");
		};
		// lvl 5
		if (total >= 100000) {
			$(".game").attr("data-level", 5);
			$(".theme[data-level=5]").addClass("active");
		};
		// lvl 6
		if (total >= 1000000) {
			$(".game").attr("data-level", 6);
			$(".theme[data-level=6]").addClass("active");
		};
		// lvl 7
		if (total >= 100000000) {
			$(".game").attr("data-level", 7);
			$(".theme[data-level=7]").addClass("active");
		};
		// lvl 8
		if (total >= 1000000000000) {
			$(".game").attr("data-level", 8);
			$(".theme[data-level=8]").addClass("active");
		};

	};
	achieveLvls();





	/* смена тем */
	if (bgCookie.length > -1) {
		if (bgCookie.indexOf("img/") > -1) {
			$(".background").css("background", `url(${bgCookie}) 50% 50%/cover no-repeat fixed`);
		};
		if (bgCookie.indexOf("rgb") > -1) {
			$(".background").css("background", bgCookie);
		};
	}
	theme.click(function() {
		if ($(this).find("img").length == 0) {
			let color = $(this).find("span").css("background-color");
			$(".background").css("background", color);
			document.cookie = `background=${color}; max-age=48004800`;
		} else {
			let themePath = $(this).find("img").attr("src");
			document.cookie = `background=${themePath}; max-age=48004800`;
			$(".background").css("background", `url(${themePath}) 50% 50%/cover no-repeat fixed`);
		}
	});

	/* проверка на наличие изменений */
	function removeChanges() {
		if ($(".changes__content").attr("id") == "nothing") {
			$(".changes__content").html("<span class='no-changes'>Изменений нет</span>");
			if (changesBtn.hasClass("_new")) {
				changesBtn.removeClass("_new");
			}
		};
	};

	/* оповещение о изменениях */
	if (dayChanges.length > 0) {
		changesBtn.addClass("_new");
		changesBtn.click(function() {
			$(this).removeClass("_new");
		});
		removeChanges();
	};

	/* переключение табов */
	tab.click(function() {
		let tabId = $(this).attr("id");
		let currentTab = $(this).attr("data-num");
		if (!$(this).hasClass("active")) {
			title.attr("id", tabId);
			changeTitle();
			tab.removeClass("active");
			$(this).addClass("active");
			screen.removeClass("active");
			screen.eq(currentTab).addClass("active");
			document.cookie = `active_screen=${currentTab};max-age=3600;`;
		};
	});

	/* переключение бургер */
	burgerBtn.click(function() {
		if (changesBtn.hasClass("active")) {
			changesBtn.removeClass("active");
			changes.removeClass("active");
		}
		themes.toggleClass("active");
		burgerBtn.toggleClass("active");
	});

	/* переключение изменений */
	changesBtn.click(function() {
		if (burgerBtn.hasClass("active")) {
			burgerBtn.removeClass("active");
			themes.removeClass("active");
		}
		changesBtn.toggleClass("active");
		changes.toggleClass("active");
	});

	/* заполнение расписания */
	fillLessons($(".computing"), "Информатика", "Юлия Геннадьевна", "Белашева");
	fillLessons($(".math"), "Математика", "Тамара Викторовна", "Кравцова");
	fillLessons($(".literature"), "Литература", "Светлана Юрьевна", "Ковалёва");
	fillLessons($(".pe"), "Физическая культура", "Андрей Иванович", "Белашев");
	fillLessons($(".history"), "История", "Ольга Михайловна", "Буденис");
	fillLessons($(".chemistry"), "Химия", "Константин Александрович", "Поморцев");
	fillLessons($(".russian"), "Русский язык", "Светлана Юрьевна", "Ковалёва");
	fillLessons($(".physics"), "Физика", "Ольга Николаевна", "Бреусова");
	fillLessons($(".social"), "Обществознание", "Ольга Михайловна", "Буденис");
	fillLessons($(".ls"), "ОБЖ", "Светлана Петровна", "Прихожая");
	fillLessons($(".nothing"), "В общем-то", "Пары нет", "");
	fillLessons($(".astronomy"), "Астрономия", "Ольга Николаевна", "Бреусова");
	fillLessons($(".technology"), "Технология", "Светлана Андреевна", "Ноженко");
	fillLessons($(".geography"), "География", "Наталья Михайловна", "Колычева");
	fillLessons($(".english"), "Английский язык", "Юлия Олеговна", "Ориховская", 1, "Лилия Андреевна", "Пилил");
});