const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [StartScene, LevelScene, GameScene]
};

const game = new Phaser.Game(config);

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('startButton', 'path/to/startButton.png'); // Reemplaza con la ruta a tu imagen de botón de inicio
    }

    create() {
        this.add.text(400, 200, 'Domimath', { font: '40px Arial', fill: '#000' }).setOrigin(0.5);
        const startButton = this.add.image(400, 400, 'startButton').setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('LevelScene');
        });
    }
}

class LevelScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelScene' });
    }

    create() {
        this.add.text(400, 100, 'Select Level', { font: '40px Arial', fill: '#000' }).setOrigin(0.5);

        const easyButton = this.add.text(400, 250, 'Easy', { font: '30px Arial', fill: '#0f0' }).setOrigin(0.5).setInteractive();
        const hardButton = this.add.text(400, 350, 'Hard', { font: '30px Arial', fill: '#f00' }).setOrigin(0.5).setInteractive();

        easyButton.on('pointerdown', () => {
            this.scene.start('GameScene', { level: 'easy' });
        });

        hardButton.on('pointerdown', () => {
            this.scene.start('GameScene', { level: 'hard' });
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.level = data.level;
    }

    preload() {
        this.load.image('domino', 'path/to/domino.png'); // Reemplaza con la ruta a tu imagen de dominó
    }

    create() {
        this.add.text(400, 50, `Level: ${this.level}`, { font: '30px Arial', fill: '#000' }).setOrigin(0.5);

        const domino = this.add.image(400, 300, 'domino');
        domino.setInteractive();
        this.input.setDraggable(domino);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.operationText = this.add.text(10, 10, 'Operation: 5 + 3', { font: '20px Arial', fill: '#000' });
        this.resultText = this.add.text(10, 40, 'Result: ', { font: '20px Arial', fill: '#000' });

        this.input.on('dragend', (pointer, gameObject) => {
            const result = 8; // Example expected result
            const userResult = 8; // Placeholder result logic
            if (userResult === result) {
                this.resultText.setText('Result: Correct!');
            } else {
                this.resultText.setText('Result: Try Again');
            }
        });
    }
}
