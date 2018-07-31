exports.bio = () => { //This is where the main body goes written in the 1st person 
return `

<b>About</b>
Interesting stuff about me is I wrote this website.

<b>Ministry</b>
I work with such and such spreading the word about 



`;};

exports.info = {
    name: "Bob Smith", // Bob and Mary Smith if couple
    url: "example", //will become website.com/missionary/example
    sendChurch: "First Church of City",
    ministryStart: "September 2004",
    duration: "Full-Time", // [Full-Time, Part-Time]
    picture: "example.png", //Should this just be their [url].png (500x500px .jpeg preffered)
    contact: { //I ask for this stuff here so I can process it from being stolen by bots
        "email": "example@example.com",
        "address": [
            "123 main st.", // Main address line
            "Orlando, FL 32832", //city, state/providence, zip
            "United States" // Country?
        ],
        "phone": "407-111-1111", //keep similar phone number structure ###-###-#### or #-###-###-####
        "link": "http://google.com" // personal website link, Include the http://
    }
}