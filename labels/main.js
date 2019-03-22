// (function () {

'use strict';

//for complex inputs - position the answer fields over top of the "blanks" they correspond with.
function positionInputs() {
    var relativeInputContainers = [].slice.call(document.querySelectorAll(".hasinput"));

    relativeInputContainers.forEach(function (containerEl) {
        var inputEl = containerEl.querySelector(".blankspace-input");
        var blankSpace = containerEl.querySelector(".blankspace");
        var blankOffset = blankSpace.getBoundingClientRect().left;
        var blankOffsetTop = blankSpace.getBoundingClientRect().top;
        var containerTop = containerEl.getBoundingClientRect().top;
        var topDiff = blankOffsetTop - containerTop;
        console.log("offsetting");
        inputEl.style.left = blankOffset - inputEl.parentElement.getBoundingClientRect().left + "px";
        inputEl.style.top = topDiff + "px";
    });
}
//position complex inputs when page loads
positionInputs();

//for simple question 3: change up inner text of "blank" in question instructions when user types into the field
function adjustAnswer(ipt) {
    var tgt = document.getElementById(ipt.dataset.blank);
    if (ipt.value.length === 0) {
        tgt.innerText = "blank";
    } else {
        if (ipt.nodeName === "SELECT") {
            tgt.innerText = ipt.selectedOptions[0].innerText;
        } else if (ipt.nodeName === "INPUT") {
            tgt.innerText = ipt.value;
        }
    }
}
//making array of all inputs that have the data-blank attribute set - used for this example.
[].slice.call(document.querySelectorAll("input[data-blank]")).forEach(function (iptEl) {
    iptEl.addEventListener("input", function (evt) {
        adjustAnswer(evt.target);
    });
});

//send text to live region
function announce(ipt, textToSpeak) {
    ipt.innerText = ""; //clear live region first - solves an edge case for TalkBack on Chrome/Android
    if (textToSpeak) {
        ipt.innerText = textToSpeak;
    }
    setTimeout(function () {
        ipt.innerText = "";
    }, 10000); //remove input after 10 seconds. A delay must be used to ensure that screen readers read the message at all. 
    //A longer delay will better accommodate VoiceOver on iOS, which cuts off content that gets removed too quickly if slower speaking rates are used.
    //Accommodating slower speaking rates is important to meet the needs of users with certain cognitive disabilities   
}
//should work for live region or web speech
function getComputedFromLabelledby(ipt) {
    var labelledby = [].slice.call(ipt.getAttribute("aria-labelledby").split(" "));
    var labelString = "";
    for (var i = 0; i < labelledby.length; i++) {
        console.log(labelledby[i]);
        labelString += document.getElementById(labelledby[i]).innerText + " ";
    }
    var tempVal;
    if (ipt.value.length === 0) {
        tempVal = "blank";
    } else {
        tempVal = ipt.value; // won't necessarily work for selects, but I'm low on battery here.
    }
    labelString = labelString.replace("  ", " ").replace(". ", ".").replace("blank", tempVal);
    return labelString;
}
//live region only
document.querySelector(".speakQuestion button").addEventListener("click", function (evt) {
    var tgtIpt = document.getElementById(evt.target.dataset.ipt);
    var liveReg = document.getElementById(evt.target.dataset.live);
    console.log(liveReg);
    announce(liveReg, getComputedFromLabelledby(tgtIpt));
});

//web speech only
document.querySelector(".speech button").addEventListener("click", function (evt) {
    var tgtIpt = document.getElementById(evt.target.dataset.ipt);
    var thingToSpeak = new SpeechSynthesisUtterance(getComputedFromLabelledby(tgtIpt));
    window.speechSynthesis.speak(thingToSpeak);
});

// })();
