var face_colors = "f3e9dc-c08552-5e3023-895737-dab49d".split("-").map(a=>"#"+a)
var eye_colors = "590d22-800f2f-a4133c-c9184a-ff4d6d-ff758f-ff8fa3-ffb3c1-ffccd5-fff0f3".split("-").map(a=>"#"+a)
var pos_x=[]
var pos_y=[]
var sizes=[]
var colors=[]
var v_y=[]
var v_x=[]
var  txts //宣告一個變數，txts
var face_move_var = false
//語音辨識的初始設定
var lang = navigator.language|| en-US //取得瀏覽器的語系
var myRec =new p5.SpeechRec(lang)
var face_Rot_var = false
function setup() {
 createCanvas(windowWidth, windowHeight)
 //文字框設定
 inputElement = createInput ("412730565陳冠偉") //產生一個文字方塊，""內的文字為預設顯示的文字
 inputElement.position(10,10)  //文字方塊放到(10,10)
 inputElement.size(160,35)  //文字框的寬與高
 //以下的style,可以gogle搜尋html imput css找到相關資料
 inputElement.style("font-size","20px")  //文字框內的文字大小
 inputElement.style("color","#eae0d5")  //文字框內的文字顏色
 inputElement.style("background","#5e503f")  //文字框內的背景顏色
 //inputElement.style("border","none")   //設定文字框沒有框線

 //按鈕的設定
 btnMoveElement = createButton("移動")
 btnMoveElement.position(200,10) //按鈕的位置
 btnMoveElement.size(80,40)//按鈕的寬與高
 btnMoveElement.style("font-size","20px") //按鈕內的文字大小
 btnMoveElement.style("color","#eae0d5") //按鈕內的文字顏色
 btnMoveElement.style("background","#5e503f")
 btnMoveElement.mousePressed(face_move)

 btnstopElement = createButton("暫停")
 btnstopElement.position(270,10)//按鈕的位置
 btnstopElement.size(80,40)//按鈕的寬與高
 btnstopElement.style("font-size","20px") //按鈕內的文字大小
 btnstopElement.style("color","#eae0d5") //按鈕內的文字顏色
 btnstopElement.style("background","#5e503f")//按鈕背景顏色
 btnstopElement.mousePressed(face_stop)//按鈕被按下後會執行face_stop函數
// radio選鈕的設定，多個選項，只能選一個(單選題)
 radioElement=createRadio()
 radioElement.option("暫停")
 radioElement.option("旋轉")
 radioElement.option("移動")
 radioElement.position(370,10)//按鈕的位置
 radioElement.size(200,40)//按鈕的寬與高
 radioElement.style("font-size","20px")//按鈕內的文字大小
 radioElement.style("color","#eae0d5") //按鈕內的文字顏色
 radioElement.style("background","#5e503f")

//"暫停"按鈕的設定
btnVoiceElement = createButton("語音")
btnVoiceElement.position(600,10)//按鈕的位置
btnVoiceElement.size(80,40)//按鈕的寬與高
btnVoiceElement.style("font-size","20px") //按鈕內的文字大小
btnVoiceElement.style("color","#eae0d5") //按鈕內的文字顏色
btnVoiceElement.style("background","#5e503f")//按鈕背景顏色
btnVoiceElement.mousePressed(voice_go)//按鈕被按下後會執行face_stop函數
//checkBox的設定，多個選項，可選多個(複選題)
  //for(var i=0;i<20;i=i+1){
   // drawface(face_colors[int(random(face_colors.length))] ,eye_colors[int(random(eye_colors.length))],random(0.3,1.2))
// }
}
function draw(){
   background("#eae0d5");  //背景顏色
   mode = radioElement.value()
   for(var i=0;i<pos_x.length;i=i+1)  //依照pos_x內有幾筆資料，產生幾個物件
    {
    push()
    txts = inputElement.value();
    translate(pos_x[i],pos_y[i])
    if(mode=="旋轉"){
      rotate(sin(frameCount/10*v_y [i]))
    }

    // else
    //{
      //if(mode=="移動"){
        //face_move_var =true
      //}
      //else{ //暫停
      //face_move_var = false
    //}
    //}
    drawface(colors[i],0,sizes[i])
    pop()
    if(face_move_var||mode=="移動"){  //在face_move_var為true時，臉物件會移動
    pos_y[i] = pos_y[i] +v_y[i]  //移動
}
if(pos_y[i]>height || pos_y[i]<0) //判斷有沒有碰到上下邊，碰到上下邊時，就要刪除所有陣列的該筆資料

{
pos_x.splice(i,1)  //把碰到邊的陣列元素刪除，把第i筆資料刪除1筆資料
pos_y.splice(i,1)
sizes.splice(i,1)
colors.splice(i,1)
v_y.splice(i,1)

  }
 }
}
    function drawface(face_clr=255,eye_clr=0,size=1){   //255與0為預設的值
  push()  //自行設定格式

  //translate(random(width),random(height))  //原點(0,0)移動到(200,200)
  scale(size) //放大縮小
  //文字框的顯示格式
  fill("#003566")
  textSize(50)
  text(txts,-100,250)
  fill(face_clr)
  //臉蛋
  ellipse(0,0,400)
  fill(face_clr)
  //耳朵
  fill(face_clr)
  ellipse(-130,-180,60,60)
  ellipse(130,-180,60,60)
  //耳朵內部
  fill(210, 105, 30)
  ellipse(-130,-180,40,40)
  ellipse(130,-180,40,40)
  //Eyes
  fill(255);
  ellipse(-30, -100, 40, 60);
  ellipse(30, -100, 40, 60);
  // Pupils
  fill(0);
  ellipse(-30, -100, 20, 40);
  ellipse(30, -100, 20, 40);
  //鼻子
  fill(0)
  ellipse(0,-50,40,20)
  //大嘴巴
  fill("#370617")
  ellipse(0,30,110,100)
  //小嘴巴
  fill(210, 105, 30)
  ellipse(0,30,90,80)
  pop()  //把原本設定都消失
}

