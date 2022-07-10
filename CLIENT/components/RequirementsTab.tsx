import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RequirementsTableWrapper from "./RequirementsTableWrapper";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Ui = ({ data, isLoading }: any) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="DAY 1 CRITICAL REQUIREMENTS" {...a11yProps(0)} />
          <Tab label="OTHER REQUIREMENTS" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <RequirementsTableWrapper
          data={data}
          loading={isLoading}
          title="day 1 critical requirements"
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RequirementsTableWrapper
          data={data}
          loading={isLoading}
          title="other requirements"
        />
      </TabPanel>
    </Grid>
  );
};

const RequirementsTab = React.memo(Ui);

export default RequirementsTab;
