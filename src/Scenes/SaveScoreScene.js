import Phaser from 'phaser';
import Button from '../Components/Button';
import config from '../Config/config';
import gameState from '../Config/gameState';
import Request from '../api/request'

export default class SaveScoreScene extends Phaser.Scene {
  constructor() {
    super('SaveScore');
  }

  init(data) {
    this.finalScore = data.score;
  }

  create() {
    // add text
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.1,
        'Game Over | Save Score',
        {
          fontSize: 48,
          color: '#00f',
        }
      )
      .setOrigin();
    this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.2,
        `Final score: ${gameState.score}`,
        { fontSize: 24 }
      )
      .setOrigin();

    // submit score
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="form-group d-flex">
          <input class="txt-name" type="text" name="name" placeholder="Enter your name" required minLength="3" maxLength="10" autofocus/>
          <button class="btn btn-info btn-save-score" type="submit">Submit</button>
        </div>
    `;
    this.add.dom(this.scale.width * 0.1, 10, form);

    document.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const user = document.querySelector('.txt-name').value.trim();
       const score = parseInt(gameState.score);

       console.log(user, score);
       const request = new Request();

       request.saveScore(user, score)
         .then((data) => console.log(data))
         .catch((err) => console.log(err));
    })

    // Try again
    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height / 2 + 100,
      'blueButton1',
      'blueButton2',
      'Try Again',
      'Game'
    );
  }
}
