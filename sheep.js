var init;

//var lib = AdobeAn.compositions['5F9563222A1BEF42BC13F365CB2A987E'].getLibrary(); //函數庫

var canvas, videos, stage, exportRoot, game;

//closure
(()=>{

//轉換query string
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//方便取得陣列末值
if(!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

let log = console.log,					//shortcut
	mainWidth = 720,					//RWD寬
	mainHeight = 1280,					//RWD高
	mainWHRatio = mainWidth/mainHeight,				//寬高比
	inputBlocks, inputSeed, btnGen, inputStep,		//輸入值
	resizeCanvas,
	lib,
	p;		

//初始化
init = () =>{
	canvas = document.getElementById("canvas");

	exportRoot = new createjs.Container();

	stage = new createjs.Stage("canvas");

	stage.addChild(exportRoot);
	createjs.Ticker.framerate = 30;
	

	createjs.Ticker.addEventListener("tick", stageTick);

	canvas.addEventListener('contextmenu', function(e){e.preventDefault();});

	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	logLib(lib = {});

	//exportRoot.addChild(new lib.sheep().set({x:360,y:200,scaleY:0.8}));

	createjs.Sound.on("fileload", SoundLoaded);
 	createjs.Sound.registerSound("./sheep-baa.mp3", "baa");

	//loadCards();
}

const logLib = lib =>{
	(lib.sheep = function(mode,startPosition,loop) {

		this.initialize(mode,startPosition,loop,{});         

		this.head = new createjs.Shape();
		this.head.graphics.f('#DAA').s().dc(-80,-50,60).closePath();
		this.head.setTransform(0,0);

		this.eye1 = new createjs.Shape();
		this.eye1.graphics.f('#000').s().dc(-95,-60,10).closePath();
		this.eye1.setTransform(0,0);

		this.eye2 = new createjs.Shape();
		this.eye2.graphics.f('#000').s().dc(-135,-60,10).closePath();
		this.eye2.setTransform(0,0);

		this.bodys = new createjs.Shape();
		this.bodys.graphics.f('#EEE').s().dc(0,0,90).closePath();
		this.bodys.setTransform(0,0);

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.head},{t:this.bodys},{t:this.eye1},{t:this.eye2}]}).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(0,0,1280,720);
}

const SoundLoaded = e =>{
	canvas.addEventListener('contextmenu', Cclick);
	canvas.addEventListener('click', Cclick);
}

const Cclick = e =>{
	e.preventDefault();
	let instance = createjs.Sound.play("baa",{ loop: 0, volume: 1, offset: 0 });
	exportRoot.addChild(new lib.sheep().set({x:Math.random()*mainWidth, y:Math.random()*mainHeight, scaleY:0.8}));
}

//Tick函數
const stageTick = e =>{
	if(status == 'set'){

	}
	stage.update();
}

//重繪
const ReDraw = () =>{
	if(null!=stage && null!=canvas){
		stage.clear();
		stage.draw(canvas.getContext("2d"), false);
	}
}

//RWD
resizeCanvas = function(){

	let r = window.devicePixelRatio,
	h = document.documentElement.clientHeight || window.innerHeight,
	w = document.documentElement.clientWidth || window.innerWidth,
	rt = exportRoot;

	//畫布寬高
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";

	if(h<mainHeight){
		w *= mainHeight/h;
		h *= mainHeight/h;
	}
	if(w<mainWidth){
		h *= mainWidth/w;
		w *= mainWidth/w;
	}

	//畫布像素
	canvas.width = w;
	canvas.height = h;

	rt.x = rt.y = 0;
	if( w > h*mainWHRatio ){
		rt.scaleY = h/mainHeight;
		rt.scaleX = rt.scaleY;
		rt.x = (w - rt.scaleX*mainWidth)/2;

	}else{
		rt.scaleX = w/mainWidth;
		rt.scaleY = rt.scaleX;
		rt.y = (h - rt.scaleY*mainHeight)/2;
	}

	//重繪主要畫布
	ReDraw();
}

})();
