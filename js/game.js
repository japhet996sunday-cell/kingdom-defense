import { Renderer } from "./renderer.js";
import { Input } from "./input.js";
import { Enemy } from "./enemy.js";
import { Tower } from "./tower.js";
import { Projectile } from "./projectile.js";


export class Game {


    constructor() {


        this.canvas =
            document.getElementById("gameCanvas");


        this.ctx =
            this.canvas.getContext("2d");



        this.renderer =
            new Renderer(
                this.ctx,
                this.canvas
            );



        this.input =
            new Input(
                this.canvas
            );





        // 🏰 Castle

        this.lives = 100;

        this.gold = 300;

        this.wave = 1;

        this.gameOver = false;






        // Enemies

        this.enemies = [];





        // Towers

        this.towers = [];





        // Projectiles

        this.projectiles = [];






        // Enemy spawning

        this.spawnTimer = 0;

        this.spawnInterval = 2000;






        // Timing

        this.lastTime = 0;






        // HUD

        this.livesElement =
            document.getElementById("lives");


        this.moneyElement =
            document.getElementById("money");


        this.waveElement =
            document.getElementById("wave");



    }







    start() {


        requestAnimationFrame(
            this.gameLoop.bind(this)
        );


    }








    gameLoop(timestamp) {



        const deltaTime =
            timestamp - this.lastTime;



        this.lastTime = timestamp;





        if (!this.gameOver) {


            this.update(deltaTime);


        }




        this.render();




        requestAnimationFrame(
            this.gameLoop.bind(this)
        );



    }







    update(deltaTime) {




        // 🏹 Place tower


        if (this.input.clicked) {



            this.towers.push(


                new Tower(

                    this.input.mouse.x,

                    this.input.mouse.y

                )


            );



            this.input.resetClick();



        }







        // 🌊 Spawn enemies


        this.spawnTimer += deltaTime;




        if (
            this.spawnTimer >=
            this.spawnInterval
        ) {



            this.enemies.push(

                new Enemy()

            );



            this.spawnTimer = 0;



        }








        // Update enemies

        for (const enemy of this.enemies) {



            enemy.update(deltaTime);





            // ⚔️ Enemy attacks castle


            if (enemy.attacking) {



                const damage =
                    enemy.attackCastle(deltaTime);



                if (damage > 0) {



                    this.lives -= damage;



                    if (
                        this.lives <= 0
                    ) {



                        this.lives = 0;

                        this.gameOver = true;



                    }



                }


            }



        }






        // Update towers

        for (const tower of this.towers) {



            tower.update(

                this.enemies,

                deltaTime

            );




            if (
                tower.canShoot()
            ) {



                this.projectiles.push(


                    new Projectile(

                        tower.x,

                        tower.y,

                        tower.target

                    )


                );



                tower.resetCooldown();



            }



        }
        
        
        // Update projectiles

        for (const projectile of this.projectiles) {

            projectile.update(deltaTime);

        }





        // Remove inactive projectiles

        this.projectiles =
            this.projectiles.filter(
                projectile => projectile.active
            );






        // Remove defeated enemies only

        this.enemies =
            this.enemies.filter(enemy => {

                if (
                    enemy.finished &&
                    enemy.health <= 0
                ) {

                    // Reward player

                    this.gold += 20;

                    return false;

                }

                return true;

            });





        // Update HUD

        if (this.livesElement) {
            this.livesElement.textContent = this.lives;
        }

        if (this.moneyElement) {
            this.moneyElement.textContent = this.gold;
        }

        if (this.waveElement) {
            this.waveElement.textContent = this.wave;
        }

    }






    render() {

        this.renderer.draw();





        // Draw towers

        for (const tower of this.towers) {

            tower.draw(this.ctx);

        }





        // Draw enemies

        for (const enemy of this.enemies) {

            enemy.draw(this.ctx);

        }





        // Draw projectiles

        for (const projectile of this.projectiles) {

            projectile.draw(this.ctx);

        }





        // Mouse cursor

        this.ctx.fillStyle = "yellow";

        this.ctx.beginPath();

        this.ctx.arc(
            this.input.mouse.x,
            this.input.mouse.y,
            6,
            0,
            Math.PI * 2
        );

        this.ctx.fill();





        // Title

        this.ctx.fillStyle = "white";
        this.ctx.font = "48px Arial";
        this.ctx.textAlign = "center";

        this.ctx.fillText(
            "Kingdom Defense V2",
            this.canvas.width / 2,
            80
        );





        // Stats

        this.ctx.font = "24px Arial";

        this.ctx.fillText(
            "Enemies: " + this.enemies.length,
            this.canvas.width / 2,
            120
        );

        this.ctx.fillText(
            "Castle ❤️: " + this.lives,
            this.canvas.width / 2,
            160
        );

        this.ctx.fillText(
            "Gold: " + this.gold,
            this.canvas.width / 2,
            200
        );

        this.ctx.fillText(
            "Wave: " + this.wave,
            this.canvas.width / 2,
            240
        );





        // Game Over

        if (this.gameOver) {

            this.ctx.fillStyle = "rgba(0,0,0,0.6)";
            this.ctx.fillRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            this.ctx.fillStyle = "red";
            this.ctx.font = "72px Arial";

            this.ctx.fillText(
                "CASTLE DESTROYED",
                this.canvas.width / 2,
                this.canvas.height / 2
            );

            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "white";

            this.ctx.fillText(
                "Refresh the page to play again",
                this.canvas.width / 2,
                this.canvas.height / 2 + 60
            );

        }

    }

          }
