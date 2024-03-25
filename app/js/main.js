"use strict"

// меню бургер
const menu = document.querySelector('.header__pupap');
const burger = document.querySelector('.header__burger');

if (menu && burger) {
    burger.addEventListener('click', () => {
        menu.classList.toggle('_active-pup');
        burger.classList.toggle('_active');
    })
}


let selector = document.querySelector("#tel")
let im = new Inputmask("+7(999)999-99-99")
im.mask(selector)
// отправка почты
let validation = new JustValidate("form")

validation.addField("#name", [
    {
        rule: "required",
        errorMessage: "Введите имя"
    },
    {
        rule: "minLength",
        value: 3,
        errorMessage: "Минимум 3 символа"
    }
]).addField("#email", [
    {
        rule: "required",
        errorMessage: "Введите почту"
    },
    {
        rule: "minLength",
        value: 5,
        errorMessage: "Минимум 5 символа"
    },
    {
        rule: 'email',
        errorMessage: "Введите адрес почты"
    }
]).addField("#tel", [
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length > 0)
        },
        errorMessage: 'Введите телефон'
    },
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length === 10)
        },
        errorMessage: 'Введите телефон полностью'
    }
]).onSuccess(async function () {
    let data = {
        name: document.getElementById("name").value,
        tel: selector.inputmask.unmaskedvalue(),
        email: document.getElementById("email").value
    }

    let response = await fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    let result = await response.text()

    alert(result)
})


//анимации
gsap.registerPlugin(ScrollTrigger)

const laptopScreen = window.matchMedia('(min-width:767px)');

// create-section
if (laptopScreen.matches) {
    gsap.fromTo(
        ".wrap-section",
        {
            Percent: -50,
        },
        {
            scrollTrigger: {
                trigger: ".header",
                start: 'bottom 50%',
                end: '1250px',
                scrub: true,
            },
            y: 0,
        });
}

