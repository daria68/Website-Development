window.onload=function(){
//Niv1, 8
document.getElementById("ascunde_informatie").onclick=function(){
  var poze = document.getElementsByTagName("img");
  if(this.innerHTML=="Ascunde poze")
  {
	  this.innerHTML="Afiseaza poze";
	  for (i=0;i< poze.length; i++)
		poze[i].style.display="none";
  }
  else
  {
	  this.innerHTML="Ascunde poze";
	  for (i=0;i< poze.length; i++)
		poze[i].style.display="grid";
  }
  
}


function count(){
  var nr=0;
  var cuvinte = document.getElementsByTagName("body");
  for( var i=0; i<cuvinte.length; i++)
  {
	nr += cuvinte[i].innerText.split(" ").length;
  }
  document.getElementsByTagName("footer")[0].innerHTML+="Numarul de cuvinte de pe aceasta pagina este: " + nr;
}
count();


//Niv II. 3
$(document).ready(function(){

    $("#T1").fadeOut();
    $("#T11").fadeOut();
	$("#T2").fadeOut();
    $("#T10").fadeOut();
	$("#T3").fadeOut();
    $("#T9").fadeOut();
	$("#T4").fadeOut();
	$("#T8").fadeOut();
	$("#T5").fadeOut();
	$("#T7").fadeOut();
	$("#T6").fadeOut();
	
    $("#T1").fadeIn(1000);
    $("#T11").fadeIn(1000);

    $("#T2").fadeIn(2000);
    $("#T10").fadeIn(2000);

    
    $("#T3").fadeIn(3000);
    $("#T9").fadeIn(3000);

    
    $("#T4").fadeIn(4000);
	$("#T8").fadeIn(4000);
	
	
    $("#T5").fadeIn(5000);
	$("#T7").fadeIn(5000);

    $("#T6").fadeIn(6000);
 });


//Niv1, 7
var vec=["Platon a fost primul care a delimitat lumea materială de „lumea ideilor” ", "Fondatorul introspecționismului este filosoful britanic John Locke", "Se poate spune ca regula de aur a eticii: „ce ție nu-ți place – altuia nu-i face” face parte din conceptia imperativului categoric a lui Kant", " Renumita maximă „Cuget, deci exist”, a apărut ca urmare a dorinței lui René Descartes de a gasi primul adevăr absolut și incontestabil "];
function rnd()
{
	var poz=Math.floor(Math.random()*vec.length)
	document.getElementById("mesaj_aleator").innerHTML=vec[poz];
}
rnd();

var canvas = document.getElementById("inima");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight*0.7;
var c = canvas.getContext("2d");

var img = new Image();
img.src='poze/confucius.png';
var nr=10;
var cnf=[];
for(var i=0;i<nr;i++){
	var x=Math.floor(Math.random()*canvas.width);
	var y=Math.floor(Math.random()*canvas.height);
	cnf[i]=new Confucius(x,y);
}


function Confucius(x,y){
	this.x=x;
	this.y=y;
	
	this.dx = Math.floor(Math.random() * 4) + 1;
	this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	this.dy = Math.floor(Math.random() * 4) + 1;
	this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	
	 this.draw = function () {
	  c.beginPath();
	  c.drawImage(img,this.x,this.y,40,40);
	}
	
	 this.animate = function () {
	  this.x += this.dx;
	  this.y += this.dy;
	  
	  if (this.x > canvas.width || this.x< 0) {
	   this.dx = -this.dx;
	  }
	  
	  if (this.y > canvas.height || this.y < 0) {
	   this.dy = -this.dy;
	  }
	  
	  this.draw();
 }
	
} 



function update(){
	c.clearRect(0,0,canvas.width,canvas.height);
	for (var i=0;i<nr;i++){
		var con=cnf[i];
		con.animate();
	}
	window.requestAnimationFrame(update);
}

update();
}