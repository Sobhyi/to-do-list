let dataInput = document.querySelector('.dataInput');
let add = document.querySelector('.add');
let clear = document.querySelector('.clear');
let res = document.querySelector('.res');
let wrong = document.querySelector('.error');
let resultBox =document.querySelector('.result-box');
let sure = document.querySelector('.sure');
let sure_yes = document.querySelector('.btn-yes');
let sure_no = document.querySelector('.btn-no');
let screen1 = document.querySelector('.screen1');
let screen2 = document.querySelector('.screen2');
let view = document.querySelector('.view');
let tasks = [];

//check function if it is empty
let check_is_empty =()=>{
    console.log(resultBox.childElementCount);
    console.log(resultBox.children);
    if(resultBox.childElementCount > 0){
        res.style.display="none";
    }else{
       res.style.display="block";     
    }

}


//add function
let addF = () => {

let inputValue = dataInput.value.trim();

for(i=0;i<tasks.length;i++){
    
    if(inputValue == tasks[i]){
        wrong.innerHTML=`<p><i class="fa-solid fa-triangle-exclamation"></i> You already have a task with this name</p>`  
        wrong.style.display="block";
        dataInput.style.border="2px solid red";
        return;
    }
}

if(inputValue.length<3 || inputValue.length>20 ){//check carchters
wrong.innerHTML=`<p><i class="fa-solid fa-triangle-exclamation"></i>Enter task charchters between 3 and 20 </p>`  
wrong.style.display="block";
dataInput.style.border="2px solid red";
return;
}
let no1 = Math.floor(Math.random() * 128) + 128; 
let no2 = Math.floor(Math.random() * 128) + 128; 
let no3 = Math.floor(Math.random() * 128) + 128;
wrong.style.display="none";
dataInput.style.border="2px solid black";
resultBox.innerHTML +=`
<div class ="res2" style="background-color : rgb(${no1},${no2},${no3})">
<p class="res2p"><i class="fa-solid fa-square i_check" style="color: #ffffff;"></i>${inputValue} <i class="fa-regular fa-trash-can fa-lg trash i_trash" style="color: #ff0000;"></i></p>
</div>
`;
tasks.push(inputValue);
dataInput.value="";
check_is_empty();
counter_update();

}

//delete function
let delete_all=()=>{

sure.style.display="block";


sure_yes.addEventListener('click',function(){
    resultBox.innerHTML="";
    resultBox.innerHTML=`<div class="res">
             <p>Empty tasks <i class="fa-regular fa-circle-xmark fa-xl" style="color: #ff0000;"></i></p>
         </div>`  
         sure.style.display="none";
         for(let i =0;i<tasks.length;i++){
            tasks[i]="";
         }
         counter_update();
        
})

sure_no.addEventListener('click',function(){

    sure.style.display="none";
    
})

}


//delete by trash icon
document.addEventListener('click',function(event){
    if(event.target.classList.contains('trash')){
        event.target.closest('.res2').remove();
        
        check_is_empty();
        counter_update();
        
        }
}
);

//checked if task is done function
document.addEventListener('click',function(event){
let res2Element = event.target.closest('.res2');
let check_icon = res2Element.querySelector('.i_check')

if(res2Element){
    res2Element.classList.toggle('checked');
    
    if(res2Element.classList.contains('checked')){
        
        check_icon.classList.remove('fa-square');
        check_icon.classList.add('fa-square-check');
        check_icon.style.color = "#ffffff";
    }else{
        
        check_icon.classList.remove('fa-square-check');
        check_icon.classList.add('fa-square');
        check_icon.style.color = "#ffffff";
    } 
counter_update();
}
})

//counter finished and pending task function
let counter_update = ()=>{
    //nodelist foreach 
let checked_no = resultBox.querySelectorAll('.res2.checked').length;
let unchecked_no = resultBox.querySelectorAll('.res2:not(.checked)').length;

screen1.innerHTML=`<p>finished tasks: ${checked_no}</p>`;
screen2.innerHTML=`<p>pending tasks: ${unchecked_no}</p>`;

}



//Events
add.addEventListener('click',addF);
clear.addEventListener('click',delete_all)
