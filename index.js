const toggle = document.getElementById('toggle');
const sidebar = document.querySelector('.sidebar');
const leftAboutDiv = document.querySelector(".first")
const rightAboutDiv = document.querySelector(".second")
const aboutHead = document.querySelector(".headerOfAbout")
const project1 = document.querySelector(".projectFirst")
const project2 = document.querySelector(".projectSecond")
const project3 = document.querySelector(".projectThird")
const projectHead = document.querySelector(".projectHead");
const advice = document.querySelector(".wordOfAbout")
const projectAdvice = document.querySelector(".advice")
const contactDiv = document.querySelector("#contactForm")
const form = document.querySelector(".contactForma")
const contactBtn = document.querySelector(".contactMe")
const insideOfContact = document.querySelector(".form-content")
const success = document.querySelector(".success")
const loading = document.querySelector(".loading")
const falseDiv = document.querySelector(".false")
const closeBtn = document.querySelector(".closeButton")
const originalFormHTML = insideOfContact.innerHTML;



/*SIDEBAR */

toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('active');
});

sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

document.addEventListener('click', () => {
    sidebar.classList.remove('active');
});





contactBtn.addEventListener("click", (e) => {
    form.reset();
    contactDiv.style.display = "block"        //make display of contact form visible

    e.preventDefault()
})

closeBtn.addEventListener("click", (e) => {
    contactDiv.style.display = "none";
    e.preventDefault()
    form.reset();
}


);

success.addEventListener("click", (e) => {
    if (e.target.classList.contains("closeSuccess")) {
        success.style.display = "none";
        e.preventDefault()
    }


});



const observerOfX = new IntersectionObserver((elements) => {
    elements.forEach(element => {
        if (element.isIntersecting) {
            element.target.classList.add('show');          //this resets the headlines position
            observerOfX.unobserve(element.target);
        }
    });
});

const observerOfY = new IntersectionObserver((elements) => {
    elements.forEach(element => {
        if (element.isIntersecting) {
            element.target.classList.add('showY');       //l used it to reset divs position
            observerOfY.unobserve(element.target);
        }
    });
});

const observerOfFade = new IntersectionObserver((elements) => {
    elements.forEach(element => {
        if (element.isIntersecting) {
            element.target.classList.add('showFade');      //to make fading of cards
            observerOfFade.unobserve(element.target);
        }
    });
});


observerOfFade.observe(project1)
observerOfFade.observe(project2)
observerOfFade.observe(project3)
observerOfX.observe(aboutHead)
observerOfX.observe(projectHead)
observerOfX.observe(advice)
observerOfX.observe(projectAdvice)
observerOfY.observe(leftAboutDiv)
observerOfY.observe(rightAboutDiv)




window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 10) {
        nav.classList.add("blur");                     //makes navs bg blur when scroll
    } else {
        nav.classList.remove("blur");
    }
});




const API_URL = "https://my-site-backend-production.up.railway.app"; // your Railway URL

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    loading.style.opacity = 1;
    contactDiv.style.display = "none"

    const data = {
        name: form.name.value,
        surname: form.surname.value,
        email: form.email.value,
        message: form.message.value
    };

    const res = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });


    if (res.ok) {
        loading.style.opacity = 0;
        success.style.display = "block"

        setTimeout(() => {
            success.style.display = "none"
        }, 1500)


    } else {
        loading.style.opacity = 0;
        falseDiv.style.display = "block"

        setTimeout(() => {
            falseDiv.style.display = "none"
            contactDiv.style.display = "block"
        }, 1500)


    }
});




