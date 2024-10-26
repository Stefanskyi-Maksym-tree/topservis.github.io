window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.Header__Nav');
    const menuItem = document.querySelectorAll('.Header__Men');
    const hamburger = document.querySelector('.Header__Hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('Header__Hamburger__Active');
        menu.classList.toggle('Header__Active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('Header__Hamburger__Active');
            menu.classList.toggle('Header__Active');
        });
    });


    $(window).scroll(function () {
    if ($(window).width() > 991) {
        if ($(this).scrollTop() > 1600) {
            $('.ScrollUp').fadeIn();
        } else {
            $('.ScrollUp').fadeOut();
        }
    } else {
        $('.ScrollUp').fadeOut();
    }
    });

    $('#Order form').validate({
        rules: {
            name: "required",
            phone: "required"
        },
        messages: {
            name: "Please specify your name",
            phone: "Please enter your phone number"

        }
    });
        
    $('#Over form').validate({
        rules: {
            name: "required",
            phone: "required"
        },
        messages: {
            name: "Please specify your name",
            phone: "Please enter your phone number"

        }
    });
    
    $('input[name=phone]').mask("+420(999)999-999");

    $('.BtnCall').on('click', function(e) {
        $('.OverLay, .OverLay__WrapperInput'). fadeIn();
    });

    $('.OverLay__Close').on('click', function(e) {
        $('.OverLay, .OverLay__WrapperInput').fadeOut();
    });

    $('.BtnSmall').on('click', function(e) {
        $('.OverLay, .OverLay__WrapperInput'). fadeIn();
    });

    $('.OverLay__Close').on('click', function(e) {
        $('.OverLay, .OverLay__WrapperInput').fadeOut();
    });

    var $page = $('html, body');

    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });

});

// Отримуємо всі форми на сторінці
const forms = document.querySelectorAll('form');

forms.forEach(form => {

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const result = form.querySelector('#result');

    const name = form.querySelector('input[name="name"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();

    if (!name || !phone) {
      result.innerHTML = "Будь ласка, заповніть усі обов'язкові поля.";
      return;
    }

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    result.innerHTML = "Будь ласка, зачекайте...";

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        result.innerHTML = json.message;

        $('.OverLay__WrapperInput').fadeOut('slow');
        $('.OverLay, .OverLay__Thanks').fadeIn('');
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Щось пішло не так!";
    })
    .finally(function() {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
  });
});
