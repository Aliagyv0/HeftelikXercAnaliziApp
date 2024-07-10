const expenses = {
    qida: Array(7).fill(0),
    neqliyyat: Array(7).fill(0),
    tehsil: Array(7).fill(0),
    kommunikasiya: Array(7).fill(0),
    geyim: Array(7).fill(0),
    diger: Array(7).fill(0)
};
const kinds = ["qida","neqliyyat","tehsil","kommunikasiya","geyim","diger"]
const results = document.querySelector("#results");


function addExpense() {
    const day = document.getElementById('day').value;
    const type = document.getElementById('expense-type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (day < 1 || day > 7 || isNaN(amount) || amount < 0) {
        alert('Zəhmət olmasa düzgün məlumat daxil edin.');
        return;
    }

    expenses[type][day - 1] += amount;
    const findElement =document.getElementById(type);
    if (findElement == null) {
        
        const element= document.createElement("div");
        element.className="card";
        element.id=type;
       element.innerHTML=`
       <img src="./image.png" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">${type.charAt(0).toUpperCase() + type.slice(1)} xercleri</h5>
       </div>
       <ul class="list-group list-group-flush">
         <li class="list-group-item">${day} gun ${amount} <span>&#8380;</span> xerclenib.</li>
       </ul>
     `

     
     results.append(element);  
    }
    else{
        const ul =findElement.querySelector("ul");
        ul.innerHTML+=`<li class="list-group-item">${day} gun ${amount} <span>&#8380;</span> xerclenib.</li>`
    }

}

function calculateExpenses() {
    if (document.querySelector("table")) {
        document.querySelector("table").remove();
        
    }
    const totalExpenses = {

        qida: 0,
        neqliyyat: 0,
        tehsil: 0,
        kommunikasiya: 0,
        geyim: 0,
        diger: 0
    };
    const dailyExpenses = Array(7).fill(0);
let umumixerc =0;
let enyukseknov=null;
let enyuksekxerc=0;
let enaznov=Object.entries(expenses)[0][0];
let enazxerc=(Object.entries(expenses)[0][1]).reduce(function(a, b) { return a + b; }, 0);





    

    for (const [type, values] of Object.entries(expenses)) {
        totalExpenses[type] = values.reduce((a, b) => a + b, 0);
        values.forEach((amount, index) => {
            dailyExpenses[index] += amount;
            umumixerc+=amount;

        });
        if (totalExpenses[type]>enyuksekxerc) {
          enyuksekxerc=totalExpenses[type];
enyukseknov=type;
        } 
        if   (totalExpenses[type]<enazxerc  && totalExpenses[type]!=0 ) {
          enazxerc=totalExpenses[type];
          enaznov=type;
          
        }
        
    }
    let encoxerccekilengun = 1;
    let enazerccekilengun =1;
    let max =dailyExpenses[0];
    let min =dailyExpenses[0];
    
    for (let i =0; i<=dailyExpenses.length; i++){
      if (dailyExpenses[i]>max) {
      encoxerccekilengun=i+1;
      max=dailyExpenses[i];
      }
      if(dailyExpenses[i]<min){
        enazerccekilengun=i+1;
        min=dailyExpenses[i]
      }
    }
 

   
    
    const table =document.createElement("table");
    table.className="table";
    table.innerHTML=`
  <thead>
    <tr>
      <th scope="col">#</th>
      
    </tr>
  </thead>
  <tbody>
     <tr><th scope="row">1</th></tr>
     <tr><th scope="row">2</th></tr>
     <tr><th scope="row">3</th></tr>
     <tr><th scope="row">4</th></tr>
     <tr><th scope="row">5</th></tr>
     <tr><th scope="row">6</th></tr>
     <tr><th scope="row">7</th></tr>
  </tbody>`;
  kinds.forEach((k)=>{ table.querySelector("thead>tr").innerHTML+=` <th scope="col">${k}</th>`});

for (const [type,values ] of Object.entries(expenses)) {

for (const [index, item] of values.entries()) {
 
    table.querySelector(`tbody>tr:nth-child(${index+1})`).innerHTML+=`<td>${item}</td>`  
  }

}
const div = document.createElement("div");
div.className="card";
div.style.width="100%"
div.innerHTML=`
  <div class="card-header">
    Xerc Analizi
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Hefte erzinde toplam xerc: $${umumixerc}</li>
    <li class="list-group-item">Ən çox xerc cekilmis növ ve miqdari: ${enyukseknov}  : $${enyuksekxerc}</li>
    <li class="list-group-item">Ən az xerc çəkilmis nov və miqdarı: ${enaznov} : $${enazxerc}</li>
    <li class="list-group-item">Gunluk ortalama xerc: $${Math.round(umumixerc/7)}</li>
     <li class="list-group-item">Ən çox  xerc cekilmis gun ve miqdari: ${encoxerccekilengun} gun: $${max}</li>
     <li class="list-group-item">Ən az  xerc cekilmis gun ve miqdari: ${enazerccekilengun} gun: $${min}</li>
  </ul>`
results.prepend(table);
results.prepend(div);


}

const xercelaveet=document.querySelector(".btn-primary");
xercelaveet.addEventListener("click",()=>{addExpense()})
const hesabla = document.querySelector(".btn-success");
hesabla.addEventListener("click",()=>{calculateExpenses()});

   
