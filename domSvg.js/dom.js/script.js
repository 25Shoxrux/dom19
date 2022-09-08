let forms = document.forms[0]
let pattern = {
    name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    surname: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    userInfo: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    css: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    js: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    favCar: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    html: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    age: /^100|[1-9]?\d$/
}
let form = document.forms.signup
let inputs = forms.querySelectorAll('input[data-req]')
let button = forms.querySelector('button')
let box = forms.querySelectorAll('div[data-box]')


let requireFields = document.querySelectorAll('.blue')
let allFields = document.querySelector('#all')
let needFields = document.querySelector('#need')
let success = document.querySelector('#success')
let error = document.querySelector('#error')

function validate(field, regex) {
    if (regex.test(field.value)) {
        field.classList.add('green')
        field.classList.remove('red2')
      
    } else {
        field.classList.add('red2')
        field.classList.remove('green')
    }
}



inputs.forEach(input => {
    input.onkeyup = () => {
        validate(input, pattern[input.name])
    }
});


let isLoading = false
let elem = document.querySelector('.img');
function svg(){
    box.forEach(imgSvg => {
        let exist = imgSvg.querySelector('.img')
        if(exist != undefined){
            imgSvg.removeChild(exist)
        }
    })
}

form.onsubmit = (event) => {
    event.preventDefault()
    let = isError = false
    let success_count = 0
    let error_count = 0
    
    svg()
    inputs.forEach(inp => {
        if (inp.classList.contains('red2') || inp.value.length === 0 && inp.getAttribute('data-req') == "") {
            isError = true
            inp.className = "red2"
            error_count++
            inp.nextSibling.nextSibling.innerHTML = "Please enter your email adress"
            inp.nextSibling.nextSibling.style.color = "red"
            button.style.background = "red"
            let errImg = document.createElement('div')
            errImg.classList.add('img')
            inp.parentNode.appendChild(errImg)
                

        }
            
           
        
        if (inp.classList.contains('green') || inp.value.length > 0 && inp.getAttribute('data-req') == "") {
            success_count++
            button.style.background = "#06c"
            inp.nextSibling.nextSibling.innerHTML = "Need to fill"
            inp.nextSibling.nextSibling.style.color = "green"
            
        }
    });
        if(isError === false){
                submit()
            } else{
                alert('error')
            }
    error.innerHTML = error_count
    success.innerHTML = success_count

 
    if(error_count === 0) {
        isLoading = !isLoading
        LoadingWathcer()
        setTimeout(() => {
            submit()
        }, 3000);
    } 
}

function submit() {
    let user = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        user[key] = value
    })
    
    console.log(user);

    inputs.forEach(inp => {
        inp.value = ""
        inp.className = ""
        isLoading = false
        LoadingWathcer()
    })
}

function LoadingWathcer() {
    if (isLoading) {
    
        button.innerHTML = "Loading..."
        button.style.background = "#06c"
    } else {
        button.innerHTML = "Save changes"
    }
}

// console.log(LoadingWathcer());
// -----------------------------------------------------------------------------------------


