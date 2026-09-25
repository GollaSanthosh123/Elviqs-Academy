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
/* =====================================================
   TOP 10 LEADERBOARD
   Names and scores loaded from top10.txt
   Format:
   Name|Score
   ===================================================== */

async function loadTop10() {

    try {

        const response = await fetch("top10.txt");

        if (!response.ok) {
            throw new Error("Could not load top10.txt");
        }

        const text = await response.text();

        const students = text
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(line => line !== "")
            .slice(0, 10);

        const leaderboard =
            document.getElementById("top10Leaderboard");

        if (!leaderboard) return;

        const medals = ["🥇", "🥈", "🥉"];

        leaderboard.innerHTML = "";

        students.forEach((student, index) => {

            // Split Name and Score
            const parts = student.split("|");

            const name = parts[0].trim();
            const score = parts[1]
                ? parts[1].trim()
                : "--/30";

            const rank = index + 1;

            const row = document.createElement("div");

            row.className = "leader-row";

            // Medal for Top 3, normal number for others
            const rankDisplay =
                medals[index]
                    ? `${medals[index]} ${rank}`
                    : `${rank}`;

            row.innerHTML = `
                <b>${rankDisplay}</b>
                <span>${name}</span>
                <strong>${score}</strong>
            `;

            leaderboard.appendChild(row);

        });

    } catch (error) {

        console.error("Top 10 loading error:", error);

    }

}

loadTop10();
/* =====================================================
   SOCIAL MEDIA LINKS
   ===================================================== */

document.querySelectorAll("[data-linkedin]").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const linkedinLink = ELVIQ_LINKS.linkedin;

        if (!linkedinLink || linkedinLink.trim() === "") {

            alert("LinkedIn link will be available soon.");

            return;

        }

        window.open(linkedinLink, "_blank");

    });

});


document.querySelectorAll("[data-instagram]").forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();

        const instagramLink = ELVIQ_LINKS.instagram;

        if (!instagramLink || instagramLink.trim() === "") {

            alert("Instagram link will be available soon.");

            return;

        }

        window.open(instagramLink, "_blank");

    });

});
/* =====================================================
   FEEDBACK FORM
   Clear form after successful submission
===================================================== */

const feedbackForm = document.querySelector("#feedback form");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = feedbackForm.querySelector(".feedback-submit");
        const originalText = submitButton.textContent;

        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;

        try {
            const formData = new FormData(feedbackForm);

            const response = await fetch(feedbackForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                feedbackForm.reset();

                submitButton.textContent = "Feedback Submitted ✓";

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2500);

            } else {
                throw new Error("Submission failed");
            }

        } catch (error) {
            console.error("Feedback submission error:", error);

            submitButton.textContent = "Try Again";
            submitButton.disabled = false;

            alert("Unable to submit feedback. Please try again.");
        }
    });
}