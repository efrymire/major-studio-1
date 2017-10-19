var dictionary = [];
var textX = 0;
var textY = 150;
var ghana, burkinafaso, kenya;
var ghanaText, bfText, kenyaText;
// var counts = []
// var countmax;

function preload() {
    ghana = loadStrings('ghana.txt');
    burkinafaso = loadStrings('burkinafaso.txt');
    kenya = loadStrings('kenya.txt');
}

function setup() {
    var canvas = createCanvas(300, 4000);
    canvas.parent('right-column')
    background(color(0,0,0,0));
    rollOver()
}

function rollOver() {
    var ghanaText = createElement('p','Ghana')
    ghanaText.style('font-size','30px')
    ghanaText.position(windowWidth-(windowWidth/2)+40,300);
    ghanaText.mouseOver(
        function() {
            analyze(ghana);
            display1();
        });
    ghanaText.mouseOut(
        function() {
            resetSketch()
        });
    var bfText = createElement('p','Burkina Faso')
    
    bfText.style('font-size','30px')
    bfText.position(windowWidth-(windowWidth/3)-60,300);
    bfText.mouseOver(
        function() {
            analyze(burkinafaso);
            display();
        });
    bfText.mouseOut(
        function() {
            resetSketch()
        });
    var kenyaText = createElement('p','Kenya')
    kenyaText.style('font-size','30px')
    kenyaText.position(windowWidth-(windowWidth/4)+40,300)
    kenyaText.mouseOver(
            function() {
                analyze(kenya);
                display1();
            })
    kenyaText.mouseOut(
            function() {
                resetSketch()
            });
    
}

function resetSketch() {
    clear();
    setup();
    dictionary.length = 0
}

    
function analyze(text) {
    text.forEach(function(phrases){
        phrases = phrases.replace(/[^\w\s]/gi,'')
        phrases = phrases.replace(/(^|\s)and(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)of(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)the(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)in(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)to(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)is(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)as(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)for(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)be(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)are(\s|$)/gi,'')
        phrases = phrases.replace('  ', '')
        phrases = phrases.replace(/(^|\s)or(\s|$)/gi,'')
        phrases = phrases.replace(/(^|\s)a(\s|$)/gi,'')
        
        riPhrase = RiString(phrases);
        var words = riPhrase.words();
        // console.log(words);
       
        // count the words
        words.forEach(function(word) {
            if (word != '') {
                wordCount = dictionary.filter(function(element) {
                    return element.word == word
                })
                if (wordCount.length) 
                    wordCount[0].count++;
                else
                    dictionary.push({word: word, count: 1})
            }
        });
        // sort the words based on word count
        dictionary.sort( function(a,b) {
            return b.count - a.count;
        });
    });
    console.log(dictionary);
}

function display() {
    translate(textX,textY);
    // increase and move words based on frequency
    dictionary.forEach(function(element) {
        textSize(element.count);
        if (element.word == 'Man' || element.word == 'Woman' || element.word == 'man' || element.word == 'woman' || element.word == 'person') { 
            fill(255,255,255)
            text(element.word,0,0);
        } else {
            fill(255,255,255,80)
            text(element.word,0,0);
        }
        var txtWidth = textWidth(element.word); 
        translate(0,element.count);
    });
}

function display1() {
    translate(textX,textY);
    // increase and move words based on frequency
    dictionary.forEach(function(element) {
        textSize(element.count/10);
        if (element.word == 'Man' || element.word == 'Woman' || element.word == 'man' || element.word == 'woman' || element.word == 'person') { 
            fill(255,255,255)
            text(element.word,0,0);
        } else {
            fill(255,255,255,80)
            text(element.word,0,0);
        }
        var txtWidth = textWidth(element.word); 
        translate(0,element.count/10);
    });
}
