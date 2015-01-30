var LagAvtal = function() {
	return {	
		init: function() {
			Talentum.addAnchors.init([
  				{ element: ".teaser", include: ["P", "IMG", ".media-image-cover"], exclude: [".poll", ".media-slideshow"] },
				{ element: ".subteaser", include: ["P", "IMG"] },
				{ element: ".pullteaser", include: ["P", "IMG"] },
				{ element: ".miniteaser", include: ["P"] },
				{element: ".small-teaser", include: ["P", "IMG", ".media-image-cover"]},
				{element: ".opinion-teaser", include: ["IMG"]},
				{element: ".magazine-archive LI", include: ["IMG"]},
				{element: ".quiz-box", include: ["li p"] }
			]);
			Talentum.inlineFormLabels.init([
				{element: "#top-teasers .form-box-login"}
			]);
			Talentum.tabbedBox.init();
			Talentum.carouselBox.init();
			Talentum.userSettings.init();
			Talentum.validateForms.init();
			Talentum.populateForms.init();
			Talentum.slideshow.init();
			Talentum.ajaxForms.init();
			Talentum.media.init();			
			Talentum.mediaImage.init();		
			Talentum.poll.init();
			Talentum.print.init();
			Talentum.zoom.init();
			Talentum.recommend.init();
			Talentum.comment.init();
			Talentum.tooltip.init([
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
			Talentum.toggle.init();
			Talentum.popup.init();
			Talentum.reportAbuse.init();
			Talentum.stickyTop.init();
			Talentum.stickyAd.init({"top": "content"});
			Talentum.removeEmptyAdtechAds.init();
			Talentum.moreComments.init();
			Talentum.quiz.init();
			LagAvtal.lawSearch.init();
			Talentum.markLocked.init();
			Talentum.premiumContent.init();	
			Talentum.pushResponsive.init();
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

LagAvtal.lawSearch = function() {
	return {
		init: function() {
			Talentum.eventHandler.register("focus", ["#time-frame-from", "#time-frame-to"], function() {
				var field = $$("time-frame-span");
				if (field && !field.checked) {
					field.checked = "checked";
				}
				return true;
			});
			Talentum.eventHandler.register("click", ".time-frame INPUT", function() {
				if (this.type == "radio" && this.id != "time-frame-span") {
					$$("time-frame-from").value = "";
					$$("time-frame-to").value = "";
				} else if (this.id == "time-frame-span") {
					$$("time-frame-from").focus();
				}
				return true;
			});
		}
	}
}();

LagAvtal.init();