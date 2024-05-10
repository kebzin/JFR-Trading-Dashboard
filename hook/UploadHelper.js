import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { decode } from "base64-arraybuffer";
const supabase = createClientComponentClient();

// convert files to base64
export const uploadFiles = async (images, userID) => {
  const uploadPromises = images.map(async (img) => {
    const base64 = await convertToBase64(img.file); // Modify this function according to your Next.js project
    const filePath = `${userID}/${new Date().getTime()}.${getFileExtension(
      img.file.name
    )}`;
    const contentType = getContentType(img.file.type); // Modify this function according to your Next.js project
    const { data, error } = await supabase.storage
      .from("properties")
      .upload(filePath, decode(base64), { contentType });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    return data;
  });

  return Promise.all(uploadPromises);
};

// get the files URLs which are uploaded immediately
export const getFilesUrl = async (result) => {
  const fileUrls = result.map(async (url) => {
    const { data, error } = await supabase.storage
      .from("properties")
      .getPublicUrl(url.path);

    if (error) {
      console.error("Get public URL error:", error);
      return null;
    }
    return data;
  });
  return fileUrls;
};

// Function to get file extension
const getFileExtension = (fileName) => {
  return fileName.split(".").pop();
};

// Function to get content type based on file extension
const getContentType = (fileType) => {
  switch (fileType) {
    case "image/png":
    case "image/jpeg":
      return "image/png";
    case "video/mp4":
      return "video/mp4";
    // Add more cases as needed
    default:
      return "application/octet-stream"; // Default content type
  }
};

// Function to convert file to base64
// Modify this function according to your Next.js project
const convertToBase64 = async (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};
