export class Tower {


    constructor(x, y) {


        this.x = x;

        this.y = y;


        this.size = 40;



        // Attack settings

        this.range = 150;

        this.target = null;


        this.fireCooldown = 0;

        this.fireRate = 800;



        // 🏹 Animation

        this.attackAnimation = 0;

        this.isShooting = false;


    }





    update(enemies, deltaTime) {


        this.fireCooldown -= deltaTime;



        this.target = null;


        let closestDistance = this.range;




        for (const enemy of enemies) {



            if (enemy.finished) continue;



            const dx = enemy.x - this.x;

            const dy = enemy.y - this.y;



            const distance =
                Math.sqrt(
                    dx * dx + dy * dy
                );



            if (distance < closestDistance) {


                closestDistance = distance;

                this.target = enemy;


            }


        }




        // Animation cooldown

        if (this.attackAnimation > 0) {

            this.attackAnimation -= deltaTime;

        }

        else {

            this.isShooting = false;

        }



    }






    canShoot() {


        return this.target &&
               this.fireCooldown <= 0;


    }






    resetCooldown() {


        this.fireCooldown = this.fireRate;


        // 🏹 Trigger shooting animation

        this.attackAnimation = 150;

        this.isShooting = true;


    }








    draw(ctx) {



        // 🏰 Tower base

        ctx.fillStyle = "#8b5a2b";


        ctx.fillRect(

            this.x - 18,

            this.y - 10,

            36,

            40

        );





        // 🧱 Stone top

        ctx.fillStyle = "#777";


        ctx.fillRect(

            this.x - 22,

            this.y - 25,

            44,

            18

        );






        // 🏹 Archer body

        ctx.fillStyle = "#222";


        ctx.beginPath();


        ctx.arc(

            this.x,

            this.y - 35,

            8,

            0,

            Math.PI * 2

        );


        ctx.fill();







        // Aim direction

        let aimX = 10;

        let aimY = 0;



        if (this.target) {


            const dx =
                this.target.x - this.x;


            const dy =
                this.target.y - this.y;



            const angle =
                Math.atan2(dy, dx);



            aimX =
                Math.cos(angle) * 15;



            aimY =
                Math.sin(angle) * 15;


        }







        // 🏹 Bow animation


        ctx.strokeStyle = "brown";

        ctx.lineWidth = 3;



        ctx.beginPath();



        ctx.arc(

            this.x + aimX,

            this.y - 35 + aimY,

            this.isShooting ? 12 : 8,

            Math.PI / 2,

            Math.PI * 1.5

        );



        ctx.stroke();







        // ✨ Shooting flash


        if (this.isShooting) {


            ctx.fillStyle = "yellow";


            ctx.beginPath();


            ctx.arc(

                this.x + aimX,

                this.y - 35 + aimY,

                5,

                0,

                Math.PI * 2

            );


            ctx.fill();


        }







        // 🎯 Target line

        if (this.target) {


            ctx.strokeStyle = "yellow";

            ctx.lineWidth = 2;



            ctx.beginPath();



            ctx.moveTo(

                this.x,

                this.y

            );



            ctx.lineTo(

                this.target.x,

                this.target.y

            );



            ctx.stroke();


        }



    }


          }
