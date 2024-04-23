import { loadUpdatedCanvas } from "../helpers/CanvasControllers";

self.onmessage = function (e) {
  const { certificateImgUrl, textWithStyles, signature, canvas } = e.data;
  console.log(canvas);
  loadUpdatedCanvas(canvas, certificateImgUrl, textWithStyles, signature);
};
