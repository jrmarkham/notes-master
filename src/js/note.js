import {main} from "./main";

export class Note {


    constructor() {
        this._noteDiv = document.createElement('div');
        this._noteDiv.className = "note";
        this._noteText = document.createElement('textarea');
        this._noteText.className = 'textarea';
        this._noteText.addEventListener('input', this.noteUpdate);
        this._noteDiv.appendChild(this._noteText);

    }

    get note() {
        return this._noteDiv;
    };


    noteText(text) {
        this._noteText.value = text;
    }

    noteUpdate() {
        main.saveAll();
    }


}
