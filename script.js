const inputQuestionGPT = document.querySelector('#question');
const resultQuestionGPT = document.querySelector('#result');
const buttonSendQuestion = document.querySelector('#send-question')
const OPEN_API_KEY = '';

inputQuestionGPT.addEventListener('keypress', (event) => {
    if (inputQuestionGPT.value && event.key === 'Enter') {
        sendQuestion();
    }
});
buttonSendQuestion.addEventListener('click', (event) => {
    sendQuestion();
})

function sendQuestion() {
    const question = inputQuestionGPT.value;

    promise = fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            Accept: 'application/json', 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${OPEN_API_KEY}`
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: question,
            max_tokens: 2048, // Tamanho da Resposta
            temperature: 0.5, // Criatividade da API 
        }),
    })

    .then((response) => response.json())
    .then((json) => {
        if (resultQuestionGPT.value){
            resultQuestionGPT.value += '\n';
        };
        if (json.error?.message) {
            resultQuestionGPT.value += `Error: ${json.error.mesage}`;
        } else if (json.choices?.[0].text) {
            const text = json.choices[0].text || 'Sem resposta';
            resultQuestionGPT.value += `Chat GPT: ${text}`;
        };
        resultQuestionGPT.scrollTop = resultQuestionGPT.scrollHeight;
    })
    .catch((error) => console.error(`Error: ${error}`))
    .finally(() => {
        inputQuestionGPT.value = ''
        inputQuestionGPT.readOnly = true
    })
    if (resultQuestionGPT) {
        resultQuestionGPT.value += '\n\n\n';
    }
    resultQuestionGPT.value += `Eu: ${question}`;
    inputQuestionGPT.value = 'Carregando...';
    
    resultQuestionGPT.scrollTop = resultQuestionGPT.scrollHeight;
}

//slider
var timeOut = 0;
var slideIndex = 0;
var autoOn = true;

var dots = document.querySelectorAll('.dot');
var prevArrow = document.querySelector('.prev');
var showArrow = document.querySelector('.next');

autoSlides();

function autoSlides() {
    timeOut = timeOut - 20;
    if (autoOn == true && timeOut < 0) {
        showSlides();
    }
    setTimeout(autoSlides, 20);
}

function prevSlide() {

    timeOut = 5000;

    var slides = document.querySelectorAll(".slide");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex--;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    if (slideIndex == 0) {
        slideIndex = 3
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function showSlides() {

    timeOut = 5000;

    var slides = document.querySelectorAll(".slide");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

prevArrow.addEventListener('click', ()=> {
    prevSlide();
})

showArrow.addEventListener('click', ()=> {
    showSlides();
})

