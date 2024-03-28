const defaultStyle = {
  color: "#3b3a3a",
  fontSize: "35px",
  fontFamily: "monospace",
  fontWeight: "400",
  getWidth: (canvas) => canvas.width / 2,
  getHeight: (canvas) => canvas.height / 2,
};

function loadTextOnCanvas(ctx, text, style, canvas) {
  if (!text) return;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ctx.fillStyle = style.color;
  ctx.textAlign = "center";
  ctx.fillText(text, style.getWidth(canvas), style.getHeight(canvas));
}

export function loadUpdatedCanvas(canvas, imgUrl, textsWithStyles = []) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx = canvas.getContext("2d");

  const certificateImage = new Image();
  certificateImage.onload = function () {
    canvas.width = certificateImage.width;
    canvas.height = certificateImage.height;
    ctx.drawImage(certificateImage, 0, 0);
    textsWithStyles.forEach((textWithStyle) => {
      loadTextOnCanvas(
        ctx,
        textWithStyle.text,
        textWithStyle.style ? textWithStyle.style : defaultStyle,
        canvas
      );
    });
  };
  certificateImage.src = imgUrl;
}
