import { Outlet, useNavigation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { Route } from "../+types/root";

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Box sx={{ minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <AppBar position="static" sx={{ borderRadius: 3 }}>
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Library
            </Typography>
            {isLoading && <CircularProgress color="inherit" size={22} />}
          </Toolbar>
        </AppBar>
        <Paper
          elevation={4}
          sx={{
            mt: 3,
            p: { xs: 2, sm: 3 },
            opacity: isLoading ? 0.6 : 1,
            transition: "opacity 180ms ease",
          }}
        >
        <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Library
        </Typography>
        <Typography color="error" sx={{ mb: 2 }}>
          Error: {errorMessage}
        </Typography>
        <Button variant="contained" onClick={() => window.location.assign("/")}>
          Back to home
        </Button>
      </Paper>
    </Container>
  );
}
