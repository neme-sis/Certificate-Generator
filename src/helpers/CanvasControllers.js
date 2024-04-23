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
  ctx.fillText(text, style.width, style.height);
}

function adjustOverflows(textsWithStyles, canvas) {
  const updatedTextsWithStyles = [];
  textsWithStyles.map((textWithStyle) => {
    const width = 1.25 * canvas.width;
    const style = textWithStyle.style ? textWithStyle.style : defaultStyle;
    const fontSize = parseInt(style.fontSize);

    if (width - 100 > fontSize * textWithStyle.text.length)
      return updatedTextsWithStyles.push(textWithStyle);

    const words = textWithStyle.text.trim().split(" ");
    const brokenSentences = [];
    let sentence = "";
    words.forEach((word, index) => {
      if (index === 0) {
        sentence = word;
        return;
      }
      if (
        width - 100 >
        fontSize * sentence.length + fontSize * (word.length + 1)
      ) {
        sentence += ` ${word}`;
      } else {
        brokenSentences.push(sentence);
        sentence = word;
      }
    });
    brokenSentences.push(sentence);
    brokenSentences.forEach((sentence, index) => {
      updatedTextsWithStyles.push({
        text: sentence,
        style: {
          ...style,
          getHeight: (canvas) =>
            style.getHeight(canvas) + index * (fontSize + 10),
        },
      });
    });
  });
  return updatedTextsWithStyles;
}

export async function loadUpdatedCanvas(
  canvas,
  imgUrl,
  textsWithStyles = [],
  signatureUrl = ""
) {
  //to omit the flicker between changing the background and the image
  // canvas.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;

  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx = canvas.getContext("2d");

  const response = await fetch("../assets/Certificate_1.png");
  const blob = await response.blob();
  const certificateImage = await createImageBitmap(blob);
  // certificateImage.onload = function () {
  canvas.width = certificateImage.width;
  canvas.height = certificateImage.height;
  ctx.drawImage(certificateImage, 0, 0);

  textsWithStyles = adjustOverflows(textsWithStyles, canvas);

  textsWithStyles.forEach((textWithStyle) => {
    loadTextOnCanvas(
      ctx,
      textWithStyle.text,
      textWithStyle.style ? textWithStyle.style : defaultStyle,
      canvas
    );
  });

  if (signatureUrl) {
    const response = await fetch(signatureUrl);
    const blob = await response.blob();
    const signature = await createImageBitmap(blob);
    ctx.drawImage(signature, canvas.width / 2 - 100, canvas.height - 400, 200, 100);
  }
}
