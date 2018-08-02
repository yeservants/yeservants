exports.info = {
    name: "Anita Cornieles",
    url: "cornieles",
    location: "Puerto Ayacucho, Venezuela",
    picture: "none.jpg", 
    contact: { 
        "none": "nothing"
    },
    description: "Interesting stuff about me is I wrote this website." //keep this short
}

exports.bio = () => { //This is where the main body goes written in the 1st person 
return `
<b>Sending Church:</b>
<b>Ministry Started:</b>
<b>Duration:</b>

<b>Ministry</b>
Anita Cornieles plans and directs the multi-church annual daily vacation bible school in Puerto Ayacucho, Venezuela comprised of 14 local churches and over 1000 children. She also ministers to the sick in the local hospital by providing medicine, clean water, sheets, prayer, and fellowship. She does follow-up through home visitation and provides food and the gospel message.
`;
};

exports.bio_es = () => { //optional spanish version?
return `
`;
};

