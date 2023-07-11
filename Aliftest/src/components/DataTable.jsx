import React, { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Zoom } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function DataTable() {
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  console.log(users);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    //fetch request to server
    try {
      const res = await fetch(`http://localhost:3002/users`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err.uesrs);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center p-4">
        <Button
          variant="contained"
          className="px-4 py-2 font-bold animate__animated animate__slideInDown"
          onClick={handleOpen}
        >
          Add User
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        transitionDuration={{
          enter: 1000,
          exit: 700,
        }}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Add New User
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className="float-right"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <InputForm onSave={handleClose} />
        </DialogContent>
      </Dialog>
      <table className="table-auto w-[80%] m-auto rounded-lg">
        <thead>
          <tr className="">
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.firstname}</td>
                <td className="border px-4 py-2">{user.lastname}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.age}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
