import { Container, Typography } from "@mui/material";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

function FutureFeature() {
  return (
    <>
    <Header/>
    <Navbar/>
    <Container align="center" sx={{p:10}}>
      <Typography variant="h3" align="center">
        This feature will be available soon :)
      </Typography>
    </Container>
    </>
  );
}

export default FutureFeature;
