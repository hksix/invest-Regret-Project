controller = new ScrollMagic.Controller();

var scene1 = new ScrollMagic.Scene({
	triggerElement: "#top-button"
}).setTween("#head", .5, (backgroundColor: "green"))
.addTo(controller);