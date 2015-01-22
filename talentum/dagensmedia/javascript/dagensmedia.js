var DagensMedia = function() {
	return {	
		init: function() {
			Talentum.tabbedBox.init();
			Talentum.carouselBox.init();
			Talentum.userSettings.init();
			Talentum.validateForms.init();
			Talentum.populateForms.init();
			Talentum.slideshow.init();
			Talentum.ajaxForms.init();
			Talentum.poll.init();
			Talentum.print.init();
			Talentum.zoom.init();
			Talentum.comment.init();
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
			Talentum.fontSize.init();
			Talentum.popup.init();
			Talentum.reportAbuse.init();
			Talentum.addAnchors.init([
				{ element: ".carousel-box-part", include: ["IMG"] },
				{ element: ".teaser", include: ["P", "IMG", ".media-image-cover"], exclude: [".teaser-group", ".poll"] },
				{ element: ".subteaser", include: ["P", "IMG"] },
				{ element: ".pullteaser", include: ["P", "IMG"] },
				{ element: ".small-teaser", include: ["P", "IMG", ".media-image-cover"] },
				{ element: ".opinion-teaser", include: ["IMG"] },
				{ element: ".magazine-archive LI", include: ["P", "IMG"] },
				{ element: ".magazine-teaser", include: ["P", "IMG"] },
				{ element: ".notice-teaser", include: ["IMG"] },
				{ element: ".media-teaser.tabbed-box", include: [".media-image-cover"] },
				{ element: ".quiz-box", include: ["li p"] }
			]);
			Talentum.inlineFormLabels.init([
				{ element: ".newsletter-teaser" },
				{ element: ".dm-plus-box .form-box" }
			]);
			Talentum.toggle.init();
			Talentum.sectionFilter.init();
			Talentum.stickyAd.init({
				top: "header"
			});
			Talentum.stickyTop.init();
			Talentum.media.init();
			Talentum.mediaImage.init();
 			Talentum.scrollingList.init([
				{ element: ".job-teaser ul", noOfItems: 3 },
				{ element: ".box-jobs ul" },
				{ element: ".featured-jobs ul", noOfItems: 1, duration: 3, delay: 4000, direction: "vertical" }
			]);
			Talentum.removeEmptyAdtechAds.init();
			Talentum.moreComments.init();
			Talentum.quiz.init();
			DagensMedia.recommend.init();
            DagensMedia.dropDown.init();
			Talentum.subscribe.init();
			Talentum.setUserID.init();		
			Talentum.markLocked.init();	
			Talentum.premiumContent.init();
			Talentum.pushResponsive.init();
		}
	};
}();


DagensMedia.recommend = function() {
	var triggerClass = "toggle-recommend";
	var recommendId = "recommend";

	var DOMReady = function() {
        
		var recommend = $$(recommendId);
		if (recommend != null) {
			document.body.insertBefore(recommend, document.body.firstChild);
			recommend.setStyle({
				position: "absolute",
				display: "none",
				"z-index": 10000
			});

			var form = $(recommend.cssSelect("form")[0]);
			var fieldset = recommend.cssSelect("fieldset");
			$$("recommend-from").value = Talentum.userSettings.getPreference("name");
			fieldset.create("a", {href: "", className: "close"}, true, "Avbryt");
			form = new Talentum.AJAXForm(form);
			form.setBeforeSubmissionHandler(function() {
				if (!Talentum.form.validate.call(form)) {
					return false;
				} else {
					this.cssSelect(".alert-box").remove();
					omniture_extra('tipsa');
				}
				Talentum.userSettings.setPreference("name", $$("recommend-from").value);
			});
			
			form.setResponseHandler(function(data) {
				if (data && data.length > 0) {
					var notice = form.create("span", {className: "notice"}, true);
					notice.setStyle("display", "none");
					fieldset.setStyle("display", "none");
					notice.setStyle(DOMEffects.getOpacityRule(0));
					notice.setStyle("display", "block");
					data = unescape(data).replace("toggle-recommend", "close");
					notice.innerHTML = data;
					notice.fadeIn();
				}
			});
		}
	};

	return {
		init: function() {
			Talentum.addOnDOMReady(DOMReady);
            
          
           
			Talentum.eventHandler.register("click", "." + triggerClass, function() {
				var recommend = $$("recommend");
				if (recommend) {
					DagensMedia.cover.show();
					recommend.setStyle(DOMEffects.getOpacityRule(0));
					recommend.setStyle("display", "block");
					var width = Talentum.getActualWidth(recommend);
					var height = Talentum.getActualHeight(recommend);
					var pageWidth = Math.min(Talentum.getActualWidth($$("page"), window.innerWidth ? window.innerWidth : document.documentElement.clientWidth));
					var pageHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
					var pageTop = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;
					recommend.setStyle({
						left: (pageWidth / 2 - width / 2) + "px",
						top: (pageTop + pageHeight / (1 + Math.sqrt(5) / 2)) - height + "px"
					});
					recommend.fadeIn({duration: 250, callback: function() {
						$$("recommend-to").focus();
					}});
				}
			});
			
			Talentum.eventHandler.register("click", "#" + recommendId + " .close", function() {
				DagensMedia.cover.hide();
				$$(recommendId).hide({duration: 250, callback: function() {
					this.cssSelect("fieldset").setStyle("display", "block");
					this.cssSelect(".alert-box, .notice").remove();
					this.cssSelect(".has-error").removeClass("has-error");
					$$("recommend-to").value = "";
				}});
			});
		}
	};
}();


DagensMedia.cover = function() {
	return {
		resize: function() {
			$$("page-cover").setStyle({
				width: Math.max(Talentum.getActualWidth($$("page")), window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) + "px",
				height: Math.max(Talentum.getActualHeight(document.body), window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) + "px"
			});
		},
		show: function() {
			var cover = $$("page-cover");
			 $("html").setStyle("overflow", "hidden");
			if (!cover) {
				cover = $(document.body).create("div", {id: "page-cover"}, true);
				cover.setStyle({
					position: "absolute",
					left: "0",
					top: "0",
					"z-index": 9999
				});
			}
			DagensMedia.cover.resize();
			cover.setStyle("display", "block");
			$(window).addEvent("resize", DagensMedia.cover.resize);
		},
		hide: function() {
			$("html").setStyle("overflow", "auto");
			$$("page-cover").setStyle("display", "none");
			$(window).removeEvent("resize", DagensMedia.cover.resize);
		}
	};
}();

DagensMedia.dropDown = function() {
    
    
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

DagensMedia.init();




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

function init() {
	document.getElementById("toggle").addEventListener("click", function() {
	    toggleMenu('menus');
	}, false);
}

	function toggleMenu(id) {
		alert ("Hello World!");
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }

document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
      init();
    }
  });





