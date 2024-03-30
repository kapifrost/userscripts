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

    window.pageReload = function() {
        window.location.reload();
    }

    let oldURL = '';
    let checkerInterval = setInterval(function() {
        if (oldURL !== window.location.href) {
            console.log('url changed');
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
            oldURL = window.location.href;
        } else {
            let error = document.querySelector('div#player.style-scope.ytd-watch-flexy')?.querySelector('yt-playability-error-supported-renderers#error-screen.style-scope.ytd-watch-flexy');
            if (error) {
                if (!error.processed) {
                    error.style.cssText = 'color: rgb(255, 255, 255);display: flex;align-items: center;font-size: 24px;padding: 10px;text-align: center;white-space: pre-wrap;flex-flow: row;place-content: center;flex-direction: column;';
                    setInterval(function() {
                        error.innerHTML = 'It looks like YouTube Ad Block Detect Bypass has failed. Please reload the page.<br/><button onclick="pageReload()" style="display: block;flex: 0;margin-top: 12px;min-width: auto;" class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m"><div class="yt-spec-button-shape-next__button-text-content"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" role="text">Reload</span></div></button>';
                    }, 1000);
                    error.processed = true;
                }
            }
        }
    });
})();
