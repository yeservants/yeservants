const site = {
    "baseURL": "https://yeservants.org/",
    "name": "Yielded Evangelical Servants",
    "description": "Yielded Evangelical Servants is a Not-for-profit organization responsible for handling services for missionaries all over the world. Our mission is to...",
    "phone": "407-498-5128",
    "address": "P.O. Box 700697, St. Cloud, FL 34770",
    "copyright": "2002"
};
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const date = new Date();
const out = path.join(__dirname, "docs");
const src = path.join(__dirname, "src");
const templates = path.join(src, "templates");

fs.copySync(path.join(src, 'static'), out, { overwrite: true });

let baseURL = site.baseURL;
var ver = 9; //cutdown on push elements

function siteData(template) {
    let data = template.replace(/{{baseURL}}/g, baseURL)
        .replace(/{{siteName}}/g, site.name)
        .replace(/{{address}}/g, site.address)
        .replace(/{{phone}}/g, site.phone)
        .replace(/{{copyrightStart}}/g, site.copyright)
        .replace(/{{copyrightEnd}}/g, date.getFullYear())
        .replace(/{{ver}}/g, ver);
    return data;
}

var missionariesdata = "";
glob(src + '/missionaries/*.js', {recursive: false}, (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let m = require(`${f}`);
        let tmp = fs.readFileSync(path.join(templates, 'missionary.html'), "utf8");
        console.log(`Loading Missionary: ${m.info.name}.`);

        let aplosScriptInclude = "";
        let contact = "<b>Contact</b><br />";
        let donationURL = `${baseURL}donate?missionary=${encodeURIComponent(m.info.name)}`;
        let donationEmbed = false;
        
        let c = m.info.contact;
        for (var key in c) {
            if (c.hasOwnProperty(key)) {
                switch(key) {
                    case 'email':
                    case 'email2':
                        let etemp = "";
                        c[key].split('').forEach(function(ch) { etemp += `<span>${ch}</span>`; });
                        contact += etemp + `<br />`;
                        break;
                    case 'address':
                    case 'address2':
                        let ar = c[key];
                        for(i=0; i<ar.length; i++) { contact += ar[i] + `<br />`; }
                        break;
                    case 'phone':
                    case 'phone2':
                        let ptemp = "";
                        c[key].split('').forEach(function(ph) { ptemp += `<span>${ph}</span>`; });
                        contact += ptemp + `<br />`;
                        break;
                    case 'link':
                    case 'link2':
                        contact += `<a href="${c[key]}" rel="nofollow">${c[key]}</a><br />`;
                        break;
                    case 'none':
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
            <a href="${baseURL}missionary/${m.info.url}" alt="${m.info.name}">
                <img src="${baseURL}images/${m.info.picture}" alt="${m.info.name}'s picture" class="full">
                <b>${m.info.name}</b><br />
                ${m.info.location}
            </a>
        </div>`;
        tmp = siteData(tmp);
        tmp = tmp.replace(/{{name}}/g, m.info.name)
            .replace(/{{description}}/g, m.info.description)
            .replace(/{{missionaryURL}}/g, m.info.url)
            .replace(/{{picture}}/g, m.info.picture)
            .replace(/{{contact}}/g, contact)
            .replace(/{{donationURL}}/g, donationURL)
            .replace(/{{aplosScriptInclude}}/g, aplosScriptInclude)
            .replace(/{{bio}}/g, `<b>Location:</b> ${m.info.location}\n${m.bio()}`);
        fs.outputFileSync(path.join(out, 'missionary', m.info.url, 'index.html'), tmp);
    });

    let mstmp = fs.readFileSync(path.join(templates, 'missionaries.html'), "utf8");
    mstmp = siteData(mstmp.replace(/{{missionaries}}/g, missionariesdata));
    fs.outputFileSync(path.join(out, 'missionaries', 'index.html'), mstmp);
});

function processPage(temp) {
    let file = fs.readFileSync(path.join(templates, `${temp}.html`), "utf8");
    file = siteData(file.replace(/{{description}}/g, site.description).replace(/{{startedAgo}}/g, (date.getFullYear() - site.copyright)));
    if (temp === "index") fs.outputFileSync(path.join(out, 'index.html'), file);
    else fs.outputFileSync(path.join(out, temp, 'index.html'), file);
}

processPage("index");
processPage("privacy");
processPage("join");
processPage("contact");
processPage("thanks");
processPage("donate");
