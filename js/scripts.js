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
/* code executed after the page loads */
$(document).ready(function(){
	/* global variables */
	let title = $(".current-screen"),
	lesson = $(".lesson"),
	tab = $(".tab"),
	screen = $(".screen"),
	screensId = ["week1", "week2", "bell", "duty1", "duty2"];
	/* function's connection */
	/* function's change the page title */
function changeTitle() {
	if (title.attr("id") == "week1") title.find("span").text("Неделя I");
	if (title.attr("id") == "week2") title.find("span").text("Неделя II");
	if (title.attr("id") == "bell") title.find("span").text("Звонки");
	if (title.attr("id") == "duty1") title.find("span").text("Дежурные I");
	if (title.attr("id") == "duty2") title.find("span").text("Дежурные II");
};
/* function the fill the lessons subject & teacher's names */
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
	/* change the page title */
	changeTitle();
	/* changes */
	let changes_btn = $(".changes__btn");
	let changes_cnt = $(".fixed-container_body");
	let changes = $(".changes");
	changes_btn.click(function() {
		changes_btn.toggleClass("active");
		changes_cnt.toggleClass("active");
		changes.toggleClass("active");
		if (changes_btn.hasClass("alert")) {
			changes_btn.removeClass("alert");
		}
	});
	/* check changes */
	if (changes.attr("id") == "nothing") {
		changes.find(".day").remove();
		$(".changes__content").html("<span>Изменений нет.</span>")
	} else {
		changes_btn.addClass("alert");
	}
	/* creating the blocks with lesson's & teacher's names */
	$(".screen:not(.duty, .bell)").find(lesson).each(function() {
		$(this).append("<div class='lesson__subject'></div><div class='lesson__teacher'><span></span></div>");
	});
	changes.find(lesson).each(function() {
		$(this).append("<div class='lesson__subject'></div><div class='lesson__teacher'><span></span></div>");
	});
	/* assigning an id to tabs */
	tab.each(function(i) {
		$(this).attr("id", screensId[i]);
		$(this).attr("data-num", i);
	});
	/* toggling tabs */
	tab.click(function() {
		let tabId = $(this).attr("id");
		let currentTab = $(this).attr("data-num");
		title.attr("id", tabId);
		changeTitle();
		tab.removeClass("active");
		$(this).addClass("active");
		screen.removeClass("active");
		screen.eq(currentTab).addClass("active");
	});
	/* filling timetable */
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