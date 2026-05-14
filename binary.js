/* =========================================
   BINARY STAR SYSTEM
========================================= */

const systems = [

    {
        canvas:
            document.getElementById("inc0"),

        inclination:0
    },

    {
        canvas:
            document.getElementById("inc75"),

        inclination:75
    },

    {
        canvas:
            document.getElementById("inc90"),

        inclination:90
    }

];

let phaseAngle = 0;

/* =========================================
   LIMB DARKENED STAR
========================================= */

function glow(ctx,x,y,r,color){

    /* =====================================
       OUTER HALO
    ===================================== */

    const halo =
        ctx.createRadialGradient(
            x,
            y,
            r*0.2,

            x,
            y,
            r*3
        );

    halo.addColorStop(
        0,
        color
    );

    halo.addColorStop(
        0.25,
        color
    );

    halo.addColorStop(
        1,
        "transparent"
    );

    ctx.beginPath();

    ctx.fillStyle = halo;

    ctx.arc(
        x,
        y,
        r*3,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* =====================================
       PHOTOSPHERE + LIMB DARKENING
    ===================================== */

    const star =
        ctx.createRadialGradient(

            x,
            y,
            r*0.08,

            x,
            y,
            r
        );

    /* stellar core */

    star.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    /* photosphere */

    star.addColorStop(
        0.45,
        color
    );

    /* limb darkening */

    star.addColorStop(
        1,
        "rgba(90,110,150,0.28)"
    );

    ctx.beginPath();

    ctx.fillStyle = star;

    ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* =====================================
       SPECULAR HOTSPOT
    ===================================== */

    ctx.beginPath();

    const hotspot =
        ctx.createRadialGradient(

            x-r*0.22,
            y-r*0.22,
            0,

            x-r*0.22,
            y-r*0.22,
            r*0.55
        );

    hotspot.addColorStop(
        0,
        "rgba(255,255,255,0.42)"
    );

    hotspot.addColorStop(
        1,
        "transparent"
    );

    ctx.fillStyle = hotspot;

    ctx.arc(
        x-r*0.22,
        y-r*0.22,
        r*0.55,
        0,
        Math.PI*2
    );

    ctx.fill();
}

/* =========================================
   DRAW SINGLE SYSTEM
========================================= */

function drawSystem(obj){

    const canvas = obj.canvas;

    if(!canvas) return;

    const ctx =
        canvas.getContext("2d");

    const inc =
        obj.inclination *
        Math.PI/180;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const cx =
        canvas.width/2;

    const cy =
        canvas.height/2;

    const orbit = 65;

    /* ---------- ORBIT POSITION ---------- */

    const x =
        Math.cos(phaseAngle)
        * orbit;

    const y =
        Math.sin(phaseAngle)
        * orbit
        * Math.cos(inc);

    const x1 = cx + x;
    const y1 = cy + y;

    const x2 = cx - x;
    const y2 = cy - y;

    orbitLine(
        ctx,
        cx,
        cy,
        orbit,
        inc
    );

    /* ---------- DEPTH SORTING ---------- */

    if(y > 0){

        glow(
            ctx,
            x2,
            y2,
            18,
            "#66ccff"
        );

        glow(
            ctx,
            x1,
            y1,
            30,
            "#ffffff"
        );

    }else{

        glow(
            ctx,
            x1,
            y1,
            30,
            "#ffffff"
        );

        glow(
            ctx,
            x2,
            y2,
            18,
            "#66ccff"
        );
    }
}

/* =========================================
   MAIN BINARY HERO
========================================= */

const binaryCanvas =
    document.getElementById(
        "binaryCanvas"
    );

const binaryCtx =
    binaryCanvas.getContext("2d");

function drawHeroBinary(){

    binaryCtx.clearRect(
        0,
        0,
        binaryCanvas.width,
        binaryCanvas.height
    );

    const cx =
        binaryCanvas.width/2;

    const cy =
        binaryCanvas.height/2;

    const orbit1 = 150;
    const orbit2 = 95;

    const x1 =
        cx +
        Math.cos(phaseAngle)
        * orbit1;

    const y1 =
        cy +
        Math.sin(phaseAngle)
        * 45;

    const x2 =
        cx -
        Math.cos(phaseAngle)
        * orbit2;

    const y2 =
        cy -
        Math.sin(phaseAngle)
        * 45;

    /* ---------- ORBIT ---------- */

    binaryCtx.beginPath();

    binaryCtx.strokeStyle =
        "rgba(255,255,255,0.08)";

    binaryCtx.lineWidth = 2;

    binaryCtx.ellipse(
        cx,
        cy,
        orbit1,
        45,
        0,
        0,
        Math.PI*2
    );

    binaryCtx.stroke();

    /* ---------- DEPTH ---------- */

    if(y1 > y2){

        glow(
            binaryCtx,
            x2,
            y2,
            24,
            "#66ccff"
        );

        glow(
            binaryCtx,
            x1,
            y1,
            42,
            "#ffffff"
        );

    }else{

        glow(
            binaryCtx,
            x1,
            y1,
            42,
            "#ffffff"
        );

        glow(
            binaryCtx,
            x2,
            y2,
            24,
            "#66ccff"
        );
    }

    /* ---------- DIFFRACTION SPIKES ---------- */

    binaryCtx.beginPath();

    binaryCtx.strokeStyle =
        "rgba(255,255,255,0.22)";

    binaryCtx.lineWidth = 1.2;

    binaryCtx.moveTo(
        x1-70,
        y1
    );

    binaryCtx.lineTo(
        x1+70,
        y1
    );

    binaryCtx.moveTo(
        x1,
        y1-70
    );

    binaryCtx.lineTo(
        x1,
        y1+70
    );

    binaryCtx.stroke();
}

/* =========================================
   MAIN LOOP
========================================= */

function animateBinary(){

    drawHeroBinary();

    systems.forEach(
        drawSystem
    );

    phaseAngle += 0.01;

    requestAnimationFrame(
        animateBinary
    );
}

animateBinary();
