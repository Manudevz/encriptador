const runEncryption = (parameters) => {
	const encryptButton = document.getElementById("encrypt-button");
	const textToManage = document.getElementById("textToManage");
	const textToManageLength = document.getElementById("textToManageLength");
	const textApplied = document.querySelector(".textApplied");
	const noTextApplied = document.querySelector(".noTextApplied");

	const handletextToManageChange = (e) => {
		textToManageLength.textContent = `(${e.target.value.length}/1000) palabras`;
	};

	const encrypt = (parameters) => {
		textApplied.classList.remove("hidden");
		textApplied.classList.add("flex");
		noTextApplied.classList.remove("flex");
		noTextApplied.classList.add("hidden");
	};

	const decryptButton = document.getElementById("decrypt-button");

	const decrypt = (parameters) => {
		console.log("hola");
	};

	// Se agrega addevetListener en lugar de agregar los metodos en el html.
	encryptButton.addEventListener("click", encrypt);
	decryptButton.addEventListener("click", decrypt);
	textToManage.addEventListener("input", handletextToManageChange);
};

window.addEventListener("DOMContentLoaded", runEncryption);
