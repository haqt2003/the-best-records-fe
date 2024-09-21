import {
  storage,
  ref as prjRef,
  uploadBytes,
  getDownloadURL,
} from "@/configs/firebase";

const useStorage = () => {
  async function uploadFile(file) {
    const storageRef = prjRef(storage, `avatar/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (err) {
      console.log(err);
    }
  }
  return { uploadFile };
};

export { useStorage };
