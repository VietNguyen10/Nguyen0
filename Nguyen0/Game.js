// import {WIN_MESSAGE, LOSE_MESSAGE, ALERT_MESSAGE} from '../lang/message/en/user.js';
window.umessage = user_message;

class Game 
{ 
    // Singleton pattern
    // Implementation reference: https://itnext.io/7-ways-to-create-singleton-in-javascript-db95a75fbb76
    static game = null;    
    constructor () {
        this.buttonList = [];
        this.result = [];
    }

    // Get the instance of the Game class
    static getInstance(){
        if(this.game === null){
            this.game = new Game();
        }

        return this.game;
    }

    
    //Make a list of button
    generateButtonList(n){
        if(n > 7 || n < 3){
            window.alert(umessage.ALERT_MESSAGE);
        } else {
            for(let i = 0; i < n; i++) {
                let randomColor = Math.floor(Math.random()*16777215).toString(16); // online reference: https://css-tricks.com/snippets/javascript/random-hex-color/
                this.buttonList[i] = new Button(("#" + randomColor), "10em", "5em", "auto", "auto", i+1);
            }
        }
    }

    //Handle set up of the game
    async setUp(){
        document.getElementById("button-container").innerHTML = "";
        let num = document.getElementById("ui").value

        this.generateButtonList(num);

        await this.sleep(1000*(num-2));

        // Implementation reference: chatGPT
        let intervalId = setInterval(() => {
            for (let j = 0; j < this.buttonList.length; j++) {
                this.buttonList[j].moveRandom();
            }
            num--;
    
            // If 'num' reaches 0, clear the interval
            if (num === 0) {
                clearInterval(intervalId);

                for(let i = 0; i < this.buttonList.length; i++) {
                    this.buttonList[i].buttonTextToggle();
                    this.buttonList[i].buttonClickToggle(false);
                }
            }
        }, 2000);
    }
        
    getOrderFromUser(button) {
        this.result.push(button.getOrder());
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkResult() {
        for(let i = 0; i < this.result.length; i++) {
            if(this.buttonList[i].getOrder() !== this.result[i]){
                return false;
            } 
        }
        return true;
    }

    resetGame() {
        this.buttonList.length = 0;
        this.result.length = 0;
    }

    startGame() {
        this.setUp();
        let currentGuess = 0; // Counter to keep track of the user's current guess

        // Add click handlers for each button
        // Implementation referece: chatGPT
        for (let i = 0; i < this.buttonList.length; i++) {
            this.buttonList[i].btn.addEventListener('click', () => {
                this.getOrderFromUser(this.buttonList[i]);

                // Check the result after each guess
                if (this.checkResult(currentGuess)) {
                    currentGuess++;

                    // If all guesses are correct, show success message
                    if (currentGuess === this.buttonList.length) {
                        window.alert(umessage.WIN_MESSAGE);
                        this.resetGame();
                    }
                } else {
                    // If the guess is incorrect, end the game
                    window.alert(umessage.LOSE_MESSAGE);
                    for(let j = 0; j < this.buttonList.length; j++) {
                        if(this.buttonList[i] !== this.buttonList[j]){
                            this.buttonList[j].buttonTextToggle();
                        }
                    }
                    this.resetGame();
                }
            });
        }
    }
}










