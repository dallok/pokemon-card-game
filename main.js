"use strict";

const btn = document.querySelector("#btn-pick");
const backBtn = document.querySelector("#btn-back");
const addBtn = document.querySelector("#btn-add");
const cardContainer = document.querySelector(".card__container");
const homeContainer = document.querySelector(".body__container");
const card = document.querySelector(".card");
const avatar = document.querySelector("#avatar");
const charName = document.querySelector("#char__name");
const charAbility = document.querySelector("#char__ability");
const charHeight = document.querySelector("#char__height");
const charWeight = document.querySelector("#char__weight");

// Click Handler
function onClickHandler(e) {
	const ancestorContainer = e.target.closest(".box");
	ancestorContainer.classList.add("invisible");

	if (ancestorContainer.nextElementSibling.classList.contains("invisible")) {
		ancestorContainer.nextElementSibling.classList.remove("invisible");
	} else {
		ancestorContainer.previousElementSibling.classList.remove("invisible");
	}
}

function onAddHandler() {
	
}

// Fetch characters from API
function fetchChar() {
	const randomNumber = Math.ceil(Math.random() * 898);

	fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
		.then(response => response.json())
		.then(character => { 
			paintCard(character, card)
		});
}

// Paint cards with fetched data
function paintCard(character, card) {
	card.innerHTML = `
	<div class="card__innerline">
		<div class="img__container">
			<img src="${
				character.sprites.other["official-artwork"].front_default
			}" alt="" id="avatar" />
		</div>
		<div class="description__container">
			<div class="char__name-title">
				Name: <span id="char__name" class="text-danger fs-2 text-capitalize">${
					character["name"]
				}</span>
			</div>
			<div class="char__ability-title">
				Ability: <span id="char__ability" class="text-danger fs-2 text-capitalize">${
					character.abilities[0].ability.name
				}</span>
			</div>
			<div class="char__size">
				<div class="char__size-height">
					Height: <span id="char__height" class="text-danger">${
						character["height"] * 10
					}cm</span>
				</div>
				<div class="char__size-weight">
					Weight: <span id="char__weight" class="text-danger">${
						character["weight"] / 10
					}kg</span>
				</div>
			</div>
		</div>
	</div>
	`;
}

// Store cards itno localStorage

btn.addEventListener("click", e => {
	onClickHandler(e);
	fetchChar();
});

backBtn.addEventListener("click", onClickHandler);

addBtn.addEventListener("click", onAddHandler);
