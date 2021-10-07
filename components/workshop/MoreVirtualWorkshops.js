import {
  Box,
  Button,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import institutesMock from "./institutesMock";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "80px 0",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  info: {
    maxWidth: "325px",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
    },
  },
  title: {
    marginBottom: "12px",
  },
  description: {
    marginBottom: "32px",
  },
  items: {
    width: "100%",
    maxWidth: "592px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
    },
  },
  institueItem: {
    display: "flex",
    alignItems: "flex-start",
    padding: "20px 0",
    borderBottom: "solid 1px " + theme.palette.grey[300],
    "&:last-child": {
      borderBottom: "none",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  institueImg: {
    width: "136px",
    marginRight: "20px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "10px",
    },
  },
  institueType: {
    backgroundColor: theme.palette.grey[200],
    textTransform: "uppercase",
    borderRadius: "4px",
    padding: "0px 8px",
    fontWeight: 500,
    fontSize: 11,
  },
  instituePrice: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "20px",
  },
  institueTitle: {
    maxWidth: "362px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
    },
    fontWeight: 700,
    fontSize: 20,
    lineHeight: "28px",
  },
  institueDate: {
    maxWidth: "362px",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "unset",
    },
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "24px",
  },
  institueRemaining: {
    color: theme.palette.primary.light,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "28px",
  },
}));
export default function MoreVirtualWorkshops() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.info}>
        <Typography variant="h2" className={classes.title}>
          More Virtual Workshops and Institutes from ASCD
        </Typography>
        <Typography variant="body2" className={classes.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </Typography>
        <Button variant="outlined">View all Workshops</Button>
      </Box>
      <Box className={classes.items}>
        <List>
          {institutesMock.map((item, idx) => (
            <ListItem key={idx} className={classes.institueItem}>
              <img
                src={item.img}
                alt={item.title}
                className={classes.institueImg}
              />
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Box className={classes.institueType}>{item.type}</Box>
                  <span className={classes.instituePrice}>${item.price}</span>
                </Box>
                <Typography variant="h4" className={classes.institueTitle}>
                  {item.title}
                </Typography>
                <Box className={classes.institueDate}>{item.date}</Box>
                <Box className={classes.institueRemaining}>
                  {item.remaining}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
