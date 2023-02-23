import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./App.css";
import { storage } from "./services/firebase";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imagesRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imagesRef).then((response) => {
      response.items.forEach((item) => {
        const path = item.fullPath;
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, { url, path }]);
        });
      });
    });
  }, []);

  const handleUploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/profileImage_${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      const path = snapshot.metadata.fullPath;
      const uRef = ref(storage, path);
      getDownloadURL(uRef).then((url) => {
        setImageList((prev) => [...prev, { url, path }]);
      });
    });
  };

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={handleUploadImage}>UPLOAD</button>

      <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Firebase Path</TableCell>
            <TableCell align="right">src</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {imageList.map((image) => (
            <TableRow
              key={image.path}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={image.url} style={{ width: 200, height: 200 }} />
              </TableCell>
              <TableCell align="right">{image.path}</TableCell>
              <TableCell align="right">{image.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
}

export default App;
