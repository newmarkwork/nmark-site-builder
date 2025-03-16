const switchers = document.querySelectorAll(".ui-switcher");

if (switchers.length) {
	const sections = document.querySelectorAll(".ui__section");
	let active = document.querySelector(".ui-switcher.active");

	sections.forEach((section) => {
		if (section.dataset.id !== active.dataset.id) {
			section.style.display = "none";
		}
	});

	switchers.forEach((switcher) => {
		switcher.addEventListener("click", () => {
			const sectionId = switcher.dataset.id;
			active.classList.remove("active");
			switcher.classList.add("active");
			active = switcher;

			sections.forEach((section) => {
				if (section.dataset.id === sectionId) {
					section.style.display = "block";
				} else {
					section.style.display = "none";
				}
			});
		});
	});
}
