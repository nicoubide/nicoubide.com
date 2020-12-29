const TypeWritter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWritter.prototype.type = function(){
    //Curent index of word
    const current = this.wordIndex % this.words.length;
    //Get full text of current word
    const fullTxt = this.words[current];
    //Check to see if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length -1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Intial type Spped
    let typeSpeed = 300;
    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //If word is complete
    if(!this.isDeleting && this.txt===fullTxt){
        //Make it pause at the end
        typeSpeed = this.wait;
        //Set isDeleting to True
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt ===''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Small pause before we start typing again
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), typeSpeed)
}

//Int on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init TypeWriter
    new TypeWritter(txtElement, words, wait);
}