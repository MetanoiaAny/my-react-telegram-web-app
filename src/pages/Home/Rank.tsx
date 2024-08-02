import Dialog from "@mui/material/Dialog";
import { forwardRef, useImperativeHandle, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RankModal = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    onShow: handleClickOpen,
  }));

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { backgroundColor: "#000" } }}
      >
        <DialogContent>
          <div className="w-full min-w-[250px] min-h-[450px] flex flex-col items-center">
            <div className="w-full">
              <p className="text-white text-base">Betting rankings</p>
              <Divider variant="middle" component="li" sx={{ borderColor: "rgba(216, 216, 216, 0.5)" ,marginLeft:0,marginRight:0}} />
            </div>
            <div className="w-full flex-1">
            
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default RankModal;
