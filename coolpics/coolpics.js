const menuButton = document.querySelector(".menu");
const navList = document.querySelector("nav ul");

menuButton.addEventListener("click", () => {
    navList.classList.toggle("open");
});

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}
window.addEventListener("resize", handleResize);
handleResize();

const gallery = document.querySelector(".gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeModal");

gallery.addEventListener("click", (event) => {
    const clickedImg = event.target.closest("img");
    if (clickedImg) {
        const src = clickedImg.src.split("-")[0] + "-full.jpeg";
        const alt = clickedImg.alt.replace("small", "full");
        modalImg.src = src;
        modalImg.alt = alt;
        modal.showModal();
    }
});

closeBtn.addEventListener("click", () => {
    modal.close();
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});