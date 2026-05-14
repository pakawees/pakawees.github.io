/* =========================================
   ECLIPSING BINARY LIGHT CURVE
========================================= */

const phase = [];
const brightness = [];

/* =========================================
   PARAMETERS
========================================= */

const N = 1200;

/* eclipse depths */

const primaryDepth = 0.42;
const secondaryDepth = 0.18;

/* eclipse widths */

const primaryWidth = 0.035;
const secondaryWidth = 0.060;

/* ellipsoidal variation */

const ellipsoidalAmp = 0.035;

/* reflection effect */

const reflectionAmp = 0.012;

/* observational noise */

const noiseAmp = 0.0025;

/* =========================================
   GAUSSIAN ECLIPSE
========================================= */

function eclipse(
    x,
    center,
    width,
    depth
){

    return depth *
        Math.exp(
            -((x-center)**2)
            /(2*width*width)
        );
}

/* =========================================
   BUILD LIGHT CURVE
========================================= */

for(let i=0;i<N;i++){

    const p =
        i/(N-1);

    /* duplicate phase */

    const x = p * 2;

    /* ---------- BASELINE ---------- */

    let y = 1;

    /* ---------- PRIMARY ECLIPSE ---------- */

    y -= eclipse(
        x,
        0.5,
        primaryWidth,
        primaryDepth
    );

    /* ---------- SECONDARY ECLIPSE ---------- */

    y -= eclipse(
        x,
        1.5,
        secondaryWidth,
        secondaryDepth
    );

    /* ---------- ELLIPSOIDAL VARIATION ---------- */

    y +=
        ellipsoidalAmp *
        Math.cos(
            4*Math.PI*x
        );

    /* ---------- REFLECTION EFFECT ---------- */

    y +=
        reflectionAmp *
        Math.cos(
            2*Math.PI*x
        );

    /* ---------- SMALL STELLAR VARIABILITY ---------- */

    y +=
        0.004 *
        Math.sin(
            10*Math.PI*x
        );

    /* ---------- OBSERVATIONAL NOISE ---------- */

    y +=
        (Math.random()-0.5)
        * noiseAmp;

    phase.push(x);

    brightness.push(y);
}

/* =========================================
   MAIN TRACE
========================================= */

const trace = {

    x: phase,

    y: brightness,

    mode:"lines",

    line:{

        color:"#66ccff",

        width:3
    },

    hovertemplate:
        "Phase: %{x:.3f}<br>" +
        "Flux: %{y:.4f}" +
        "<extra></extra>"
};

/* =========================================
   ECLIPSE MARKERS
========================================= */

const primaryMarker = {

    x:[0.5],

    y:[1-primaryDepth],

    mode:"markers+text",

    text:["Primary Eclipse"],

    textposition:"bottom center",

    marker:{

        size:10,

        color:"#ffffff"
    },

    textfont:{

        color:"#dcecff"
    },

    hoverinfo:"skip"
};

const secondaryMarker = {

    x:[1.5],

    y:[1-secondaryDepth],

    mode:"markers+text",

    text:["Secondary Eclipse"],

    textposition:"bottom center",

    marker:{

        size:8,

        color:"#66ccff"
    },

    textfont:{

        color:"#dcecff"
    },

    hoverinfo:"skip"
};

/* =========================================
   LAYOUT
========================================= */

const layout = {

    paper_bgcolor:
        "rgba(0,0,0,0)",

    plot_bgcolor:
        "rgba(0,0,0,0)",

    font:{

        color:"#dcecff",

        family:"Arial"
    },

    margin:{

        l:70,
        r:40,
        t:40,
        b:60
    },

    xaxis:{

        title:"Orbital Phase",

        range:[0,2],

        gridcolor:
            "rgba(255,255,255,0.08)",

        zeroline:false
    },

    yaxis:{

        title:"Relative Brightness",

        gridcolor:
            "rgba(255,255,255,0.08)",

        zeroline:false
    },

    showlegend:false
};

/* =========================================
   CONFIG
========================================= */

const config = {

    responsive:true,

    displaylogo:false,

    scrollZoom:true
};

/* =========================================
   PLOT
========================================= */

Plotly.newPlot(

    "lightcurve",

    [
        trace,
        primaryMarker,
        secondaryMarker
    ],

    layout,

    config
);
