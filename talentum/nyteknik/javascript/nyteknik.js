/**
 * Ny Teknik
 */


var NyTeknik = function() {
    return {
    init: function() {
        NyTeknik.tabbedBox.init();
        Talentum.addAnchors.init([
                                  { element: ".teaser", include: ["P", "IMG", ".media-image-cover"], exclude: [".poll", ".media-slideshow"] },
                                  { element: ".subteaser", include: ["P", "IMG"] },
                                  { element: ".pullteaser", include: ["P", "IMG"] },
                                  { element: ".miniteaser", include: ["P"] },
                                  { element: ".small-teaser", include: ["P", "IMG", ".media-image-cover"] },
                                  { element: ".blog-teaser", include: ["IMG"] },
                                  { element: ".carousel-box-part", include: ["IMG"] },
                                  { element: ".type-jobAdExtendedPremiumJobsCarousel .carousel-box-part-inner", include: ["IMG"] },                                  
                                  { element: ".internal-ad", include: ["P", "IMG"] },
                                  { element: ".opinion-teaser", include: ["IMG"] },
                                  { element: ".notice-teaser", include: ["IMG"] },
                                  { element: ".media-teaser", include: [".media-image-cover"] },
                                  { element: ".quiz-box", include: ["li p"] },
                                  { element: ".internal-ad", exclude: ["P"] }
                                  ]);
        Talentum.print.init();
        Talentum.media.init();
        Talentum.mediaImage.init();
        Talentum.recommend.init();
        Talentum.zoom.init();
        Talentum.fontSize.init();
        Talentum.popup.init();
        Talentum.externalLinks.init();
        
        Talentum.carouselBox.init();
        Talentum.comment.init();
        Talentum.reportAbuse.init();
        Talentum.userSettings.init();
        Talentum.validateForms.init();
        Talentum.populateForms.init();
        Talentum.slideshow.init();
        Talentum.ajaxForms.init();
        Talentum.tooltip.init([
                               { element: ".media-teaser .media a", parent: "body", className: "media-tooltip" },
                               { element: ".facebook" },
                               { element: ".digg" },
                               { element: ".delicious" },
                               { element: ".twitter" },
                               { element: ".article .print" },
                               { element: ".article .toggle-text-size" },
                               { element: ".article .toggle-recommend" }
                               ]);
        Talentum.moreComments.init();
        Talentum.poll.init();
        Talentum.scrollingList.init([
                                     { element: ".job-teaser ul", noOfItems: 5 },
                                     { element: ".article .jobs ul", noOfItems: 3, duration: 1500, delay: 4000, direction: "horizontal" },
                                     { element: ".featured-jobs ul", noOfItems: 1, duration: 3, delay: 4000, direction: "vertical" }
                                     ]);
        Talentum.removeEmptyAdtechAds.init();
        NyTeknik.mediaTeaser.init();
        Talentum.subscribe.init();
        NyTeknik.jobSearch.init();
        NyTeknik.dropDown.init();
        NyTeknik.sIFR.init({
                           include: [".article #comments H2", ".box H2", ".box .title", ".links H2", ".links .title", ".tags H2", ".tags .title", ".tools H2", ".tools .title", ".jobs H2", ".section-heading H1", ".section-heading .title", ".search-heading H2", ".job-teaser H2 SPAN", ".wordpress .widget H2"]
                           });
        NyTeknik.accordion.init();
        NyTeknik.toggler.init();
        NyTeknik.conditionalDisplay.init();
        NyTeknik.autoComplete.init();
        Talentum.quiz.init();
        Talentum.stickyAd.init({
                               top: "submenu"
                               });
        Talentum.stickyTop.init();
        Talentum.pushResponsive.init();
        NyTeknik.moveJobBox.init();
        
        Talentum.addOnDOMReady( function() {
                               Talentum.toggleAnything({
                                                       trigger: '.type-jobAdExtendedSearchOccupation .linklist-toggle',
                                                       target: '.type-jobAdExtendedSearchOccupation .linklist',
                                                       visibleClass: 'linklist-visible',
                                                       showTargetOnLoad: (function() { if( $('body').hasClass('resp')[0] ) { return false; } else { return true; } }())
                                                       });
                               });
    }
    };
}();


NyTeknik.autoComplete = function() {
    var className = "auto-complete";
    var urlField = "auto-complete-url";
    var maxResultSize = 20;
    var data = [];
    var inputElms = 0;
    
    var createOutputElm = function(elm) {
        var position = Talentum.getPosition(elm);
        elm.dummyInput = $(document.body).create("input", {className: "auto-completion-input-dummy" }, true);
        elm.outputElm = $(document.body).create("ul", {className: "auto-completion-list", id: "auto-completion-list-" + inputElms }, true);
        elm.outputElm.style.display = "none";
        elm.outputElm.style.position = "absolute";
        elm.outputElm.style.left = position.x + "px";
        elm.outputElm.style.top = position.y + elm.offsetHeight + "px";
        elm.outputElm.style.width = (elm.offsetWidth-20) + "px";
        elm.dummyInput.style.position = "absolute";
        elm.dummyInput.style.left = "-9999px";
        elm.dummyInput.style.top = position.y + elm.offsetHeight + "px";
        inputElms++;
        
        Talentum.eventHandler.register("click", "#" + elm.outputElm.id + " li", function() {
                                       elm.value = this.innerHTML;
                                       elm.form.submit();
                                       });
        elm.outputElm.show = function() {
            elm.currentIndex = -1;
            elm.outputElm.style.display = "block";
            $(document).addEvent("click", elm.outputElm.hide);
            $(elm.dummyInput).addEvent("keyup", elm.outputElm.step);
        };
        elm.outputElm.hide = function() {
            elm.outputElm.style.display = "none";
            $(document).removeEvent("click", elm.outputElm.hide);
            $(elm.dummyInput).removeEvent("keyup", elm.outputElm.step);
        };
        elm.outputElm.step = function(e) {
            if (e.keyCode == 40 || e.keyCode == 38 && elm.outputElm.style.display == "block") {
                if (e.keyCode == 40 && (elm.currentIndex < elm.resultSize-1)) {
                    elm.currentIndex++;
                } else if (e.keyCode == 38 && elm.currentIndex > 0) {
                    elm.currentIndex--;
                } else if (e.keyCode == 38) {
                    elm.currentIndex--;
                    elm.focus();
                }
                var i = 0;
                elm.outputElm.elmsByTag("li").each(function() {
                                                   if (i == elm.currentIndex) {
                                                   this.className = "current";
                                                   } else {
                                                   this.className = "";
                                                   }
                                                   i++;
                                                   });
            } else if (e.keyCode == 13 && elm.outputElm.style.display == "block" && elm.currentIndex > -1) {
                elm.value = ($("#" + elm.outputElm.id + " li:nth-child(" + (elm.currentIndex+1) + ")")[0]).innerHTML;
                elm.form.submit();
            } else if (e.keyCode == 27) {
                elm.outputElm.hide();
                elm.focus();
            }
        }
    };
    
    var fetchData = function(elm) {
        elm.timer = null;
        elm.post(document.getElementById(urlField).value + "?mode=ajax&query=" + elm.value, function(response) {
                 data = eval(response);
                 elm.resultSize = 0;
                 elm.outputElm.innerHTML = "";
                 for (var i = 0, l = data.length; i < l && elm.resultSize < maxResultSize; i++) {
                 var li = elm.outputElm.create("li", {title: data[i]}, true, data[i].substring(0, elm.value.length) + data[i].substring(elm.value.length));
                 elm.resultSize++;
                 }
                 if (elm.resultSize > 0) {
                 elm.outputElm.fadeIn();
                 } else {
                 elm.outputElm.hide();
                 }
                 });
    };
    
    var DOMReady = function() {
        $(".auto-complete").each(function() {
                                 this.setAttribute("autocomplete", "off");
                                 $(this).addEvent("keyup", function(e) {
                                                  var elm = this;
                                                  if (!elm.outputElm) createOutputElm(elm);
                                                  if (e.keyCode == 40 || e.keyCode == 38 && elm.outputElm.style.display == "block") {
                                                  elm.dummyInput.focus();
                                                  elm.outputElm.step(e);
                                                  } else if (elm.value.length > 1 && !elm.timer) {
                                                  elm.timer = setTimeout(function() { fetchData(elm); }, 250);
                                                  } else {
                                                  elm.outputElm.hide();
                                                  }
                                                  });
                                 });
    };
    
    return {
    init: function() {
        Talentum.addOnDOMReady(DOMReady);
    }
    }
}();


