import React, { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogTitle,
  IconButton, CircularProgress, Box, Button, Typography,
} from "@mui/material";
import CloseIcon        from "@mui/icons-material/Close";
import DownloadIcon     from "@mui/icons-material/Download";
import axios            from "axios";

const InvoicePreviewModal = ({ open, billId, onClose }) => {
  const [pdfUrl,  setPdfUrl]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!open || !billId) return;

    let objectUrl = null;

    const fetchInvoice = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/api/invoices/${billId}/download`,
          { withCredentials: true, responseType: "blob" }
        );
        const blob = new Blob([res.data], { type: "application/pdf" });
        objectUrl  = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      } catch (err) {
        console.error("Invoice fetch error:", err);
        setError("Failed to load invoice. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();

    // Cleanup blob URL on unmount / billId change
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setPdfUrl(null);
    };
  }, [open, billId]);

  // ── Download handler ──
  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href     = pdfUrl;
    a.download = `invoice_${billId}.pdf`;
    a.click();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width:     "90vw",
          maxWidth:  1000,
          height:    "90vh",
          maxHeight: 800,
          borderRadius: 3,
          display:   "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ── HEADER ── */}
      <DialogTitle
        sx={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          px: 3,
          py: 1.5,
          borderBottom:   "1px solid #eee",
        }}
      >
        <Typography fontWeight={600} fontSize={16}>
          Invoice Preview — #{billId}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          {/* Download Button */}
          <Button
            size="small"
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            disabled={!pdfUrl}
            sx={{ textTransform: "capitalize", borderRadius: 2 }}
          >
            Download
          </Button>

          {/* Close */}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* ── CONTENT ── */}
      <DialogContent sx={{ p: 0, flex: 1, overflow: "hidden" }}>

        {/* Loading */}
        {loading && (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {/* PDF iframe */}
        {!loading && !error && pdfUrl && (
         <iframe
        src={pdfUrl}
        title="Invoice Preview"
        width="100%"
        height="100%"
        style={{
          border: "none",
          display: "block",
          background: "#fff",
        }}
      />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePreviewModal;