const cmds = require('./cmds_new.json');
const fs = require('fs');
console.log("Reading template..");
var template = fs.readFileSync('CmdListTemplate.html', "utf8");
var num = 1;
var cl = "";
console.log("Compiling Commands..")


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
        console.log(`Added Command #${num}`);
        num++;
    }
}
console.log(`Commands Compiled..\nMerging Template Data..`);
template = template.replace(/{{COMMANDS}}/, cl);
fs.writeFileSync('commands/index.html', template, function (err) {
    if (err) throw err;
    console.log('Commands Saved!');
});