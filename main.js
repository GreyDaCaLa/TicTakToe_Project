


class TheGame {
    constructor(p2choice = true,name1 ="Player1-default",name2= "AI"){
        this.gameBoard = ["-","-","-",    "-","-","-",    "-","-","-"];
        this.player2 = p2choice;
        this.player1name = name1;
        this.player2name = name2;
        this.xcolorArray = ["#FF4000","#18A999","#FFE347","#FE5D26","#DB3A34"];
        this.ocolorArray = ["#50B2C0","#A33B20","#8E7DBE","#285943","#177E89"];
        this.group1colorArray = ["#FAAA8D","#FAAA8D","#E18335","#582B11","#000000" ];
        this.group2colorArray = ["#FEEFDD","#FEEFDD","#596F62","#999AC6","#7D7D7D"];
        this.group3colorArray = ["#0B0500","#0B0500","#0B0500","#EAD2AC","#FFFFFF"];
        this.colorstyle = 0;
        this.currentTurn = 0;
        this.computerplayer = null;
        this.gameover = false;

    }

    inputModifyBoard(boxid){
        console.log("inputmodifyboard")
        console.log(`the value of boxid: ${boxid} | concat string ${"box"+String(boxid)+"input"}`)

        let innercell = document.getElementById("box"+String(boxid));
        let innerinput = document.getElementById("box"+String(boxid)+"input");
        innercell.removeChild(innerinput);

        let newanswerdiv = document.createElement("div");
        newanswerdiv.id = "box" +String(boxid)+"div";
        //newanswerdiv.className = "TeamX";

        if(this.currentTurn % 2){ //if even player1
            //document.getElementById("box"+String(boxid)+"input").value = "X";
            //document.getElementById("box"+String(boxid)+"input").disabled = "on";

            
            newanswerdiv.innerHTML = "X";
            newanswerdiv.style.color = this.xcolorArray[this.colorstyle];
            newanswerdiv.className = "TeamX";
            innercell.appendChild(newanswerdiv);

            this.gameBoard[boxid-1]= "X";



        }else{
            //document.getElementById("box"+String(boxid)+"input").value = "O";
            //document.getElementById("box"+String(boxid)+"input").disabled = "on";

            newanswerdiv.innerHTML = "O";
            //newanswerdiv.style.color = "#50B2C0"
            newanswerdiv.style.color = this.ocolorArray[this.colorstyle];
            newanswerdiv.className = "TeamO";
            innercell.appendChild(newanswerdiv);

            this.gameBoard[boxid-1]= "O";
        }
        this.currentTurn +=1;
        //every time a user inputs, modify the current board
        console.log(mainGame);

        this.change_GameColor(1);

        this.checkWin();

        if(!this.gameover){
            if(!this.player2){
                if(this.computerplayer.comturn == false){
                    this.computerplayer.comturn = true;
                }else{
                    this.computerplayer.comturn = false;
                }
            }
    
            if(!this.player2 && this.computerplayer.comturn){
                //this.computerplayer.comturn = false;
                this.inputModifyBoard(this.computerplayer.chooseNextMove());
    
    
            }

        }



    }

    change_GameColor(stay =0){
        //console.log("Change Game color mem function")
        //console.log(`Before-- ColorStyle: ${this.colorstyle}  --`);

        this.colorstyle += 1;
        this.colorstyle -= stay;
        if(this.colorstyle >=5){
            this.colorstyle = 0;
        }

        let allTeamX = document.getElementsByClassName("TeamX");
        let allTeamO = document.getElementsByClassName("TeamO");
        //console.log(allTeamX);
        //console.log(allTeamO);

        let memX = null;
        let memO = null;
        let one_td = null;
        let one_gridInput = null;
        let one_ColorGroup3 = null;

        

        for(memX of allTeamX){
            memX.style.color = this.xcolorArray[this.colorstyle];
            memX.style.backgroundColor = this.group2colorArray[this.colorstyle];
        }
        for(memO of allTeamO){
            memO.style.color = this.ocolorArray[this.colorstyle];
            memO.style.backgroundColor = this.group2colorArray[this.colorstyle];

        }

        let all_td = document.getElementsByTagName("td");

        for(one_td of all_td){
            one_td.style.backgroundColor = this.group1colorArray[this.colorstyle];
            one_td.style.borderColor = this.group3colorArray[this.colorstyle];
        }
        
        // document.getElementById("mainbody").style.backgroundColor = this.group1colorArray[this.colorstyle];
        let all_group1 = document.getElementsByClassName("ColorGroup1");
        let one_group1 = null;
        for(one_group1 of all_group1){
            one_group1.style.backgroundColor = this.group1colorArray[this.colorstyle];
        }

        let all_gridInput = document.getElementsByClassName("ColorGroup2");

        for(one_gridInput of all_gridInput){
            one_gridInput.style.backgroundColor = this.group2colorArray[this.colorstyle];
        }

        let all_ColorGroup3 = document.getElementsByClassName("ColorGroup3");

        for(one_ColorGroup3 of all_ColorGroup3){
            one_ColorGroup3.style.color = this.group3colorArray[this.colorstyle];
        }







    }


