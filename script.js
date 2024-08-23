let minValue, maxValue, answerNumber, questionNumber;
let answerText;
let rangeMin, rangeMax;

function startGame() {
    minValue = parseInt(prompt('Минимальное знание числа для игры', '0'), 10);
    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100'), 10);
    if (isNaN(minValue) || isNaN(maxValue) || minValue >= maxValue) {
        minValue = 0;
        maxValue = 100;
    }
    rangeMin = minValue;
    rangeMax = maxValue;
    answerNumber = Math.floor((rangeMin + rangeMax) / 2);
    questionNumber = 0;
    updateQuestion(`Ваше число ${convertNumberToText(answerNumber)}?`);
}

function updateQuestion(text) {
    document.getElementById('question').innerText = text;
    document.getElementById('inputWindow').value = ++questionNumber;
}

function getAnswerPhrase(number) {
    let phrases = [
        `Вы загадали число ${convertNumberToText(number)}`,
        `Может быть это ${convertNumberToText(number)}`,
        `Вы подумали о числе ${convertNumberToText(number)}?`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function parseNumber(number) {
    let sign = number < 0 ? "минус " : "";
    number = Math.abs(number);
    let units = ["ноль","один","два","три","четыре","пять","шесть","семь","восемь","девять"];
    let tens = ["", "десять","двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"];
    let teens = ["десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать"];
    let hundreds = ["","сто","двести","триста","четыреста","пятьсот","шестьсот","семьсот","восемьсот","девятьсот"];

    let numString = number.toString();
    if (number === 0) return units[0];

    switch (numString.length) {
        case 1:
            return sign + units[number];
        case 2:
            if (number < 20) return sign + teens[number - 10];
            return sign + tens[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + units[number % 10] : "");
        case 3:
            let hundredString = Math.floor(number / 100);
            let rest = number % 100;
            if (rest === 0) return sign + hundreds[hundredString];
            if (rest < 10) return sign + hundreds[hundredString] + " " + units[rest];
            if (rest < 20) return sign + hundreds[hundredString] + " " + teens[rest - 10];
            return sign + hundreds[hundredString] + " " + tens[Math.floor(rest / 10)] + (rest % 10 !== 0 ? " " + units[rest % 10] : "");
    }

    return number; // Дефолтный случай
}

function convertNumberToText(number) {
    let numberText = parseNumber(number);
    return numberText.length <= 20 ? numberText : number;
}

document.getElementById('btn_less').addEventListener('click', function () {
    if (rangeMin === rangeMax) {
        updateQuestion('Вы загадали неправильное число! \\u{1F914}');
    } else {
        rangeMax = answerNumber - 1;
        answerNumber = Math.floor((rangeMin + rangeMax) / 2);
        updateQuestion(getAnswerPhrase(answerNumber));
    }
});

document.getElementById('btn_more').addEventListener('click', function () {
    if (rangeMin === rangeMax) {
        updateQuestion('Вы загадали неправильное число! \\u{1F914}');
    } else {
        rangeMin = answerNumber + 1;
        answerNumber = Math.floor((rangeMin + rangeMax) / 2);
        updateQuestion(getAnswerPhrase(answerNumber));
    }
});

document.getElementById('btn_equal').addEventListener('click', function () {
    updateQuestion(`Я угадал ваше число!`);
});

document.getElementById('btn_restart').addEventListener('click', startGame);

window.onload = startGame;