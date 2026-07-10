export class Projectile {


    constructor(x, y, target) {


        this.x = x;

        this.y = y;


        this.target = target;


        this.speed = 400;


        this.active = true;


        this.damage = 25;


        this.angle = 0;


        this.trail = [];

    }






    update(deltaTime) {



        if (!this.target || this.target.finished) {


            this.active = false;

            return;


        }





        const targetX =
            this.target.x +
            this.target.width / 2;



        const targetY =
            this.target.y +
            this.target.height / 2;





        const dx =
            targetX - this.x;



        const dy =
            targetY - this.y;




        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );



        // Arrow direction

        this.angle =
            Math.atan2(
                dy,
                dx
            );






        // Hit enemy

        if (distance < 10) {



            this.target.health -= this.damage;



            if (this.target.health <= 0) {


                this.target.health = 0;

                this.target.finished = true;


            }




            this.active = false;

            return;


        }





        // Trail position

        this.trail.push({

            x: this.x,

            y: this.y

        });



        if (this.trail.length > 5) {

            this.trail.shift();

        }







        // Move arrow

        this.x +=
            (dx / distance) *
            this.speed *
            (deltaTime / 1000);



        this.y +=
            (dy / distance) *
            this.speed *
            (deltaTime / 1000);



    }








    draw(ctx) {



        // ✨ Arrow trail

        ctx.fillStyle = "orange";


        for (const point of this.trail) {


            ctx.beginPath();


            ctx.arc(

                point.x,

                point.y,

                2,

                0,

                Math.PI * 2

            );


            ctx.fill();


        }






        // 🏹 Arrow rotation


        ctx.save();



        ctx.translate(
            this.x,
            this.y
        );



        ctx.rotate(
            this.angle
        );






        // Arrow head

        ctx.fillStyle = "yellow";


        ctx.beginPath();


        ctx.moveTo(
            10,
            0
        );


        ctx.lineTo(
            -5,
            -5
        );


        ctx.lineTo(
            -5,
            5
        );


        ctx.closePath();


        ctx.fill();






        // Arrow stick

        ctx.strokeStyle = "brown";

        ctx.lineWidth = 3;



        ctx.beginPath();


        ctx.moveTo(
            -5,
            0
        );


        ctx.lineTo(
            -18,
            0
        );


        ctx.stroke();





        ctx.restore();



    }


    }