    showBoard(){

        let mgdiv = document.getElementById("MainGameDiv");
        let mgtable = document.createElement("table");
        mgtable.className = "ColorGroup1";
        let mgtbody = document.createElement("tbody");
        mgtable.id = "MainGameTable";

        let arow = document.createElement("tr");
        let acell = null;
        let ainput = null


        for(let i=1;i<10;++i){
            //console.log(`show board`);
            //console.log(`the value of i: ${i} | the value of !(i%3)): ${!(i%3)}`);
            acell = document.createElement("td");
            acell.id = "box" + String(i);
            acell.className = "ColorGroup1";
            ainput = document.createElement("input");
            ainput.type ="submit";
            ainput.value = "";
            ainput.id = "box" + String(i) + "input";
            ainput.className = "ColorGroup2";


            ainput.addEventListener("click",function(){callInputModifyBoard(i);});
            
            acell.appendChild(ainput);

            
            if( (i==4) || (i==7) ){
                mgtbody.appendChild(arow);
                arow = document.createElement("tr");

            }
            arow.appendChild(acell);



        }
        mgtbody.appendChild(arow);
        mgtable.appendChild(mgtbody);
        mgdiv.appendChild(mgtable);





    }

    cleanBoard(){
        let mgdiv = document.getElementById("MainGameDiv");
        let mgtable = document.getElementById("MainGameTable");

        mgdiv.removeChild(mgtable);
        mainGame.gameBoard =["-","-","-","-","-","-","-","-","-"];
        mainGame.showBoard();
    }
    all3Same(arg1,arg2,arg3){

        if( (arg1==arg2) && (arg1==arg3) && !(arg1 == "-") ){
            return true;
        }else{
            return false;
        }
    }
    all3Fade(id1,id2,id3,id4,id5,id6){
        let opacity = "0.2";
        console.log(`All Fade:`);
        document.getElementById("box"+String(id1)).style.opacity =opacity;
        document.getElementById("box"+String(id2)).style.opacity =opacity;
        document.getElementById("box"+String(id3)).style.opacity =opacity;
        document.getElementById("box"+String(id4)).style.opacity =opacity;
        document.getElementById("box"+String(id5)).style.opacity =opacity;
        document.getElementById("box"+String(id6)).style.opacity =opacity;
        //this.change_GameColor(1);

    }

