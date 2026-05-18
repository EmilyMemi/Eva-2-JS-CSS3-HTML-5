/* ========================================= */
/* UNIBALANCE APP JS */
/* ========================================= */


/* ========================================= */
/* ESTADO EMOCIONAL  */
/* ========================================= */

const moods = document.querySelectorAll('.mood');

const moodText =
document.getElementById('mood-text');

moods.forEach((mood) => {

    mood.addEventListener('click', () => {

        const emoji = mood.textContent;

        moods.forEach((item) => {

            item.classList.remove('active-mood');

        });

        mood.classList.add('active-mood');


        if(emoji === '😄'){

            moodText.textContent =
            'Te sientes feliz y motivada ✨';

        }

        else if(emoji === '🙂'){

            moodText.textContent =
            'Te sientes tranquila y en calma 🌿';

        }

        else if(emoji === '😔'){

            moodText.textContent =
            'Hoy parece un día emocionalmente difícil 💜';

        }

        else if(emoji === '😣'){

            moodText.textContent =
            'Respira profundo, necesitas descansar 🌸';

        }

    });

});


/* ========================================= */
/* TEST EMOCIONAL */
/* ========================================= */

const preguntas = [

    {

        texto:
        "¿Cómo te has sentido esta semana?",

        opciones:[

            {
                texto:"😄 Tranquila/o",
                valor:1
            },

            {
                texto:"😐 Normal",
                valor:2
            },

            {
                texto:"😥 Estresada/o",
                valor:3
            },

            {
                texto:"😣 Muy ansiosa/o",
                valor:4
            }

        ]

    },

    {

        texto:
        "¿Cuánto te ha costado concentrarte?",

        opciones:[

            {
                texto:"Nada",
                valor:1
            },

            {
                texto:"Poco",
                valor:2
            },

            {
                texto:"Mucho",
                valor:3
            },

            {
                texto:"Demasiado",
                valor:4
            }

        ]

    },

    {

        texto:
        "¿Cómo has dormido?",

        opciones:[

            {
                texto:"Muy bien",
                valor:1
            },

            {
                texto:"Regular",
                valor:2
            },

            {
                texto:"Mal",
                valor:3
            },

            {
                texto:"Muy mal",
                valor:4
            }

        ]

    },

    {

        texto:
        "¿Te has sentido sobrecargada/o?",

        opciones:[

            {
                texto:"No",
                valor:1
            },

            {
                texto:"Un poco",
                valor:2
            },

            {
                texto:"Sí",
                valor:3
            },

            {
                texto:"Mucho",
                valor:4
            }

        ]

    },

    {

        texto:
        "¿Qué tan motivada/o estás?",

        opciones:[

            {
                texto:"Muy motivada/o",
                valor:1
            },

            {
                texto:"Normal",
                valor:2
            },

            {
                texto:"Poco",
                valor:3
            },

            {
                texto:"Nada",
                valor:4
            }

        ]

    }

];


/* ========================================= */
/* VARIABLES */
/* ========================================= */

let preguntaActual = 0;

let respuestas = [];

let seleccion = null;


/* ========================================= */
/* CARGAR PREGUNTA */
/* ========================================= */

function cargarPregunta(){

    const pregunta =
    preguntas[preguntaActual];

    document.getElementById(
        'pregunta'
    ).textContent =
    pregunta.texto;


    const opcionesContainer =
    document.getElementById(
        'opciones'
    );

    opcionesContainer.innerHTML = '';


    pregunta.opciones.forEach((opcion) => {

        const button =
        document.createElement('div');

        button.classList.add('option');

        button.textContent =
        opcion.texto;


        button.addEventListener(
            'click',
            () => {

                seleccion =
                opcion.valor;


                document
                .querySelectorAll('.option')
                .forEach((option) => {

                    option.classList
                    .remove('active');

                });


                button.classList
                .add('active');

            }
        );


        opcionesContainer
        .appendChild(button);

    });

}


/* ========================================= */
/* SIGUIENTE PREGUNTA */
/* ========================================= */

function siguientePregunta(){

    if(seleccion === null){

        alert(
            'Selecciona una opción 💜'
        );

        return;

    }


    respuestas.push(seleccion);

    seleccion = null;

    preguntaActual++;


    if(
        preguntaActual <
        preguntas.length
    ){

        cargarPregunta();

    }

    else{

        mostrarResultado();

    }

}


/* ========================================= */
/* MOSTRAR RESULTADO */
/* ========================================= */

