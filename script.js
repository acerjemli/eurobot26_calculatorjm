const fields = [
    {id:"nid", label:"Nid (2 pts)", pts:2},
    {id:"gm", label:"Garde-manger (3 pts)", pts:3},
    {id:"bonus", label:"Zones bonus (5 pts)", pts:5},
    {id:"cursor", label:"Curseur (X pt)", pts:1},
    {id:"occ", label:"Garde-manger occupé (5 pts)", pts:5}
];

const checkFields = [
    {id:"part", label:"Robot partiel (+5)", pts:5},
    {id:"comp", label:"Robot complet (+10)", pts:10},
    {id:"pami", label:"PAMI (+10)", pts:10}
];

const commonFields = [
    {id:"frigoV", label:"Frigos vides (2 pts)", pts:2},
    {id:"frigoP", label:"Frigos pleins (5 pts)", pts:5}
];

function createControls(container, prefix){
    fields.forEach(f=>{
        container.innerHTML += `
        <div class="row">
            ${f.label}
            <div class="control">
                <button onclick="change('${prefix}_${f.id}',-1)">-</button>
                <div class="value" id="${prefix}_${f.id}">0</div>
                <button onclick="change('${prefix}_${f.id}',1)">+</button>
            </div>
        </div>`;
    });

    checkFields.forEach(f=>{
        container.innerHTML += `
        <div class="row">
            ${f.label}
            <button onclick="toggle('${prefix}_${f.id}')">+/-</button>
            <div class="value" id="${prefix}_${f.id}">0</div>
        </div>`;
    });
}

function createCommon(container){
    commonFields.forEach(f=>{
        container.innerHTML += `
        <div class="row">
            ${f.label}
            <div class="control">
                <button onclick="change('${f.id}',-1)">-</button>
                <div class="value" id="${f.id}">0</div>
                <button onclick="change('${f.id}',1)">+</button>
            </div>
        </div>`;
    });
}

createControls(document.getElementById("yellowFields"),"y");
createControls(document.getElementById("blueFields"),"b");
createCommon(document.getElementById("commonFields"));

function change(id,delta){
    let el=document.getElementById(id);
    let v=parseInt(el.innerText);
    v+=delta;
    if(v<0) v=0;
    el.innerText=v;
    calc();
}

function toggle(id){
    let el=document.getElementById(id);
    el.innerText = el.innerText=="0" ? "1" : "0";
    calc();
}

function teamScore(prefix){
    let s=0;

    fields.forEach(f=>{
        s += parseInt(document.getElementById(prefix+"_"+f.id).innerText)*f.pts;
    });

    checkFields.forEach(f=>{
        if(parseInt(document.getElementById(prefix+"_"+f.id).innerText)==1)
            s+=f.pts;
    });

    let common=0;
    commonFields.forEach(f=>{
        common+=parseInt(document.getElementById(f.id).innerText)*f.pts;
    });

    return s+common;
}

function calc(){
    let y=teamScore("y");
    let b=teamScore("b");

    document.getElementById("scoreY").innerText=y;
    document.getElementById("scoreB").innerText=b;

    if(y>b) document.getElementById("winner").innerText="Victoire JAUNE 🟡";
    else if(b>y) document.getElementById("winner").innerText="Victoire BLEUE 🔵";
    else document.getElementById("winner").innerText="ÉGALITÉ";
}

let time = 0;
let timerInterval = null;

function startTimer(){
    if(timerInterval !== null) return;

    timerInterval = setInterval(()=>{
        time++;
        document.getElementById("timer").innerText = time;
        if(time === 85){
            document.getElementById("timer").innerText = "⚡ Lancez PAMI !";
        }
        if(time >= 100){
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById("timer").innerText = "FIN ⏰";
        }
    },1000);
}

function resetTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
    time = 0;
    document.getElementById("timer").innerText = time;
}
