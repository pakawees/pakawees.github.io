const starsContainer =
    document.getElementById("stars");

for(let i=0;i<300;i++){

    const star =
        document.createElement("div");

    star.classList.add("star");

    star.style.left =
        Math.random()*100 + "%";

    star.style.top =
        Math.random()*100 + "%";

    star.style.opacity =
        Math.random();

    starsContainer.appendChild(star);
}
