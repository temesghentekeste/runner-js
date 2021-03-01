import 'phaser';
import gameState from '../Config/gameState';
import background from '../utils/background';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.background = background[0];
    this.selfScale = 1;
    this.seconds = 80000;
    this.addedPlatforms = 0;
    this.speedIncrease = 400;
  }

  preload() {
    this.load.image('player', 'src/assets/player/codey.png');
    this.load.image('platform', 'src/assets/platform/platform.jpeg');
  }

  create() {
    this.model = this.sys.game.globals.model;

    //background
    this.background.forEach((back) => {
      this[back] = this.add.tileSprite(0, 0, 0, 0, back).setScale(1);
      this[back].setOrigin(0, 0);
      this[back].setScrollFactor(0);
    });

    // coin
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });

    this.coinGroup = this.add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    // score
    this.count = 0;
    gameState.score = 0;

    this.timeText = this.add.text(550, 16, 'Good Luck!', {
      fontSize: '32px',
      fill: '#000',
    });

    this.scoreText = this.add.text(10, 10, `Score: ${gameState.score}`, {
      fontSize: '2rem',
      fill: '#000000',
    });

    // Timer Interval
    this.timerInterval = setInterval(() => {
      const time = this.setTime(this.seconds);
      this.timeText.text = time;
      this.count += 1000;
      if (this.count !== 0 && this.count % 2 === 0) {
        gameState.score += 5;
        this.scoreText.text = `Score: ${gameState.score}`;
      }

      this.seconds -= 1000;
    }, 1000);

    // group with all active platforms.
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback: function (platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    // pool
    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback: function (platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    // number of consecutive jumps made by the player
    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(game.config.width, game.config.width / 2);

    // adding the player;
    this.player = this.physics.add.sprite(
      gameState.playerStartPosition,
      game.config.height / 2,
      'player'
    );
    this.player.setGravityY(gameState.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);

    // overlap between player and coin
    this.physics.add.overlap(this.player, this.coinGroup, (player, coin) => {
      gameState.score += 20;
      this.scoreText.text = `score: ${gameState.score}`;
      if (this.model.soundOn === true) this.sound.play('collectCoin');
      coin.disableBody(true, true);
    });
  }

  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX) {
    let platform;
    this.addedPlatforms += 1;
    let posY = 800 * gameState.platformVerticalLimit[1];
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(
        posX,
        game.config.height * 0.8,
        'platform'
      );
      platform.setImmovable(true);
      platform.setVelocityX(gameState.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      gameState.spawnRange[0],
      gameState.spawnRange[1]
    );

    // coin collection
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameState.coinPercent) {
        if (this.coinPool.getLength()) {
          console.log('Running', this.coinPool.getLength());
          const coin = this.coinPool.getFirst();
          coin.x =
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinGroup.children.entries.forEach((plat) =>
            plat.body.setVelocityX(this.speedIncrease * -1)
          );
          this.coinPool.children.entries.forEach((plat) =>
            plat.body.setVelocityX(this.speedIncrease * -1)
          );
          coin.setVelocityX(this.speedIncrease * -1);

          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(
            posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth),
            posY - 96,
            'coin'
          );
          coin.setImmovable(true);
          coin.setVelocityX(this.speedIncrease * -1);
          this.coinGroup.children.entries.forEach((plat) =>
            plat.body.setVelocityX(this.speedIncrease * -1)
          );
          this.coinPool.children.entries.forEach((plat) =>
            plat.body.setVelocityX(this.speedIncrease * -1)
          );
          coin.anims.play('rotate');

          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (
      this.player.body.touching.down ||
      (this.playerJumps > 0 && this.playerJumps < gameState.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameState.jumpForce * -1);
      this.playerJumps++;
    }
  }

  update() {
    // parallax effect
    this.parallax = 0;
    this.background.forEach((back) => {
      this.parallax -= 0.22;
      this[back].tilePositionX -= this.parallax;
    });

    // game over
    if (this.player.y > game.config.height) {
      this.scene.start('GameOver', { previousScene: this.scene });
      clearInterval(this.timerInterval);
    }
    this.player.x = gameState.playerStartPosition;

    // recycling platforms
    let minDistance = game.config.width;
    this.platformGroup.getChildren().forEach(function (platform) {
      let platformDistance =
        game.config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      var nextPlatformWidth = Phaser.Math.Between(
        gameState.platformSizeRange[0],
        gameState.platformSizeRange[1]
      );
      this.addPlatform(
        nextPlatformWidth,
        game.config.width + nextPlatformWidth / 2
      );
    }

    // coin
    this.coinGroup.getChildren().forEach((coin) => {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);
  }

  setTime(mseconds) {
    this.newSeconds = mseconds / 1000;
    const minutes = Math.floor(this.newSeconds / 60);
    const time = `${minutes} : ${this.newSeconds % 60}`;
    return time;
  }
}
