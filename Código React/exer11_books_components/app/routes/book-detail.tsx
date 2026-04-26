import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getBook, removeBook } from "~/services/books-service";
import type { Route } from "./+types/book-detail";
import { useState } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getBook(params.id!);
}

export default function BookDetail({ loaderData }: Route.ComponentProps) {
  const book = loaderData;
  const navigate = useNavigate();

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isPendingDelete, setPendingDelete] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleOpenDeleteDialog() {
    setDeleteDialogOpen(true);
  }

  function handleCloseDeleteDialog() {
    if (isPendingDelete) {
      return;
    }
    setDeleteDialogOpen(false);
  }

  async function handleDelete() {
    setPendingDelete(true);
    setDeleteError(null);
    try {
      await removeBook(book.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleteError("Error deleting book");
      setPendingDelete(false);
      setDeleteDialogOpen(false);
    }
  }

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {book.description || "No description"}
          </Typography>
          {deleteError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {deleteError}
            </Alert>
          )}
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              onClick={() => navigate(`/book/${book.id}/edit`)}
              disabled={isPendingDelete}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleOpenDeleteDialog}
              disabled={isPendingDelete}
            >
              Delete
            </Button>
            <Button
              variant="text"
              onClick={() => navigate("/")}
              disabled={isPendingDelete}
            >
              Back
            </Button>
          </Stack>
        </CardActions>
      </Card>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !isPendingDelete) {
            event.preventDefault();
            handleDelete();
          }
        }}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (!isPendingDelete) {
                handleDelete();
              }
            },
          },
        }}
      >
        <DialogTitle>Delete book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{book.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} disabled={isPendingDelete}>
            Cancel
          </Button>
          <Button type="submit" color="error" variant="contained" disabled={isPendingDelete} autoFocus>
            {isPendingDelete ? (
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={16} color="inherit" />
                Deleting...
              </Box>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
