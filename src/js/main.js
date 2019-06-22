/* you can use imports if you like */
import {foo as bar} from "./foo.js";

export default () => {
    console.log(`the answer is ${bar}`);
}

// create structure

// container div //
// notes container div -- {notes created within }
// footer container for controls -- add subtract notes

const NOTE_WIDTH = 500;
const NOTE_HEIGHT = 150; // compensate for the header
const DEFAULT_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
import {Header} from "./header";

import {Note} from "./note"
import * as move from "./move_resize";
export class Main {


    constructor() {

        this._colors = ['red', 'blue', 'green', 'orange', 'yellow', 'violet', 'gray', 'brown'];
        const header = new Header(this._colors);

        this._masterCon = document.createElement('div');
        this._masterCon.setAttribute('id', 'master-container');

        this._notesCon = document.createElement('div');
        this._notesCon.setAttribute('id', 'notes-container');
        this._headerCon = document.createElement('div');
        this._headerCon.setAttribute('id', 'header-container');
        this._headerCon.appendChild(header.headerBar);
        this._masterCon.appendChild(this._notesCon);
        this._masterCon.appendChild(this._headerCon);
        document.querySelector('body').appendChild(this._masterCon);

        this._selectedItem = null;
        this._moving = false;
        this._resize_width = false;
        this._resize_height = false;
        document.addEventListener('mouseup', move.stopMoving, false);
        document.addEventListener('mousemove', move.mouseMovingDiv);

        this.getAllCookies();
    }
    /// add remove -- notes functions

    // ADD NOTE
    addNote() {
        // create a new note and added it to notesCon
        const newNote = new Note();
// randos
        let randColor = Math.floor(Math.random() * this._colors.length);
        let randX = 100 + Math.floor(Math.random() * (window.innerWidth - (NOTE_WIDTH + 100)));
        let randY = 100 + Math.floor(Math.random() * (window.innerHeight - (NOTE_HEIGHT + 100)));

        newNote.noteText(DEFAULT_TEXT);
        this._selectedItem = newNote.note;
        this._notesCon.appendChild(newNote.note);

        newNote.note.addEventListener('click', this.selectedDiv, false);
        newNote.note.addEventListener('mousedown', move.startMoving, false);

        this.setColor(this._colors[randColor]);
        this.noteSetPosition(randX, randY);

        this.saveAll();

    }

    // LOAD NOTE

    addNoteFromCookie(color, top, left, width, height, text) {
        const newNote = new Note();
        text = text.split('%20').join(' ');
        text = text.split('%2C').join(',');
        newNote.noteText(text);
        this._selectedItem = newNote.note;
        this._notesCon.appendChild(newNote.note);

        newNote.note.addEventListener('click', this.selectedDiv, false);
        newNote.note.addEventListener('mousedown', move.startMoving, false);


        this._selectedItem.style.left = left;
        this._selectedItem.style.top = top;
        this._selectedItem.style.width = width;
        this._selectedItem.style.height = height;
        this._selectedItem.style.position = "absolute";

        this._selectedItem.style.backgroundColor = color;
        let ta = this._selectedItem.getElementsByClassName('textarea')[0];
        ta.style.color = 'white';
        if (color === 'orange' || color === 'yellow'| color === 'violet') {
            ta.style.color = 'black';
        }
    }

    //SELECT A NOTE -- ALSO MAKE SENSE TO PUT IT ON TOP
    selectedDiv(event) {
        console.log(event.currentTarget);
        main._notesCon.appendChild(event.currentTarget);
        main._selectedItem = main._notesCon.lastChild;

    }

    // REMOVE A NOTE
    removeNote() {
        if (this._notesCon.childElementCount > 0) this._notesCon.removeChild(this._selectedItem);
        if (this._notesCon.childElementCount > 0) this._selectedItem = this._notesCon.lastChild;
        this.saveAll();
    }

    //SET COLOR
    setColor(color) {
        this._selectedItem.style.backgroundColor = color;
let ta = this._selectedItem.getElementsByClassName('textarea')[0];
        ta.style.color = 'white';
        if (color === 'orange' || color === 'yellow'| color === 'violet') {
            ta.style.color = 'black';
        }

        this.saveAll();
    }

    // SET POSITION
    noteSetPosition(x, y) {
        this._selectedItem.style.left = x + "px";
        this._selectedItem.style.top = y + "px";
        this._selectedItem.style.position = "absolute";
        this.saveAll();
    }



    // RESIZE FROM BORDERS



// cookies
    getAllCookies() {
        let ca = document.cookie;
        let array = ca.split(';');
        let notesTotal = '';
        // console.log('cookie array ', array);
        for (let i = 0; i < array.length; i++) {
            let name = array[i].split('=')[0];
            if (name.charAt(0) === ' ') {
                name = name.split(' ')[1];
            }
            if (name === 'notes') {
                notesTotal = Number(array[i].split('=')[1])
                break;
            }

        }

        if (notesTotal === '') return;

        for (let idx = 0; idx < notesTotal; idx++) {
            let baseName = 'note' + idx;

            for (let i = 0; i < array.length; i++) {
                let name = array[i].split('=')[0];
                let value = array[i].split('=')[1];
                if (name.charAt(0) === ' ') {
                    name = name.split(' ')[1];
                }

                if (name === baseName) {
                    // break up value ==
                    let va = value.split('%23');
                    this.addNoteFromCookie(va[0], va[1], va[2], va[3], va[4], va[5]);
                    continue;
                }

            }
        }
    }



    setCookie(name, value) {
        let now = new Date();
        now.setMonth(now.getDate() + 1);
        let cookieValue = escape(value) + ";";
        document.cookie = name + " = " + cookieValue;
        document.cookie = "expires = " + now.toUTCString() + ";"

        //console.log('value to cookie - ', value);

    }



    saveAll() {

        this.setCookie('notes', this._notesCon.childElementCount);
        if (this._notesCon.childElementCount > 0) {
            // this._notesCon.childNodes
            let array = [...this._notesCon.childNodes];
            array.forEach((item, idx) => {
                let baseName = 'note' + idx;
                let text = main._notesCon.childNodes[idx].getElementsByClassName('textarea')[0].value;
                let value = item.style.backgroundColor + '#' + item.style.top + '#' + item.style.left  + '#' + item.style.width + '#' + item.style.height + '#' + text;
                this.setCookie(baseName, value);


            });

        }
    }

}

export const main = new Main();
