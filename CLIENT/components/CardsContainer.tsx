import { Grid } from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Card from "./Card"

const CustomGrid = styled(Grid)(() => ({
  cursor: "pointer",
  width: "320px",
  transition: "transform 200ms ease-in-out 5ms",
  "&hover": "transform: scale(1.1)",
}));

const CardContainer = () => {
  return (
    <Grid container spacing={4} sx={{ p: 2 }}>
      <Link href="/profile">
        <CustomGrid zeroMinWidth item xs={12} sm={12} md={3}>
          <Card title="My Profile" body="View your employee profile" />
        </CustomGrid>
      </Link>
      <Link href="/requirements">
        <CustomGrid zeroMinWidth item xs={12} sm={12} md={3}>
          <Card
            title="My Requirements"
            body="Upload and view your employee documents"
          />
        </CustomGrid>
      </Link>
      <Link href="/vaccination">
        <CustomGrid zeroMinWidth item xs={12} sm={12} md={3}>
          <Card
            title="My Vaccination"
            body="Upload and view your vaccinations"
          />
        </CustomGrid>
      </Link>
      <Link href="/documents">
        <CustomGrid zeroMinWidth item xs={12} sm={12} md={3}>
          <Card
            title="My Documents"
            body="Request for COE and other documents"
          />
        </CustomGrid>
      </Link>
    </Grid>
  );
};

export default CardContainer;
