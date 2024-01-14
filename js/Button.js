class Button {
    constructor (color, width, height, top, left, order){
        this.order = order;
        this.btn = document.createElement("button");
        this.btn.style.backgroundColor = color;
        this.btn.style.width = width;
        this.btn.style.height = height;
        this.btn.style.top = top;
        this.btn.style.left = left;
        this.btn.textContent = order;

        document.getElementById("button-container").appendChild(this.btn);

        // Button click event handler for toggle text visibility
        this.btn.addEventListener('click', () => {
            this.buttonTextToggle();
        });
    }

    moveRandom(){
        const containerWidth = document.getElementById("button-container").offsetWidth;
        const containerHeight = document.getElementById("button-container").offsetHeight;
        const minTop = 0;
        this.btn.style.position = "absolute";
        this.buttonClickToggle(true)
        
        this.setLocation(
            Math.max(minTop, Math.floor(Math.random() * (containerHeight - 50))),
            Math.floor(Math.random() * (containerWidth - 50))
        )
    }

    setLocation(top, left) {
        this.btn.style.top = top + "px";
        this.btn.style.left = left + "px";
    }

    buttonTextToggle() {
        if(this.btn.innerHTML.trim() != ""){
            this.btn.innerHTML = "";
        }else {
            this.btn.innerHTML = this.order;
        }
    }

    buttonClickToggle(isDisabled) { 
        this.btn.disabled = isDisabled;     
    }

    getOrder() {
        return this.order;
    }
} 