    checkWin(){
        //console.log("---------------CheckWin");
        //console.log(this.gameBoard);
        let winner =null;
        let winmethod =null;

        let box1 = this.gameBoard[0];
        let box2 = this.gameBoard[1];
        let box3 = this.gameBoard[2];

        let box4 = this.gameBoard[3];
        let box5 = this.gameBoard[4];
        let box6 = this.gameBoard[5];

        let box7 = this.gameBoard[6];
        let box8 = this.gameBoard[7];
        let box9 = this.gameBoard[8];
        

        //Horizontal wins
        if(this.all3Same(box1,box2,box3)){
            winner = box1;
            winmethod = 1;
        }
        if(this.all3Same(box4,box5,box6)){
            winner = box4;
            winmethod = 2;
        }
        if(this.all3Same(box7,box8,box9)){
            winner = box7;
            winmethod = 3;
        }

        

        //vertical wins
        if(this.all3Same(box1,box4,box7)){
            winner = box1;
            winmethod = 4;
        }
        if(this.all3Same(box2,box5,box8)){
            winner = box2;
            winmethod = 5;
        }
        if(this.all3Same(box3,box6,box9)){
            winner = box3;
            winmethod = 6;
        }

        //diagnol wins
        if(this.all3Same(box1,box5,box9)){
            winner = box1;
            winmethod = 7;
        }
        if(this.all3Same(box3,box5,box7)){
            winner = box3;
            winmethod = 8;
        }


        console.log(`winner: ${winner} | winmethod: ${winmethod}`);
        //if we have  winner
        if(winner){
            this.gameover=true;
            let body = document.getElementById("mainbody");
            let newgamediv = document.getElementById("NewGameDiv");
            let congrats = document.createElement("h3");
            congrats.id = "WinnerCongrats";
            congrats.className = "ColorGroup3";
            congrats.style.color = this.group3colorArray[this.colorstyle];
            if(winner == "X"){
                congrats.innerHTML = `Congrats!!!!! ${this.player2name} YOU WIN!!!!`
            }else{
                congrats.innerHTML = `Congrats!!!!! ${this.player1name} YOU WIN!!!!`
            }
            body.insertBefore(congrats,newgamediv);
            switch(winmethod){
                case 1:
                    this.all3Fade(4,5,6,7,8,9);
                    break;
                case 2:
                    this.all3Fade(1,2,3,7,8,9);
                    break;
                case 3:
                    this.all3Fade(1,2,3,4,5,6);
                    break;
                case 4:
                    this.all3Fade(2,3,5,6,8,9);
                    break;
                case 5:
                    this.all3Fade(1,3,4,6,7,9);
                    break;
                case 6:
                    this.all3Fade(1,2,4,5,7,8);
                    break;
                case 7:
                    this.all3Fade(2,3,4,6,7,8);
                    break;
                case 8:
                    this.all3Fade(1,2,4,6,8,9);
                    break;

            }

            if(document.getElementById("box1input")){document.getElementById("box1input").disabled =true;}
            if(document.getElementById("box2input")){document.getElementById("box2input").disabled =true;}
            if(document.getElementById("box3input")){document.getElementById("box3input").disabled =true;}
            if(document.getElementById("box4input")){document.getElementById("box4input").disabled =true;}
            if(document.getElementById("box5input")){document.getElementById("box5input").disabled =true;}
            if(document.getElementById("box6input")){document.getElementById("box6input").disabled =true;}
            if(document.getElementById("box7input")){document.getElementById("box7input").disabled =true;}
            if(document.getElementById("box8input")){document.getElementById("box8input").disabled =true;}
            if(document.getElementById("box9input")){document.getElementById("box9input").disabled =true;}
        }

        this.checkTie(winner);
    
    
    }

    checkTie(winner){
        if( (this.currentTurn == 9) && (!winner) ){
            this.gameover = true;
            let body = document.getElementById("mainbody");
            let newgamediv = document.getElementById("NewGameDiv");
            let congrats = document.createElement("h3");
            congrats.innerHTML = "Congrats!!!!! Its A Tie"
            congrats.id = "WinnerCongrats";
            body.insertBefore(congrats,newgamediv);

        }
    }



}


class ComPlayer{
    constructor(comturn = false,name = "ComPlayer"){
        this.name = name;
        this.memSTV = [0,  0,0,0, 0,0,0, 0,0,0];
        this.metD_memV = [[0,0,0],  [0,0,0],[0,0,0],   [0,0,0],[0,0,0],  [0,0,0],[0,0,0],  [0,0,0],[0,0,0]];
        this.comturn = comturn;
        this.firstmove = true;
        this.mark = "X";
    }

