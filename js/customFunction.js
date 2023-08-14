/***********
**Function**
***********/
var crossBrowser = [
    'Transition',
    'Transform',
    'BackfaceVisibility',
    'animation'
];

/* Check user browser */
var UserBrowser = {
    isChrome: function() {
        if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
            return true;
        } else {
            return false;
        }
    },
    isFireFox: function() {
        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            return true;
        } else {
            return false;
        }
    },
    isMsie: function() {
        if(window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        } else {
            return false;
        }
    },
    isSafari: function() {
        if(navigator.vendor && navigator.vendor.indexOf('Apple') > -1) {
            return true;
        } else {
            return false;
        }
    },
    isMac: function() {
        if(navigator.appVersion.indexOf("Mac")!=-1) {
            return true;
        } else {
            return false;
        }
    },
    isMobile: function() {
        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }
};

/****************
**Miscellaneous**
****************/
var addRemoveClass = function(aClass, aTarget, cItem) {
    for(var i = 0; i < aTarget.length; i++) {
        var elem = document.getElementById(aTarget[i])

        for(var j = 0; j < cItem.length; j++) {
            var makeClass = aClass?'add':'remove';

            elem.classList[makeClass](cItem[j]);
        }
    }
};

var insertStyle = function(aTarget, sProp, sValue) {
    var cBrowser = false;
    var ctr;

    for(var i = 0; i < crossBrowser.length; i++) {
        if(sProp.toUpperCase().replace("-", "") == crossBrowser[i].toUpperCase()) {
            cBrowser = true;
            ctr = i;
        }
    }

    if(cBrowser) {
        if(crossBrowser[ctr] == 'Transition') {
            var val = sValue.toUpperCase();
            var noCrossBrowser = true;

            for(var i = 0; i < crossBrowser.length; i++) {
                var n = val.search(crossBrowser[i].toUpperCase());

                if(n!=-1) {
                    aTarget.style[crossBrowser[ctr].toLowerCase()] = sValue;
                    aTarget.style['webkit' + crossBrowser[ctr]] = sValue.slice(0, n) + '-webkit-' + sValue.slice(n, (sValue.length));
                    aTarget.style['moz' + crossBrowser[ctr]] = sValue.slice(0, n) + '-moz-' + sValue.slice(n, (sValue.length));
                    aTarget.style['o' + crossBrowser[ctr]] = sValue.slice(0, n) + '-o-' + sValue.slice(n, (sValue.length));
                    aTarget.style['ms' + crossBrowser[ctr]] = sValue.slice(0, n) + '-ms-' + sValue.slice(n, (sValue.length));

                    noCrossBrowser = false;
                }
            }

            if(noCrossBrowser) {
                aTarget.style[sProp] = sValue;
            }
        } else {
            aTarget.style[crossBrowser[ctr].toLowerCase()] = sValue;
            aTarget.style['webkit' + crossBrowser[ctr]] = sValue;
            aTarget.style['moz' + crossBrowser[ctr]] =  sValue;
            aTarget.style['o' + crossBrowser[ctr]] =  sValue;
            aTarget.style['ms' + crossBrowser[ctr]] =  sValue;
        }
    } else {
        aTarget.style[sProp] = sValue;
    }
};

/****************
**Main Function**
****************/
var customElement = function(arrayTarget) {
    /* Add class to the element */
    this.addClass = function(inClass) {
        var ic = inClass.split(" ");

        addRemoveClass(true, arrayTarget, ic);
    };

    /* Remove class to the element */
    this.removeClass = function(outClass) {
        var oc = outClass.split(" ");

        addRemoveClass(false, arrayTarget, oc);
    };

    /* Change style of the element */
    this.changeStyle = function(sProperty, sValue) {
        var splitProp = sProperty.split(";");
        var splitValue = sValue.split(";");

        if(splitProp.length == splitValue.length) {
            for(var i = 0; i < arrayTarget.length; i++) {
                var elem = document.getElementById(arrayTarget[i])

                for(var j = 0; j < splitProp.length; j++) {
                    insertStyle(elem, splitProp[j], splitValue[j]);
                }
            }
        } else {
            throw 'Error properties and values in ' + arrayTarget + ' are not equal.';
        }
    };
};

var w = function(eid) {
    var splitTarget = eid.split(" ");

    for(var i = 0; i < splitTarget.length; i++) {
        var x = document.getElementById(splitTarget[i]);

        if(x == null) {
            throw 'Error ' + splitTarget[i] + ' is not defined. Make sure the ID is exist';
        }
    }

    var arrX = new customElement(splitTarget);

    return arrX;
};