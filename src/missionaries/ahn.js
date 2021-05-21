exports.info = {
    name: "The Ahn Family", // Bob and Mary Smith if couple
    url: "ahn", //will become website.com/missionary/revera or website.com/es/missionary/revera in spanish
    location: "Northern Ghana",
    picture: "ahn-family.jpeg", //Should this just be their [url].png (500x500px, 1:1 ratio, .jpeg preffered)
    contact: { //I ask for this stuff here so I can process it from being stolen by bots
        "email": "ahninghana@gmail.com",
    },
    description: "The Ahn family is preparing to serve a specific people group in the northern region of..." //keep this short
}

exports.bio = () => { //This is where the main body goes written in the 1st person 
return `
<b>About</b>
The Ahn family is preparing to serve a specific people group in the northern region of Ghana. They welcome you to contact them directly if you would like to learn more about their work.
`;
};