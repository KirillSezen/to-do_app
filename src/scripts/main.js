let idCounter = 3;
let idOfActiveItem;

window.onload = function () {
	if (!sessionStorage.getItem('isFirstVisit')) {      
      sessionStorage.setItem('isFirstVisit', 'true');
			addToLocalStorage(1, 'Тестовое задание 1');
			addToLocalStorage(2, 'Тестовое задание 2');
			sessionStorage.setItem(1, false);
			sessionStorage.setItem(2, false);
  }
	
	Object.keys(localStorage).forEach((el) => {
		addListItem(el, localStorage.getItem(el));
		restoreCheckboxState(el);
	})
}	

const restoreCheckboxState = (itemId) => {
	const checkbox = document.getElementById(itemId);
	if (checkbox) {
		const savedState = sessionStorage.getItem(itemId);
		if (savedState === 'true') {
			checkbox.checked = true;
		} else if (savedState === 'false') {
			checkbox.checked = false;
		}
	}
}

const addItem = (itemId = idCounter, text = null) => {
	const input = document.getElementsByClassName('add-input')[0].value
	const inputText = text === null ? input : text;

	addListItem(itemId, inputText);
	addToLocalStorage(itemId, inputText);

	sessionStorage.setItem(itemId, false);	
}

const addToLocalStorage = (itemId, inputText) => {
	localStorage.setItem(itemId, inputText);
}

const addListItem = (itemId = idCounter, inputText) => {
	const list = document.getElementsByClassName('list');
	
	const listItem = document.createElement('div');
	listItem.className = 'list-item';

	const innerText = document.createElement('div');
	innerText.className = 'inner';

	const innerButtons = document.createElement('div');
	innerButtons.className = 'inner';

	const listCheck = document.createElement('input');
	listCheck.className = 'list-check';
	listCheck.type = 'checkbox';
	listCheck.id = itemId;
	listCheck.addEventListener('click', () => {
		sessionStorage.setItem(itemId, listCheck.checked);
	})

	const itemLabel = document.createElement('label');
	itemLabel.className = 'item-label';
	itemLabel.setAttribute('for', itemId);
	itemLabel.textContent = inputText;

	const deleteImage = document.createElement('img');
	deleteImage.className = 'delete-button-icon';
	deleteImage.src = '/src/images/trash.png';

	const editImage = document.createElement('img');
	editImage.className = 'delete-button-icon';
	editImage.src = '/src/images/pen.png';

	const deleteButton = document.createElement('button');
	deleteButton.className = 'delete-button';
	deleteButton.appendChild(deleteImage);
	deleteButton.addEventListener('click', () => {
		const item = document.getElementById(itemId);
		item.parentElement.parentElement.remove()
		localStorage.removeItem(itemId);
		sessionStorage.removeItem(itemId);
	});

	const editButton = document.createElement('button');
	editButton.className = 'delete-button';
	editButton.appendChild(editImage);	
	editButton.addEventListener('click', () => {
		const window = document.getElementById('edit-window-1');
    window.style.display = "block";
		window.style.position = 'fixed';
		document.getElementById('edit-input-1').value = inputText;
		idOfActiveItem = itemId;
	});

	innerText.appendChild(listCheck);
	innerText.appendChild(itemLabel);
	innerButtons.appendChild(editButton);
	innerButtons.appendChild(deleteButton);
	listItem.appendChild(innerText);
	listItem.appendChild(innerButtons);
	list[0].appendChild(listItem);

	if (itemId === idCounter) idCounter++;
	
	document.getElementById('add-form').reset();
}

const cancelEdit = () => {
	const window = document.getElementById('edit-window-1');
  window.style.display = "none";
}

const applyEdit = () => {
	const window = document.getElementById('edit-window-1');
  window.style.display = "none";

	const itemLabel = document.getElementById(idOfActiveItem);
	itemLabel.textContent = document.getElementById('edit-input-1').value;

	localStorage.setItem(idOfActiveItem, document.getElementById('edit-input-1').value);

	location.reload();
}