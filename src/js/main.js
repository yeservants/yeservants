'use strict';

var emailreg = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-z0-9](?:[A-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/;
var num = /^(\d){1}$/;
var msgreg = /[^\s\d\w\r\n.ñáéíóúü,()\/\\!#@$%^&*_\-=`~<>'"?{}\][]/g;
var namereg = /^([A-zñáéíóúü\-. ]+)$/;
var phonereg = /[0-9-.()x+ ]+/g;
var num1 = String(Math.floor(Math.random() * 6) + 1);
var num2 = String(Math.floor(Math.random() * 10) + 1);
var num3 = String(Math.floor(Math.random() * 3) + 1);
var sum = String(Number(num1) + Number(num3));

function showError(id, msg) {
    var box = document.getElementById(id+'warn');
    if (box) {
        box.innerHTML = msg;
    }
}

function showStatus(id, msg) {
    var box = document.getElementById(id+'status');
    if (box) {
        box.innerHTML = msg;
    }
}

function sendContact(to, name, email, phone, message, trap, spam, submit, status) {
    var token;
    if (to === 'accounting') {
        token = 'a8fa4227876b573d9d1579ee350a706c';
    } else if (to === 'general') {
        token = '8792a521c2d584dcee90ee9e767318ff';
    } else {
        return false;
    }

    var name = document.getElementById(name);
    var email = document.getElementById(email);
    var phone = document.getElementById(phone);
    var message = document.getElementById(message);
    var trap = document.getElementById(trap);
    var spam = document.getElementById(spam);
    var submit = document.getElementById(submit);
    var status = document.getElementById(status);
    //var msg;
    //name 
    if (!namereg.test(name.value)) {
        showError(name.id, `Invalid formatting [A-z . - and spaces]`);
        return false;
    } else {
        showError(name.id, '');
    }
    //email
    if (!emailreg.test(email.value)) {
        showError(email.id, `Invalid email address.`);
        return false;
    } else {
        showError(email.id, '');
    }
    //phone (optional)
    if (phone.value.length > 0) {
        if (!phonereg.test(phone.value) || phone.value.length < 8) {
            showError(phone.id, `Invalid phone number. "(111) 111-1111", "+44 1111 111 111"`);
            return false;
        } else {
            showError(phone.id, '');
        }
    }
    //message 
    if (message.value.length < 30) {
        showError(message.id, `Add more to your message.`);
        return false;
    } else {
        showError(message.id, '');
        //just clean it up a little.
        //msg = message.value.replace(msgreg, '');
    }
    //trap
    if (trap.value !== '') {
        console.warn('You triggered my trap card!');
        return false; //Triggered trap! 
    }
    //spam
    if (num.test(spam.value)) {
        if (spam.value !== sum) {
            showError(spam.id, `Math trouble? ${num1} + ${num3} = ${sum}`);
            return false;
        } else {
            showError(spam.id, '');
        }
    } else {
        showError(spam.id, `Something's wrong here..`);
        return false;
    }
    showError(spam.id, '');

    //update button
    submit.value = "Submitting..";

/* Sadly Simpleform doesn't allow cross-origin request that aren't whitelisted..
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `https://getsimpleform.com/messages/ajax?form_api_token=${token}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            
            name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
            spam.value = '';
            submit.value = 'Submit';
            return false;
        } else {
            console.log(xhr);
            submit.value = 'Submit';
            status.innerHTML = '<span style="color:#ff0000">Message Failed to send.</span>';
            return false;
        }
    };
    xhr.send(JSON.stringify({
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: msg
    }));
    */
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.className = "js";

    if (document.getElementById('contacta')) {
        document.getElementById('aspam1').innerHTML = num1;
        document.getElementById('aspam2').innerHTML = num2;
        document.getElementById('aspam3').innerHTML = num3;

        document.getElementById('contacta').onsubmit = function(e) {
            return sendContact('general', 'aname', 'aemail', 'aphone', 'amessage', 'atrap', 'aspam', 'asubmit', 'astatus');
        }
    }
    
    if (document.getElementById('contactb')) {
        document.getElementById('bspam1').innerHTML = num1;
        document.getElementById('bspam2').innerHTML = num2;
        document.getElementById('bspam3').innerHTML = num3;
        
        document.getElementById('contactb').onsubmit = function(e) {
            return sendContact('accounting', 'bname', 'bemail', 'bphone', 'bmessage', 'btrap', 'bspam', 'bsubmit', 'bstatus');
        }
    }
    
});
