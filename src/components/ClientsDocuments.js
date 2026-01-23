import {
    Typography,
    Button,
    ButtonGroup,
    IconButton,
    Chip,
    Dialog,
    DialogContent,
    Box,
    Card,
    CardContent,
    CardActions,
    Grid,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FolderIcon from '@mui/icons-material/Folder';
import { useState } from "react";


function ClientDocuments({ client, onBack }) {
    const [activeType, setActiveType] = useState("client");
    const [previewFile, setPreviewFile] = useState(null);

    const roleColor = {
        client: "success",
        admin: "primary",
        staff: "secondary",
    };

    const filteredDocs = client.documents.filter(
        (doc) => doc.uploaded_by === activeType
    );




    return (
        <>
            <Button onClick={onBack} sx={{ mb: 2, mt: 10, color: "#3f6f7a", textTransform: "none" }}>
                ← Back to Clients
            </Button>

            <Typography variant="h6" sx={{ mb: 2 }}>
                {client.client_name}&apos;s Documents
            </Typography>

            {/* ROLE FILTER BUTTONS */}
            <ButtonGroup sx={{ mb: 3 }}>
                {["client", "admin", "staff"].map((type) => {
                    const isActive = activeType === type;

                    return (
                        <Button
                            key={type}
                            variant={isActive ? "contained" : "outlined"}
                            onClick={() => setActiveType(type)}
                            sx={{
                                ...(isActive
                                    ? {
                                        backgroundColor: "#3f6f7a",
                                        color: "#ffffff",
                                        "&:hover": {
                                            backgroundColor: "#355f69",
                                        },
                                        textTransform: "none",
                                    }
                                    : {
                                        borderColor: "#3f6f7a",
                                        color: "#3f6f7a",
                                        "&:hover": {
                                            borderColor: "#355f69",
                                            backgroundColor: "rgba(63, 111, 122, 0.08)",
                                        },
                                         textTransform: "none",
                                    }),
                            }}
                        >
                            {type}
                        </Button>
                    );
                })}
            </ButtonGroup>
            {activeType === "admin" && (
                <Box sx={{ mb: 3, textAlign: 'right' }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        sx={{backgroundColor:"#3f6f7a",textTransform:"none"}}
                    >
                        Upload Document
                        <input
                            type="file"
                            hidden
                            accept="application/pdf,image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append("client_id", client.client_id);

                                try {
                                    await fetch(process.env.REACT_APP_DOCUMENTS_ADMINUPLOAD, {
                                        method: "POST",
                                        body: formData,
                                        credentials: "include",
                                    });

                                    alert("Uploaded successfully");
                                    window.location.reload();
                                } catch {
                                    alert("Upload failed");
                                }
                            }}
                        />
                    </Button>
                </Box>
            )}

            {/* DOCUMENT CARDS */}
            {filteredDocs.length === 0 ? (
                <Typography color="text.secondary">
                    No documents available
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {filteredDocs.map((doc) => (
                        <Grid item xs={12} sm={6} md={4} key={doc.id}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <FolderIcon
                                            sx={{ mr: 1 ,color:"#3f6f7a"}}
                                        />

                                        <Typography variant="subtitle1" noWrap>
                                            {doc.file_name}
                                        </Typography>
                                    </Box>

                                    {/* <Chip
                    label={doc.uploaded_by.toUpperCase()}
                    color={roleColor[doc.uploaded_by]}
                    size="small"
                    sx={{ mb: 1 }}
                  /> */}

                                    {/* <Typography variant="body2" color="text.secondary">
                    Uploaded by {doc.uploaded_by_name}
                  </Typography> */}

                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(doc.uploaded_at).toLocaleString()}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ justifyContent: "flex-end" }}>
                                    <IconButton onClick={() => setPreviewFile(doc.file)}>
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        component="a"
                                        href={doc.file}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <DownloadIcon />
                                    </IconButton>

                                    {(doc.uploaded_by === "admin" ||
                                        doc.uploaded_by === "staff") && (
                                            <IconButton
                                                color="error"
                                                onClick={async () => {
                                                    if (!window.confirm("Delete this document?")) return;

                                                    try {
                                                        await fetch(`${process.env.REACT_APP_DOCUMENTS_ADMINDELETE}/${doc.id}`, {
                                                            method: "DELETE",
                                                            credentials: "include",
                                                        });

                                                        alert("Document deleted");
                                                        window.location.reload();
                                                    } catch {
                                                        alert("Delete failed");
                                                    }
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                </CardActions>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* PREVIEW MODAL */}
            <Dialog
                open={Boolean(previewFile)}
                onClose={() => setPreviewFile(null)}
                fullWidth
                maxWidth="lg"
            >
                <DialogContent sx={{ height: "80vh", p: 0 }}>
                    {previewFile && (
                        <iframe
                            src={previewFile}
                            title="PDF Preview"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ClientDocuments;