NyTeknik.conditionalDisplay = function() {
    var DOMReady = function() {
        $(".conditional-display").each(function() {
                                       var show = Talentum.getClassNameValue(this, "showon");
                                       var hide = Talentum.getClassNameValue(this, "hideon");
                                       var focus = $$(Talentum.getClassNameValue(this, "focuson"));
                                       var elem = this;
                                       if ($$(show).checked) {
                                       elem.style.display = "block";
                                       }
                                       Talentum.eventHandler.register("click", "#" + show, function() {
                                                                      if (this.checked) {
                                                                      elem.style.display = "block";
                                                                      focus.focus();
                                                                      }
                                                                      else {
                                                                      elem.style.display = "none";
                                                                      }
                                                                      return true;
                                                                      });
                                       if (show != hide) {
                                       Talentum.eventHandler.register("click", "#" + hide, function() {
                                                                      elem.style.display = "none";
                                                                      return true;
                                                                      });
                                       }
                                       });
    };
    
    return {
    init: function() {
        Talentum.addOnDOMReady(DOMReady);
    }
    };
}();


NyTeknik.accordion = function() {
    var triggerClass = "accordion";
    var partClass = "accordion-part";
    var partTag = "div";
    var partContentClass = "accordion-part-content";
    var activePartClass = "active-accordion-part";
    var EFFECT_SLIDE = "slide";
    var accordions = 0;
    var frameRate = 30;
    var step = 25;
    
    var toggleTo = function(elm, accordionObjIndex, effect) {
        var accordion = $$("_accordion-" + accordionObjIndex);
        
        if (effect == EFFECT_SLIDE) {
            accordion.openElm = elm.elmsByClass(partContentClass)[0];
            accordion.closeElm = accordion.activeElm.elmsByClass(partContentClass)[0];
            accordion.openElm.setStyle("height", "0px");
            accordion.currentPart = accordion.activeElm;
            elm.addClass(activePartClass);
            accordion.openElmHeight = Talentum.getActualHeight(accordion.openElm);
            accordion.closeElmHeight = Talentum.getActualHeight(accordion.closeElm);
            
            NyTeknik.accordion.openClose(accordionObjIndex);
            accordion.activeElm = elm;
        } else {
            if (accordion.activeElm) {
                accordion.activeElm.removeClass(activePartClass);
            }
            elm.addClass(activePartClass);
            accordion.activeElm = elm;
        }
    };
    
    var getMaxHeight = function(elementsArray) {
        var maxHeight = 0;
        for (var i = 0, l = elementsArray.length; i < l; i++) {
            var elem = $(elementsArray[i]).elmsByClass(partContentClass)[0];
            maxHeight = Math.max(Talentum.getActualHeight(elem), maxHeight);
        }
        return maxHeight;
    };
    
    var DOMReady = function() {
        $("." + triggerClass).each(function() {
                                   var thisIndex = accordions;
                                   accordions++;
                                   
                                   var accordion = $(this);
                                   accordion.id = "_accordion-" + thisIndex;
                                   
                                   var parts = accordion.elmsByClass(partClass, partTag);
                                   
                                   accordion.targetHeight = getMaxHeight(parts);
                                   for (var i = 0, l = parts.length; i < l; i++) {
                                   var partContent = $(parts[i]).elmsByClass(partContentClass)[0];
                                   partContent.setStyle("height", accordion.targetHeight + "px");
                                   partContent.setStyle("display", "none");
                                   }
                                   $(parts[0]).addClass(partClass + "-first");
                                   $(parts[parts.length - 1]).addClass(partClass + "-last");
                                   
                                   toggleTo(parts[0], thisIndex);
                                   
                                   Talentum.eventHandler.register("click", "#" + accordion.id + " ." + partClass, function() {
                                                                  if (this != accordion.activeElm) {
                                                                  toggleTo($$(this), thisIndex, EFFECT_SLIDE);
                                                                  } else {
                                                                  return true;
                                                                  }
                                                                  });
                                   });
    };
    
    return {
    openClose: function(accordionObjIndex) {
        var accordion = $$("_accordion-" + accordionObjIndex);
        if (accordion.closeElmHeight <= 0) {
            clearTimeout(accordion.timer);
            accordion.currentPart.removeClass(activePartClass);
        } else {
            accordion.openElmHeight = ((accordion.openElmHeight + step) >= accordion.targetHeight) ? accordion.targetHeight : accordion.openElmHeight + step;
            accordion.closeElmHeight = ((accordion.closeElmHeight - step) <= 0) ? 0 : accordion.closeElmHeight - step;
            accordion.openElm.setStyle("height", accordion.openElmHeight + "px");
            accordion.closeElm.setStyle("height", accordion.closeElmHeight + "px");
            accordion.timer = setTimeout("NyTeknik.accordion.openClose(" + accordionObjIndex + ")", frameRate);
        }
    },
        
    init: function(options) {
        Talentum.addOnDOMReady(DOMReady);
    }
    };
}();


