import { getDownloadURL, uploadBytes, getStorage, ref } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

export const uploadFile = async (file: File | null, storagePath?: string) => {
  if (!file) return "";

  const storageRef = ref(
    storage,
    storagePath ? `${storagePath}/${file.name}` : `${file.name}`
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
) {
  // const filePromises = Array.from(
  //   files,
  //   async (file) => await uploadFile(file, storagePath)
  // );

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    if (files[fileIndex] instanceof File) {
      await uploadFile(files[fileIndex], storagePath);
    }
  }
}
