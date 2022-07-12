import React, { useState, useRef } from "react";
import "./App.css";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [errorType, setErrorType] = useState("");
  // const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  // const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(link);
      setImageURL(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleScanFile = (result, error) => {
  //   if (result) {
  //     setScanResultFile(result?.text);
  //   }
  //   if (error) {
  //     console.log(error);
  //   }
  // };

  // const onScanFile = () => {
  //   // `current` points to the mounted text input element
  //   qrRef.current?.openImageDialog();
  // };

  const handleScanWebCam = (result, error) => {
    if (result) {
      setScanResultWebCam(result?.text);
    }
    if (error) {
      console.log(error);
      setErrorType(error);
    }
  };

  return (
    <Container className="container">
      <Card>
        <h2 className="title">
          Generate, Download and Scan QR Code with React js
        </h2>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xl={4} lg={4} m={6} sm={12} xs={12}>
              <TextField
                label="Enter Link Here"
                variant="standard"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={() => {
                  generateQrCode();
                }}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageURL && (
                <a href={imageURL} download>
                  <img src={imageURL} alt="qr code img" />
                </a>
              )}
            </Grid>
            {/* <Grid item xl={4} lg={4} m={6} sm={12} xs={12}>
              <Button
                className="btn"
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan Qr Code
              </Button>
              <QrReader
                ref={qrRef}
                scanDelay={300}
                style={{ width: "100%", border: "solid 2px #a8a7a7" }}
                onResult={handleScanFile}
              />
              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid> */}

            <Grid item xl={4} lg={4} m={6} sm={12} xs={12}>
              <h3>QR Code Scan by Web Cam</h3>
              {/* {errorType && <div className="error">Camera not found.</div>} */}
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setScanResultWebCam(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: "100%" }}
              />
              {/* <QrReader
                delay={300}
                style={{ width: "100%" }}
                onResult={handleScanWebCam}
              /> */}
              <h3>Scanned Code: {scanResultWebCam}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
