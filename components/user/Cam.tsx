import React, { useEffect, useRef, useState } from "react";

// Styles
// import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import { useCheckSubMutation } from "@/redux/api/userApi";
import { useToast } from "../ui/use-toast";
// import QrFrame from "../assets/qr-frame.svg";

interface QrProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const QrReader = ({ setShow }: QrProps) => {
  // QR States
  const [checkSub] = useCheckSubMutation();
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const { toast } = useToast();
  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const handleSubmitCustom = async (values: any) => {
    try {
      const returned = await checkSub(values).unwrap();
      console.log(returned);
      if (returned.success === true) {
        toast({ description: returned.message });
      }
    } catch (error) {
      // you can handle errors here if you want to
      toast({ description: "please retry" });
      return;
    }
  };

  // Success
  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    const data = {
      toks: result?.data,
    };
    setQrOn(false);
    setShow(false);
    await handleSubmitCustom(data);
    // const res = checkSub(data);
    // console.log(res);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader">
      {/* QR */}
      <video ref={videoEl}></video>
      {/* <div ref={qrBoxEl} className="qr-box">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className="qr-frame"
        />
      </div> */}

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}
        >
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QrReader;
