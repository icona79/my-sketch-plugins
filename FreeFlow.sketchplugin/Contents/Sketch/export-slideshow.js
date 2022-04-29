var onRun = function(context) {

  var sketch = require('sketch');
  var sketchDom = require('sketch/dom');
  var ui = require('sketch/ui');
  var settings = require('sketch/settings');
  var document = sketch.getSelectedDocument();

  const path = "/Desktop/FreeFlow-Exports";
  // const username = "fbmore";
  const username = document.path.replace("/Users/", '').split("/")[0];
  const exportPath = "file:///Users/" + username + path + "/";
  const exportOptions = {formats: 'png', overwriting: true, output: "~" + path}
  // const exportOptions = {formats: 'svg', overwriting: true, output: "~" + path}

  const newLine = "\n\n";


  var Page = require('sketch/dom').Page

  var currentPage = document.selectedPage


  /* Sketch document variables */

  var selectedLayers = document.selectedLayers.layers;
  console.log(selectedLayers.length)

  /* Slide variables */
  var slide;
  var slideNameArray;
  var slideNameForAcronym;

  var pagename = currentPage.name;
  var pagenamedisplay = currentPage.name;

  if (pagename.charAt(0) === "-" ) {
    pagename = pagename.substr(1);
    pagenamedisplay = "";
  }

  /* CSS Formatting */

  var { ffCSS, documentColorsFormattedRoot } = ffCSS__styles(newLine);

  var textStylesExamples = "";
  var layerStylesExamples = "";
  var colorsExamples = "";

  var layersToSVGFrames = "";
  var pngPath = "";


  var ffHTML__slides = "";
  var ffHTML__slidesJS = "<script>var slideIndex = 1;showDivs(slideIndex);function plusDivs(n) {showDivs(slideIndex += n);}function showDivs(n) {var i;var x = document.getElementsByClassName('ffSlides');if (n > x.length) {slideIndex = 1}if (n < 1) {slideIndex = x.length} ;for (i = 0; i < x.length; i++) {x[i].style.display = 'none';}x[slideIndex-1].style.display = 'block';}</script>";



  /// Basic script to export an image to a PPT. Needs to iterate through all the images/slides to be useful.
  // var ffHTML__slidesToPPTJS = "\n\n<script src='https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@latest/dist/pptxgen.bundle.js'></script>";
  // ffHTML__slidesToPPTJS = ffHTML__slidesToPPTJS + "\n\n<script> window.onload = function (){var pptx = new PptxGenJS(); pptx.defineLayout({ name:'A3', width:20, height:25.1527777778 });  pptx.layout = 'A3'; var slide = pptx.addSlide();  slide.addImage({ path:'Artboard2.png', x:0, y:0, w:20, h:25.1527777778 });  pptx.writeFile('Demo-Images');}; </script>";
  // ffHTML__slidesJS =  ffHTML__slidesJS + ffHTML__slidesToPPTJS;

  // ffHTML__slidesJS =  ffHTML__slidesJS + "\n\n<script> window.onload = function (){var pptx = new PptxGenJS();  var slide = pptx.addSlide();  slide.addImage({ path:'~/fbmore/Desktop/SketchSpecialExports/Artboard2.png', x:1, y:1, w:8.0, h:4.0 });  pptx.writeFile('Demo-Images');}; </script>\n\n";

  /// Working example exports A PPT
  // ffHTML__slidesJS =  ffHTML__slidesJS + "\n\n<script> window.onload = function (){var pptx = new PptxGenJS(); var slide = pptx.addSlide();  slide.addText([ { text:'Did You Know?', options:{ fontSize:48, color:pptx.SchemeColor.accent1 } }, { text:'writeFile() returns a Promise', options:{ fontSize:24, color:pptx.SchemeColor.accent6 } }, { text:'!', options:{ fontSize:24, color:pptx.SchemeColor.accent6 } }, { text:'(pretty cool huh?)', options:{ fontSize:24, color:pptx.SchemeColor.accent3 } }],{ x:1, y:1, w:'80%', h:3, align:'center', fill:pptx.SchemeColor.background2 }); pptx.writeFile('PptxGenJS-Sandbox-').then(function(fileName){ console.log('Saved! File Name: '+fileName) });}; </script>\n\n";

  ffHTML__slidesJS =  ffHTML__slidesJS + "<script>  $(document).keydown(function(e) {  	if (e.keyCode === 37) {       $('.w3-display-left').click();  	   return false;  	}  	if (e.keyCode === 39) {  $('.w3-display-right').click();  return false;  	}  });</script>";
  ffHTML__slidesJS =   ffHTML__slidesJS + "<script>/* Get the documentElement (<html>) to display the page in fullscreen */var elem = document.documentElement;/* View in fullscreen */function openFullscreen() {  if (elem.requestFullscreen) {    elem.requestFullscreen();  } else if (elem.mozRequestFullScreen) { /* Firefox */    elem.mozRequestFullScreen();  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */    elem.webkitRequestFullscreen();  } else if (elem.msRequestFullscreen) { /* IE/Edge */    elem.msRequestFullscreen();  }}/* Close fullscreen */function closeFullscreen() {  if (document.exitFullscreen) {    document.exitFullscreen();  } else if (document.mozCancelFullScreen) { /* Firefox */    document.mozCancelFullScreen();  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */    document.webkitExitFullscreen();  } else if (document.msExitFullscreen) { /* IE/Edge */    document.msExitFullscreen();  }}</script><script>  $(document).keydown(function(e) {  	if (e.keyCode === 70) {  $(this).click(openFullscreen());  return false;  	}  });</script>";

  var ffHTML__div = "";
  var ffHTML__divCSS = "";
  var ffHTML__W3CSS = "";



  const ffHTML__metatags = "<meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport'>\n<meta content='yes' name='apple-mobile-web-app-capable'>\n<meta content='FreeFlow' name='apple-mobile-web-app-title'>\n<meta name='apple-mobile-web-app-status-bar-style' content='default'>\n<meta charset='utf-8'> \n <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'> \n <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>"
  // const ffHTML__metatags = "<meta content='width=device-width, initial-scale=1, user-scalable=no' name='viewport'>\n<meta content='yes' name='apple-mobile-web-app-capable'>\n<meta content='FreeFlow' name='apple-mobile-web-app-title'>\n<meta name='apple-mobile-web-app-status-bar-style' content='default'>\n<meta charset='utf-8'> \n <link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'> \n <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script><script src='https://unpkg.com/anycontrol/dist/index.umd.min.js'></script> <script>const ctrl = new anycontrol();ctrl.addCommand('next page', function () {alert('Switching to next page');});ctrl.start();</script>"
  var ffHTML__branding =  "";
  ffHTML__branding = ffHTML__branding + "\n\n<div id='ffbranding' class='ff ff__10 ff__branding'><p class='ff ff__10 ff__a' ><a href='http://free-flow.co?ref=slideshow' alt='Made with 🌈 FreeFlow for Sketch' title='Made with 🌈 FreeFlow for Sketch'>🌈</a></div>";

  /* Symbol management */
  for (c = 0; c < selectedLayers.length; ++c){
    var layerSelected = selectedLayers[c];
    var cleanCSS = layerSelected.sketchObject.CSSAttributes().toString().split('",').join().split('"').join("").replace(/,+/g, '').replace('(', '').replace(')', '');
    var cleanLayerName = layerSelected.name.replace(/\s+/g, '').replace(/:+/g, '').replace(/!+/g, '').replace(/\/+/g, '').toLowerCase();
    var cleanCSSClassName = cleanLayerName + "-class";

    ffHTML__divCSS = ffHTML__divCSS + newLine+ "." + cleanLayerName + "-class {" + cleanCSS + "}" + newLine;

    slide = layerSelected;

    slideNameArray = slide.name.split("/");
    slideNameForAcronym = slideNameArray[slideNameArray.length-1] || slide.name;


    var pngFile = sketch.export(slide, exportOptions);

    var pngPath = exportPath + layerSelected.name + ".png"

    console.log(pngPath)

    var ffData__layerFill = "";

    if (layerSelected.type != "SymbolInstance" || layerSelected.type != "Group" || layerSelected.type != "SymbolMaster"){
      if (layerSelected.style.fills.length != 0) {
        ffData__layerFill = "color: " + layerSelected.style.fills[0].color + " "
       }
    }

    var ffData__instanceProperties = "<p class='ff ff__12'>"
    + ffData__layerFill
    + "width: "
    + layerSelected.frame.width + "px "
    + "height: "
    + layerSelected.frame.height + "px "
    +"</p><br>";

    // if (layerSelected.type === "Text"){
    //   ffHTML__div = ffHTML__div + newLine + "<div><div id='" + layerSelected.name + "' class='ff__componentdescription ff__componentarea ff__shadow "+ cleanCSSClassName +"'>" + layerSelected.text + "</div><div id='" + layerSelected.name + "description' class='ff ff__12 ff__componentdescription'> " + layerSelected.name + "<br>"+ffData__textStyle+"</div><div id='" + layerSelected.name + "description' class='ff ff__12 ffCSS__'> ." + cleanCSSClassName +" {<br>"+cleanCSS.split(';').join(";<br>") +"}" + "</div></div>" + newLine
    // } else {
      /* Create the HTML Document */
      ffHTML__slides = ffHTML__slides + newLine + "<img class='ffSlides ff__slide' id='" + layerSelected.name +"-slide"+ "' src='" + pngPath + "'>" + newLine;

    // }
  }

  var ffCSS__frames = newLine+ "svg {width:100%;max-height:600px;}"+newLine;

  var ffHTML__wrapper = "<div class='w3-content w3-display-container'>"

  // HTML ARROW CONTROLS
  // var ffHTML__slidesControls = "<button class='w3-button w3-display-left' onclick='plusDivs(-1)'>&#10094;</button><button class='w3-button w3-display-right' onclick='plusDivs(+1)'>&#10095;</button>"

  // HOT AREAS
  if (selectedLayers.length >> 1) {
    var ffHTML__slidesControls = "<div class='w3-button w3-display-left' onclick='plusDivs(-1)'></div><div class='w3-button w3-display-right' onclick='plusDivs(+1)'></div>"
  } else {
    var ffHTML__slidesControls = ""
  }

  var ffHTML__extCSS = "<link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'>"


  ffHTML__slides = ffHTML__wrapper + ffHTML__slides + ffHTML__slidesControls + "</div>"
  // ffHTML__slides = ffHTML__slides + ffHTML__slidesControls

  /* HTML page */
  var htmlpage = "<!DOCTYPE html><html><head><title>" + pagenamedisplay + "</title>"
    + ffHTML__metatags +
    // + ffHTML__extCSS +
    "<style type='text/css'>"
    + ":root {\n"
    + documentColorsFormattedRoot
  + "}" + newLine
  // + documentTextStyleFormatted + newLine
  // + documentLayerStyleFormatted + newLine
  + ffCSS + newLine
  + ffCSS__frames + newLine
  + ffHTML__divCSS + newLine
  + "</style>"
  +"</head>" + newLine
  + "<body id='fullscreenarea'>" + newLine
  // + "<h1 class='ff'>Slideshow:</h1><br>"
  + "<div class='ff__grid'>"
  // + svgContent
  + ffHTML__div + newLine
  + ffHTML__slides + newLine
  + ffHTML__branding + newLine
  + ffHTML__slidesJS + newLine
  +"</body></html>";

  var htmlContent = NSString.stringWithString_(htmlpage);
  var filepath = NSTemporaryDirectory() + pagename + ".html";
  htmlContent
  .dataUsingEncoding_(NSUTF8StringEncoding)
  .writeToFile_atomically_(filepath, true);
  var file = NSURL.fileURLWithPath(filepath);

	var count = selectedLayers.length;

	if (count >> 0) {
		ui.message("🌈: Done exporting " + count + " layers to an HTML slideshow! 👏 🚀");
		NSWorkspace.sharedWorkspace().openFile(file.path());
	} else {
		ui.message("🌈: Please select at least 1 layer to export as an HTML slideshow! 👏 🚀");
	}

};

