export class Input {

    constructor(canvas) {

        this.mouse = {
            x: 0,
            y: 0
        };

        this.clicked = false;

        canvas.addEventListener("mousemove", (event) => {

            const rect = canvas.getBoundingClientRect();

            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            this.mouse.x = (event.clientX - rect.left) * scaleX;
            this.mouse.y = (event.clientY - rect.top) * scaleY;

        });

        canvas.addEventListener("click", () => {
            this.clicked = true;
        });

    }

    resetClick() {
        this.clicked = false;
    }

              }
