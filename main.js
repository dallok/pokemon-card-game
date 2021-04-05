"use strict";

const btn = document.querySelector(".btn");
const backBtn = document.querySelector("#btn-back");
const cardContainer = document.querySelector(".card__container");
const avatar = document.querySelector("#avatar");
const charName = document.querySelector("#char__name");
const charAbility = document.querySelector("#char__ability");
const charHeight = document.querySelector("#char__height");
const charWeight = document.querySelector("#char__weight");

btn.addEventListener("click", e => {
	e.preventDefault();
	cardContainer.classList.add("show");
	avatar.src = "img/pokeball.png";
	charName.innerHTML = "<em>Loading...</em>";
	charAbility.innerHTML = "<em>Loading...</em>";
	charHeight.innerHTML = "<em>Loading...</em>";
	charWeight.innerHTML = "<em>Loading...</em>";

	const randomNumber = Math.ceil(Math.random() * 898);

	fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
		.then(response => response.json())
		.then(character => {
			console.log(character);
			avatar.src = character.sprites.other["official-artwork"].front_default;
			charName.innerHTML = character["name"];
			charAbility.innerHTML = character.abilities[0].ability.name;
			charHeight.innerHTML = `${character["height"] * 10}cm`;
			charWeight.innerHTML = `${character["weight"] / 10}kg`;
		});
});

backBtn.addEventListener("click", e => {
	e.preventDefault();
	cardContainer.classList.remove("show");
});
