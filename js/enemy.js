export class Enemy {

    constructor(type = "normal") {


        this.type = type;


        this.path = [
            { x: 0, y: 360 },
            { x: 860, y: 360 },
            { x: 860, y: 610 }
        ];


        this.currentPoint = 0;


        this.x = this.path[0].x;
        this.y = this.path[0].y;


        this.width = 40;
        this.height = 50;



        // Enemy types

        if (type === "fast") {

            this.speed = 200;
            this.maxHealth = 60;

        }

        else if (type === "tank") {

            this.speed = 80;
            this.maxHealth = 250;

        }

        else {

            this.speed = 120;
            this.maxHealth = 100;

        }



        this.health = this.maxHealth;

        this.finished = false;



        // ⚔️ Castle attack

        this.attacking = false;

        this.attackCooldown = 0;

        this.attackRate = 1000;

        this.damage = 10;



        // ⚔️ Sword animation

        this.attackAnimation = 0;

        this.isAttacking = false;



        // 🚶 Walking animation

        this.walkFrame = 0;

        this.walkTimer = 0;

        this.walkSpeed = 120;


    }





    takeDamage(amount) {


        this.health -= amount;


        if (this.health <= 0) {

            this.health = 0;

            this.finished = true;

        }


    }






    update(deltaTime) {



        // Walking animation

        this.walkTimer += deltaTime;


        if (this.walkTimer >= this.walkSpeed) {


            this.walkFrame++;


            if (this.walkFrame > 1) {

                this.walkFrame = 0;

            }


            this.walkTimer = 0;


        }






        // Sword animation timer

        if (this.attackAnimation > 0) {

            this.attackAnimation -= deltaTime;

        }

        else {

            this.isAttacking = false;

        }







        // Stop at castle

        if (this.currentPoint >= this.path.length - 1) {


            this.attacking = true;


            return;


        }





        const target =
            this.path[this.currentPoint + 1];



        const dx = target.x - this.x;

        const dy = target.y - this.y;



        const distance =
            Math.sqrt(
                dx * dx + dy * dy
            );





        if (distance < 2) {


            this.currentPoint++;

            return;


        }





        this.x +=
            (dx / distance) *
            this.speed *
            (deltaTime / 1000);



        this.y +=
            (dy / distance) *
            (deltaTime / 1000);



    }






    attackCastle(deltaTime) {


        this.attackCooldown -= deltaTime;


        if (this.attackCooldown <= 0) {


            this.attackCooldown =
                this.attackRate;


            // Start sword animation

            this.attackAnimation = 200;

            this.isAttacking = true;



            return this.damage;


        }



        return 0;


    }






    draw(ctx) {


        const centerX =
            this.x + this.width / 2;





        // Helmet

        ctx.fillStyle =
            this.type === "tank"
            ? "#222"
            : "#555";


        ctx.beginPath();


        ctx.arc(
            centerX,
            this.y + 10,
            12,
            Math.PI,
            Math.PI * 2
        );


        ctx.fill();







        // Face

        ctx.fillStyle = "#d69c6a";


        ctx.beginPath();


        ctx.arc(
            centerX,
            this.y + 15,
            8,
            0,
            Math.PI * 2
        );


        ctx.fill();







        // Body

        ctx.fillStyle =
            this.type === "tank"
            ? "#444"
            : "#777";


        ctx.fillRect(

            centerX - 10,

            this.y + 25,

            20,

            20

        );






        // ⚔️ Sword swing

        ctx.strokeStyle = "silver";

        ctx.lineWidth = 3;


        ctx.beginPath();



        if (this.isAttacking) {


            ctx.moveTo(
                centerX + 5,
                this.y + 30
            );


            ctx.lineTo(
                centerX + 35,
                this.y + 5
            );


        }

        else {


            ctx.moveTo(
                centerX + 12,
                this.y + 30
            );


            ctx.lineTo(
                centerX + 25,
                this.y + 15
            );


        }



        ctx.stroke();
        
        
        // 🚶 Legs animation

        ctx.strokeStyle = "black";

        ctx.lineWidth = 4;


        ctx.beginPath();


        if (this.walkFrame === 0) {


            ctx.moveTo(
                centerX - 5,
                this.y + 45
            );


            ctx.lineTo(
                centerX - 12,
                this.y + 55
            );


            ctx.moveTo(
                centerX + 5,
                this.y + 45
            );


            ctx.lineTo(
                centerX + 12,
                this.y + 55
            );


        }

        else {


            ctx.moveTo(
                centerX - 5,
                this.y + 45
            );


            ctx.lineTo(
                centerX - 2,
                this.y + 55
            );


            ctx.moveTo(
                centerX + 5,
                this.y + 45
            );


            ctx.lineTo(
                centerX + 2,
                this.y + 55
            );


        }


        ctx.stroke();







        // ❤️ Health bar

        ctx.fillStyle = "black";


        ctx.fillRect(

            this.x,

            this.y - 10,

            this.width,

            6

        );





        ctx.fillStyle =
            this.type === "tank"
            ? "orange"
            : "lime";



        ctx.fillRect(

            this.x,

            this.y - 10,

            this.width *
            (this.health / this.maxHealth),

            6

        );





        // ⚔️ Attack indicator

        if (this.attacking) {


            ctx.fillStyle = "red";


            ctx.font = "16px Arial";


            ctx.fillText(

                "⚔️",

                this.x + 15,

                this.y - 25

            );


        }



    }


          }
