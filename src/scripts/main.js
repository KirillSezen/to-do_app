let idCounter = 4;

window.onload = function () {
	addToLocalStorage(1, 'Тестовое задание 1');
	addToLocalStorage(2, 'Тестовое задание 2');
	addToLocalStorage(3, 'Тестовое задание 3');
	Object.keys(localStorage).forEach((el) => {
		addListItem(el, localStorage.getItem(el))
	})
}

const addItem = (itemId = idCounter, text = null) => {
	const input = document.getElementsByClassName('add-input')[0].value
	const inputText = text === null ? input : text;

	addListItem(itemId, inputText);
	addToLocalStorage(itemId, inputText);
}

const addToLocalStorage = (itemId, inputText) => {
	localStorage.setItem(itemId, inputText);
}

const addListItem = (itemId = idCounter, inputText) => {
	const list = document.getElementsByClassName('list');
	
	const listItem = document.createElement('div');
	listItem.className = 'list-item';

	const inner = document.createElement('div');
	inner.className = 'inner';

	const listCheck = document.createElement('input');
	listCheck.className = 'list-check';
	listCheck.type = 'checkbox';
	listCheck.id = itemId;

	const itemLabel = document.createElement('label');
	itemLabel.className = 'item-label';
	itemLabel.setAttribute('for', itemId);
	itemLabel.textContent = inputText;

	const deleteImage = document.createElement('img');
	deleteImage.className = 'delete-button-icon';
	deleteImage.src = '/src/images/trash-bin.webp';

	const deleteButton = document.createElement('button');
	deleteButton.className = 'delete-button';
	deleteButton.appendChild(deleteImage);
	deleteButton.addEventListener('click', () => {
		const item = document.getElementById(itemId);
		item.parentElement.parentElement.remove()
	});

	inner.appendChild(listCheck);
	inner.appendChild(itemLabel);
	listItem.appendChild(inner);
	listItem.appendChild(deleteButton);
	list[0].appendChild(listItem);

	if (itemId === idCounter) idCounter++;
	
	document.getElementById('add-form').reset();
}