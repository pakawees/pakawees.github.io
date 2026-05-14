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
            0,

            x,
            y,
            r*2
        );

    halo.addColorStop(
        0,
        "rgba(255,255,255,0.10)"
    );

    halo.addColorStop(
        0.35,
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
        r*2,
        0,
        Math.PI*2
    );

    ctx.fill();

    /* =====================================
       STAR DISK
    ===================================== */

    ctx.save();

    /* clip to stellar disk */

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI*2
    );

    ctx.clip();

    /* =====================================
       LIMB DARKENING
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

star.addColorStop(
    0,
    "rgba(255,255,255,0.96)"
);

star.addColorStop(
    0.45,
    color
);

star.addColorStop(
    0.82,
    color
);

star.addColorStop(
    1,
    "rgba(255,220,160,0.12)"
);
   
    /* =====================================
       HOTSPOT
    ===================================== */
/*
    const hotspot =
        ctx.createRadialGradient(

            x-r*0.18,
            y-r*0.18,
            0,

            x-r*0.18,
            y-r*0.18,
            r*0.45
        );

    hotspot.addColorStop(
        0,
        "rgba(255,220,160,0.12)"
    );

    hotspot.addColorStop(
        1,
        "transparent"
    );

    ctx.fillStyle = hotspot;

    ctx.fillRect(
        x-r,
        y-r,
        r*2,
        r*2
    );

    ctx.restore();
}
*/
/* =========================================
   ORBIT LINE
========================================= */

function orbitLine(
    ctx,
    cx,
    cy,
    orbit,
    inc
){

    ctx.beginPath();

    ctx.strokeStyle =
        "rgba(255,255,255,0.12)";

    ctx.lineWidth = 2;

    ctx.ellipse(
        cx,
        cy,
        orbit,
        orbit*Math.cos(inc),
        0,
        0,
        Math.PI*2
    );

    ctx.stroke();
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
            "#7fd6ff"
        );

        glow(
            ctx,
            x1,
            y1,
            30,
            "#ffee4a"
        );

    }else{

        glow(
            ctx,
            x1,
            y1,
            30,
            "#ffee4a"
        );

        glow(
            ctx,
            x2,
            y2,
            18,
            "#7fd6ff"
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
        "rgba(255,220,160,0.12)";

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
            "#7fd6ff"
        );

        glow(
            binaryCtx,
            x1,
            y1,
            42,
            "#ffd84d"
        );

    }else{

        glow(
            binaryCtx,
            x1,
            y1,
            42,
            "#ffd84d"
        );

        glow(
            binaryCtx,
            x2,
            y2,
            24,
            "#7fd6ff"
        );
    }

    /* ---------- DIFFRACTION SPIKES ---------- */

    binaryCtx.beginPath();

    binaryCtx.strokeStyle =
        "rgba(255,220,160,0.12)";

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

    /* ---------- CLEAR HERO ---------- */

    binaryCtx.clearRect(
        0,
        0,
        binaryCanvas.width,
        binaryCanvas.height
    );

    /* ---------- DRAW HERO ---------- */

    drawHeroBinary();

    /* ---------- DRAW SYSTEMS ---------- */

    systems.forEach(system => {

        drawSystem(system);

    });

    /* ---------- SPEED ---------- */

    phaseAngle += 0.03;

    requestAnimationFrame(
        animateBinary
    );
}

animateBinary();