function mousePressed(){
  if(mouseY>60){ //設定y軸為0~60間的座標值都不產生新的物件
    //產生新的物件
pos_x.push(mouseX)//放一筆新的資料到pos_x陣列內，資料為按下滑鼠的x軸
pos_y.push(mouseY)//放一筆新的資料到pos_y陣列內，資料為按下滑鼠的y軸
sizes.push(random(0.3,1))//放一筆新的資料到sizes陣列內，資料為產生一個亂數，為物件的大小
colors.push(face_colors[int(random(face_colors.length))])
v_y.push(random(-1,1))//放一筆新的資料到v_y陣列內，資料為物件移動的y軸速度，速度值為亂數曲-1到1之間，負值為往上，正號為

}
}

function face_move(){
face_move_var =true
}

function face_stop(){
  face_move_var = false
}

function voice_go(){
  myRec.onResult = showResult //取得語音辨識後去執行function showResult
  myRec.start()//開始辯識
}
  
function showResult(){
  if(myRec.resultValue == true)
  {
    print(myRec.resultString)
    //英文文字轉換須注意，轉換成小寫放入lowStr變數中，mostrecentword取得最後一個字
    //let lowStr =myRec.resulString.toLowerCase();//把英文文字轉為小寫
    //let mostrecentword = lowStr.split(' ').pop();//pop為刪除最後一個字串，放入到mostrecentword內
    //
    if(myRec.resultString.indexOf("走")!== -1){
      face_move_var =true
    }
    if(myRec.resultString.indexOf("停")!== -1){
      face_move_var = false
      //face_Rot_var =false
    }
    //if(myRec.resulString.indexOf("轉")!== -1){
      //face_move_var = true
    //}
  }
}