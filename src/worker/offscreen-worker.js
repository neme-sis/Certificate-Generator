import { loadUpdatedCanvas } from "../helpers/CanvasControllers";
var offscreenCanvas;

self.onmessage = function (e) {
  const { certificateImgUrl, textWithStyles, signature, canvas } = e.data;
  if (canvas) offscreenCanvas = canvas;
  loadUpdatedCanvas(
    offscreenCanvas,
    certificateImgUrl,
    textWithStyles,
    signature
  );
};
