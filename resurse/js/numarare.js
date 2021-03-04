window.onload=function numara(){
  var nr=0;
  var cuvinte = document.getElementsByTagName("body");
  for( var i=0; i<cuvinte.length; i++)
  {
	nr += cuvinte[i].innerText.split(" ").length;
  }
  document.getElementsByTagName("footer")[0].innerHTML+="<b>Numarul de cuvinte de pe aceasta pagina este: " + nr;
}