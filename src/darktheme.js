document.addEventListener("DOMContentLoaded", function () {
	const toggleSwitch = document.getElementById("toggleSwitch");

	if (
		localStorage.getItem("theme") === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		document.documentElement.classList.add("dark");
		toggleSwitch.checked = true; // Set the checkbox as checked
	} else {
		document.documentElement.classList.remove("dark");
		toggleSwitch.checked = false; // Set the checkbox as unchecked
	}

	// Example: Toggle images on checkbox change
	toggleSwitch.addEventListener("change", function () {
		if (toggleSwitch.checked) {
			// Checkbox is checked, use night mode image
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			// Checkbox is unchecked, use light mode image
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "");
		}
	});

	// Whenever the user explicitly chooses to respect the OS preference
	localStorage.removeItem("theme");
});
