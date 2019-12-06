const settings = {
	canvasWidth: 110,
	canvasHeight: 90,
	gridsize: 8,
	character: 'V',
	linesize: 6
};

const canvasDiv = document.getElementById('canvasDiv');

const canvas = document.createElement('canvas');

canvas.setAttribute('width', settings.canvasWidth);
canvas.setAttribute('height', settings.canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);

const context = canvas.getContext('2d');

const paper = document.getElementById('canvas');
let paint = false;
let clickX = [];
let clickY = [];
let clickDrag = [];
let clickColor = [];
let currentColor = '#2E4C9D';
let backgroundColor = '#7F9539';
const landingDiv = document.getElementById('landingDiv');
const makeContainer = document.getElementById('makeContainer');
const madeContainer = document.getElementById('madeContainer');
const jumperContainer = document.getElementById('jumperContainer');
// buttons to change the background
const backgroundButtons = document.querySelectorAll('[data-background]');
// buttons to change the colors
const colorButtons = document.querySelectorAll('[data-color]');

function designIt() {
	landingDiv.classList.add('hidden');
	makeContainer.classList.remove('hidden');
}

function addClick(x, y, dragging) {
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColor.push(currentColor);
}

function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	context.lineJoin = 'round';
	context.lineWidth = settings.linesize;

	for (let i = 0; i < clickX.length; i += 1) {
		context.beginPath();
		if (clickDrag[i] && i) {
			context.moveTo(clickX[i - 1], clickY[i - 1]);
		} else {
			context.moveTo(clickX[i] - 1, clickY[i]);
		}
		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.strokeStyle = clickColor[i];
		context.stroke();
	}
}

function pendown(event) {
	const mouseX = event.pageX - this.offsetLeft;
	const mouseY = event.pageY - this.offsetTop;

	paint = true;
	addClick(mouseX, mouseY);
	redraw();
}

function penup() {
	paint = false;
}

function pendraw(event) {
	if (paint) {
		addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true);
		redraw();
	}
}

function changeColor(event) {
	const clicked = event.target;
	currentColor = clicked.getAttribute('data-color');
	clicked.classList.add('active');

	for (let i = 0; i < colorButtons.length; i += 1) {
		colorButtons[i].classList.remove('active');
	}

	clicked.classList.add('active');
}

function changeBackground(event) {
	const clicked = event.target;
	backgroundColor = clicked.getAttribute('data-background');

	for (let i = 0; i < backgroundButtons.length; i += 1) {
		backgroundButtons[i].classList.remove('active');
	}

	clicked.classList.add('active');
}

function frog() {
	clickX = [];
	clickY = [];
	clickDrag = [];
	clickColor = [];
	backgroundColor = '#FFF';
	redraw();
}

function restart() {
	frog();
	makeContainer.classList.remove('hidden');
	madeContainer.classList.add('hidden');
}

function addStyles() {
	const sheet = document.createElement('style');
	sheet.setAttribute('id', 'tempstyles');
	sheet.innerHTML = `#jumperContainer span {
		width: ${settings.gridsize}px;
		height: ${settings.gridsize}px;
		line-height: ${settings.gridsize}px;
		font-size: ${settings.gridsize}px; }

		.jumperDark {
			fill: ${backgroundColor};
		}`;

	document.body.insertBefore(sheet, document.body.firstChild);
}

function createCross(top, left, color) {
	const newElement = document.createElement('span');
	newElement.innerHTML = settings.character;
	newElement.style.color = color;
	newElement.style.top = `${top}px`;
	newElement.style.left = `${left}px`;
	jumperContainer.appendChild(newElement);
}


function knit() {
	addStyles();

	for (let y = 0; y < settings.canvasWidth; y += settings.gridsize) {
		for (let x = 0; x < settings.canvasHeight; x += settings.gridsize) {
			const imageData = context.getImageData(y, x, settings.gridsize, settings.gridsize);
			const colorString = `rgba( ${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]},1)`;
			createCross(x, y, colorString);
		}
	}
	makeContainer.classList.add('hidden');
	madeContainer.classList.remove('hidden');
}

paper.addEventListener('mousedown', pendown);
paper.addEventListener('mousemove', pendraw);
paper.addEventListener('mouseup', penup);
paper.addEventListener('mouseleave', penup);

// Add touch event listeners to canvas element
paper.addEventListener('touchstart', pendown);
paper.addEventListener('touchmove', pendraw);
paper.addEventListener('touchend', penup);
paper.addEventListener('touchcancel', penup);


//
const createButton = document.querySelectorAll('[data-start]');

for (let i = 0; i < createButton.length; i += 1) {
	createButton[i].addEventListener('click', designIt);
}

// buttons to change the colors
for (let i = 0; i < colorButtons.length; i += 1) {
	colorButtons[i].style.background = colorButtons[i].getAttribute('data-color');
	colorButtons[i].addEventListener('click', changeColor);
}

// buttons to change the colors
for (let i = 0; i < backgroundButtons.length; i += 1) {
	backgroundButtons[i].style.background = backgroundButtons[i].getAttribute('data-background');
	backgroundButtons[i].addEventListener('click', changeBackground);
}

// button to restart
const restartButtons = document.querySelectorAll('[data-frog]');

for (let i = 0; i < restartButtons.length; i += 1) {
	restartButtons[i].addEventListener('click', frog);
}

// button to do the knitting
const knitButton = document.querySelectorAll('[data-knit]');

for (let i = 0; i < knitButton.length; i += 1) {
	knitButton[i].addEventListener('click', knit);
}

// button to restart
const startOverButtons = document.querySelectorAll('[data-restart]');

for (let i = 0; i < startOverButtons.length; i += 1) {
	startOverButtons[i].addEventListener('click', restart);
}
