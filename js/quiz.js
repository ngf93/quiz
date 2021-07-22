var modalQuiz = document.getElementById('quiz');
modalQuiz.addEventListener('show.bs.modal', function (event) {
    let arr_slides = Array.from(this.querySelectorAll('.carousel-item'));
    let count = arr_slides.length;

    /* finding current page number */
    function findCurrent(){
        for(let y = 0; y<count; y++){
            if(arr_slides[y].classList.contains('active')){
                let slideNum = y+1;
                return slideNum;
            }
        }
    }

    /* the initial values of the slider pages */
    document.getElementById('currentStep').innerHTML = findCurrent();
    document.getElementById('allSteps').innerHTML = count;

    /* indicator */
    arr_slides.forEach(function(item, i, arr) {
        let indicator = item.querySelector('.indicators');
        let activeCount = i+1;
        let notActive = count-activeCount;
        let j;
        let elems = [];
        
        for(j = 0; j<activeCount; j++){
            elems.push('<div class="active"></div>');
        }
        for(j = 0; j<notActive; j++){
            elems.push('<div></div>');
        }

        indicator.innerHTML = elems.join(' ');
    });

    let filds = Array.from(this.querySelectorAll('fildset'));
    console.log('filds num ='+filds.length);
    filds.forEach(function(item, i, arr) {
      verifyInput(item);
    });

    /* updating the page numbers of the slider when paging */
    modalQuiz.addEventListener('slid.bs.carousel', function () {
        document.getElementById('currentStep').innerHTML = findCurrent();
    })
});


/* inputs verification if required & verifiable-btn activation/block */
function verifyInput(fildset){
  let requiredElems = Array.from(fildset.querySelectorAll('input[required]'));
  console.log(requiredElems.length);

  if(requiredElems.length == 0){
    return;
  } else {
    let flag = requiredElems.every(notNull);

    if (flag){
      console.log('все поля заполнены');
      fildset.querySelector('.verifiable-btn').removeAttribute('disabled');
    } else {
      console.log('есть не заполненые поля');
      fildset.querySelector('.verifiable-btn').setAttribute('disabled', 'disabled');
    }
  }

  function notNull(element, index, array) {
    if(element.type == 'radio' || element.type == 'checkbox'){
      let name = element.name;
      console.log(name);
      let arrBtns = Array.from(fildset.querySelectorAll('input[name="'+name+'"]'));
      console.log(arrBtns.some(isChecked));
      if(arrBtns.some(isChecked)){return element;}
    } else if (element.type == 'text' && element.value.trim() != ''){
      return element;
    }
  }

  function isChecked(el){
    console.log('value = '+el.value.trim());
    if(el.checked && el.value.trim() != ''){
      return el;
    }
  }
}

/* passing a value from one input to another */
function passValue(inp){
  document.getElementById(inp.dataset.target).value=inp.value;
  document.getElementById(inp.dataset.target).checked = true;
}