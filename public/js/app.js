console.log('Client Side javascript file is loaded!');
window.onload=function(){
var inp=document.getElementById('inp');
var btn=document.getElementById('btn');
var d1=document.getElementById('d1');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');

var loading=document.getElementById('loading');

btn.addEventListener('click',(event)=>{
    p1.innerHTML="";
    p2.innerHTML="";
    p3.innerHTML="";
    var loading=document.createElement('img');
    loading.setAttribute('src', '/img/giphy.gif');
    loading.style.width="30%";
    p1.appendChild(loading);

    fetch('http://localhost:3000/weather?address='+inp.value).then((response) => {
        response.json().then((data1) => {
            if (data1.location==this.undefined) {
                console.log(data1.error);
                p1.innerHTML=data1.error;
                p2.innerHTML="";
                p3.innerHTML="";
            }
            else{
                console.log(data1);
                p1.innerHTML = data1.location
                p2.innerHTML = 'Temperature is ' + data1.temperature+' And Rain Probability is '+data1.RainProbability
                if(data1.summary)
                p3.innerHTML='Overall Summary is '+data1.summary
            }
        })
    })
})
}