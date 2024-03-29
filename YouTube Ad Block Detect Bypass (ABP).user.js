// ==UserScript==
// @name         YouTube Ad Block Detect Bypass (ABP)
// @downloadURL  https://github.com/kapifrost/userscripts/raw/main/YouTube%20Ad%20Block%20Detect%20Bypass%20(ABP).user.js
// @updateURL    https://github.com/kapifrost/userscripts/raw/main/YouTube%20Ad%20Block%20Detect%20Bypass%20(ABP).user.js
// @namespace    https://kapifrost.github.io
// @version      1.0
// @description  Bypass youtube's ad blocker detector prevention
// @author       kapifrost
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const originalWindowGetComputedStyle = window.getComputedStyle;
    Object.defineProperty(window, "getComputedStyle", {
        configurable: false,
        enumerable: false,
        value: function(element, pseudoElt) {
            let styles = originalWindowGetComputedStyle.apply(this, arguments);
            if (element.className === 'ytd-banner-promo-renderer style-scope' || element.outerHTML === '<div></div>') {
                Object.defineProperty(styles, 'display', {
                    get: function() { return 'YouTube Ad Block Detect Bypass (ABP)'; }
                })
            }
            return styles;
        }
    });
})();