NyTeknik.tabbedBox = function() {
    var DOMReady = function() {
        $(".box.tabbed-box").each(function() {
                                  var accordion = $(this);
                                  accordion.addClass("accordion");
                                  var parts = accordion.elmsByClass("tabbed-box-part", "div");
                                  for (var i = 0, l = parts.length; i < l; i++) {
                                  var part = $(parts[i]);
                                  part.addClass("accordion-part");
                                  part.addClass("box-body");
                                  var content = parts[i].innerHTML;
                                  parts[i].innerHTML = "";
                                  var div = part.create("div", {className: "accordion-part-content" }, true, content);
                                  parts[i].insertBefore(div.cssSelect("h3")[0],div);
                                  }
                                  });
    };
    
    return {
    init: function(options) {
        Talentum.addOnDOMReady(DOMReady);
    }
    };
}();

/*Move company info box in mobile view*/
NyTeknik.moveJobBox = function() {
    var DOMReady = function() {
        $(".body.page-lediga-jobb.resp .quickinfo").insertBefore(" .body.page-lediga-jobb.resp .article-bread");
                                  });
    };
    
    return {
    init: function() {
        Talentum.addOnDOMReady(DOMReady);
    }
    };
}();


/**
 * Tabbed media teaser box
 */
NyTeknik.mediaTeaser = function() {
    var triggerClass = "tabbed-box";
    var tabsClass = "tabbed-box-tabs";
    var partClass = "tabbed-box-part";
    var currentClass = "tabbed-box-tabs-current";
    var partTag = "div";
    var activePartClass = "active-tabbed-box-part";
    var noOfBoxes = 0;
    
    var toggle = function(tab, animate) {
        var box = $$(tab.box);
        if (typeof(box.activeTab) !== "undefined") {
            var activeTab = $$(box.activeTab);
            activeTab.removeClass(currentClass);
            var activePart = $$(activeTab.tabPart);
            activePart.setStyle("display", "none");
        }
        var part = $$(tab.tabPart);
        if (animate) {
            part.setStyle(DOMEffects.getOpacityRule(0));
        }
        part.setStyle("display", "block");
        if (animate) {
            part.fadeIn({ duration: 500 });
        }
        tab.addClass(currentClass);
        box.activeTab = tab.id;
    };
    
    var construct = function(el, triggerClass, partClass) {
        var tabBox = $(el);
        tabBox.id = triggerClass + "-" + noOfBoxes;
        tabBox.parts = tabBox.elmsByClass(partClass, partTag);
        tabBox.menu = $(tabBox.create("ul", {className: tabsClass}, false));
        var firstTab = null;
        for (var i = 0, l = tabBox.parts.length; i < l; i++) {
            var partHeading = Talentum.getFirstNode($(tabBox.parts[i]));
            var tab = tabBox.menu.create("li", null, true, "<span>" + partHeading.innerHTML + "</span>");
            if (i == 0) {
                firstTab = tab;
            }
            tab.id = tabBox.id + "-tab-" + i;
            tab.box = tabBox.id;
            tabBox.parts[i].id = tabBox.id + "-part-" + i;
            tab.tabPart = tabBox.parts[i].id;
            tabBox.parts[i].removeChild(partHeading);
            tabBox.parts[i].setStyle("display", "none");
        }
        tabBox.parts[0].parentNode.insertBefore(tabBox.menu, tabBox.parts[0]);
        
        tabBox.elmsByClass("inner-" + triggerClass).each(function() {
                                                         construct(this, "inner-" + triggerClass, "inner-" + partClass);  
                                                         });
        
        toggle(firstTab, false);
        
        noOfBoxes++;
    }
    var DOMReady = function() {
        $(".media-teaser." + triggerClass).each(function() {
                                                construct(this, triggerClass, partClass);
                                                });
    };
    return {
    init: function() {
        Talentum.addOnDOMReady(DOMReady);
        Talentum.eventHandler.register("click", ".media-teaser .tabbed-box-tabs li", function() {
                                       toggle(this, true);
                                       });
    }
    };
}();


