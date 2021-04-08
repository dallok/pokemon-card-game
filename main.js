"use strict";

const btn = document.querySelector("#btn-pick");
const backBtn = document.querySelector("#btn-back");
const addBtn = document.querySelector("#btn-add");
const cardContainer = document.querySelector(".card__container");
const homeContainer = document.querySelector(".body__container");
const card = document.querySelector(".card");
const cardCollections = document.querySelectorAll(".card__collection .card");
const avatar = document.querySelector("#avatar");
const charName = document.querySelector("#char__name");
const charAbility = document.querySelector("#char__ability");
const charHeight = document.querySelector("#char__height");
const charWeight = document.querySelector("#char__weight");

let cards = [];

// Click Handler
function onClickHandler(e) {
	const ancestorContainer = e.target.closest(".box");
	ancestorContainer.classList.add("invisible");
	ancestorContainer.classList.remove("visible");

	if (ancestorContainer.nextElementSibling.classList.contains("invisible")) {
		ancestorContainer.nextElementSibling.classList.remove("invisible");
		ancestorContainer.nextElementSibling.classList.add("visible");
	} else {
		ancestorContainer.previousElementSibling.classList.remove("invisible");
		ancestorContainer.previousElementSibling.classList.add("visible");
	}
}

function onAddHandler() {
	fetchChar();
	const cards = JSON.parse(localStorage.getItem("charCards"));

	cardCollections.forEach(function (collect, idx) {
		const content = cards[idx];
		collect.innerHTML = `
		<div class="img__container bg-white" data-id="${idx}">
		<img data-id="${idx}" src="${content.avatar}" class="card-img-top" alt="..." /></div>
		<div data-id="${idx}" class="collection__name text-center fw-bolder text-success text-break text-capitalize">${content.charName}</div>
		`;
		collect.classList.add("bg-warning");
	});
}

function saveCards() {
	localStorage.setItem("charCards", JSON.stringify(cards));
}

// Fetch characters from API
function fetchChar() {
	const randomNumber = Math.ceil(Math.random() * 898);
	avatar.src = "img/pokeball.png";

	fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`)
		.then(response => response.json())
		.then(character => {
			const charObj = {
				avatar: character.sprites.other["official-artwork"].front_default,
				charName: character.name,
				charAbility: character.abilities[0].ability.name,
				charHeight: character.height,
				charWeight: character.weight,
			};
			paintCard(charObj, card);
			cards.push(charObj);
			saveCards();
		});
}

// Paint cards with fetched data
function paintCard(charObj, card) {
	card.innerHTML = `
	<div class="card__innerline">
		<div class="img__container">
			<img src="${charObj.avatar}" alt="" id="avatar" />
		</div>
		<div class="description__container">
			<div class="char__name-title">
				Name: <span id="char__name" class="text-danger fs-2 text-capitalize">${
					charObj.charName
				}</span>
			</div>
			<div class="char__ability-title">
				Ability: <span id="char__ability" class="text-danger fs-2 text-capitalize">${
					charObj.charAbility
				}</span>
			</div>
			<div class="char__size">
				<div class="char__size-height">
					Height: <span id="char__height" class="text-danger">${
						charObj.charHeight * 10
					}cm ${" "}</span>
				</div>
				<div class="char__size-weight">
					Weight: <span id="char__weight" class="text-danger">${
						charObj.charWeight / 10
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

backBtn.addEventListener("click", e => {
	onClickHandler(e);
	localStorage.clear();
	location.reload();
});

addBtn.addEventListener("click", e => {
	if (cards.length > 3) {
		e.target.classList.add("invisible");
		card.innerHTML = `
		<div class="card__innerline">
			<div class="img__container">
				<img src="img/pokeball.png" alt="" id="avatar" />
			</div>
			<div class="description__container">
				<h1>You already have picked 3 cards.</h1>
			</div>
		</div>`;
	} else {
		onAddHandler(e);
	}
});

cardCollections.forEach(button => {
	button.addEventListener("click", e => {
		const cardId = e.target.dataset.id;
		paintCard(cards[cardId], card);
	});
});
