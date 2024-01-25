const runEncryption = (parameters) => {
	const encryptButton = document.getElementById("encrypt-button");
	const decryptButton = document.getElementById("decrypt-button");
	const textToManage = document.getElementById("textToManage");
	const textEncrypted = document.getElementById("textEncrypted");
	const textToManageLength = document.getElementById("textToManageLength");
	const textApplied = document.querySelector(".textApplied");
	const noTextApplied = document.querySelector(".noTextApplied");
	let textSecret,
		textRevealed = [];

	const wordsKey = {
		a: "ai",
		e: "enter",
		i: "imes",
		o: "ober",
		u: "ufat",
	};

	const handletextToManageChange = (e) => {
		if (e.target.value.length === 1) {
			textToManageLength.textContent = `(${e.target.value.length}/1000) caracter.`;
		} else {
			textToManageLength.textContent = `(${e.target.value.length}/1000) caracteres.`;
		}
		if (e.target.value.length === 1000) {
			textToManageLength.classList.add("text-red-500");
		} else {
			textToManageLength.classList.remove("text-red-500");
		}
	};

	const optionalRenderingText = () => {
		textApplied.classList.remove("hidden");
		textApplied.classList.add("flex");
		noTextApplied.classList.remove("flex");
		noTextApplied.classList.add("hidden");
	};

	const optionalRenderingNoText = () => {
		textApplied.classList.remove("flex");
		textApplied.classList.add("hidden");
		noTextApplied.classList.remove("hidden");
		noTextApplied.classList.add("flex");
	};

	const encrypt = (text) => {
		optionalRenderingText();
		return text
			.split("")
			.map((letter) =>
				wordsKey.hasOwnProperty(letter) ? wordsKey[letter] : letter
			)
			.join("");
	};

	const decrypt = (text) => {
		optionalRenderingText();
		return Object.entries(wordsKey).reduce((decryptedText, [key, value]) => {
			decryptedText = decryptedText.replaceAll(value, key);
			return decryptedText;
		}, text);
	};

	const deleteMessage = () =>
		document
			.querySelector("main")
			.removeChild(document.querySelector(".alert"));

	const messages = ({ message, color, icon }) => {
		if (document.querySelector(".alert") !== null) {
			clearTimeout(timer);
			deleteMessage();
		}

		const section = `
      <section class="alert" style="--color-msj:${color}">
        <section class="alert-container flex">
          <span class="flex span-icon">${icon}${message} </span>
          <button id="close" class="flex"><i class='bx bx-x'></i></button>
        </section>
      </section>`;

		document.querySelector("main").insertAdjacentHTML("beforeend", section);

		timer = setTimeout((e) => {
			deleteMessage();
		}, 4000);
	};

	document.addEventListener("click", (e) => {
		if (
			e.target.name === "encryptButton" ||
			e.target.name === "decryptButton"
		) {
			const trimmedValue = textToManage.value.replace(/^\s+|\s+$/g, "");

			if (trimmedValue === "") {
				optionalRenderingNoText();
				messages({
					message: `No hay texto`,
					color: "#e24d4c",
					icon: "<i class='bx bxs-x-circle' ></i>",
				});
			} else if (/^[a-z\s.0-9]+$/.test(trimmedValue)) {
				textSecret =
					e.target.name === "decryptButton"
						? decrypt(trimmedValue)
						: encrypt(trimmedValue);

				textEncrypted.textContent = textSecret;

				messages({
					message: `Texto transformado correctamente`,
					color: "#0abf30",
					icon: "<i class='bx bxs-check-circle'></i>",
				});
			} else {
				messages({
					message: `Solo letras minusculas sin acentos`,
					color: "#e24d4c",
					icon: "<i class='bx bxs-x-circle' ></i>",
				});
			}
		}

		if (e.target.name === "copy") {
			console.log(textSecret, "textSecret");
			navigator.clipboard
				.writeText(textSecret)
				.then((e) =>
					messages({
						message: "Texto copiado correctamente",
						color: "#0abf30",
						icon: "<i class='bx bxs-check-circle'></i>",
					})
				)
				.catch((e) =>
					messages({
						message: "Error al copiar el texto",
						color: "#e24d4c",
						icon: "<i class='bx bxs-x-circle' ></i>",
					})
				);
		}
		if (e.target.matches("#close") || e.target.matches("#close *"))
			deleteMessage();
	});
	textToManage.addEventListener("input", handletextToManageChange);
};

window.addEventListener("DOMContentLoaded", runEncryption);