    metDmemV_helper(m1,m2,m3,met){

        console.log(`metdmemV_helper----`)
        console.log(`met:${met} -- m1:${m1} m2:${m2} m3:${m3}`)

        let numof_o =0;
        let opmark = "O";
        let comark = this.mark;

        // checking for at lesat one opponent mark
        if(m1 == opmark || m2 == opmark || m3 == opmark){
            console.log("----at lesat one opmark");
            // does mem1 have it
            if(m1 == opmark || m1 == comark ){
                this.metD_memV[met][0] = 0;
                console.log("----used m1");
            }else{
                this.metD_memV[met][0] = 1;
                console.log("----not used m1");
            }


            if(m2 == opmark  || m2 == comark){
                this.metD_memV[met][1] = 0;
                console.log("----not used m2");
            }else{
                this.metD_memV[met][1] = 1;
                console.log("----not used m2");
            }

            if(m3 == opmark || m3 == comark){
                this.metD_memV[met][2] = 0;
                console.log("----used m3");
            }else{
                this.metD_memV[met][2] = 1;
                console.log("----not used m3");
            }
        }
        else{
            console.log("----no opmark found");

            if(m1 == comark){
                numof_o +=1;
            }
            if(m2 == comark){
                numof_o +=1;
            }
            if(m3 == comark){
                numof_o +=1;
            }

            console.log(`number of computer marks found: ${numof_o}`)




            if(m1 == m2 && m1 == m3){
                if(m1 =="-"){
                    console.log("all in the method are the same and are dashes");
                    this.metD_memV[met][0] = 4;
                    this.metD_memV[met][1] = 4;
                    this.metD_memV[met][2] = 4;
                }else{
                    console.log("all in this method are the same and are comark")
                    this.metD_memV[met][0] = 0;
                    this.metD_memV[met][1] = 0;
                    this.metD_memV[met][2] = 0;
                }
            } 

            if(numof_o == 2){
                if(m1 == "-"){
                    console.log("m1 is the odd man out")
                    this.metD_memV[met][0] = 12;
                    this.metD_memV[met][1] = 0;
                    this.metD_memV[met][2] = 0;
                }
                if(m2 == "-"){
                    console.log("m2 is the odd man out")
                    this.metD_memV[met][0] = 0;
                    this.metD_memV[met][1] = 12;
                    this.metD_memV[met][2] = 0;
                }
                if(m3 == "-"){
                    console.log("m3 is the odd man out")
                    this.metD_memV[met][0] = 0;
                    this.metD_memV[met][1] = 0;
                    this.metD_memV[met][2] = 12;
                }
            }

            if(numof_o == 1){
                if(m1 == comark){
                    console.log("m1 is the odd man out")
                    this.metD_memV[met][0] = 0;
                    this.metD_memV[met][1] = 6;
                    this.metD_memV[met][2] = 6;
                }
                if(m2 == comark){
                    console.log("m2 is the odd man out")
                    this.metD_memV[met][0] = 6;
                    this.metD_memV[met][1] = 0;
                    this.metD_memV[met][2] = 6;
                }
                if(m3 == comark){
                    console.log("m3 is the odd man out")
                    this.metD_memV[met][0] = 6;
                    this.metD_memV[met][1] = 6;
                    this.metD_memV[met][2] = 0;
                }
            }

         

        }

    }

    update_metDmemV(){

        console.log("update_metdmemV---")
        
        let b1 = mainGame.gameBoard[0];
        let b2 = mainGame.gameBoard[1];
        let b3 = mainGame.gameBoard[2];
        
        let b4 = mainGame.gameBoard[3];
        let b5 = mainGame.gameBoard[4];
        let b6 = mainGame.gameBoard[5];

        let b7 = mainGame.gameBoard[6];
        let b8 = mainGame.gameBoard[7];
        let b9 = mainGame.gameBoard[8];

        this.metDmemV_helper(b1,b2,b3,1);
        this.metDmemV_helper(b4,b5,b6,2);
        this.metDmemV_helper(b7,b8,b9,3);

        this.metDmemV_helper(b1,b4,b7,4);
        this.metDmemV_helper(b2,b5,b8,5);
        this.metDmemV_helper(b3,b6,b9,6);
        
        this.metDmemV_helper(b3,b5,b7,7);
        this.metDmemV_helper(b1,b5,b9,8);

    }

    update_memSTV() {
        console.log("update_memSTV----")
        this.update_metDmemV();
        console.log(this.metD_memV);
        this.memSTV[1] = this.metD_memV[1][0] + this.metD_memV[4][0] + this.metD_memV[8][0];
        this.memSTV[2] = this.metD_memV[1][1] + this.metD_memV[5][0];
        this.memSTV[3] = this.metD_memV[1][2] + this.metD_memV[6][0] + this.metD_memV[7][0];
        
        
        this.memSTV[4] = this.metD_memV[2][0] + this.metD_memV[4][1];
        this.memSTV[5] = this.metD_memV[2][1] + this.metD_memV[5][1] + this.metD_memV[7][1] + this.metD_memV[8][1];
        this.memSTV[6] = this.metD_memV[2][2] + this.metD_memV[6][1];
        
        this.memSTV[7] = this.metD_memV[3][0] + this.metD_memV[4][2] + this.metD_memV[7][2];
        this.memSTV[8] = this.metD_memV[3][1] + this.metD_memV[5][2];
        this.memSTV[9] = this.metD_memV[3][2] + this.metD_memV[6][2] + this.metD_memV[8][2];

        console.log(`Current metDmemV
        1-${this.memSTV[1]}  2-${this.memSTV[2]}  3-${this.memSTV[3]}
        4-${this.memSTV[4]}  5-${this.memSTV[5]}  6-${this.memSTV[6]}
        7-${this.memSTV[7]}  8-${this.memSTV[8]}  9-${this.memSTV[9]}`)
    }

