import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router";
import type { Route } from "./+types/books-list";
import { getBooks } from "~/services/books-service";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  return await getBooks();
}

export default function BooksList({ loaderData }: Route.ComponentProps) {
  const books = loaderData;
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Books
      </Typography>
      <Paper variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
        <List disablePadding>
        {books.map((book) => (
          <ListItem key={book.id} disablePadding divider>
            <ListItemButton component={RouterLink} to={`/book/${book.id}`}>
              <ListItemText primary={book.title} />
              <ListItemIcon sx={{ minWidth: 24 }}>
                <ArrowForwardIosIcon fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        </List>
      </Paper>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate("/book-new")}
      >
        Add Book
      </Button>
    </Box>
  );
}
