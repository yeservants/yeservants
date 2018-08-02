exports.info = {
    name: "Jose Revera", // Bob and Mary Smith if couple
    url: "revera", //will become website.com/missionary/revera or website.com/es/missionary/revera in spanish
    location: "Brazil",
    picture: "example.png", //Should this just be their [url].png (500x500px, 1:1 ratio, .jpeg preffered)
    contact: { //I ask for this stuff here so I can process it from being stolen by bots
        "email": "example@example.com",
        "address": [
            "123 main st.", // Main address line
            "Orlando, FL 32832", //city, state/providence, zip
            "United States" // Country?
        ],
        "phone": "407-111-1111", //keep similar phone number structure ###-###-#### or #-###-###-####
        "link": "http://google.com" // personal website link, Include the http://
    },
    description: "Interesting stuff about me is I wrote this website." //keep this short
}

exports.bio = () => { //This is where the main body goes written in the 1st person 
return `
<b>Sending Church:</b> First Church of City
<b>Ministry Started:</b> September 2004
<b>Duration:</b> Full-Time

<b>About</b>
Interesting stuff about me is I wrote this website.

<b>Ministry</b>
I work with such and such spreading the word about.

<b>Personal Message</b>
Thank you so much for your support.
`;
};

exports.bio_es = () => { //optional spanish version?
return `
<b>Iglesia De Envío:</b> Uno Church of City
<b>Ministerio Comenzado:</b> Septiembre de 2004
<b>Duración:</b> tiempo completo

<b>Acerca De</b>
Algo interesante sobre mí es que escribí este sitio web.

<b>Ministerio</b>
Trabajo con tal y tal difusión de la palabra.

<b>Mensaje Personal</b>
Muchas gracias por su apoyo.
`;
};

