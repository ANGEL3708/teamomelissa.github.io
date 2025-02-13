document.addEventListener("DOMContentLoaded", () => {
    const gif = document.getElementById("gif");
    const response = document.getElementById("response");
    const btnYes = document.getElementById("yes");
    const btnNo = document.getElementById("no");

    btnYes.addEventListener("click", () => {
        gif.src = "oso2.gif";  // Cambia a GIF de felicidad
        response.innerHTML = "¡Gracias! 💖🌹";
    });

    btnNo.addEventListener("mouseover", () => {
        const maxX = window.innerWidth - btnNo.clientWidth;
        const maxY = window.innerHeight - btnNo.clientHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        btnNo.style.position = "absolute";
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    });

    btnNo.addEventListener("click", () => {
        gif.src = "imagen.png";  // Cambia a GIF de tristeza
        response.innerHTML = "Oh... 💔";
    });
});
