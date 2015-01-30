var Arbetarskydd = function() {
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
				{ element: "body.wordpress .facebook" },
				{ element: "body.wordpress .digg" },
				{ element: "body.wordpress .delicious" },
				{ element: "body.wordpress .print" },
				{ element: "body.wordpress .toggle-text-size" },				
				{ element: ".article .facebook" },
				{ element: ".article .digg" },
				{ element: ".article .delicious" },
				{ element: ".article .twitter" },
				{ element: ".article .print" },
				{ element: ".article .toggle-text-size" },
				{ element: ".article .toggle-recommend" }
			]);
			Talentum.fontSize.init();
			Talentum.popup.init();
			Talentum.reportAbuse.init();
			Talentum.addAnchors.init([
				{ element: ".carousel-box-part", include: ["IMG"] },
				{ element: ".teaser", include: ["P", "IMG", ".media-image-cover"], exclude: [".poll", ".media-slideshow"] },
				{ element: ".subteaser", include: ["P", "IMG"] },
				{ element: ".pullteaser", include: ["P", "IMG"] },
				{ element: ".miniteaser", include: ["P"] },
				{ element: ".small-teaser", include: ["P", "IMG", ".media-image-cover"] },
				{ element: ".internal-ad", include: ["P", "IMG"] },
				{ element: ".opinion-teaser", include: ["IMG"] },
				{ element: ".magazine-archive LI", include: ["P", "IMG"] },
				{ element: ".magazine-teaser", include: ["P", "IMG"] },
				{ element: ".notice-teaser", include: ["IMG"] },
				{ element: ".tabbed-box-part", include: [".media-image-cover"] },
				{ element: ".media-teaser", include: [".media-image-cover"] },
				{ element: ".quiz-box", include: ["li p"] }
			]);
			Talentum.inlineFormLabels.init([
				{ element: ".newsletter-teaser" },
				{ element: ".dm-plus-box .form-box" },
				{ element: ".search" }
			]);
			Talentum.toggle.init();
			Talentum.sectionFilter.init();
			Talentum.stickyAd.init({
				top: "menu"
			});
			Talentum.stickyTop.init();
			Talentum.media.init();
			Talentum.mediaImage.init();
			Talentum.removeEmptyAdtechAds.init();
			Talentum.moreComments.init();
			Arbetarskydd.recommend.init();
			Talentum.quiz.init();
			Arbetarskydd.sIFR.init();
	    	Talentum.markLocked.init();
			Talentum.premiumContent.init();	
			Talentum.pushResponsive.init();
		}
	};
}();


Arbetarskydd.recommend = function() {
	var triggerClass = "toggle-recommend";
	var recommendId = "recommend";

	var DOMReady = function() {
		var recommend = $$(recommendId);
		if (recommend != null) {
			document.body.appendChild(recommend);
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
					Arbetarskydd.cover.show();
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
				Arbetarskydd.cover.hide();
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


Arbetarskydd.cover = function() {
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
			Arbetarskydd.cover.resize();
			cover.setStyle("display", "block");
			$(window).addEvent("resize", Arbetarskydd.cover.resize);
		},
		hide: function() {
			$("html").setStyle("overflow", "auto");
			$$("page-cover").setStyle("display", "none");
			$(window).removeEvent("resize", Arbetarskydd.cover.resize);
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

Arbetarskydd.sIFR = function() {
	var font = {
		src: "/arbetarskydd/static/ver02/flash/sIFR/morganavec.swf"
	};
	
	var include = ".box H2, .internal-ad H2 A, .section-heading H1, .search-heading H2";
	var exclude = ["affiliation-box", "carousel-box"]; 
	
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
		if ($("body.wordpress").length > 0) {
			exclude.push("section-heading");
		}
		if ($("body.page-prenumerera").length > 0) {
			exclude.push("section-heading");
		}
		if ($("body.page-login").length > 0) {
			exclude.push("section-heading");
		}		
		var noOfExcludes = exclude.length;
		$(include).each(function() {
			var parent = $(this.parentNode);
			for (var i = 0; i < noOfExcludes; i++) {
				if (parent.hasClass(exclude[i])) {
					return;
				}
			}
			var els = [];
			els[0] = $(this);
			var color = rgbToHex(this.getStyle("color"), "#000000");
			var textAlign = this.getStyle("text-align");
			var settings = {"color": color, "text-align": textAlign};
			if (parent.hasClass("box")) {
				settings["text-transform"] = "none";
			}
			sIFR.replace(font, {
					elements: els,
					css: {".sIFR-root": settings},
					tuneHeight: -4,
					wmode: "transparent",
					forceSingleLine: "true",
					ratios: [10, 1.32, 16, 1.27, 19, 1.23, 24, 1.22, 33, 1.2, 37, 1.19, 38, 1.2, 51, 1.19, 55, 1.18, 56, 1.19, 82, 1.18, 83, 1.17, 84, 1.18, 86, 1.17, 88, 1.18, 93, 1.17, 94, 1.18, 1.17]
				}
			);
		});
	};

	return {
		init: function(){
			if (typeof sIFR !== "undefined" && !Talentum.isIE6) {
				sIFR.activate(font);
				Talentum.addOnDOMReady(DOMReady);
			}
		}
	};
}();


Arbetarskydd.init();