import { Toolbar, Link } from "@mui/material";

function Navbar({ page }) {
  return (
    <Toolbar
      component="nav"
      variant="regular"
      sx={{
        justifyContent: "space-around",
        overflowX: "auto",
        backgroundColor: "#FEECE2",
      }}
    >
      <Link
        color={page === "home" ? "primary" : "inherit"}
        noWrap
        key={1}
        variant="button"
        href="/"
        sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
      >
        Home{" "}
      </Link>
      <Link
        color={page === "new" ? "primary" : "inherit"}
        noWrap
        key={2}
        variant="button"
        href="/new"
        sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
      >
        Create Post{" "}
      </Link>
      <Link
        color="inherit"
        noWrap
        key={3}
        variant="button"
        href="/message"
        sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
      >
        Messages{" "}
      </Link>
      <Link
        color={page === "profile" ? "primary" : "inherit"}
        noWrap
        key={4}
        variant="button"
        href="/profile"
        sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
      >
        Profile{" "}
      </Link>
    </Toolbar>
  );
}

export default Navbar;
