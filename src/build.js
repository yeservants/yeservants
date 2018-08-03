const config = require('./config.json');
const glob = require('glob');
const fs = require('fs');
const ncp = require('ncp').ncp;
const chalk = require('chalk');
var date = new Date();
ncp.limit = 16;

var directory = process.argv[2] || "public";

rmDir = function (dirPath, removeSelf) {
    if (removeSelf === undefined)
        removeSelf = true;
    try { var files = fs.readdirSync(dirPath); }
    catch (e) { return; }
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
            else
                rmDir(filePath);
        }
    if (removeSelf)
        fs.rmdirSync(dirPath);
};

rmDir(__dirname + `/../${directory}`, false);


var missionariesdata = "";

let mdir = __dirname + `/../${directory}/missionary`;
if (!fs.existsSync(mdir)){
    fs.mkdirSync(mdir);
}

//Replace variables
let baseURL = config.site.baseURL;
if(directory !== "public") {
    baseURL = "https://yeservants.github.io/website/";
}

let siteName = config.site.name;
let address = config.site.address;
let phone = config.site.phone;
let sitedescription = config.site.description;
let copyrightStart = config.site.copyright;
let copyrightEnd = date.getFullYear();


glob(__dirname + '/missionaries/*.js', {recursive: false}, (err, files) => {
    var stat = {picture: 0, hidden: 0, unknown: 0, contact: 0};
    if (err) console.error(err);
    console.log(chalk.bgGreen(`Processing Missionaries (${files.length} found)`));
    files.forEach(f => {
        let m = require(`${f}`);
        let tmp = fs.readFileSync(__dirname + '/templates/missionary.html', "utf8");

        console.log(chalk.bgWhite(chalk.green(`Loading Missionary: ${m.info.name}.`)));

        //missionary variables
        let name = m.info.name;
        let description = m.info.description;
        let location = m.info.location;
        let missionaryURL = m.info.url;
        let picture = m.info.picture;
        let contact = "<b>Contact</b><br />";
        let donationURL = `${baseURL}donate?missionary=${encodeURIComponent(name)}`;
        let bio = `<b>Location:</b> ${location}\n${m.bio()}`;
        
        if (location === 'Hidden') {
            console.log(chalk.bgWhite(chalk.cyan(`-- Location Hidden`)));
            stat.hidden ++;
        }
        if (location === 'Unknown') {
            console.warn(chalk.bgWhite(chalk.red(`-- Location Unknown?`)));
            stat.unknown++;
        }
        if (picture === 'none.jpg') {
            console.warn(chalk.bgWhite(chalk.red(`-- No picture.`)));
            stat.picture++;
        }

        let c = m.info.contact;
        for (var key in c) {
            if (c.hasOwnProperty(key)) {
                switch(key) {
                    case'email':
                        let etemp = "";
                        c[key].split('').forEach(function(ch) {
                            etemp += `<span>${ch}</span>`;
                        });
                        contact += etemp + `<br />`;
                        break;
                    case 'address':
                        let ar = c[key];
                        for(i=0; i<ar.length; i++) {
                            contact += ar[i] + `<br />`;
                        }
                        break;
                    case 'phone':
                        let ptemp = "";
                        c[key].split('').forEach(function(ph) {
                            ptemp += `<span>${ph}</span>`;
                        });
                        contact += ptemp + `<br />`;
                        break;
                    case 'link':
                        contact += `<a href="${c[key]}" rel="nofollow">${c[key]}</a><br />`;
                        break;
                    case 'none':
                        console.warn(chalk.bgWhite(chalk.red(`-- No Contact`)));
                        stat.contact++;
                        contact = "";
                        break;
                    default:
                        break;
                }
            }
        };

        missionariesdata = missionariesdata + `<div class="missionaryitem">
            <a href="${baseURL}missionary/${missionaryURL}" alt="${name}">
                <img src="${baseURL}images/${picture}" alt="${name}'s picture" class="full">
                <b>${name}</b><br />
                ${location}
            </a>
        </div>`;

        tmp = tmp.replace(/{{baseURL}}/g, baseURL)
            .replace(/{{siteName}}/g, siteName)
            .replace(/{{address}}/g, address)
            .replace(/{{phone}}/g, phone)
            .replace(/{{copyrightStart}}/g, copyrightStart)
            .replace(/{{copyrightEnd}}/g, copyrightEnd)
            .replace(/{{name}}/g, name)
            .replace(/{{description}}/g, description)
            .replace(/{{missionaryURL}}/g, missionaryURL)
            .replace(/{{picture}}/g, picture)
            .replace(/{{contact}}/g, contact)
            .replace(/{{donationURL}}/g, donationURL)
            .replace(/{{bio}}/g, bio)

        let ndir = `${mdir}/${missionaryURL}`;
        if (!fs.existsSync(ndir)){
            fs.mkdirSync(ndir);
        }

        fs.writeFileSync(`${ndir}/index.html`, tmp);
    });

    console.log(`${stat.picture} Missing Pictures. \n${stat.hidden} Hidden Missionaries. \n${stat.unknown} Missing Locations \n${stat.contact} Missing Contact Info`);


    let msdir = __dirname + `/../${directory}/missionaries`;
    if (!fs.existsSync(msdir)){
        fs.mkdirSync(msdir);
    }
    let mstmp = fs.readFileSync(__dirname + '/templates/missionaries.html', "utf8");
    //console.log("data: " + missionariesdata);
    mstmp = mstmp.replace(/{{baseURL}}/g, baseURL)
                    .replace(/{{siteName}}/g, siteName)
                    .replace(/{{address}}/g, address)
                    .replace(/{{phone}}/g, phone)
                    .replace(/{{copyrightStart}}/g, copyrightStart)
                    .replace(/{{copyrightEnd}}/g, copyrightEnd)
                    .replace(/{{description}}/g, sitedescription)
                    .replace(/{{missionaries}}/g, missionariesdata)

    fs.writeFileSync(__dirname + `/../${directory}/missionaries/index.html`, mstmp);
});



