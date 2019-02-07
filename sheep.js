var init;

var canvas, videos, stage, exportRoot, game;

//closure
(()=>{

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
	
	//createjs.Ticker.addEventListener("tick", stageTick);

	canvas.addEventListener('contextmenu', function(e){e.preventDefault();});

	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();

	Number.prototype.ts = Number.prototype.toString;
	logLib(lib = {});

	createjs.Sound.on("fileload", SoundLoaded);
 	createjs.Sound.registerSound("./sheep-baa.mp3", "baa");
}

const logLib = lib =>{
	(lib.sheep = function(mode,startPosition,loop) {

		this.initialize(mode,startPosition,loop,{});         

		this.head = new createjs.Shape();
		this.head.graphics.f('#ECA').s().dc(-80,-30,60).s('#ECA').ss(15,1).mt(-60,-30).lt(-30,-110).mt(-80,-30).lt(-60,-120).mt(-90,-30).cp();
		this.head.setTransform(0,0);

		this.eye1 = new createjs.Shape();
		this.eye1.graphics.f('#000').s().dc(-95,-40,10).cp();
		this.eye1.setTransform(0,0);

		this.eye2 = new createjs.Shape();
		this.eye2.graphics.f('#000').s().dc(-135,-40,10).cp();
		this.eye2.setTransform(0,0);

		this.bodys = new createjs.Shape();
		this.bodys.graphics.f('#EEE').s().dc(0,0,90).cp();
		this.bodys.setTransform(0,0);

		this.foot = new createjs.Shape();
		this.foot.graphics.f().s('#000').ss(3).mt(-30,0).lt(-30,120).mt(-10,0).lt(-10,120).mt(10,0).lt(10,120).mt(30,0).lt(30,120).cp();
		this.foot.setTransform(0,0);

		this.timeline.addTween(createjs.Tween.get({}).to({state:[{t:this.foot},{t:this.bodys},{t:this.head},{t:this.eye1},{t:this.eye2}]}).wait(1));

	}).prototype = p = new createjs.MovieClip();
	p.nominalBounds = new createjs.Rectangle(0,0,1280,720);
}

const SoundLoaded = e =>{
	exportRoot.addChild(
		exportRoot.tap = new createjs.Text("Tap screeen to baaaa~", "20px", "#FFFFFF").set({
			x:(document.documentElement.clientWidth || window.innerWidth)/2,
			y:0,
			textAlign:"center",
			scaleX:5,
			scaleY:5
		})
	);
	ReDraw();
	exportRoot.addChild(exportRoot.sheep = new lib.sheep().set({x:0, y:-300, scaleX:0.5, scaleY:0.4}) );
	canvas.addEventListener('contextmenu', Cclick);
	canvas.addEventListener('click', Cclick);
}

const Cclick = e =>{
	e.preventDefault();
	if(exportRoot.tap.visible){
		exportRoot.tap.visible = !1;
		stage.clear();
	}
	let instance = createjs.Sound.play("baa",{ loop: 0, volume: 1, offset: 0 }),
		X,Y;
	if(e.changedTouches && e.changedTouches["0"] ){
		X = e.changedTouches["0"].clientX;
		Y = e.changedTouches["0"].clientY;
	}else{
		X = e.clientX;
		Y = e.clientY;
	}
	exportRoot.sheep.set({x:X, y:Y});
	exportRoot.sheep.bodys.graphics._fill.style = `#${(220+36*Math.random()|0).ts(16)}${(220+36*Math.random()|0).ts(16)}${(220+36*Math.random()|0).ts(16)}`;
	ReDraw();
}

//Tick函數
const stageTick = e =>{
	//stage.update();
	stage.draw(canvas.getContext("2d"), false);
}

//重繪
const ReDraw = () =>{
	if(null!=stage && null!=canvas){
		//stage.clear();
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

	//畫布像素
	canvas.width = w;
	canvas.height = h;

	//重繪主要畫布
	ReDraw();
}

})();