function ffCSS__styles(newLine) {
  var documentColorsFormatted = "// Document Colors\n";
  var ff__BodyStyling = "body {"
  + "background-color: #000;\n"
  + "padding: 0px;\n"
  + "font-size: "+ 16 + "px;\n"
  // + "font-family: '"+ TextStyle.style.fontFamily + "';\n"
  // + "line-height: "+ 125% + "px;\n"
  // + "letter-spacing: "+ TextStyle.style.kerning + "px;\n"
  + "}";
  var ff__fontfamily = ".ff{font-family:'SF Pro Text','Open Sans'}";
  var ff__12 = ".ff__12{font-size:12px;opacity:.5}";
  var ff__10 = ".ff__10{font-size:10px;opacity:1}";
  var ff__branding = ".ff__branding{position:fixed;bottom:4px;left:16px;z-index:10000;}";
  var ff__slide = ".ff__slide{max-width:100%;max-height:100%;vertical-align: middle;}";
  // var ff__grid = ".ff__grid{display: grid;grid-template-columns: repeat(3, 1fr);grid-template-rows: 1fr;grid-column-gap: 24px;grid-row-gap: 48px;}";
  var ff__grid = ".ff__grid{  display: grid; grid-template-columns: auto; grid-auto-rows: auto; grid-gap: 0px; box-sizing: border-box; height: 100%; width: 100%; background-color: #000; padding: 0px;}";
  var ff__componentdescription = ".ff__componentdescription{width:100%;padding:120px 0;}";
  var ff__componentarea = ".ff__componentarea{font-size:16px;opacity:1;margin-top: 40px;background-color:white;width:100%;min-height:200px;padding:120px 0; border: 1px solid #e6e6e6; border-radius: 6px;}";
  var ff__shadow = ".ff__shadow:hover{box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);}";
  var documentColorsFormattedRoot = "";
  var documentTextStyleFormatted = "";
  var documentLayerStyleFormatted = "";
  var a = "a{text-decoration:none;}";
  var ff__a = ".ff__a{} a:hover{}";
  var ffHTML__W3CSS = ".w3-button{height: 100% !important; width: 25% !important;} .w3-button:hover{color: #000 !important; background-color: #ffffff08 !important;} .w3-content,.w3-auto{margin-left:auto;margin-right:auto}.w3-content{width:fit-content !important ;max-width:100% !important}.w3-auto{max-width:1140px};.w3-top,.w3-bottom{position:fixed;width:100%;z-index:1}.w3-top{top:0}.w3-bottom{bottom:0}.w3-overlay{position:fixed;display:none;width:100%;height:100%;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.5);z-index:2}.w3-display-topleft{position:absolute;left:0;top:0}.w3-display-topright{position:absolute;right:0;top:0}.w3-display-bottomleft{position:absolute;left:0;bottom:0}.w3-display-bottomright{position:absolute;right:0;bottom:0}.w3-display-middle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%)}.w3-display-left{position:absolute;top:50%;left:0%;transform:translate(0%,-50%);-ms-transform:translate(-0%,-50%)}.w3-display-right{position:absolute;top:50%;right:0%;transform:translate(0%,-50%);-ms-transform:translate(0%,-50%)}.w3-display-topmiddle{position:absolute;left:50%;top:0;transform:translate(-50%,0%);-ms-transform:translate(-50%,0%)}.w3-display-bottommiddle{position:absolute;left:50%;bottom:0;transform:translate(-50%,0%);-ms-transform:translate(-50%,0%)}.w3-display-container:hover .w3-display-hover{display:block}.w3-display-container:hover span.w3-display-hover{display:inline-block}.w3-display-hover{display:none}.w3-display-position{position:absolute}";

  var ffCSS = ff__BodyStyling + newLine
  + ff__fontfamily + newLine
  + ffHTML__W3CSS + newLine
  + a + newLine
  + ff__a + newLine
  + ff__12 + newLine
  + ff__10 + newLine
  + ff__grid + newLine
  + ff__branding + newLine
  + ff__slide + newLine
  + ff__componentdescription + newLine
  + ff__componentarea + newLine
  + ff__shadow + newLine

  return {ffCSS, documentColorsFormattedRoot};
}
