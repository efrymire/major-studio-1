// p5 calls setup() exactly once when the canvas loads

function setup() {
    createCanvas(displayWidth, displayHeight);
    // loading the table saved in my library, "showData" is the callback -- thats why we are using JS -- can always add a callback function after the parameters
    loadTable('groceries.tsv','tsv','header',showData);

}

function showData(data) {
    var count = data.getRowCount(); 
    //this allows to get the row count, does not take on any parameters. called data becayse of the showData(data) directory listed above
    console.log(count);
    
    for (var i=0; i<count; i++) {
        var amount = data.getString(i,0);
        var unit = data.getString(i,1);
        var item = data.getString(i,2);
        var source = data.getString(i,3);
        
        if (source == 'store') {
            fill('blue');
        }
        else {
            fill('pink');
        }
        //in this case, fill is a tetx color
        
        text(amount + ' | ' + unit + ' | ' + item + ' | ' + source, width/2, 30*(i+1));
    }
    
}