//initials
let visiblegrid = true;
let painting = false;
let pickedColor = document.querySelector(".colorPicker").value;
//Once loading the app
window.onload = () => {
    createPixels(slider.value);
};
//handling color picker styling
document.querySelector(".colorPicker").addEventListener("input", function() {
    pickedColor = this.value;
    this.style.background = pickedColor; 
});
//Making the grid
const slider = document.querySelector('.slider input');
const box = document.querySelector('.box');
function createPixels(num) {
    box.innerHTML = ''; 
    const boxWidth = box.offsetWidth; // Dynamically get the current box width
    const size = boxWidth / num; 
    box.style.gridTemplateColumns = `repeat(${num}, ${size}px)`;
    box.style.gridTemplateRows = `repeat(${num}, ${size}px)`;

    for (let i = 0; i < num * num; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        addPixelEventListeners(pixel)        
        if (visiblegrid) {
            pixel.style.border = '1px solid #bfbfbf';
        } else {
            pixel.style.border = 'none';
        }
        box.appendChild(pixel);
    }
}

slider.addEventListener('input', (e) => {
    createPixels(e.target.value);
});
// Remove and show grid button functionality
let gridButton = document.querySelector('.removegrid');
gridButton.addEventListener('click', () => {
    if (gridButton.classList.contains('removegrid')) {
        gridButton.classList.remove('removegrid');
        gridButton.classList.add('showgrid');
        gridButton.innerHTML = 'Show Grid';
        visiblegrid = false;
        document.querySelectorAll('.pixel').forEach(pixel => {
            pixel.style.border = 'none'; 
        });
    } else {
        gridButton.classList.remove('showgrid');
        gridButton.classList.add('removegrid');
        gridButton.innerHTML = 'Remove Grid';
        visiblegrid = true;
        document.querySelectorAll('.pixel').forEach(pixel => {
            pixel.style.border = '1px solid #bfbfbf';
        });
    }
});
//Events
let events = {
    mouse:{
        press: "mousedown",
        pressing: "mousemove",
        remove: "mouseup"
    },
    touch:{
        press: "touchstart",
        pressing: "touchmove",
        remove: "touchend"
    }
}
//color a pixel function
function colorpixel(pixel){
    pixel.style.backgroundColor = pickedColor;
}
// clicking or touch event 
function addPixelEventListeners(pixel) {
    // Mouse events
    pixel.addEventListener(events.mouse.press, () => {
        painting = true;
        colorpixel(pixel);
    });
    pixel.addEventListener(events.mouse.pressing, (e) => {
        if (painting) {
            colorpixel(pixel);
        }
    });
    pixel.addEventListener(events.mouse.remove, () => {
        painting = false;
    });

    // Touch events
    pixel.addEventListener(events.touch.press, (e) => {
        e.preventDefault(); // Prevent scrolling
        painting = true;
        colorpixel(pixel);
    });
    pixel.addEventListener(events.touch.pressing, (e) => {
        e.preventDefault(); // Prevent scrolling
        if (painting) {
            // Get the touch coordinates
            let touch = e.touches[0];
            let target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && target.classList.contains('pixel')) {
                colorpixel(target); // Color the pixel at the touch location
            }
        }
    });
    pixel.addEventListener(events.touch.remove, () => {
        painting = false;
    });
}

//clearall
document.querySelector('.clear').addEventListener('click' , () => {
    createPixels(slider.value);
})
// Save
function convertDivToImage() {
    html2canvas(document.querySelector('.box')).then(function(canvas) {
        let imgData = canvas.toDataURL('image/jpg');
        let link = document.createElement('a');
        link.download = 'My Amazing Pixel Art.jpg';
        link.href = imgData;
        link.click();
    });
}
document.querySelector('.save').addEventListener('click', function() {
    convertDivToImage();
    })
