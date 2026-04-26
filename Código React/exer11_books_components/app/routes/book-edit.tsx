import { useActionState } from "react";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getBook, updateBook } from "~/services/books-service";
import type { Route } from "./+types/book-edit";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await getBook(params.id!);
}

export default function BookEdit({ loaderData }: Route.ComponentProps) {
  const book = loaderData;
  const navigate = useNavigate();

  async function updateBookAction(prevState: { success: boolean; error: string | null }, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    try {
      await updateBook(book.id, title, description);
      navigate(`/book/${book.id}`);
      return { success: true, error: null };
    } catch (err) {
      console.error(err);
      return { success: false, error: "Error updating book" };
    }
  }

  const [state, formAction, isPending] = useActionState(
    updateBookAction,
    { success: false, error: null }
  );

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Edit Book
      </Typography>
      <Box component="form" action={formAction}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            type="text"
            name="title"
            defaultValue={book.title}
            required
            disabled={isPending}
            fullWidth
          />
          <TextField
            label="Description"
            type="text"
            name="description"
            defaultValue={book.description}
            disabled={isPending}
            fullWidth
            multiline
            minRows={3}
          />
          {state.error && <Alert severity="error">{state.error}</Alert>}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate(`/book/${book.id}`)}
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
