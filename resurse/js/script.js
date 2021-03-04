window.onload=function(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
    var obF;
    var vect_aleator=["Vacanta placuta", "Puisorii zboara", "Viata nu trebuie sa fie grea"];
	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un stfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					obF=obJson.filozofi;
					localStorage.setItem("original", JSON.stringify(obF));
					afiseajaJsonTemplate(obF);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/filozofi.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
	function afiseajaJsonTemplate(obF) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de filozofi din obJson
			for(let i=0;i<obF.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
				//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
				textTemplate+=ejs.render("<div class='templ_filozof'>\
				<p>Id: <%= filozof.id %></p>\
				<p>Skills: <%= filozof.skills %></p>\
				<p>Nume: <%= filozof.nume %> </p>\
				<p>Deces: <%= filozof.deces %></p>\
				<p>Opere: <%= filozof.Lucrari %></p>\
				</div>", 
				{filozof: obF[i]});
			} 
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
			
	}
	
	//sortare
	document.getElementById("sorteazaC").onclick = function () {
		obF.sort(function (a, b) {
			return a.deces - b.deces;
		});
		afiseajaJsonTemplate(obF);
	}
	
	document.getElementById("sorteazaD").onclick = function () {
		obF.sort(function (a, b) {
			return b.deces - a.deces;
		});
		afiseajaJsonTemplate(obF);
	}
	
	//IV. 3. a.
	//sortare dupa 3 chei, in cazul meu: nume, skill, id
	document.getElementById("sorteaza_a").onclick = function () {
		let crit=function (a, b) {
			return a.nume.localeCompare(b.nume) || a.skills.localeCompare(b.skills) || a.id - b.id;
		}
		obF.sort(crit);
		afiseajaJsonTemplate(obF);
	}
	
	
	//IV. 3. c.
	//sortare dupa finalul numelui si apoi dupa numele complet
	document.getElementById("sorteaza_c").onclick = function () {
		var crit=function (a, b) {
			return a.nume.slice(a.nume.length-4).localeCompare(b.nume.slice(b.nume.length-4)) ||  a.nume.localeCompare(b.nume) ;
		}
		obF.sort(crit);
		afiseajaJsonTemplate(obF);
	}
	
	//IV. 3. d.
	//voi sorta dupa numarul de opere
	document.getElementById("sorteaza_d").onclick = function () {
		
		let crit=function (a, b) {
			return a.Lucrari.split(",").length - b.Lucrari.split(",").length;
		}
		obF.sort(crit);
		afiseajaJsonTemplate(obF);
	}
	
	//reset
	document.getElementById("reset").onclick = function () {
		obF = JSON.parse(localStorage.getItem("original"));
		afiseajaJsonTemplate(obF);
	}
	
	
	// stergere
    document.getElementById("selecteaza_nobel").onclick=function(){
    var rasp_prompt=prompt("Sterge filozofii cu numele ...");
    var rasp_confirm=confirm("Stergi?")
    if(rasp_confirm)
    {
        var c=document.getElementsByClassName("templ_filozof");


        for(let i=0;i<c.length;i++)
        {
            var co=c[i].children[2].innerHTML.split(" ")[1];
            
            if(co==rasp_prompt)
            {
				c[i].remove();
            i-=1;}
        }
    }
    }
	
	//calculare
	var rez ="";
    document.getElementById("selecteaza_tanar").onclick = function () {
        var max=-1;
        var c=document.getElementsByClassName("templ_filozof");
        for(let i=0; i<c.length; i++)
            if(Number(c[i].children[3].innerHTML.split(" ")[1])>max)
            {max=Number(c[i].children[3].innerHTML.split(" ")[1]);
            rez=c[i].children[2].innerHTML.split(" ")[1];
            }
		localStorage.setItem("minim", rez);
        alert("Cel mai recent decedat filozof este " +rez )    
    }
	document.getElementById("rezultat").innerHTML = localStorage.getItem("minim");
	
	
	//FILTRARE
	document.getElementById("filtru_multiplu").onclick=function(){
        var optiune = document.getElementById("select_multiplu").options;
        var filtrez = [];
        for(let opt of optiune){
                if(opt.selected)
                       for(let fl of obF)
                        if(opt.value == fl.skills)
                            filtrez.push(fl);
        }
        afiseajaJsonTemplate(filtrez);
}

   //SetTimeout
   document.getElementById("time_out").onclick = function () {
    setTimeout(function(){ alert("Bine ai venit"); },3000);
   }
  //SetInterval  
   var v=setInterval(schimb,800);
   function schimb () {
     var x=document.getElementsByTagName("button");
	 for(i=0;i<x.length;i++)
     x[i].style.backgroundColor = x[i].style.backgroundColor == "brown" ? "#F4A460" : "brown" 
   }
 

 //II 2.Aparitie treptata cuvant
 var i1=0;
 var continut="";
 var paragraf = document.getElementById("p1");
 var aux= p1.textContent.split(" ");
 p1.textContent="";
 function Treptat(){
	 if(i1<aux.length)
	 {
		 continut = continut + " " + aux[i1];
		 paragraf.textContent= continut;
		 i1++;
		 setTimeout(Treptat,333);
	 }
 }
 Treptat();
 
 var i2=0;
 var continut2="";
 var paragraf2 = document.getElementById("p2");
 var aux2= p2.textContent.split(" ");
 p2.textContent="";
 function Treptat2(){
	 if(i2<aux2.length)
	 {
		 continut2 = continut2 + " " + aux2[i2];
		 paragraf2.textContent= continut2;
		 i2++;
		 setTimeout(Treptat2,333);
	 }
 }
 Treptat2();
 
}