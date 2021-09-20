import { createContext } from "react";

const ImageContext = createContext();

export const ImageProvider = ImageContext.Provider;
export const ImageConsumer = ImageContext.Consumer;

export default ImageContext;
