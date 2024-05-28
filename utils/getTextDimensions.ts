export default (txt: string, font = "12px Arial") => {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    if (!ctx) return { width: -1, height: -1 };
    ctx.font = font;
    return {
        width: ctx.measureText(txt).width,
        height: parseInt(font.split("px")[0], 10) * 1.25,
    };
};
