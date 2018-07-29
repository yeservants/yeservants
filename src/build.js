const config = require('./config.json');
const glob = require('glob');
const fs = require('fs');
const ncp = require('ncp').ncp;
ncp.limit = 16;

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

rmDir('../public', false);


ncp('static', '../public', function (err) {
    if (err) {
        return console.error(err);
    }
    ncp('../public', '../docs', function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('done!');
    });
});



/* //Resused code from docs generator
var template = fs.readFileSync('CmdListTemplate.html', "utf8");
var cl = "";

for (var key in cmds) {
    for (var i = 0; i < cmds[key].length; i++) {
        cl += `<div class="command" id="${num}" data-module="${key.toLocaleLowerCase()}"><div class="command-name">`;
        for (var j = 0; j < cmds[key][i]["Aliases"].length; j++) {
            cl += `<span>${cmds[key][i]["Aliases"][j]}</span>`;
        }
        cl += `<span class="module ${key.toLocaleLowerCase()}">${key}<span></div>
            <div class="description"><section>${cmds[key][i]["Description"]}</section>`;
        if (cmds[key][i]["Requirements"].length !== 0) {
            cl += `<section class="description-warning"><span>Requires</span><section class="required-permissions">`;
            for (var k = 0; k < cmds[key][i]["Requirements"].length; k++) {
                cl += `<span class="permission">${cmds[key][i]["Requirements"][k]}</span>`;
            }
            cl += `</section></section>`;
        }
        cl += `</div><div class="usage"><span class="cell-parts">`;
        for (var l = 0; l < cmds[key][i]["Usage"].length; l++) {
            cl += `<span class="cell-part">${cmds[key][i]["Usage"][l]}</span>`;
        }
        cl += `</span></div></div>`;
    }
}

template = template.replace(/{{COMMANDS}}/, cl);
fs.writeFileSync('commands/index.html', template, function (err) {
    if (err) throw err;
    console.log('Commands Saved!');
});
*/