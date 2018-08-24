const config = require('./config.json');
const glob = require('glob');
const fs = require('fs');
const ncp = require('ncp').ncp;
const chalk = require('chalk');
var date = new Date();
ncp.limit = 16;
var directory = "docs";

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

function createDir(path) {
    let dir = `${__dirname}/../${path}`; //project folder based directory | homedir/yeservants/website/
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    return dir;
}

createDir(`${directory}/missionary`);
createDir(`${directory}/missionaries`);
createDir(`${directory}/contact`);
createDir(`${directory}/contact/sent`);
createDir(`${directory}/privacy`);
createDir(`${directory}/join`);
createDir(`${directory}/thanks`);
createDir(`${directory}/donate`);


//Replace variables
let baseURL = config.site.baseURL;
//if(directory !== "public") {
//    baseURL = "https://yeservants.github.io/website/";
//}
//var ver = Math.floor(Math.random() * 100000);
var ver = 8; //cutdown on push elements
let siteName = config.site.name;
let address = config.site.address;
let phone = config.site.phone;
let sitedescription = config.site.description;
let copyrightStart = config.site.copyright;
let copyrightEnd = date.getFullYear();


function siteData(template) {
    let data = template.replace(/{{baseURL}}/g, baseURL)
                    .replace(/{{siteName}}/g, siteName)
                    .replace(/{{address}}/g, address)
                    .replace(/{{phone}}/g, phone)
                    .replace(/{{copyrightStart}}/g, copyrightStart)
                    .replace(/{{copyrightEnd}}/g, copyrightEnd)
                    .replace(/{{ver}}/g, ver);
    return data;
}


glob(__dirname + '/missionaries/*.js', {recursive: false}, (err, files) => {
    var stat = {picture: 0, hidden: 0, unknown: 0, contact: 0};
    if (err) console.error(err);
    console.log(chalk.bgGreen(`Processing Missionaries (${files.length} found)`));
    files.forEach(f => {
        let m = require(`${f}`);
        let tmp = fs.readFileSync(__dirname + '/templates/missionary.html', "utf8");
        let retmp = fs.readFileSync(__dirname + '/templates/single-missionary-redirect.html', "utf8");

        console.log(chalk.bgWhite(chalk.green(`Loading Missionary: ${m.info.name}.`)));

        //missionary variables
        let aplosScriptInclude = "";
        let name = m.info.name;
        let description = m.info.description;
        let location = m.info.location;
        let missionaryURL = m.info.url;
        let redirect = m.info.oldurl || false;
        let picture = m.info.picture;
        let contact = "<b>Contact</b><br />";
        let donationURL = `${baseURL}donate?missionary=${encodeURIComponent(name)}`;
        let donationEmbed = false; 
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
        }

        if (donationEmbed) {
            aplosScriptInclude = '<script type="text/javascript" src="https://cdn.aplos.com/widgets/donations/1.0.1/donations.min.js"></script>';
        }
        

        missionariesdata = missionariesdata + `<div class="missionaryitem">
            <a href="${baseURL}missionary/${missionaryURL}" alt="${name}">
                <img src="${baseURL}images/${picture}" alt="${name}'s picture" class="full">
                <b>${name}</b><br />
                ${location}
            </a>
        </div>`;

        tmp = siteData(tmp);
        tmp = tmp.replace(/{{name}}/g, name)
            .replace(/{{description}}/g, description)
            .replace(/{{missionaryURL}}/g, missionaryURL)
            .replace(/{{picture}}/g, picture)
            .replace(/{{contact}}/g, contact)
            .replace(/{{donationURL}}/g, donationURL)
            .replace(/{{aplosScriptInclude}}/g, aplosScriptInclude)
            .replace(/{{bio}}/g, bio);

        //redirect anyone who tries to go to missionaries/name to missionary/name (From old system, later can be removed probably)
        retmp = siteData(retmp);
        retmp = retmp.replace(/{{name}}/g, name).replace(/{{missionaryURL}}/g, missionaryURL);

        let missionaryDir = createDir(`${directory}/missionary/${missionaryURL}`);
        let missionariesDir = createDir(`${directory}/missionaries/${missionaryURL}`);
        fs.writeFileSync(`${missionaryDir}/index.html`, tmp);
        fs.writeFileSync(`${missionariesDir}/index.html`, retmp);

        if (redirect) { //so old urls don't give 404s
            let redirecttmp = fs.readFileSync(__dirname + '/templates/old-url-redirect.html', "utf8");
            redirecttmp = siteData(redirecttmp);
            redirecttmp = redirecttmp.replace(/{{redirectURL}}/g, `missionary/${missionaryURL}`);
            let redirectDir = createDir(`${directory}/missionary/${redirect}`);
            fs.writeFileSync(`${redirectDir}/index.html`, redirecttmp);
        }

    });

    console.log(`${stat.picture} Missing Pictures. \n${stat.hidden} Hidden Missionaries. \n${stat.unknown} Missing Locations \n${stat.contact} Missing Contact Info`);


    let mstmp = fs.readFileSync(__dirname + '/templates/missionaries.html', "utf8");
    mstmp = siteData(mstmp);
    mstmp = mstmp.replace(/{{missionaries}}/g, missionariesdata)
    fs.writeFileSync(__dirname + `/../${directory}/missionaries/index.html`, mstmp);

});


let hometmp = fs.readFileSync(__dirname + '/templates/index.html', "utf8");
hometmp = siteData(hometmp);
hometmp = hometmp.replace(/{{description}}/g, sitedescription)
                .replace(/{{startedAgo}}/g, (copyrightEnd - copyrightStart));
fs.writeFileSync(__dirname + `/../${directory}/index.html`, hometmp);


let retmp = fs.readFileSync(__dirname + '/templates/missionary-redirect.html', "utf8");
retmp = siteData(retmp);
fs.writeFileSync(__dirname + `/../${directory}/missionary/index.html`, retmp);


let privacytmp = fs.readFileSync(__dirname + '/templates/privacy.html', "utf8");
privacytmp = siteData(privacytmp);
fs.writeFileSync(__dirname + `/../${directory}/privacy/index.html`, privacytmp);


let jointmp = fs.readFileSync(__dirname + '/templates/join.html', "utf8");
jointmp = siteData(jointmp);
fs.writeFileSync(__dirname + `/../${directory}/join/index.html`, jointmp);


let contacttmp = fs.readFileSync(__dirname + '/templates/contact.html', "utf8");
contacttmp = siteData(contacttmp);
fs.writeFileSync(__dirname + `/../${directory}/contact/index.html`, contacttmp);


let thankstmp = fs.readFileSync(__dirname + '/templates/thanks.html', "utf8");
thankstmp = siteData(thankstmp);
fs.writeFileSync(__dirname + `/../${directory}/thanks/index.html`, thankstmp);


let senttmp = fs.readFileSync(__dirname + '/templates/sent.html', "utf8");
senttmp = siteData(senttmp);
fs.writeFileSync(__dirname + `/../${directory}/contact/sent/index.html`, senttmp);

let donatetmp = fs.readFileSync(__dirname + '/templates/donate.html', "utf8");
donatetmp = siteData(donatetmp);
fs.writeFileSync(__dirname + `/../${directory}/donate/index.html`, donatetmp);



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
