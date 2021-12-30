class SquareBoard {
    grid =  [];
    dimention = 0;
    cell_width = 0;
    cell_height = 0;
    brush_color = "";
    html_board;
    constructor(dim, html_e, color){
        this.html_board = html_e;
        this.dimention = dim;
        this.brush_color = color;
        this.cell_width = this.html_board.clientWidth / this.dimention;
        this.cell_height = this.html_board.clientHeight / this.dimention;


        for(let row = 0; row < this.dimention; row++){
            let cells = [];
            for(let cell = 0; cell < this.dimention; cell++){
                // add the cell class
                const div_cell = document.createElement("div");
                div_cell.classList.add("cell");

                // add event listener to change background color
                div_cell.addEventListener("mouseenter", () => {
                    div_cell.style.backgroundColor = this.brush_color;
                });

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

                // add event listener to change background color
                div_cell.addEventListener("mouseenter", () => {
                    div_cell.style.backgroundColor = this.brush_color;
                });

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
};

//----------------- HTML elements --------------------------------
let grid = document.querySelector(".container > #grid");
let size_slider = document.querySelector("#ui > #grid-slider");
let color = document.querySelector("#ui > #color-picker");
let clear_button = document.querySelector("#ui > #clear-grid");
//-----------------------------------------------------------------

// Init the board;
let current_board = new SquareBoard(size_slider.value, grid, color.value);


//--------------- Event Listeners -------------------------------
size_slider.addEventListener("input", ()=>{ current_board.resize(size_slider.value, grid); });

color.addEventListener("change", ()=>{ current_board.brush_color = color.value; });

clear_button.addEventListener("click", ()=> current_board.paint("white"));


// Adjusts the grid when the screen changes size;
window.addEventListener("resize", ()=>{ current_board.resize(current_board.dimention, grid); });
//--------------------------------------------------------------