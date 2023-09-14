let prevScrollPos = window.scrollY;
const navbar = document.getElementById("navbar");

window.onscroll = () => {
    const currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = `-${navbar.clientHeight}px`;
    }

    prevScrollPos = currentScrollPos;
};
