
class Game {
    constructor(parentElement, size=4){
        this.size=size;
        let gameFieldElement =createAndAppend({
            className: 'game',
            parentElement
        });

        this.headerElement =createAndAppend({
            className: 'header',
            parentElement : gameFieldElement
        });
        this.score=0;



        let fieldElement =createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        this.field=[]

        for (let i=0; i<size; i++){
            this.field[i]=[];
            for (let j = 0; j < size; j++) {
               this.field[i][j]= new Cell(fieldElement, this);
             
            }
        }

       window.onkeyup = function(e){
            switch (e.keyCode){
                case 38:
                    this.moveUp(); 
                    break;
                case 40:
                    this.moveDown();
                    break;
                case 37:
                    this.moveLeft();
                    break;
                case 39:
                    this.moveRight(); 
                    break;
            } 
        }.bind(this);



        // console.log(this.field);
    }
    set score(value){
        this._score=value;
        this.headerElement.innerHTML='Score: ' + value;
    }
    get score(){
        return this._score;
    }

    addScore(value){
        this.score+=value
    }



    spawnUnit(){
        let emptyCells=[]
        for (let i=0; i<this.field.length;i++){
            for(let j=0; j<this.field[i].length; j++){
                if (!this.field[i][j].value){
                    emptyCells.push(this.field[i][j]);
                }
            }
        }
        if (emptyCells.length){
           emptyCells[getRandomInt(0,emptyCells.length-1)].spawn(); 
        } else {
            alert('lose')
        }
         

    }



    moveRight(){
        let hasMoved=false;
        for (let i=0; i<this.field.length; i++){
            for(let j=this.field[i].length-2; j>=0; j--){
                let currentCell=this.field[i][j];
                if (currentCell.isEmpty){
                    continue;
                }
                let nextCellKey=j+1;
                
                while( nextCellKey<this.size){
                    let nextCell=this.field[i][nextCellKey];
                    if(!nextCell.isEmpty|| this.isLastKey(nextCellKey)){
                        if ((nextCell.isEmpty && this.isLastKey(nextCellKey))
                        || nextCell.isSameTo(currentCell)){
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved=true;
                        }else if(!nextCell.isEmpty && nextCellKey-1!=j){
                            this.field[i][nextCellKey-1].merge(currentCell);
                        hasMoved=true;
                        }
                        
                        break;
                    }
                    nextCellKey++;
                    nextCell=this.field[i][nextCellKey];
                }

            }

            }
            if (hasMoved){
                this.spawnUnit();
            }

        }
        
    moveLeft(){
        let hasMoved=false;
        for (let i=0; i<this.field.length; i++){
            for(let j=1; j<this.size; j++){
                let currentCell=this.field[i][j];
                if (currentCell.isEmpty){
                    continue;
                }
                let nextCellKey=j-1;
                
                while( nextCellKey<this.size){
                    let nextCell=this.field[i][nextCellKey];
                    if(!nextCell.isEmpty|| this.isFerstKey(nextCellKey)){
                        if ((nextCell.isEmpty && this.isFerstKey(nextCellKey))
                        || nextCell.isSameTo(currentCell)){
                            this.field[i][nextCellKey].merge(currentCell);
                            hasMoved=true;
                        }else if(!nextCell.isEmpty && nextCellKey+1!=j){
                            this.field[i][nextCellKey+1].merge(currentCell);
                        hasMoved=true;
                        }
                        
                        break;
                    }
                    nextCellKey--;
                    nextCell=this.field[i][nextCellKey];
                }

            }

            }
            if (hasMoved){
                this.spawnUnit();
            }

        }

        isLastKey(key){
            return key == (this.size-1);
        }
        isFerstKey(key){
            return key == 0;
        }

        moveDown(){
            let hasMoved=false;
            for(let j=0; j<this.size; j++){
                 for (let i=this.size-2; i>=0; i--){
                
                    let currentCell=this.field[i][j];
                    if (currentCell.isEmpty){
                        continue;
                    }
                    let nextCellKey=i+1;
                    
                    while( nextCellKey<this.size){
                        let nextCell=this.field[nextCellKey][j];
                        if(!nextCell.isEmpty|| this.isLastKey(nextCellKey)){
                            if ((nextCell.isEmpty && this.isLastKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)){
                                this.field[nextCellKey][j].merge(currentCell);
                                hasMoved=true;
                            }else if(!nextCell.isEmpty && nextCellKey-1!=i){
                                this.field[nextCellKey-1][j].merge(currentCell);
                            hasMoved=true;
                            }
                            
                            break;
                        }
                        nextCellKey++;
                        nextCell=this.field[nextCellKey][j];
                    }
    
                }
    
                }
                if (hasMoved){
                    this.spawnUnit();
                }
    
            }

            
        moveUp(){
            let hasMoved=false;
            for(let j=0; j<this.size; j++){
                 for (let i=1; i<this.size; i++){
                
                    let currentCell=this.field[i][j];
                    if (currentCell.isEmpty){
                        continue;
                    }
                    let nextCellKey=i-1;
                    
                    while( nextCellKey<this.size){
                        let nextCell=this.field[nextCellKey][j];
                        if(!nextCell.isEmpty|| this.isFerstKey(nextCellKey)){
                            if ((nextCell.isEmpty && this.isFerstKey(nextCellKey))
                            || nextCell.isSameTo(currentCell)){
                                this.field[nextCellKey][j].merge(currentCell);
                                hasMoved=true;
                            }else if(!nextCell.isEmpty && nextCellKey+1!=i){
                                this.field[nextCellKey+1][j].merge(currentCell);
                            hasMoved=true;
                            }
                            
                            break;
                        }
                        nextCellKey--;
                        nextCell=this.field[nextCellKey][j];
                    }
    
                }
    
                }
                if (hasMoved){
                    this.spawnUnit();
                }
    
            }
}
