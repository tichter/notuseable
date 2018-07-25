(function b(c,d,e){function a(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof require&&require;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var f=d[h]={exports:{}};c[h][0].call(f.exports,function(b){var d=c[h][1][b];return a(d?d:b)},f,f.exports,b,c,d,e)}return d[h].exports}for(var g="function"==typeof require&&require,f=0;f<e.length;f++)a(e[f]);return a})({1:[function(a,b,c){"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d=window.AudioContext||window.webkitAudioContext,e=c.audioContext=new d},{}],2:[function(a,b,c){"use strict";function d(a,b,c){this.urlList=a,this.buffers=(0,f.arrayFilledWith)(null,a.length),this.gainNodes=[g.audioContext.createGain(),g.audioContext.createGain()],this.gainNodeIndex=0;for(var d=0;2>d;++d)this.gainNodes[d].connect(g.audioContext.destination),this.gainNodes[d].gain.value=0;this.startedPlayingAtTime=null,this.fadeTime=0.1,this.currentIndex=null,this.onsetTime=0,this.continuousPlayback=b,this.loopPlayback=c,this.hasPlayed=[],this.allOk=!1}Object.defineProperty(c,"__esModule",{value:!0}),c.AudioLoader=d;var e=a("./dollar.js"),f=a("./utils.js"),g=a("./audioengine.js");d.prototype.loadBuffer=function(a,b,c){var d=new XMLHttpRequest;d.responseType="arraybuffer",d.open("GET",a,!0);var e=this;d.onload=function(){g.audioContext.decodeAudioData(d.response,function(d){return d?void(e.buffers[b]=d,e.checkBuffers(c)):void window.alert("error decoding file data: "+a)},function(a){console.error("decodeAudioData error",a)})},d.send(),this.hasPlayed.push(!1)},d.prototype.checkBuffers=function(a){this.allOk=!0;for(var b=0;b<this.buffers.length;++b)null==this.buffers[b]&&(this.allOk=!1);this.allOk&&(e.$.mobile.loading("hide"),"function"==typeof a&&a())},d.prototype.load=function(a){e.$.mobile.loading("show"),this.allOk=!1;for(var b=0;b<this.urlList.length;++b)this.loadBuffer(this.urlList[b],b,a);this.timerStarted=!1},d.prototype.play=function(a){if(a!==this.currentIndex&&this.allOk){this.switchStop(),this.source=g.audioContext.createBufferSource();var b=this.buffers[a];this.source.buffer=b,this.source.loop=this.loopPlayback,this.source.loopStart=!1,this.loopPlayback||(this.source.onended=function(){this.currentIndex===a&&(this.currentIndex=null)}.bind(this));var c=this.gainNodes[this.gainNodeIndex];if(this.source.connect(c),this.continuousPlayback)if(null==this.currentIndex)this.onsetTime=0;else{var d=this.buffers[this.currentIndex].duration;this.onsetTime+=g.audioContext.currentTime-this.startedPlayingAtTime,this.onsetTime>d&&(this.onsetTime%=d),this.onsetTime>b.duration&&(this.onsetTime=0)}this.hasPlayed[a]=!0,this.currentIndex=a,this.startedPlayingAtTime=g.audioContext.currentTime,this.startTimer(),this.source.start(0,this.onsetTime),c.gain.linearRampToValueAtTime(1,g.audioContext.currentTime+this.fadeTime)}},d.prototype.startTimer=function(){this.timerStarted||(this.startTime=g.audioContext.currentTime,this.timerStarted=!0)},d.prototype.endTimer=function(){return this.timerStarted=!1,g.audioContext.currentTime-this.startTime},d.prototype.switchStop=function(){this.stop(!1)},d.prototype.stop=function(a){if(this.source){var b=g.audioContext.currentTime+this.fadeTime,c=this.gainNodes[this.gainNodeIndex];c.gain.linearRampToValueAtTime(0,b),this.source.stop(b),this.gainNodeIndex=(this.gainNodeIndex+1)%2,this.source=null,a&&(this.currentIndex=null)}},d.prototype.haveAllBuffersPlayed=function(){return this.hasPlayed.every(function(a){return a})}},{"./audioengine.js":1,"./dollar.js":3,"./utils.js":6}],3:[function(a,b,c){"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.activePage=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"";return d(".ui-page-active "+a)};var d=c.$=window.jQuery},{}],4:[function(a){"use strict";function b(a,b){return(0,c.activePage)(".next").off(),(0,c.activePage)(".back").off(),(0,c.$)(".ui-content").find("*").off(),(0,c.$)(".submit-form").on("submit",function(){c.$.mobile.loading("show")}),(0,c.$)(".submit-form .cancel").on("click",function(){(0,c.$)(".submit-popup").popup("close")}),a=JSON.parse(a),a.siteURL=b,a}var c=a("./dollar.js"),d=a("./mushra.js");window.listen={createSoundboard:function(a,c){return new Soundboard(b(a,c))},createMUSHRA:function(a,c){return new d.Mushra(b(a,c))}}},{"./dollar.js":3,"./mushra.js":5}],5:[function(a,b,c){"use strict";function d(a){if((0,e.activePage)(".ui-content").find("*").off(),this.config=a,this.pageCounter=0,this.numberOfSounds=0,this.numberOfPages=this.config.pages.length,this.currentPageSoundOrder=null,this.config.add_consistency_check){var b=h.randomNumber(0,this.numberOfPages,!0);this.numberOfPages+=1;var c=JSON.parse(JSON.stringify(this.config.pages[b]));this.config.pages[b].is_replicate=!0,c.is_replicate=!0,this.config.pages.push(c)}this.have_seen_this_page_before=h.arrayFilledWith(!1,this.numberOfPages+1),this.pageOrder=h.fromAToBArray(0,this.numberOfPages),this.config.randomise_pages&&h.shuffle(this.pageOrder),this.soundOrder=[];for(var d=0;d<this.numberOfPages;++d){var f=this.config.pages[this.pageOrder[d]].sounds.length,g=h.fromAToBArray(0,f);this.config.randomise_sounds_within_page&&h.shuffle(g),this.soundOrder.push(g)}this.configureButtons(),this.updateTitle(),this.loadPage()}Object.defineProperty(c,"__esModule",{value:!0}),c.Mushra=d;var e=a("./dollar.js"),f=a("./audioloader.js"),g=a("./utils.js"),h=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}(g);d.prototype.configureButtons=function(){this.next_url=(0,e.activePage)(".next").attr("href"),(0,e.activePage)(".next").removeAttr("href"),(0,e.activePage)(".next").on("click",function(){this.loader.haveAllBuffersPlayed()||!this.config.must_play_all_samples_to_continue||this.have_seen_this_page_before[this.pageCounter+1]?this.onNextOrBackButtonClick(1):((0,e.activePage)(".listen-to-all-samples-popup").popup("open"),setTimeout(function(){(0,e.activePage)(".listen-to-all-samples-popup").popup("close")},5e3))}.bind(this)),(0,e.activePage)(".back").on("click",function(){this.onNextOrBackButtonClick(-1)}.bind(this)),(0,e.activePage)(".mushra-stop").on("click",function(){this.loader.stop(!0)}.bind(this)),(0,e.activePage)(".mushra-sort").on("click",function(){this.sortSliders()}.bind(this))},d.prototype.onNextOrBackButtonClick=function(a){this.loader&&this.loader.stop(!0),0===this.pageCounter&&0>a?this.config.back_button_can_exit_test&&window.history.back():((0,e.activePage)(".back").show(),!this.have_seen_this_page_before[this.pageCounter]&&(this.have_seen_this_page_before[this.pageCounter]=!0),this.fillConfig(),this.pageCounter=h.selectMinimum(this.pageCounter+a,this.numberOfPages),this.pageCounter=h.selectMaximum(this.pageCounter,0),this.pageCounter===this.numberOfPages?(this.complete(),this.pageCounter-=1):(this.updateTitle(),this.loadPage()))},d.prototype.updateTitle=function(){(0,e.activePage)(".title").html(this.pageCounter+1+" / "+this.numberOfPages)},d.prototype.loadPage=function(){this.currentPage=this.pageOrder[this.pageCounter],this.currentPageSoundOrder=this.soundOrder[this.pageCounter],this.numberOfSounds=this.currentPageSoundOrder.length,this.urls=Array(this.numberOfSounds);for(var a,b=0;b<this.numberOfSounds;++b)a=this.config.pages[this.currentPage].sounds[b],this.urls[b]=this.config.siteURL+"/"+a.url;for(var c=this.config.pages[this.currentPage].references,d=0;d<c.length;++d)this.urls.push(this.config.siteURL+"/"+c[d].url);this.loader=new f.AudioLoader(this.urls,this.config.continuous_playback,this.config.loop_playback),(0,e.activePage)(".mushra-container").hide(),this.loader.load(this.setupGUI.bind(this))},d.prototype.setupGUI=function(){(0,e.activePage)(".mushra-container").show(),this.createReferences(),this.createSliders()},d.prototype.createReferences=function(){(0,e.activePage)(".mushra-references-container").empty(),(0,e.activePage)(".mushra-references-container").trigger("create"),(0,e.activePage)(".mushra-references-container").enhanceWithin()},d.prototype.createSliders=function(){(0,e.activePage)(".mushra-slider-container").empty();for(var a,b=0;b<this.numberOfSounds;++b){if(a=1,this.have_seen_this_page_before[this.pageCounter]){var c=this.currentPageSoundOrder[b];a=this.config.pages[this.currentPage].sounds[c].rating}else this.config.randomise_slider_handle&&(a=h.randomNumber(1,5,!0));var d="<input type='range' name='slider' value='"+a+"' min='1' max='5' step='1' class='ui-hidden-accessible' ";d+=this.config.show_number_on_slider?"data-show-value='true'/>":"/>",(0,e.activePage)(".mushra-slider-container").append(d)}(0,e.activePage)(".mushra-slider-container").trigger("create"),(0,e.activePage)(".mushra-slider-container").enhanceWithin();var f=this;(0,e.activePage)(".ui-slider").each(function(a){(0,e.$)(this).find(".ui-slider-handle").on("start",function(){var a=(0,e.$)(this).find("input");a.attr("min",a.val()),a.attr("max",a.val()),setTimeout(function(){a.attr("min",1),a.attr("max",5)},50)}.bind(this)),(0,e.$)(this).off().on("slidestart",function(a){f.playBuf(a),(0,e.$)(this).find(".ui-slider-handle").addClass("slider-handle-active"),(0,e.$)(this).find(".ui-slider-handle").focus()}.bind(this,a)),(0,e.$)(this).find(".ui-slider-handle").removeAttr("title"),(0,e.$)(this).on("slidestop",function(){(0,e.$)(this).find(".ui-slider-handle").removeAttr("title")}.bind(this))})},d.prototype.playBuf=function(a){this.loader.play(this.currentPageSoundOrder[a])},d.prototype.sortSliders=function(){this.loader.stop(!0);var a=[];(0,e.activePage)(".ui-slider input").each(function(){a.push(parseInt((0,e.$)(this).val()))});var b=h.indicesNeededToSortArray(a),c=this,d=this.currentPageSoundOrder.slice();(0,e.activePage)(".ui-slider").each(function(f){c.currentPageSoundOrder[f]=d[b[f]];var g=c.currentPageSoundOrder[f];c.loader.hasPlayed[g]?(0,e.$)(this).find(".ui-slider-handle").addClass("slider-handle-active"):(0,e.$)(this).find(".ui-slider-handle").removeClass("slider-handle-active"),(0,e.$)(this).find("input").val(a[b[f]]).slider("refresh"),(0,e.$)(this).find(".ui-slider-handle").removeAttr("title")})},d.prototype.fillConfig=function(){var a=function(a,b){var c=this.currentPageSoundOrder[a];this.config.pages[this.currentPage].sounds[c].rating=parseInt(b)}.bind(this),b=this.config.pages[this.currentPage].duration;(null===b||0===b)&&(this.loader.timerStarted?this.config.pages[this.currentPage].duration=this.loader.endTimer():this.config.pages[this.currentPage].duration=0),this.config.pages[this.currentPage].order=this.pageCounter,null==this.config.pages[this.currentPage].is_replicate&&(this.config.pages[this.currentPage].is_replicate=!1),(0,e.activePage)(".ui-slider input").each(function(b){a(b,(0,e.$)(this).val())})},d.prototype.complete=function(){var a=JSON.stringify(this.config);this.config.allow_submission?((0,e.activePage)("input[name=\"fields[data]\"]").val(a),(0,e.activePage)(".submit-popup").popup("open")):e.$.mobile.changePage(this.next_url)}},{"./audioloader.js":2,"./dollar.js":3,"./utils.js":6}],6:[function(a,b,c){"use strict";function d(c,a){a<=c&&(a=c+1);for(var b=a-c,d=Array(b),e=0;e<b;++e)d[e]=c+e;return d}// https://stackoverflow.com/questions/10716986/swap-2-html-elements-and-preserve-event-listeners-on-them
var e=Math.floor;Object.defineProperty(c,"__esModule",{value:!0}),c.fromAToBArray=d,c.arrayFilledWith=function(a,b){for(var c=Array(b),d=0;d<b;++d)c[d]=a;return c},c.randomNumber=function(a,b,c){var d=Math.random();return d*=b-a,d+=a,c&&(d=e(d)),d},c.shuffle=function(b){var a,c,d;for(d=b.length;d;d--)a=e(Math.random()*d),c=b[d-1],b[d-1]=b[a],b[a]=c},c.selectMaximum=function(c,a){return c>a?c:a},c.selectMinimum=function(c,a){return c<a?c:a},c.newSortedArray=function(a){var b=a.slice();return b.sort(function(c,a){return c-a})},c.indicesNeededToSortArray=function(c){var a=d(0,c.length);return a.sort(function(d,a){return c[d]<c[a]?-1:c[d]>c[a]?1:0})},c.swapElements=function(a,b){var c=document.createElement("div");a.parentNode.insertBefore(c,a),b.parentNode.insertBefore(a,b),c.parentNode.insertBefore(b,c),c.parentNode.removeChild(c)}},{}]},{},[4]);