function mostrarResultado(){

    const total =
    respuestas.reduce(

        (acc, value) =>
        acc + value,

        0

    );


    const promedio =
    total / respuestas.length;


    let nivel = '';

    let mensaje = '';

    let caja = '';

    let recomendacion = '';


    if(promedio <= 1.5){

        nivel =
        '😊 Estrés bajo';

        mensaje =
        'Tu bienestar emocional se encuentra estable y equilibrado. Sigue manteniendo hábitos saludables ✨';

        caja =
        '🌿 Caja Relax';

        recomendacion =
        'Incluye té relajante, journaling, aromaterapia y velas calmantes.';

    }

    else if(promedio <= 2.5){

        nivel =
        '😌 Estrés moderado';

        mensaje =
        'Tu cuerpo podría necesitar más pausas y descanso emocional 🌸';

        caja =
        '🌸 Caja Balance';

        recomendacion =
        'Incluye snacks saludables, ejercicios anti estrés y mindfulness.';

    }

    else{

        nivel =
        '😣 Estrés elevado';

        mensaje =
        'Tu mente necesita relajación, descanso y autocuidado emocional 💜';

        caja =
        '🧘 Caja Calma';

        recomendacion =
        'Incluye relajación profunda, sonidos ambientales y elementos sensoriales.';

    }


    document.getElementById(
        'nivel'
    ).textContent = nivel;


    document.getElementById(
        'mensaje'
    ).textContent = mensaje;


    document.getElementById(
        'caja'
    ).textContent =
    caja + ' → ' + recomendacion;


    /* MOSTRAR RESULTADO */

    const resultado =
    document.getElementById(
        'resultado-test'
    );

    resultado.style.display =
    'block';


    resultado.scrollIntoView({

        behavior:'smooth'

    });

}


/* ========================================= */
/* REGISTRO MENSUAL */
/* ========================================= */

const emotionForm =
document.getElementById('emotion-form');

const recordsContainer =
document.getElementById('records-container');

let monthlyRecords = [];


/* ========================================= */
/* SANITIZAR */
/* ========================================= */

function sanitizeText(text){

    return text.replace(/[<>]/g, '');

}


/* ========================================= */
/* VALIDAR EMAIL */
/* ========================================= */

function validateEmail(email){

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}


/* ========================================= */
/* RENDERIZAR */
/* ========================================= */

function renderRecords(){

    recordsContainer.innerHTML = '';


    monthlyRecords.forEach((record, index) => {

        const card =
        document.createElement('div');

        card.classList.add('record-card');


        const title =
        document.createElement('h3');

        title.textContent =
        record.name;


        const emotion =
        document.createElement('p');

        emotion.textContent =
        'Emoción: ' + record.emotion;


        const stress =
        document.createElement('p');

        stress.textContent =
        'Estrés: ' + record.stress + '/10';


        const sleep =
        document.createElement('p');

        sleep.textContent =
        'Sueño: ' + record.sleep + ' horas';


        const comment =
        document.createElement('p');

        comment.textContent =
        'Comentario: ' + record.comment;


        const date =
        document.createElement('p');

        date.textContent =
        'Fecha: ' + record.date;


        const deleteButton =
        document.createElement('button');

        deleteButton.textContent =
        'Eliminar';

        deleteButton.classList.add('delete-btn');


        deleteButton.addEventListener(
            'click',
            () => {

                deleteRecord(index);

            }
        );


        card.appendChild(title);

        card.appendChild(emotion);

        card.appendChild(stress);

        card.appendChild(sleep);

        card.appendChild(comment);

        card.appendChild(date);

        card.appendChild(deleteButton);


        recordsContainer.appendChild(card);

    });

}


/* ========================================= */
/* ELIMINAR */
/* ========================================= */

function deleteRecord(index){

    monthlyRecords.splice(index, 1);

    renderRecords();

}


/* ========================================= */
/* FORMULARIO */
/* ========================================= */

emotionForm.addEventListener('submit', (e) => {

    e.preventDefault();


    const name = sanitizeText(

        document.getElementById('name')
        .value
        .trim()

    );


    const email = sanitizeText(

        document.getElementById('email')
        .value
        .trim()

    );


    const emotion = sanitizeText(

        document.getElementById('emotion')
        .value

    );


    const stress = parseInt(

        document.getElementById('stress-level')
        .value

    );


    const sleep = parseInt(

        document.getElementById('sleep-hours')
        .value

    );


    const comment = sanitizeText(

        document.getElementById('comment')
        .value
        .trim()

    );


    /* VALIDACIONES */

    if(

        name === '' ||
        email === '' ||
        emotion === '' ||
        comment === ''

    ){

        alert(
            'Completa todos los campos 💜'
        );

        return;

    }


    if(!validateEmail(email)){

        alert(
            'Correo inválido'
        );

        return;

    }


    if(stress < 1 || stress > 10){

        alert(
            'El estrés debe ir de 1 a 10'
        );

        return;

    }


    if(sleep < 1 || sleep > 24){

        alert(
            'Ingresa horas válidas'
        );

        return;

    }


    /* CREAR OBJETO */

    const record = {

        name,
        email,
        emotion,
        stress,
        sleep,
        comment,

        date:
        new Date().toLocaleDateString()

    };


    /* GUARDAR */

    monthlyRecords.push(record);


    /* MOSTRAR */

    renderRecords();


    /* LIMPIAR */

    emotionForm.reset();


    alert(
        'Registro guardado correctamente ✨'
    );

});


/* ========================================= */
/* INICIAR */
/* ========================================= */

cargarPregunta();