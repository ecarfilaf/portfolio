
function loadImage() {
	let can = document.getElementById('can');
	let file = document.getElementById('fileinput');
	console.log(file);
	var image = new SimpleImage(file);
	image.drawTo(can);
}
function imageIsLoaded() {
	let can = document.getElementById('can');
	console.log(can);
}
function doGrey() {
	
	if (imageIsLoaded(grayImage)) {	// check if image is loaded
		filterGray();				// function performs the grayscale work
		grayImage.drawTo(canvas);	// display image
	}
}
function doRed() {
	alert('doRed');
}
function doReset() {
	alert('doReset');
}
