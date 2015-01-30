/**
 * Ingenjörskarriär
 */

var Ingenjorskarriar = function() {
	return {	
		init: function() {
			Ingenjorskarriar.tabbedBox.init();
			Talentum.carouselBox.init();
			Talentum.addAnchors.init([
				{ element: ".teaser", include: ["P", "IMG", ".media-image-cover"], exclude: [".poll", ".media-slideshow"] },
				{ element: ".subteaser", include: ["P", "IMG"] },
				{ element: ".pullteaser", include: ["P", "IMG"] },
				{ element: ".miniteaser", include: ["P"] },
				{ element: ".small-teaser", include: ["P", "IMG", ".media-image-cover"] },
				{ element: ".blog-teaser", include: ["IMG"] },
				{ element: ".carousel-box-part", include: ["IMG"] },
				{ element: ".opinion-teaser", include: ["IMG"] },
				{ element: ".notice-teaser", include: ["IMG"] },
				{ element: ".media-teaser", include: [".media-image-cover"] },
				{ element: ".quiz-box", include: ["li p"] },
				{ element: ".image-media", include: [".media-image-cover"] }
			]);
			Talentum.print.init();
			Talentum.media.init();			
			Talentum.mediaImage.init();
			Talentum.recommend.init();
			Talentum.zoom.init();
			Talentum.fontSize.init();
			Talentum.popup.init();
			Talentum.externalLinks.init();
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
				{ element: ".job-teaser ul", noOfItems: 2 },
				{ element: ".article .jobs ul", noOfItems: 3, duration: 1500, delay: 4000, direction: "horizontal" },
				{ element: ".featured-jobs ul", noOfItems: 1, duration: 3, delay: 4000, direction: "vertical" }
			]);
			Talentum.removeEmptyAdtechAds.init();
			Talentum.subscribe.init();
			Ingenjorskarriar.jobSearch.init();
			Ingenjorskarriar.accordion.init();
			Ingenjorskarriar.toggler.init();
			Ingenjorskarriar.conditionalDisplay.init();
			Ingenjorskarriar.autoComplete.init();
			Ingenjorskarriar.rollup.init();
            Ingenjorskarriar.dropDown.init();
			Ingenjorskarriar.fancylist.init();
			Ingenjorskarriar.featuredCompanyAds.init();
			Talentum.quiz.init();
			Talentum.stickyAd.init();
			Talentum.stickyTop.init();
			Talentum.pushResponsive.init();
		}
	};
}();


Ingenjorskarriar.autoComplete = function() {
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


Ingenjorskarriar.conditionalDisplay = function() {
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

Ingenjorskarriar.accordion = function() {
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

			Ingenjorskarriar.accordion.openClose(accordionObjIndex);
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
				accordion.timer = setTimeout("Ingenjorskarriar.accordion.openClose(" + accordionObjIndex + ")", frameRate);
			}
		},

		init: function(options) {
			Talentum.addOnDOMReady(DOMReady);
		}
	};
}();


Ingenjorskarriar.tabbedBox = function() {
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


Ingenjorskarriar.toggler = function() {
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


Ingenjorskarriar.jobSearch = function() {
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


Ingenjorskarriar.fancylist = function() {
	var itemName = "list-item-";
	var DOMReady = function() {
		$("#content").elmsByClass("fancylist").each(function() {
			var $elm = $(this);
			var i = 1;
			
			$elm.elmsByTag("li").each(function() {
				$(this).addClass(itemName + i);
				i++;
			});
		});
	};
	
	return {
		init: function() {
			Talentum.addOnDOMReady(DOMReady);
		}
	}
}();


Ingenjorskarriar.rollup = function() {
	
	var DOMReady = function() {
        
        $elm = $("#internalBannerTop");
		$elm.create("i", { id: "close-rollup" }, true, "Stäng").addEvent("click", function(e) {
			DOMAssistant.preventDefault(e);

			var $self = $(this);
			$($self.parentNode).animate2({ opacity: 0 }, { duration: 300, callback: function() {
				$($self.parentNode).remove();
				
				// If page got a sticky ad. Recalculate it
				Talentum.stickyTop.setTop(0);
				
			} } );
			
			// Set cookie
			var date = new Date();
			//date.setTime(date.getTime() + (30*24*60*60*1000)); // Keep cookie for 30 days
			date.setTime(date.getTime() + (1*24*60*60*1000)); // Keep cookie for 1 day
			document.cookie = "ingenjorskarriarRollup=false; expires=" + date.toGMTString() + "; path=/";
		});
		
		var i = 0,
			x = "",
			showRollup = true, 
			ARRcookies = document.cookie.split(";");

		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			x = x.replace(/^\s+|\s+$/g,"");
			if ("ingenjorskarriarRollup" === x) {
				showRollup = false;
			}
		}
		
		if(showRollup) {
			$elm.setStyle("display", "block");
		}
		
	};
	
	return {
		init: function() {
			Talentum.addOnDOMReady(DOMReady);
		}
	}
}();


Ingenjorskarriar.featuredCompanyAds = function() {
	var ads,
	    currentAdNumber = 0,
	    numberOfAds = 0,
	    timerID = null,
	    fadeDuration = 400,
	    timerDuration = 5000,
	     
	DOMReady = function() {
	  ads =  $(".featured-company-ad");
	  numberOfAds = ads.length;
	  
	  // Start from random ad in collection
	  currentAdNumber = Math.floor(Math.random() * numberOfAds);
	  
	  var maxHeight = 0;
	  $(ads).each(function() {
      var elm = $(this);
      elm.setStyle("display", "block");
      maxHeight = Math.max(Talentum.getActualHeight(elm), maxHeight);
      elm.setStyle("display", "none");
	  });
	  $(".featured-company-ads").setStyle("height", maxHeight + "px");

		  var startAd = $(ads[currentAdNumber]);
		  startAd.setStyle(DOMEffects.getOpacityRule(0));
		  startAd.setStyle("display", "block");
		  startAd.fadeIn( { duration: fadeDuration, callback: function() {			  
			  timerID = setTimeout("Ingenjorskarriar.featuredCompanyAds.changeAd(" + currentAdNumber + ")", timerDuration);
		  }});

	  
	};
	
	return {
	  changeAd: function(lastNum) {
  	  clearInterval(timerID);
  	  
  	  currentAdNumber = lastNum + 1;
  	  // Find next ad. If we reach the end we start over.
  	  if(currentAdNumber === numberOfAds) {
    	  currentAdNumber = 0;
  	  }
  	  
  	  if(numberOfAds > 1){
	  	  $(ads[lastNum]).animate2( {opacity: 0 }, { duration: fadeDuration, callback: function() {
	
	       	 // Hide all ads.
	         $(".featured-company-ad").each(function() {  
	            $(this).setStyle("display", "none");
	         });
	         
	         var nextAd = $(ads[currentAdNumber]);
	         nextAd.setStyle(DOMEffects.getOpacityRule(0));
	         nextAd.setStyle("display", "block");
	         nextAd.fadeIn( { duration: fadeDuration, callback: function() {
	           timerID = setTimeout("Ingenjorskarriar.featuredCompanyAds.changeAd(" + currentAdNumber + ")", timerDuration);  
	         }});
	  	  }});
  	  }
	  },
	  
		init: function() {
			Talentum.addOnDOMReady(DOMReady);
		}
	};
}();

Ingenjorskarriar.dropDown = function() {
    
    
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

Ingenjorskarriar.init();



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