    firstmoveChoice(){
        console.log("firstmove choice")

        let pref = 3;

        if(mainGame.currentTurn == 0){
            console.log("first turn and com is playing first so i choose top right corner")
            return pref;
        }else{

            if(mainGame.gameBoard[5] != "-"){
                console.log("first choice is 1")
                return 1;
            }
            if(mainGame.gameBoard[1] != "-"){
                console.log("first choice is 9")
                return 9;
            }
            if(mainGame.gameBoard[2] != "-"){
                console.log("first choice is 9")
                return 7;
            }
            if(mainGame.gameBoard[7] != "-"){
                console.log("first choice is 1")
                return 1;
            }


            if(mainGame.gameBoard[0] != "-" || mainGame.gameBoard[3] != "-" || mainGame.gameBoard[4] != "-"|| mainGame.gameBoard[6] != "-"|| mainGame.gameBoard[8] != "-"){
                return pref;
            }
        }
    }

    check_2of3(m1,m2,m3){
        //checks if 2 of the same are in a mehtod
        // and the last is empty and its not the coms mark

        // returns [odd man out spot, 0 for losing 1 for winning ]

        if(m1 == m2){
            if( (m1 != "-") && (m3 == "-") && (m1 != this.mark) ){
                return [3,0];
            }
            if( (m1 != "-") && (m3 == "-") && (m1 == this.mark) ){
                return [3,1];
            }
            
        }
        if(m1 == m3){
            if( (m1 != "-") && (m2 == "-") && (m1 != this.mark) ){
                return [2,0];
            }
            if( (m1 != "-") && (m2 == "-") && (m1 == this.mark) ){
                return [2,1];
            }
        }
        if(m2 == m3){
            if( (m2 != "-") && (m1 == "-") && (m2 != this.mark) ){
                return [1,0];
            }
            if( (m2 != "-") && (m1 == "-") && (m2 == this.mark) ){
                return [1,1];
            }
        }

        return [0,0];

    }

    aboutToLoseOrWin(){

        let found = [0,0];
        let resultlosing = null;
        let resultwinning = null;

        let b1 = mainGame.gameBoard[0];
        let b2 = mainGame.gameBoard[1];
        let b3 = mainGame.gameBoard[2];
        
        let b4 = mainGame.gameBoard[3];
        let b5 = mainGame.gameBoard[4];
        let b6 = mainGame.gameBoard[5];

        let b7 = mainGame.gameBoard[6];
        let b8 = mainGame.gameBoard[7];
        let b9 = mainGame.gameBoard[8];

        found = this.check_2of3(b1,b2,b3);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 1;
            }
            if(found[0] == 2){
                resultlosing= 2;
            }
            if(found[0] == 3){
                resultlosing= 3;
            }
        }
        else{
            if(found[0] == 1){
                return 1;
            }
            if(found[0] == 2){
                return 2;
            }
            if(found[0] == 3){
                return 3;
            }

        }

        found = this.check_2of3(b4,b5,b6);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 4;
            }
            if(found[0] == 2){
                resultlosing= 5;
            }
            if(found[0] == 3){
                resultlosing= 6;
            }
        }
        else{
            if(found[0] == 1){
                return 4;
            }
            if(found[0] == 2){
                return 5;
            }
            if(found[0] == 3){
                return 6;
            }

        }

        found = this.check_2of3(b7,b8,b9);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 7;
            }
            if(found[0] == 2){
                resultlosing= 8;
            }
            if(found[0] == 3){
                resultlosing= 9;
            }
        }
        else{
            if(found[0] == 1){
                return 7;
            }
            if(found[0] == 2){
                return 8;
            }
            if(found[0] == 3){
                return 9;
            }

        }

        found = this.check_2of3(b1,b4,b7);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 1;
            }
            if(found[0] == 2){
                resultlosing= 4;
            }
            if(found[0] == 3){
                resultlosing= 7;
            }
        }
        else{
            if(found[0] == 1){
                return 1;
            }
            if(found[0] == 2){
                return 4;
            }
            if(found[0] == 3){
                return 7;
            }

        }

        found = this.check_2of3(b2,b5,b8);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 2;
            }
            if(found[0]== 2){
                resultlosing= 5;
            }
            if(found[0] == 3){
                resultlosing= 8;
            }
        }
        else{
            if(found[0] == 1){
                return 2;
            }
            if(found[0] == 2){
                return 5;
            }
            if(found[0] == 3){
                return 8;
            }

        }

        found = this.check_2of3(b3,b6,b9);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 3;
            }
            if(found[0] == 2){
                resultlosing= 6;
            }
            if(found[0] == 3){
                resultlosing= 9;
            }
        }
        else{
            if(found[0] == 1){
                return 3;
            }
            if(found[0] == 2){
                return 6;
            }
            if(found[0] == 3){
                return 9;
            }

        }

        found = this.check_2of3(b3,b5,b7);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 3;
            }
            if(found[0] == 2){
                resultlosing= 5;
            }
            if(found[0] == 3){
                resultlosing= 7;
            }
        }
        else{
            if(found[0] == 1){
                return 3;
            }
            if(found[0] == 2){
                return 5;
            }
            if(found[0] == 3){
                return 7;
            }

        }
        found = this.check_2of3(b1,b5,b9);
        if(found[1] == 0){
            if(found[0] == 1){
                resultlosing= 1;
            }
            if(found[0] == 2){
                resultlosing= 5;
            }
            if(found[0] == 3){
                resultlosing= 9;
            }
        }
        else{
            if(found[0] == 1){
                return 1;
            }
            if(found[0] == 2){
                return 5;
            }
            if(found[0] == 3){
                return 9;
            }

        }

        if(resultlosing){
            return resultlosing;
        }
        return 0;

    }

    chooseNextMove(){

        if(this.firstmove){
            this.firstmove =false;
            return this.firstmoveChoice();
        }

        let best = 0;
        let bestindex = 0;

        let mand = this.aboutToLoseOrWin();
        console.log(`the current mandaotry move is:${mand}`);

        if(mand){
            return mand
        }


        this.update_memSTV();

        console.log(`looking through array for best move`)
        for(let q = 1; q<10; ++q){
            console.log(q);
            console.log(`the best move is ${best}`)
            if(best<this.memSTV[q]){
                console.log(`memSTV[q] is ${this.memSTV[q]}`);
                best = this.memSTV[q];
                bestindex =q;
            }

        }

        return bestindex;

    }
}