let hometmp = fs.readFileSync(__dirname + '/templates/index.html', "utf8");
hometmp = hometmp.replace(/{{baseURL}}/g, baseURL)
                .replace(/{{siteName}}/g, siteName)
                .replace(/{{address}}/g, address)
                .replace(/{{phone}}/g, phone)
                .replace(/{{copyrightStart}}/g, copyrightStart)
                .replace(/{{copyrightEnd}}/g, copyrightEnd)
                .replace(/{{description}}/g, sitedescription)
                .replace(/{{startedAgo}}/g, copyrightEnd-copyrightStart)
fs.writeFileSync(__dirname + `/../${directory}/index.html`, hometmp);



let redir = __dirname + `/../${directory}/missionary`;
if (!fs.existsSync(redir)){
    fs.mkdirSync(redir);
}
let retmp = fs.readFileSync(__dirname + '/templates/missionary-redirect.html', "utf8");
retmp = retmp.replace(/{{baseURL}}/g, baseURL)
                .replace(/{{siteName}}/g, siteName)

fs.writeFileSync(__dirname + `/../${directory}/missionary/index.html`, retmp);



let privacydir = __dirname + `/../${directory}/privacy`;
if (!fs.existsSync(privacydir)){
    fs.mkdirSync(privacydir);
}
let privacytmp = fs.readFileSync(__dirname + '/templates/privacy.html', "utf8");
privacytmp = privacytmp.replace(/{{baseURL}}/g, baseURL)
                .replace(/{{siteName}}/g, siteName)
                .replace(/{{address}}/g, address)
                .replace(/{{phone}}/g, phone)
                .replace(/{{copyrightStart}}/g, copyrightStart)
                .replace(/{{copyrightEnd}}/g, copyrightEnd)
                .replace(/{{description}}/g, sitedescription)
                .replace(/{{startedAgo}}/g, copyrightEnd-copyrightStart)
fs.writeFileSync(__dirname + `/../${directory}/privacy/index.html`, privacytmp);




//copy over static files
ncp(__dirname + '/static', __dirname + `/../${directory}`, function (err) {
    if (err) {
        return console.error(err);
    }
});


process.on('beforeExit', function() {
    console.log(chalk.bgCyan(`Building complete for ${directory}.`));
    process.exit();
});
