const titleText = "Testify-site | @online";
let index = 0;
let direction = 1;

function updateTitle() {
	document.title = titleText.substring(0, index);
	index += direction;
	if (index > titleText.length) {
		direction = -1;
	} else if (index < 2) {
		direction = 1;
	}
	setTimeout(updateTitle, 200);
}

updateTitle();