class SquareBoard {
    dimention = 0;
    grid =  [];
    cell_width = 0;
    cell_height = 0;
    background_color = "#FFFFFF";
    html_board;
    color = document.querySelector("#ui > #color-picker");
    //default shader. Just paints the cell with the color selected.
    default_shader = function(cell){ cell.style.backgroundColor = this.color.value; }

    shader = this.default_shader;

    constructor(dim, html_e){
        this.html_board = html_e;
        this.dimention = dim;
        this.cell_width = this.html_board.clientWidth / this.dimention;
        this.cell_height = this.html_board.clientHeight / this.dimention;

        for(let row = 0; row < this.dimention; row++){
            let cells = [];
            for(let cell = 0; cell < this.dimention; cell++){
                // creating the cell
                const div_cell = document.createElement("div");
                div_cell.style.backgroundColor = this.background_color;

                // add event listener to change background color
                div_cell.addEventListener("mouseenter", ()=>{ this.shader(div_cell); });

                // set cell width and height;
                div_cell.style.width = `${this.cell_width}px`;
                div_cell.style.height = `${this.cell_height}px`;

                // add to the board and display.
                cells.push(div_cell);
                this.html_board.appendChild(div_cell);
            }

            this.grid.push(cells);
        }
    }

    resize(dim){
        this.grid = [];
        this.dimention = dim;
        this.cell_width = this.html_board.clientWidth / this.dimention;
        this.cell_height = this.html_board.clientHeight / this.dimention;
        this.html_board.innerHTML = "";

        for(let row = 0; row < this.dimention; row++){
            let cells = [];
            for(let cell = 0; cell < this.dimention; cell++){
                // add the cell class
                const div_cell = document.createElement("div");
                div_cell.classList.add("cell");
                div_cell.style.backgroundColor = this.background_color;

                // add event listener to change background color
                div_cell.addEventListener("mouseenter", ()=>{ this.shader(div_cell); });

                // set cell width and height;
                div_cell.style.width = `${this.cell_width}px`;
                div_cell.style.height = `${this.cell_height}px`;

                // add to the board and display.
                cells.push(div_cell);
                this.html_board.appendChild(div_cell);
            }

            this.grid.push(cells);
        }
    }

    paint(color){
        this.grid.forEach(row => {
            row.forEach(cell => { cell.style.backgroundColor = color; });
        });
    }

    setShader(shader){
        this.shader = shader;
    }
};

//----------------- HTML elements --------------------------------
let grid = document.querySelector(".container > #grid");
let size_slider = document.querySelector("#ui > #grid-slider");
let clear_button = document.querySelector("#ui > #clear-grid");
let random_color_button = document.querySelector("#ui > #random-color");
let gradient_color_button = document.querySelector("#ui > #gradient-color");
let resolution = document.querySelector("label[for=grid-slider]");
//-----------------------------------------------------------------

// Init the board;
let current_board = new SquareBoard(size_slider.value, grid);
resolution.textContent = resolution.textContent.substring(0,resolution.textContent.indexOf(":")) + `: ${size_slider.value}X${size_slider.value}`;

//--------------- Shaders --------------------------------------

function random_color(cell){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function gradient_color(cell){
    let hex = current_board.color.value;
    let color = cell.style.backgroundColor === "rgb(255, 255, 255)" ? `rgb(${parseInt(hex.slice(1,3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5), 16)})`: cell.style.backgroundColor;
    let r = parseInt(color.split(",")[0].slice(4));
    let g = parseInt(color.split(",")[1]);
    let b = parseInt(color.split(",")[2].slice(0,-1));

    cell.style.backgroundColor = `rgb(${r - 25}, ${g - 25}, ${b - 25})`;
}
//---------------------------------------------------------------


//--------------- Event Listeners -------------------------------
size_slider.addEventListener("input", ()=>{ 
    current_board.resize(size_slider.value, grid);
    resolution.textContent = resolution.textContent.substring(0,resolution.textContent.indexOf(":")) + `: ${size_slider.value}X${size_slider.value}`;
});
clear_button.addEventListener("click", ()=> current_board.paint(current_board.background_color));

random_color_button.addEventListener("click", ()=> {
    if(random_color_button.value === "Activate"){
        current_board.setShader(random_color);
        random_color_button.value = "Stop";
    } else {
        current_board.setShader(current_board.default_shader);
        random_color_button.value = "Activate";
    }
});

gradient_color_button.addEventListener("click", ()=> {
    if(gradient_color_button.value === "Activate"){
        current_board.setShader(gradient_color);
        gradient_color_button.value = "Stop";
    } else {
        current_board.setShader(current_board.default_shader);
        gradient_color_button.value = "Activate";
    }
});

// Adjusts the grid when the screen changes size;
window.addEventListener("resize", ()=>{ current_board.resize(current_board.dimention, grid); });
//--------------------------------------------------------------