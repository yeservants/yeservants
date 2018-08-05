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

/*function $(v) {
    var t = v.slice(0,1) === '#' ? 'id' : 'class';
    v = v.slice(1);
    if (t === 'id') {
        return document.getElementById(v);
    } else {
        return document.getElementsByClassName(v)
    }     
}*/

function send(to, name, email, phone, message) {
    var token;
    if (to === 'accounting') token = 'a8fa4227876b573d9d1579ee350a706c';else if (to === 'general') token = '';else return false;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://getsimpleform.com/messages/ajax?form_api_token=' + token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            return true;
        }
    };
    xhr.send(JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message
    }));
}

function showError(id, msg) {
    var box = document.getElementById(id + 'warn');
    console.log(box);
    if (box) {
        box.innerHTML = msg;
    } else {
        console.error('no warning field found for #' + id);
    }
}

function validateSend(to, name, email, phone, message, trap, spam) {

    var name = document.getElementById(name);
    var email = document.getElementById(email);
    var phone = document.getElementById(phone);
    var message = document.getElementById(message);
    var trap = document.getElementById(trap);
    var spam = document.getElementById(spam);
    var msg;
    //name 
    console.log(name.value);
    if (!namereg.test(name.value)) {
        showError(name.id, 'Invalid formatting [A-z . - and spaces]');
        return false;
    } else {
        showError(name.id, '');
    }
    //email
    if (!emailreg.test(email.value)) {
        showError(email.id, 'Invalid email address.');
        return false;
    } else {
        showError(email.id, '');
    }
    //phone (optional)
    if (phone.value.length > 0) {
        if (!phonereg.test(phone.value) || phone.value.length < 8) {
            showError(phone.id, 'Invalid phone number. "(111) 111-1111", "+44 1111 111 111"');
            return false;
        } else {
            showError(phone.id, '');
        }
    }
    //message 
    if (message.value.length < 30) {
        showError(message.id, 'Add more to your message.');
        return false;
    } else {
        showError(message.id, '');
        //just clean it up a little.
        msg = message.value.replace(msgreg, '');
    }
    //trap
    if (trap.value !== '') {
        console.warn('You triggered my trap card!');
        return false; //Triggered trap! 
    }
    //spam
    if (num.test(spam.value)) {
        if (spam.value !== sum) {
            showError(spam.id, 'Math trouble? ' + num1 + ' + ' + num3 + ' = ' + sum);
            return false;
        } else {
            showError(spam.id, '');
        }
    } else {
        showError(spam.id, 'Something\'s wrong here..');
        return false;
    }
    showError(spam.id, '');

    var status = send(to, name, email, phone, msg);

    if (status === true) {
        name.value = '';
        email.value = '';
        phone.value = '';
        message.value = '';
        spam.value = '';
        alert('Message Sent!');
        return true;
    } else {
        alert('Something went wrong');
        return false;
    }
}

function submitGeneral() {
    return validateSend('general', 'aname', 'aemail', 'aphone', 'amessage', 'atrap', 'aspam');
}

function submitAccounting() {
    return validateSend('accounting', 'bname', 'bemail', 'bphone', 'bmessage', 'btrap', 'bspam');
}

document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.className = "js";
    console.log('Hello Y.E.S.!');

    document.getElementById('aspam1').innerHTML = num1;
    document.getElementById('aspam2').innerHTML = num2;
    document.getElementById('aspam3').innerHTML = num3;

    document.getElementById('bspam1').innerHTML = num1;
    document.getElementById('bspam2').innerHTML = num2;
    document.getElementById('bspam3').innerHTML = num3;
});