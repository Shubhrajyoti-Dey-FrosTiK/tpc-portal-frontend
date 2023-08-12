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

const getLink = (file: File | null, storagePath: string) => {
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

  const fileRes = [];
  const path = storagePath ? storagePath : "";

  for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
    if (files[fileIndex] instanceof File) {
      await uploadFile(files[fileIndex], storagePath);
      fileRes.push(
        `https://firebasestorage.googleapis.com/v0/b/${
          process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID
        }.appspot.com/o/${getLink(files[fileIndex], path)}`
      );
    }
  }

  // const fileRes = await Promise.all(filePromises);

  // fileRes;
  await new Promise((r) => setTimeout(r, 2000));
  return fileRes; // list of url like ["https://..", ...]
}