NyTeknik.toggler = function() {
    var togglePrefix = "toggle";
    var duration = 300;
    var DOMReady = function() {
        Talentum.eventHandler.register("click", "a." + togglePrefix, function(e) {
                                       DOMAssistant.preventDefault(e); 
                                       var elmId = Talentum.getClassNameValue(this, togglePrefix);
                                       var elm = $$(elmId);
                                       if(elm.getStyle("display") != "block") {
                                       elm.setStyle(DOMEffects.getOpacityRule(0));
                                       elm.setStyle("display", "block");
                                       elm.fadeIn( { duration: duration } );
                                       } else {
                                       elm.setStyle("display", "none");
                                       }
                                       });
    };
    
    return {
    init: function() {
        Talentum.addOnDOMReady(DOMReady);
    }
    };
}();


NyTeknik.jobSearch = function() {
    var handleCheckBoxes = function(field) {
        if (field.type == "checkbox") {
            var fieldset = field.parentNode;
            while (fieldset && fieldset.tagName != "FIELDSET") {
                fieldset = fieldset.parentNode;
            }
            if (fieldset) {
                if ($(field).hasClass("select-all")) {
                    var current = field;
                    $(fieldset).cssSelect("input[type=checkbox]").each(function() {
                                                                       if (this != current) {
                                                                       this.checked = "";
                                                                       }
                                                                       });
                } else {
                    $(fieldset).cssSelect(".select-all")[0].checked = "";
                }       
            }
        }
        return true;    
    };
    
    return {
    init: function() {
        Talentum.eventHandler.register("click", "fieldset.titles input", function() {
                                       return handleCheckBoxes(this);
                                       });
        Talentum.eventHandler.register("click", "fieldset.regionsandcompanies input", function() {
                                       return handleCheckBoxes(this);
                                       });
    }
    };
}();

// Mobile menu
function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
     ele.className=ele.className.replace(reg,' ');
     }
   }

 function init() {
  document.getElementById("toggle").addEventListener("click", toggleMenu);
 }

 function toggleMenu() {
  var ele = document.getElementsByTagName('body')[0];
    if (hasClass(ele, "open")) {
      addClass(ele, "close");
      removeClass(ele, "open");
    }
    else {
      removeClass(ele, "close");
      addClass(ele, "open");
    }
  }

  document.addEventListener('readystatechange', function() {
      if (document.readyState === "complete") {
          init();
       }
    });

