import {main} from "./main";
export class Header {

    constructor(colors) {

        this.colors = colors;



        this._headerBar = document.createElement('div');

        this._addButton = document.createElement('div');
        this._addButton.setAttribute('id', 'add-button');
        this._addButton.innerText = "+";
        this._addButton.addEventListener('click',this.addNote);


        this._removeButton = document.createElement('div');
        this._removeButton.setAttribute('id', 'remove-button');
         this._removeButton.innerText = "-";
        this._removeButton.addEventListener('click', this.removeNote);

        //
        this._title = document.createElement('div');
        this._title.setAttribute('id', 'title');
        this._title.innerText = "NOTES";

        this._headerBar.appendChild(this._addButton);
        this._headerBar.appendChild(this._removeButton);
        this._headerBar.appendChild(this._title);


        this.colors.forEach(item => {
            this.addColorButton = document.createElement('div');
            this.addColorButton.className = 'color-button';
            this.addColorButton.style.backgroundColor = item;
            this.addColorButton.setAttribute('id', item);
            this.addColorButton.addEventListener('click', this.changeColor);
            this._headerBar.appendChild(this.addColorButton);
        });

    }


    get headerBar() {
        return this._headerBar
    };



    addNote() {
        main.addNote();
    }


    removeNote() {
        main.removeNote();
    }

    changeColor(event){
        main.setColor(event.currentTarget.id)

    }


}


