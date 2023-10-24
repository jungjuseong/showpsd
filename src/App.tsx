import Psd from "@webtoon/psd";
import { ChangeEvent } from "react";


const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0] as File;
  const result = await file.arrayBuffer();
  const psdFile = Psd.parse(result);

  const canvasElement = document.createElement("canvas");
  const context = canvasElement.getContext("2d");
  const compositeBuffer = await psdFile.composite();
  const imageData = new ImageData(compositeBuffer, psdFile.width, psdFile.height);
  canvasElement.width = psdFile.width;
  canvasElement.height = psdFile.height;

  context?.putImageData(imageData, 0, 0);
  document.body.append(canvasElement);
}

function App() {


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default App;
