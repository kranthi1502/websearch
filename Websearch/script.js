var spellcheckurl='https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/SpellCheck?text=';
var websearchurl1="https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=";
var websearchurl2="&pageNumber=1&pageSize=15&autoCorrect=true";
const options={
		method: "GET",
		headers: {
			"x-rapidapi-key": "c5904346e9msh1f5402b24a63aebp19f6a7jsn6d94d35fb5ce",
			
			"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
		}
	}


var wrapdiv=document.getElementById('mainid');
var searchdetails=document.getElementById('searchTerm');
searchdetails.addEventListener('keyup',async (e)=>{
    searchstring=e.target.value.toLowerCase();
	console.log(searchstring);
})
var searchbtn=document.getElementById('searchButton');
searchbtn.addEventListener('click',async ()=>{
	const res=await fetch(spellcheckurl+searchstring,options);
	const data=await res.text();
	searchvalidstring=data;
	console.log(searchvalidstring);
	const webres=await fetch(websearchurl1+searchvalidstring+websearchurl2,options);
	const webdata=await webres.json();
	console.log(webdata);
	
	wrapdiv.innerHTML=" ";
	var row=document.createElement('div');
	row.setAttribute('class','row');
	var relatedtext=" ";
	var col=document.createElement('div');
		col.setAttribute('class','col-12');
	for(let i=0;i<webdata['relatedSearch'].length;i++){
		relatedtext+=webdata['relatedSearch'][i]+','
	}
	col.innerHTML='<i>'+relatedtext+'</i>';
	row.append(col);
	var div2=document.createElement('div');
		div2.setAttribute('class','container');
	div2.append(row);
	for(let i=0;i<webdata['value'].length;i++){
		var div1=document.createElement('div');
		div1.setAttribute('class','grid2');
		var row1=document.createElement('div');
		row1.setAttribute('class','row rowdata');
		var col1=document.createElement('div');
		col1.setAttribute('class','col-9');
		var title1=document.createElement('h6');
		title1.setAttribute('class','title1');
		title1.innerHTML='<h5><i><a href='+webdata['value'][i]['url']+'>'+webdata['value'][i]['title']+'</a></i></h5><br>';
		var p=document.createElement('p');
		p.setAttribute('class','pi');
		p.innerHTML=webdata['value'][i]['description'];
		var p1=document.createElement('p');
		p1.setAttribute('class','pi1');
		p1.innerHTML=webdata['value'][i]['body'];
		col1.append(title1,p,p1);
		row1.append(col1);
       div1.append(row1);
	   div2.append(div1);
	}
	wrapdiv.append(div2);
})
var imagesurl='https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=';
var imageurl1='car&pageNumber=1&pageSize=500&autoCorrect=true';
async function displayimg(){
	console.log("a");
	const res=await fetch(spellcheckurl+searchstring,options);
	const data=await res.text();
	searchvalidstring=data;
	const imgres=await fetch(imagesurl+searchvalidstring+imageurl1,options);
	const imgdata=await imgres.json();
	console.log(imgdata);
	wrapdiv.innerHTML=" ";
	var div=document.createElement('div');
	div.setAttribute('class','grid');
	var divr=document.createElement('div');
	divr.setAttribute('class','row myrow1 offset-1');
	for(let i=0;i<imgdata['value'].length;i++){
	var divc=document.createElement('div');
	divc.setAttribute('class','mycolimg col-lg-3 col-md-4 col-sm-6');
	var img=document.createElement('img');
	img.setAttribute('class','img1');
	img.src=imgdata['value'][i]['url'];
	
	divc.append(img);
	divr.append(divc);
	div.append(divr);
	}
	wrapdiv.append(divr);
}
var newsurl='https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=';
var newsurl2='&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null';
async function displaynews(){
	const respellsp=await fetch(spellcheckurl+searchstring,options);
	const data1=await respellsp.text();
	validstring=data1;
	const newsres=await fetch(newsurl+validstring+newsurl2,options);
	const newsdata=await newsres.json();
	console.log(newsdata);
	wrapdiv.innerHTML='';
	var div=document.createElement('div');
	div.setAttribute('class','container');
	for(let i=0;i<newsdata['value'].length;i++){
		var text1="";
		var div1=document.createElement('div');
		div1.setAttribute('class','grid1')
		var row1=document.createElement('div');
		row1.setAttribute('class','row myrow');
		var col1=document.createElement('div');
		col1.setAttribute('class','col-9');
		var title1=document.createElement('h6');
		title1.setAttribute('class','title1');
		title1.innerHTML='<h5><i><a href='+newsdata['value'][i]['url']+'>'+newsdata['value'][i]['title']+'</a></i></h5><br>';
		var p=document.createElement('p');
		p.setAttribute('class','para');
		p.innerHTML=newsdata['value'][i]['description'];
		col1.append(title1,p);
		row1.append(col1);
		div1.append(row1)
		div.append(div1);
	}
	wrapdiv.append(div);

}