NyTeknik.sIFR = function() {
    var options;
    var font = {
    src: "/nyteknik/static/ver02/flash/sIFR/bentonSans.swf"
    };
    
    var rgbToHex = function(value, defaultValue) {
        if (value.charAt(0) == "#") {
            return value;
        }
        var result = value.match(/^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*/);
                                 if (result == null) {
                                 return defaultValue ? defaultValue : value;
                                 }
                                 var rgb = +result[1] << 16 | +result[2] << 8 | +result[3];
                                 var hex = "";
                                 var digits = "0123456789abcdef";
                                 while (rgb != 0) {
                                 hex = digits.charAt(rgb&0xf) + hex;
                                 rgb >>>= 4;
                                 }
                                 while (hex.length < 6) {
                                 hex = "0" + hex;
                                 }
                                 return "#" + hex;
                                 };
                                 
                                 var DOMReady = function() {
                            
                                 
                                 var include = "";
                                 var exclude = [];
                                 if (options) {
                                 include = options.include.join(",");
                                 exclude = options.exclude ? options.exclude : exclude;
                                 }
                                 
                                 var noOfExcludes = exclude.length;
                                 $(include).each(function() {
                                                 if (exclude.length > 0) {
                                                 var parent = $(this.parentNode);
                                                 for (var i = 0; i < noOfExcludes; i++) {
                                                 if (parent.hasClass(exclude[i])) {
                                                 return;
                                                 }
                                                 }      
                                                 }
                                                 var els = [];
                                                 els[0] = $(this);
                                                 var color = rgbToHex(this.getStyle("color"), "#000000");
                                                 var textAlign = this.getStyle("text-align");
                                                 var settings = {"color": color, "text-align": textAlign};
                                                 sIFR.replace(font, {
                                                              elements: els,
                                                              css: {".sIFR-root": settings},
                                                              tuneHeight: -4,
                                                              wmode: "transparent",
                                                              forceSingleLine: "true",
                                                              ratios: [7, 1.32, 11, 1.31, 12, 1.24, 14, 1.27, 19, 1.23, 24, 1.22, 33, 1.2, 45, 1.19, 50, 1.18, 51, 1.19, 74, 1.18, 1.17]
                                                              }
                                                              );
                                                 });
                                 };
                                 
                                 return {
                                 init: function(sIFROptions){
                                 if (typeof sIFR !== "undefined" && !Talentum.isIE6) {
                                 options = sIFROptions;
                                 sIFR.activate(font);
                                 Talentum.addOnDOMReady(DOMReady);
                                 }
                                 }
                                 };
                                 }();
                                 
                                 NyTeknik.dropDown = function() {
                                 
                                 
                                 var DOMReady = function() {
                                 
                                 //fold buttons
                                 document.getElementById("region-btn").onclick = function(){foldRegion()};
                                 document.getElementById("profession-btn").onclick = function(){foldProfession()};
                                 document.getElementById("monitor").addEventListener('click',hideDropDowns);
                                 };
                                 
                                 return {
                                 init: function(){
                                 
                                 Talentum.addOnDOMReady(DOMReady);
                                 
                                 }
                                 };
                                 }();
                                
                                 
                                 NyTeknik.init();
                                 
                                 
                                 //Foldable buttons
                                 var isFolded = false;
                                 
                                 function foldRegion () {
                                 
                                 if (!isFolded){
                                 document.getElementById('hidden-area1').style.display = "block";
                                 isFolded = true;
                                 }
                                 
                                 else if (isFolded){
                                 document.getElementById('hidden-area1').style.display = "none";
                                 isFolded = false;
                                 
                                 }
                                 
                                 }
                                 
                                 var isFolded2 = false;
                                 function foldProfession () {
                                 
                                 if (!isFolded2){
                                 document.getElementById('hidden-area2').style.display = "block";
                                 isFolded2 = true;
                                 }
                                 
                                 else if (isFolded2){
                                 document.getElementById('hidden-area2').style.display = "none";
                                 isFolded2 = false;
                                 
                                 }
                                 
                                 }
                                 
                                 
                                 function hideDropDowns () {
                                 
                                 if(clickedOutsideElement('hidden-area1') && clickedOutsideElement('region-btn')){
                                 document.getElementById('hidden-area1').style.display = "none";
                                 isFolded1 = false;
                                 }
                                 
                                 if(clickedOutsideElement('hidden-area2') && clickedOutsideElement('profession-btn')){
                                 document.getElementById('hidden-area2').style.display = "none";
                                 isFolded2 = false;
                                 }
                                 
                                 
                                 }
                                 
                                 function clickedOutsideElement(elemId) {
                                 var theElem = getEventTarget(window.event);
                                 while(theElem != null) {
                                 if(theElem.id == elemId)
                                 return false;
                                 theElem = theElem.offsetParent;
                                 }
                                 return true;
                                 }
                                 
                                 function getEventTarget(evt) {
                                 var targ = (evt.target) ? evt.target : evt.srcElement;
                                 if(targ != null) {
                                 if(targ.nodeType == 3)
                                 targ = targ.parentNode;
                                 }
                                 return targ;
                                 }
                                 
