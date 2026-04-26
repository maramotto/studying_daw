import { useActionState } from "react";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type Book from "~/models/Book";
import { addBook } from "~/services/books-service";

export default function BookNew() {
  const navigate = useNavigate();

  async function createBookAction(prevState: { success: boolean; error: string | null }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      const newBook: Book = await addBook(title, description);
      navigate(`/book/${newBook.id}`);
      return { success: true, error: null };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error creating book" };
    }
  }

  const [state, formAction, isPending] = useActionState(
    createBookAction,
    { success: false, error: null }
  );

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        New Book
      </Typography>
      <Box component="form" action={formAction}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            type="text"
            name="title"
            required
            disabled={isPending}
            fullWidth
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            disabled={isPending}
            fullWidth
            multiline
            minRows={3}
          />
          {state.error && <Alert severity="error">{state.error}</Alert>}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/")}
              disabled={isPending}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}