

import cloudinary from "../utils/cloudnary.js"
import sharp from 'sharp'
const getDataUri = (file) => {
    try {
      // Validate the file object
      if (!file || !file.buffer || !file.mimetype) {
        throw new Error("Invalid file object. Ensure it contains 'buffer' and 'mimetype'.");
      }
  
      // Convert the buffer to Base64
      const base64File = file.buffer.toString("base64");
  
      // Generate and return the Data URI
      return `data:${file.mimetype};base64,${base64File}`;
    } catch (error) {
      console.error("Error generating Data URI:", error.message);
      throw error; // Rethrow the error to handle it in calling code
    }
  };
  
export const convertImageToInCloudnary = async(file) =>{
    const supportedFormats = ["image/jpeg", "image/png", "application/pdf"];
    if (!supportedFormats.includes(file.mimetype)) {
      return res.status(400).json({ message: "Unsupported file format" });
    }
    let cloudResponse;
    if (file.mimetype === "application/pdf") {
      // Handle PDF upload
      const fileUri = getDataUri(file);
      //console.log(fileUri,"fileuri")
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "raw", // Use 'raw' for non-image files like PDFs
        folder: "users/pdfs", // Optional: specify folder in Cloudinary
        format: "png",
      });
    } else {
      // Handle image upload (JPEG/PNG)
      const optimizedImageBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      // Convert buffer to Data URI
      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;

      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "users/images", // Optional: specify folder in Cloudinary
      });
    }
    console.log(cloudResponse)
  return cloudResponse
  }
