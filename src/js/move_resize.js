import {main} from "./main";
const BORDER_SIZE = 5;
// move functions

let m_pos;

export function startMoving(event) {
    main.selectedDiv(event);
    console.log('start moving');

    // check borders for resize
    // left
    if(event.offsetX < BORDER_SIZE || event.offsetX > (parseInt(getComputedStyle(main._selectedItem, '').width))){
        main._resize_width = true;
        m_pos = event.x;

        return;
    }

    // top
    if(event.offsetY < BORDER_SIZE || event.offsetY > (parseInt(getComputedStyle(main._selectedItem, '').height))){
        main._resize_height = true;
        m_pos = event.y;
        return;
    }


    main._moving = true;

    let posX = event.clientX,
        posY = event.clientY,
        divTop = main._selectedItem.style.top,
        divLeft = main._selectedItem.style.left;

    divTop = divTop.replace('px', '');
    divLeft = divLeft.replace('px', '');
    main._moveX = posX - divLeft,
        main._moveY = posY - divTop;
}

export function mouseMovingDiv(event) {
    if (main._moving) {
        console.log('moving');
        main._masterCon.style.cursor = 'move';

        let posX = event.clientX,
            posY = event.clientY,
            aX = posX - main._moveX,
            aY = posY - main._moveY,
            divWidth = parseInt(main._selectedItem.style.width),
            divHeight = parseInt(main._selectedItem.style.height),
            winWidth = window.innerWidth,
            winHeight = window.innerHeight-100;
        if (aX < 0) aX = 0;
        if (aY < 0) aY = 0;
        if (aX + divWidth > winWidth) aX = winWidth - (divWidth);
        if (aY + divHeight > winHeight) aY = winHeight - (divHeight);

        main.noteSetPosition(aX, aY);
        return;
    }

    if(main._resize_height){
        main._masterCon.style.cursor = 'h-resize';
        const dy = m_pos - event.y;
        m_pos = event.y;
        main._selectedItem.style.height = (parseInt(getComputedStyle(main._selectedItem, '').height) + dy) + 'px';
return;
    }


    if(main._resize_width){
        main._masterCon.style.cursor = 'w-resize';
        const dx = m_pos - event.x;
        m_pos = event.x;
        main._selectedItem.style.width = (parseInt(getComputedStyle(main._selectedItem, '').width) + dx) + 'px';
return;
    }

}

export function stopMoving() {
    console.log('stop moving');
    main._masterCon.style.cursor = 'default';
    main._moving = false;
    main._resize_width = false;
    main._resize_height = false;
    main.saveAll();
}


// resize
