import { Alert as MuiAlert } from "@mui/material";

const Muialert = ({ message, severity, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "9999",
        width: "25%",

        // backgroundColor: "black",
      }}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          mb: 2,
          backgroundColor: "black",
          color: "white",
          padding: "2vh",
        }}
      >
        {message}
      </MuiAlert>
    </div>
  );
};

export default Muialert;
