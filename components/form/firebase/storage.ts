import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";
import { app } from "../../../firebase/firebase";

const storage = getStorage(app);

const getFileName = (fileName: string): string => {
  let fileNameArray = fileName.split(".");
  fileNameArray.push(fileNameArray[fileNameArray.length - 1]);

  if (fileNameArray.length > 2) {
    fileNameArray[fileNameArray.length - 2] = `${new Date().toISOString()}`;
  } else {
    fileNameArray[fileNameArray.length - 1] = `${new Date().toISOString()}`;
  }

  let result = "";
  for (let i = 0; i < fileNameArray.length - 1; i++) {
    if (i) result += "-";
    result += fileNameArray[i];
  }
  result += "." + fileNameArray[fileNameArray.length - 1];

  return result;
};

export const uploadFile = async (
  file: File | null,
  storagePath?: string
): Promise<string> => {
  if (!file) return "";

  const fileName = getFileName(file.name);

  const storageRef = ref(
    storage,
    storagePath ? `${storagePath}/${fileName}` : `${fileName}`
  );

  const response = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(response.ref);
  return url;
};

export const getLink = (file: File | null, storagePath: string) => {
  if (!file) return "";

  const path = encodeURIComponent(
    storagePath ? `${storagePath}/${file.name}` : `${file.name}`
  );

  return path + "?alt=media";
};

export async function batchUploadFiles(
  files: Array<File | null>,
  storagePath?: string
): Promise<Array<string>> {
  const fileURLList = [];
  for await (const file of files) {
    if (file instanceof File) {
      const fileURL = await uploadFile(file, storagePath);
      fileURLList.push(fileURL);
    }
  }

  return fileURLList;
}
