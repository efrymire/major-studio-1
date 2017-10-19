var input;
var ritaString;
var content;

function setup() {
    noCanvas();
    input = createInput();
    input.changed(rita); //reference p5
    content = createElement('div');
    content.id('content')
}

function rita(event) {
    
    //console.log(event.target.value);
    var str = event.target.value
    
    ritaString = RiString(str);
    var words = ritaString.words(); 
    // now that it is cast as a RiString, there is a list of functions available (see documentation)
    console.log(words)
    
    words.forEach(function(element) {
        var features = RiString(element).features(); 
        console.log(features);
       
        var span = createElement('span', features.text);
       
        if (features.pos === 'nn')
           span.style('background','purple');
           
        span.parent(content)
    });
}