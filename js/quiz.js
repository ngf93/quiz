var modalQuiz = document.getElementById('quiz');
modalQuiz.addEventListener('show.bs.modal', function (event) {
    let arr_slides = Array.from(document.querySelectorAll('.carousel-item'));
    let count = arr_slides.length;
    document.getElementById('currentStep').append('1');
    document.getElementById('allSteps').append(count);

    /* indicator */
    arr_slides.forEach(function(item, i, arr) {
        let indicators = item.querySelector('.indicators');
        let activeCount = i+1;
        let notActive = count-activeCount;
        let j;
        for(j = 0; j<activeCount; j++){
            indicators.insertAdjacentHTML('beforeend', '<div class="active"></div>');
        }
        for(j = 0; j<notActive; j++){
            indicators.insertAdjacentHTML('beforeend', '<div></div>');
        }
    });

    /* current slide index */
    modalQuiz.addEventListener('slid.bs.carousel', function () {
        for(let y = 0; y<count; y++){
            if(arr_slides[y].classList.contains('active')){
                let slideNum = y+1;
                document.getElementById('currentStep').innerHTML = slideNum;
            }
        }
    })
});

