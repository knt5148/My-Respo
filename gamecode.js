// 2048 Game built with VueJS

new Vue({
    el: '#vue-app',
    data: 
    {
        grid: document.getElementById("grid"),
        score: 0,
        scoreList: document.getElementById("score-list"),
        scoreForm: document.getElementById("score-submit")
    },
    methods: 
    {
        generateGrid: function()    // create the  main grid
        {
            grid.innerHTML = "";
            for (let i=0; i<4; i++)
            {
                row = grid.insertRow(i);
                for (let j=0; j<4; j++)
                {
                    cell = row.insertCell(j);
                    var hasNum = document.createAttribute("hasNum");
                    hasNum.value = "false";
                    cell.setAttributeNode(hasNum);
                    cell.innerHTML = 0;
                }
            }
            grid.style.visibility = "visible";
            this.score = 0;
            this.animate();
            this.spawnCell();
            this.spawnCell();
            document.getElementById("score-list").innerHTML = 
                `
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                `;
        },

        spawnCell: function()       // spawn cell at random location 
        {
            let r = Math.floor(Math.random() * 4);
            let c = Math.floor(Math.random() * 4);
            let cell = grid.rows[r].cells[c];

            if (cell.innerHTML == 0)
            {
                cell.innerHTML = 2;
                cell.setAttribute("hasNum", "true");
                cell.className = "Two";
            }
            else { this.spawnCell(); }
        },

        moveCellsRight: function()   // push all the cells to the right
        {
            for (let i=0; i<4; i++)
            {
                let r = [];
                let k = 0;
                for (let j=0; j<4; j++)
                {
                    let getR = grid.rows[i].cells[j].innerHTML;
                    r.push(parseInt(getR))
                }

                // extract all the numbers != 0
                let getNumInRow = r.filter(n => n);
                let noNum = 4 - getNumInRow.length;
                let zeros = Array(noNum).fill(0);

                // append zeros to the left of all 
                // the numbers to get the effect of shifting the numbers to the right
                let newRow = zeros.concat(getNumInRow);
                
                grid.rows[i].cells[k].innerHTML = newRow[0];
                grid.rows[i].cells[k+1].innerHTML = newRow[1];
                grid.rows[i].cells[k+2].innerHTML = newRow[2];
                grid.rows[i].cells[k+3].innerHTML = newRow[3];
            }

            this.animate();

        },

        moveCellsLeft: function()    // push all the cells to the left
        {
            for (let i=0; i<4; i++)
            {
                let r = [];     // store each row of grid
                let k = 0;
                for (let j=0; j<4; j++)
                {
                    let getR = grid.rows[i].cells[j].innerHTML;
                    r.push(parseInt(getR));
                }

                // extract all the numbers != 0
                let getNumInRow = r.filter(n => n);     
                let noNum = 4 - getNumInRow.length;     
                let zeros = Array(noNum).fill(0);

                // append zeros to the right of all 
                // the numbers to get the effect of shifting the numbers to the left
                let newRow = getNumInRow.concat(zeros); 

                grid.rows[i].cells[k].innerHTML = newRow[0];
                grid.rows[i].cells[k+1].innerHTML = newRow[1];
                grid.rows[i].cells[k+2].innerHTML = newRow[2];
                grid.rows[i].cells[k+3].innerHTML = newRow[3];
            }

            this.animate();
        },

        moveCellsDown: function()   // push all the cells down
        {
            for (let i=0; i<4; i++)
            {
                let c = [];     // store each column of grid
                let k = 0;
                for (let j=0; j<4; j++)
                {
                    let getC = grid.rows[j].cells[i].innerHTML;
                    c.push(parseInt(getC));
                }

                // extract all the numbers != 0
                let getNumInCol = c.filter(n => n);
                let noNum = 4 - getNumInCol.length;
                let zeros = Array(noNum).fill(0);

                // append zeros to the top of all 
                // the numbers to get the effect of shifting the numbers to the bottom
                let newCol = zeros.concat(getNumInCol);
                
                grid.rows[k].cells[i].innerHTML = newCol[0];
                grid.rows[k+1].cells[i].innerHTML = newCol[1];
                grid.rows[k+2].cells[i].innerHTML = newCol[2];
                grid.rows[k+3].cells[i].innerHTML = newCol[3];
            }

            this.animate();
        },

        moveCellsUp: function()     // push all the cells up
        {
            for (let i=0; i<4; i++)
            {
                let c = [];     // store each column of grid
                let k = 0;
                for (let j=0; j<4; j++)
                {
                    let getC = grid.rows[j].cells[i].innerHTML;
                    c.push(parseInt(getC));
                }

                // extract all the numbers != 0
                let getNumInCol = c.filter(n => n);
                let noNum = 4 - getNumInCol.length;
                let zeros = Array(noNum).fill(0);

                // append zeros to the top of all 
                // the numbers to get the effect of shifting the numbers to the bottom
                let newCol = getNumInCol.concat(zeros);

                grid.rows[k].cells[i].innerHTML = newCol[0];
                grid.rows[k+1].cells[i].innerHTML = newCol[1];
                grid.rows[k+2].cells[i].innerHTML = newCol[2];
                grid.rows[k+3].cells[i].innerHTML = newCol[3];
            }

            this.animate();
        },

        addRow: function()      // sums up the numbers in a row if they are equal
        {
            for (let i=0; i<4; i++)
            {
                for (let j=0; j<3; j++)
                {
                    if (grid.rows[i].cells[j].innerHTML === 
                            grid.rows[i].cells[j+1].innerHTML)
                    {
                        let x = parseInt(grid.rows[i].cells[j].innerHTML);
                        let y = parseInt(grid.rows[i].cells[j+1].innerHTML);
                        let sum = x + y;
                        this.score += sum;
                        grid.rows[i].cells[j].innerHTML = sum;
                        grid.rows[i].cells[j+1].innerHTML = 0;
                    }
                }
            }
        },

        addCol: function()      // sums up the numbers in a column if they are equal
        {
            for (let i=0; i<3; i++)
            {
                for (let j=0; j<4; j++)
                {
                    if (grid.rows[i].cells[j].innerHTML === 
                            grid.rows[i+1].cells[j].innerHTML)
                    {
                        let x = parseInt(grid.rows[i].cells[j].innerHTML);
                        let y = parseInt(grid.rows[i+1].cells[j].innerHTML);
                        let sum = x + y;
                        this.score += sum;
                        grid.rows[i].cells[j].innerHTML = sum;
                        grid.rows[i+1].cells[j].innerHTML = 0;
                    }
                }
            }
        },

        animate: function()     // animate the shifting effect
        {
            for (let i=0; i<4; i++)
            {
                for (let j=0; j<4; j++)
                {
                    let num = parseInt(grid.rows[i].cells[j].innerHTML);
                    switch(num)
                    {
                        case 2:
                            grid.rows[i].cells[j].className = "Two";
                            break;
                        case 4:
                            grid.rows[i].cells[j].className = "Four";
                            break;   
                        case 8:
                            grid.rows[i].cells[j].className = "Eight";
                            break;  
                        case 16:
                            grid.rows[i].cells[j].className = "Sixteen";
                            break;   
                        case 32:
                            grid.rows[i].cells[j].className = "ThirtyTwo";
                            break;       
                        case 64:
                            grid.rows[i].cells[j].className = "SixtyFour";
                            break;    
                        case 128:
                            grid.rows[i].cells[j].className = "OneTwoEight";
                            break;    
                        case 256:
                            grid.rows[i].cells[j].className = "TwoFiveSix";
                            break;    
                        case 512:
                            grid.rows[i].cells[j].className = "FiveTwelve";
                            break;    
                        case 1024:
                            grid.rows[i].cells[j].className = "TenTwoFour";
                            break;    
                        case 2048:
                            grid.rows[i].cells[j].className = "Win";
                            break;    
                        default:
                            grid.rows[i].cells[j].className = "Zero";     
                    }
                }
            }
        },

        rightArrowActions: function()   // invoke all the actions when press right arrow
        {
            this.moveCellsRight();
            this.addRow();
            this.moveCellsRight();
            this.spawnCell();
            this.checkGameEnds();
        },

        leftArrowActions: function()    // invoke all the actions when press left arrow
        {
            this.moveCellsLeft();
            this.addRow();
            this.moveCellsLeft();
            this.spawnCell();
            this.checkGameEnds();
        },

        downArrowActions: function()    // invoke all the actions when press down arrow
        {
            this.moveCellsDown();
            this.addCol();
            this.moveCellsDown();
            this.spawnCell();
            this.checkGameEnds();
        },

        upArrowActions: function()      // invoke all the actions when press up arrow
        {
            this.moveCellsUp();
            this.addCol();
            this.moveCellsUp();
            this.spawnCell();
            this.checkGameEnds();
        },

        checkGameEnds: function()       
        {
            // check to see if you can still move
            for (let i=0; i<3; i++)
            {
                for (let j=0; j<3; j++)
                {
                    if (grid.rows[i].cells[j].innerHTML == grid.rows[i].cells[j+1].innerHTML
                        || grid.rows[i].cells[j].innerHTML == grid.rows[i+1].cells[j].innerHTML)
                    {
                        return;
                    }    
                }
            }
            
            let count = 0;
            for (let i=0; i<4; i++)
            {
                for (let j=0; j<4; j++)
                {
                    if (grid.rows[i].cells[j].innerHTML == 2048)
                    {
                        setTimeout(function()
                        {
                            grid.style.visibility = "hidden";
                            document.getElementById("modal-1").style.display = "flex";
                            document.getElementById("modal-title").innerHTML = "YOU WIN";
                        }, 500);
                        
                    }
                    else if (grid.rows[i].cells[j].innerHTML != 0)  // check if all cells are filled
                    {
                        count++
                        if (count == 16) 
                        { 
                            setTimeout(function()
                            {
                                //alert('GAME OVER');
                                grid.style.visibility = "hidden";
                                document.getElementById("modal-1").style.display = "flex";
                                document.getElementById("modal-title").innerHTML = "GAME OVER";
                            }, 500);
                        }
                    }
                }
            }
            return false;
        },

        closeModal1: function()
        {
            document.getElementById("modal-1").style.display = "none";
        },

        closeModal2: function()
        {
            document.getElementById("scoreboard").style.display = "none";
        },

        handleScore: function()
        {
            db.collection("player-scores").add(
            {
                name: document.getElementById("nameInput").value,
                score: this.score
            });
            
            document.getElementById("modal-1").style.display = "none";

            db.collection("player-scores").get().then(
                     snapshot => {
                         snapshot.docs.forEach(
                             doc => {
                                //console.log(doc.data())
                                 this.addScore(doc);
                             }
                         );
                     }
                 ).catch(function(e){
                     console.log(e);
                 });

        },
        
        addScore: function(doc) 
        {
            
            let sl = document.getElementById("score-list");
            sl.innerHTML += 
                `
                <tr>
                    <td>${doc.data().name}</td>
                    <td>${doc.data().score}</td>
                </tr>
                `;
            this.showScore();

        },

        showScore: function()
        {
            document.getElementById("scoreboard").style.display = "flex";
        }
        
    }

});