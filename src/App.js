import React, { useState } from "react";
import "./App.css";
import QRCode from "qrcode";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import HowToUse from "./HowToUse.jsx";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";

function App() {
  const [link, setLink] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [decodedResults, setDecodedResults] = useState([]);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(link);
      setImageURL(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <Container className="container">
      <Card>
        <h2 className="title">
          Generate, Download and Scan QR Code with React js
        </h2>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xl={5} lg={5} m={6} sm={12} xs={12}>
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
            <Grid item xl={5} lg={5} m={6} sm={12} xs={12}>
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
              />
              <ResultContainerPlugin results={decodedResults} />
            </Grid>
            {/* <HowToUse /> */}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
