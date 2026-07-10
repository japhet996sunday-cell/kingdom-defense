export class Renderer {

    constructor(ctx, canvas) {

        this.ctx = ctx;
        this.canvas = canvas;

    }



    draw() {


        // 🌿 Grass

        this.ctx.fillStyle = "#4CAF50";

        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );





        // 🛣 Road

        this.ctx.fillStyle = "#B08968";


        this.ctx.fillRect(
            0,
            320,
            900,
            80
        );


        this.ctx.fillRect(
            820,
            320,
            80,
            300
        );







        // 🏰 Castle wall

        this.ctx.fillStyle = "#777";


        this.ctx.fillRect(
            1040,
            500,
            180,
            150
        );







        // 🏰 Left tower

        this.ctx.fillRect(
            1020,
            450,
            50,
            200
        );





        // 🏰 Right tower

        this.ctx.fillRect(
            1190,
            450,
            50,
            200
        );







        // Tower roofs

        this.ctx.fillStyle = "#444";


        this.ctx.beginPath();


        this.ctx.moveTo(
            1015,
            450
        );


        this.ctx.lineTo(
            1045,
            400
        );


        this.ctx.lineTo(
            1075,
            450
        );


        this.ctx.fill();





        this.ctx.beginPath();


        this.ctx.moveTo(
            1185,
            450
        );


        this.ctx.lineTo(
            1215,
            400
        );


        this.ctx.lineTo(
            1245,
            450
        );


        this.ctx.fill();







        // 🚪 Gate

        this.ctx.fillStyle = "#3E2723";


        this.ctx.fillRect(

            1110,

            570,

            40,

            80

        );







        // 🚩 Flag pole

        this.ctx.strokeStyle = "black";

        this.ctx.lineWidth = 3;


        this.ctx.beginPath();


        this.ctx.moveTo(
            1130,
            400
        );


        this.ctx.lineTo(
            1130,
            300
        );


        this.ctx.stroke();






        // Flag

        this.ctx.fillStyle = "red";


        this.ctx.beginPath();


        this.ctx.moveTo(
            1130,
            300
        );


        this.ctx.lineTo(
            1190,
            320
        );


        this.ctx.lineTo(
            1130,
            340
        );


        this.ctx.fill();



    }

  }
