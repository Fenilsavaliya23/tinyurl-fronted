import "./QrCodeModal.css";
import Modal from "../Modal/Modal";
import { ScanBarcode } from "iconsax-react";
import { copyToClipboard } from "../../../utils/helper";

function QrCodeModal({
    isOpen,
    onClose,
    qrImageUrl,
    shortUrl
}) {

    if (!isOpen) return null;

    const downloadQr = () => {

        const link = document.createElement("a");
        link.href = qrImageUrl;
        link.download = "tinyurl-qr.png";
        link.click();

    };

    return (

        <Modal

            isOpen={isOpen}
            onClose={onClose}
            title="QR Code"
            width={500}

            footer={
                <>

                    <button
                        className="modal-copy-btn"
                        onClick={downloadQr}
                    >
                        Download
                    </button>

                    <button
                        className="modal-primary-btn"
                        onClick={() => copyToClipboard(shortUrl)}
                    >
                        Copy URL
                    </button>

                    <button
                        className="modal-cancel-btn"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </>
            }

        >

            <div className="qr-modal">

                <div className="qr-icon">

                    <ScanBarcode
                        size="56"
                        variant="Bulk"
                        color="currentColor"
                    />

                </div>

                <p className="qr-description">

                    Scan this QR code to open your shortened URL.

                </p>

                <div className="qr-image-wrapper">

                    <img

                        src={qrImageUrl}
                        alt="QR Code"
                        className="qr-image"

                    />

                </div>

            </div>

        </Modal>

    );

}

export default QrCodeModal;