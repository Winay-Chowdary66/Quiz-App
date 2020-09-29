const question = document.querySelector('.question');
const radioBtn = document.querySelectorAll('.answer');
const aOptions = document.querySelector('.a-option');
const bOptions = document.querySelector('.b-option');
const cOptions = document.querySelector('.c-option');
const dOptions = document.querySelector('.d-option');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const finishTest = document.querySelector('.finish-btn');
const numberBtns = document.querySelector('.number-btns');

let quizData = [
	{
		question: 'Who is the CEO of Google Company?',
		a: 'Satyam Nadhendla',
		b: 'Elon Mosk',
		c: 'Sundhar Pichai',
		d: 'Jeff Bezos',
		answer: 'c'
	},
	{
		question: 'Who is the CEO of Amazon Company?',
		a: 'Satyam Nadhendla',
		b: 'Elon Mosk',
		c: 'Sundhar Pichai',
		d: 'Jeff Bezos',
		answer: 'd'
	},
	{
		question: 'Who is the CEO of Microsoft Company?',
		a: 'Satyam Nadhendla',
		b: 'Elon Mosk',
		c: 'Sundhar Pichai',
		d: 'Jeff Bezos',
		answer: 'a'
	},
	{
		question: 'Who is the CEO of SpaceX Company?',
		a: 'Satyam Nadhendla',
		b: 'Elon Mosk',
		c: 'Sundhar Pichai',
		d: 'Jeff Bezos',
		answer: 'b'
	},

	{
		question: 'HTML stands for?',
		a: 'Hindhustan Technology Metallic Ltd.',
		b: 'HyperText Makeup Lesson',
		c: 'High Transform Markup Language',
		d: 'HyperText Markup Language',
		answer: 'd'
	},
	{
		question: 'What is the fullform of AJAX?',
		a: 'Asynchronus Java And XML',
		b: 'Advanced JavaScript And Xerox',
		c: 'Aysnchronous JavaScript And XML',
		d: 'Absorption of Jungle and Xaamp',
		answer: 'c'
	},
	{
		question: 'Who is the Cheif Executive Officer of HCL Technologies Ltd. in 2020?',
		a: 'Shiv Nadar',
		b: 'Roshini Nadar Malhotra',
		c: 'C Vijaykumar',
		d: 'Arjun Malhotra',
		answer: 'b'
	},
	{
		question: 'This quiz is created by?',
		a: 'Satyam Nadhendla',
		b: 'Elon Mosk',
		c: 'Annangi Vinay Chowdary',
		d: 'Jeff Bezos',
		answer: 'c'
	}
];

//finishTest.style.visibility = 'hidden';

let currentQuestion = 0;

quiz();

function quiz() {
	//console.log(typeof(currentQuestion));
	let questionNumber = currentQuestion + 1;
	//console.log(questionNumber);

	question.innerHTML = questionNumber + '. ' + quizData[currentQuestion].question;
	aOptions.innerHTML = quizData[currentQuestion].a;
	bOptions.innerHTML = quizData[currentQuestion].b;
	cOptions.innerHTML = quizData[currentQuestion].c;
	dOptions.innerHTML = quizData[currentQuestion].d;
	currentQuestion <= 0 ? (previousBtn.style.visibility = 'hidden') : (previousBtn.style.visibility = 'visible');
	currentQuestion >= quizData.length - 1
		? (nextBtn.style.visibility = 'hidden')
		: (nextBtn.style.visibility = 'visible');
}

function quizanswers() {
	let answerOption = undefined;
	radioBtn.forEach((answer) => {
		if (answer.checked) {
			answerOption = answer.id;
		}
	});
	return answerOption;
}

function remove() {
	radioBtn.forEach((answer) => {
		answer.checked = false;
	});
}

function visible(value) {
	radioBtn.forEach((answer) => {
		answer.value = value;
		answer.checked = true;
	});
}
let score = 0;
nextBtn.addEventListener('click', () => {
	const answers = quizanswers();

	if (answers === quizData[currentQuestion].answer) {
		score++;
	}

	if (currentQuestion == quizData.length - 1) {
		nextBtn.style.visibility = 'hidden';
	}

	++currentQuestion;
	quiz();

	remove();
});

previousBtn.addEventListener('click', () => {
	nextBtn.style.visibility = 'visible';
	const prevAnswer = quizanswers();
	if (prevAnswer === quizData[currentQuestion].answer) {
		score++;
	}
	visible(prevAnswer);
	currentQuestion--;
	quiz();
	//remove();
});

let btnsLength = 0;
while (btnsLength < quizData.length) {
	let createBtns = document.createElement('button');
	createBtns.innerHTML = btnsLength + 1;
	numberBtns.appendChild(createBtns);

	let attrClass = document.createAttribute('class');
	attrClass.value = 'question-number';
	createBtns.setAttributeNode(attrClass);

	let attrId = document.createAttribute('id');
	attrId.value = btnsLength;
	createBtns.setAttributeNode(attrId);
	btnsLength++;
	//console.log(createBtns);
}
navThroNum();
function navThroNum() {
	const buttonNumbers = document.querySelectorAll('.question-number');

	buttonNumbers.forEach((number) => {
		radioBtn.forEach((ans) => {
			if (ans.checked) {
				number.style.color = '#00D48A';
			}
		});
		number.addEventListener('click', () => {
			number.classList.toggle('color');
			const quizAnswers = quizanswers();

			if (quizAnswers === quizData[currentQuestion].answer) {
				score++;
			}
			currentQuestion = parseInt(number.id);

			quiz();
			remove();
		});
	});
}
//Getting results
finishTest.addEventListener('click', () => {
	let answerValue = undefined;
	radioBtn.forEach((option) => {
		if (option.checked) {
			answerValue = option.value;
		}
	});

	if (answerValue === quizData[currentQuestion].answer) {
		score++;
	}
	quiz();

	let bodyHtml =
		'<div class = "results">' +
		'<h2 style = "color:#00D48A; margin-top:25px;">' +
		'You scored ' +
		score +
		' of ' +
		quizData.length +
		'</h2>' +
		'<br>' +
		'<p>' +
		'Get Yourself a drink...' +
		'</p>';
	let postSeconds = 4;
	setInterval(() => {
		// let seconds = new Date().getSeconds();
		// let difference = postSeconds - seconds;
		document.body.innerHTML = bodyHtml + '<br>' + '<h2>' + 'Try again in ' + postSeconds + 's ' + '<h2>' + '</div>';
		postSeconds--;
	}, 1000);

	setInterval(() => {
		location.reload();
	}, 5000);
});
//to disable right click
diableRightClick();
function diableRightClick() {
	document.addEventListener('contextmenu', (event) => event.preventDefault());
}
