class calcController{
    constructor(){
        
        this._historic = document.querySelector('#historic');
        this._display = document.querySelector('#display');
        this._displayValue;
        this._historicArray = [];
        this._lastOperator;
        this._lastNumber;

        this.initialize();
    }

    initialize(){
        this._displayValue = '0';
        this._historic.innerHTML = '0';
        this._display.innerHTML = this._displayValue;
    }

    readButton(e){

        switch(e){
            case 'c':
                this.clear();
                break;
            case 'ce':
                this.cancelEntry();
                break;
            case 'del':
                this.delete();
                break;    
            case 'invertValue':
                this.invertValue();
                break;
            case 'addition':
                this.addOperator('+');
                break; 
            case 'subtraction':
                this.addOperator('-')
                break; 
            case 'multiplication':
                this.addOperator('*')
                break; 
            case 'division':
                this.addOperator('/')
                break;     
            case 'calculate':
                this.calc();
                break;
            case 'dot':
                this.addDot();
                break;
            case '0':
                this.addDisplay(e);
                break;
            case '1':
                this.addDisplay(e);
                break;
            case '2':
                this.addDisplay(e);
                break;
            case '3':
                this.addDisplay(e);
                break;
            case '4':
                this.addDisplay(e);
                break;
            case '5':
                this.addDisplay(e);
                break;
            case '6':
                this.addDisplay(e);
                break;
            case '7':
                this.addDisplay(e);
                break;
            case '8':
                this.addDisplay(e);
                break;
            case '9':
                this.addDisplay(e);
                break;
            default:
                break;
        }
    }

    addDot(){
        if(!this._displayValue.includes('.')){
            this._displayValue = this._displayValue+'.';
            this._display.innerHTML = this._displayValue;
        }
    }

    addDisplay(e){
        if(this._displayValue == '0'){
            this._displayValue = e;
            this._display.innerHTML = this._displayValue;
        }else{
            if(parseFloat(this._displayValue + e) <= 99999999){
                this._displayValue = this._displayValue + e;
                this._display.innerHTML = this._displayValue;
            }else{
                this.setError();
            } 
        }
        this._lastNumber = this._displayValue;
    }

    clear(){
        this._displayValue = '0';
        this._display.innerHTML = this._displayValue;
        this._historicArray = [];
        this._historic.innerHTML = '0';
        this._lastNumber = '';
        this._lastOperator = '';
    }
    
    cancelEntry(){
        this._displayValue = '0';
        this._display.innerHTML = this._displayValue;
    }

    setError(){
        
    }

    addOperator(e){
        try{
            if(this._displayValue != '0' && isNaN(this._historicArray[this._historicArray.length-1])){
                
                if(this._historicArray.length == 0){  
                    this._historicArray.push(eval(this._displayValue));
                    this._historicArray.push(e);
                    this._historic.innerHTML = this._historicArray.join(' ');
                    this._displayValue='0';
                    this._display.innerHTML = this._displayValue;
                }else if(this._historicArray.length >= 2){
                    this._historicArray.push(eval(this._displayValue));
                    this._displayValue = '0';
                    this._display.innerHTML = this._displayValue;
                    let historicString = this.limiterCharacter( eval(this._historicArray.join(' ')).toFixed(2) );
                    this._historicArray = [historicString,e];
                    this._historic.innerHTML = this._historicArray.join(' '); 
                }else{
                    this.setError();
                }
            }else{
                this._historicArray[this._historicArray.length-1] = e;
                this._historic.innerHTML = this._historicArray.join(' ');
            }
            this._lastOperator = e;
            this._lastNumber = '0';
        }catch{
            this.clear();
        }
    }

    calc(){
        try{
            if(this._historicArray.length>=2){
                    this._historicArray.push(this._lastNumber);
                    this._historic.innerHTML = this._historicArray.join(' ');
                    let result = this.limiterCharacter( parseInt(eval(this._historicArray.join(' ')).toFixed(2)*100)/100 );
                    this._historicArray = [result,this._lastOperator];
                    this._display.innerHTML = result;
                    this._displayValue = '0';
            }
        }catch{
            this.clear();
        }
    }
    limiterCharacter(e){
        if(e.toString().length <= 8){
            return e
        }else{
            this._displayValue = '0';
            this._display.innerHTML = 'ERROR';
            return 'Erro'
        }
    }

    invertValue(){
        this._displayValue = this._displayValue - (this._displayValue * 2);
        this._display.innerHTML = this._displayValue;
    }

    delete(){
        if(this._displayValue.length>1){
            
            let displayArray = this._displayValue.split('');
            displayArray.pop();
            this._displayValue = displayArray.join('');
            this._display.innerHTML = this._displayValue;

        }else{
            this._displayValue = '0';
            this._display.innerHTML = this._displayValue;
        }
    }
    
}