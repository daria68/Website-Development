let pg = window.location.pathname;
setInterval(function()
{
	if(!localStorage.getItem(pg))
		localStorage.setItem(pg,0);
	let nr_sec = parseInt(localStorage.getItem(pg));
	nr_sec++;
	localStorage.setItem(pg, nr_sec);
document.getElementsByTagName("footer")[0].innerHTML+= "<br> <b> Timp petrecut pe aceasta pagina-> minute:" + parseInt(nr_sec/60) + " secunde:" + parseInt(nr_sec);
},1000);

