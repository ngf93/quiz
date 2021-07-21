var modalQuiz = document.getElementById('quiz');
modalQuiz.addEventListener('show.bs.modal', function (event) {
    let arr_slides = Array.from(document.querySelectorAll('.carousel-item'));
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

    /* updating the page numbers of the slider when paging */
    modalQuiz.addEventListener('slid.bs.carousel', function () {
        document.getElementById('currentStep').innerHTML = findCurrent();
    })
});


/* проверка input-ов с атрибутом required и активация/блокировка кнопки submit */
function verifyInput(form){
    let arr_inputs = Array.from(form.querySelectorAll('input[required]'));
    console.log(arr_inputs.length);
  
    function notNull(element, index, array) {
      if(element.type == 'checkbox' && element.checked){
        return element;
      } else if(element.type == 'text' && element.value.trim() != '') {
        return element;
      }
    }
    let flag = arr_inputs.every(notNull);
  
    if (flag) {
      console.log('все поля заполнены');
      form.querySelector('button[type="submit"]').removeAttribute('disabled');
    } else {
      console.log('есть не заполненые поля');
      form.querySelector('button[type="submit"]').setAttribute('disabled', 'disabled');
    }
  }