/* =====================================================
   ELVIQ'S ACADEMY
   Website JavaScript
   ===================================================== */


/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("active");

    });


    // Close menu after clicking a navigation link

    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

        });

    });

}


/* =====================================================
   GOOGLE FORM HANDLER
   ===================================================== */

function openForm(formName) {

    const link = ELVIQ_LINKS[formName];


    // If the link has not been added yet

    if (!link || link.trim() === "") {

        alert(
            "The application form for this program will be available soon."
        );

        return;

    }


    // Open Google Form

    window.open(link, "_blank");

}


/* =====================================================
   INTERNSHIP APPLY BUTTONS
   ===================================================== */

document.querySelectorAll("[data-form]").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const formName = this.dataset.form;

        openForm(formName);

    });

});


/* =====================================================
   WHATSAPP BUTTON
   ===================================================== */

document.querySelectorAll("[data-whatsapp]").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();


        const whatsappLink = ELVIQ_LINKS.whatsapp;


        if (!whatsappLink || whatsappLink.trim() === "") {

            alert(
                "The Elviq's Academy WhatsApp group link will be available soon."
            );

            return;

        }


        window.open(whatsappLink, "_blank");

    });

});


/* =====================================================
   EMAIL
   ===================================================== */

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {

    if (
        ELVIQ_LINKS.email &&
        !ELVIQ_LINKS.email.includes("YOUR_EMAIL")
    ) {

        link.href = "mailto:" + ELVIQ_LINKS.email;

    }

});


/* =====================================================
   CURRENT YEAR
   ===================================================== */

console.log(
    "Elviq's Academy website loaded successfully."
);