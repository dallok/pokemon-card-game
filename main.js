"use strict";

const btn = document.querySelector(".btn");
const backBtn = document.querySelector("#btn-back");
const cardContainer = document.querySelector(".card__container");
const homeContainer = document.querySelector(".body__container");

btn.addEventListener("click", e => {
	e.preventDefault();
	cardContainer.classList.remove("invisible")
	homeContainer.classList.add("invisible");

	

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
	homeContainer.classList.remove("invisible")
	cardContainer.classList.add("invisible");
});
