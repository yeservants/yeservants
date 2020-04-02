exports.info = {
    name: "Richard MacLean",
    url: "richard-maclean", //will become website.com/missionary/revera or website.com/es/missionary/revera in spanish
    location: "Dallas, TX",
    picture: "richard-maclean.jpg", //Should this just be their [url].png (500x500px, 1:1 ratio, .jpeg preffered)
    contact: { //I ask for this stuff here so I can process it from being stolen by bots
        "email": "richard.maclean75116@gmail.com"
    },
    description: "My ministry goals are to be part of a team of people, who are enabling the translation of God’s Word into minority languages around the world" //keep this short
}

exports.bio = () => { //This is where the main body goes written in the 1st person 
return `
<b>About</b>
My ministry goals are to be part of a team of people, who are enabling the translation of God’s Word into minority languages around the world, for people who do not currently have the scriptures in their languages.

The ministry the Lord has placed before me is at the International Linguistics Center (ILC), in Dallas Texas. This is the location of a number of departments such as the Translation Department, Scripture Engagement and Dallas International University (where people receive training). Given my background of 30+ years in computer support roles I am assigned to help with computer technical needs at the ILC. I am also willing to assist in any other way the ministry needs.`;
};

exports.bio_es = () => { //optional spanish version?
return ``;
};