function styleRemove_AddNameBox(){
    let currentoption = document.getElementById("2playerchoice").checked;
    let maindiv = document.getElementById("gamesetup-insertname-maindiv");

    if(currentoption){
        let newinput = document.createElement("input");
        newinput.type = "text";
        newinput.value = "Player2";
        newinput.id= "insertname-player2";
        maindiv.appendChild(newinput);

    }else{
        let in2name =document.getElementById("insertname-player2");
        maindiv.removeChild(in2name);

    }
    
} // when checked add the player2 name box, when uncheck remove it


function callStart_or_NewGame(){
    let congrats = document.getElementById("WinnerCongrats");
    let body = document.getElementById("mainbody");
    let divGame = document.getElementById("MainGameDiv");
    let divGameTable = document.getElementById("MainGameTable");

    if(congrats){
        body.removeChild(congrats)
    }



    if(divGameTable){
        mainGame.cleanBoard();
        mainGame.change_GameColor(1);
        mainGame.computerplayer.firstmove = true;
        mainGame.gameover = false;
        mainGame.currentTurn =0;


    }else{
        let p2choice = document.getElementById("2playerchoice").checked;
        let p1name = document.getElementById("insertname-player1").value;
        let p2name = null;
        document.getElementById("gamestart-start").value = "Start New Game !!!!";

        document.getElementById("gamestart-color").disabled = false;
        
    
        if(p2choice){
            let p2name = document.getElementById("insertname-player2").value;
            mainGame = new TheGame(p2choice,p1name,p2name);
            mainGame.showBoard();
    
    
        }else{
            mainGame = new TheGame(p2choice, p1name);
            mainGame.computerplayer = new ComPlayer();
            mainGame.showBoard();
    
        }





        let gamesetuperase = document.getElementById("gamesetup");
        //console.log("gamesetuperase");
        //console.log(gamesetuperase);
        let welcomeerase = document.getElementById("Welcometo");
        //console.log("welcomeerase");
        //console.log(welcomeerase);
        let mainbody = document.getElementById("mainbody");
        mainbody.removeChild(gamesetuperase);
        mainbody.removeChild(welcomeerase);

        console.log("thegame");
        console.log(mainGame);
    
    }



}

function callChange_GameColor(){
    console.log("change game color call")
    mainGame.change_GameColor();

}

function callInputModifyBoard(boxid){
    mainGame.inputModifyBoard(boxid);
    //checkfor winner
}

let mainGame= null;





