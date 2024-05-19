import { Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../store/auth";
import siteLogo from "../siteLogo.png";

function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <Toolbar
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "#FFBE98",
      }}
    >
      {/* <Typography component="h2" variant="h5" align="center" sx={{ flex: 1 }}>
        Pawsome Patch
      </Typography> */}

      <Box sx={{ flex: 1, paddingTop: '10px' }}>
        <img src={siteLogo} height={70} alt={"pawsome"} />
      </Box>

      {/* <img src={siteLogo} height={70} alt={"pawsome"} align="center" style={{display: 'flex'}}/> */}

      {isLoggedIn ? (
        <Button variant="outlined" color="primary" href="/logout">
          Logout
        </Button>
      ) : (
        <Button variant="outlined" color="primary" href="/login">
          Login
        </Button>
      )}
    </Toolbar>
  );
}

export default Header;
