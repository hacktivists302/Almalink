import React, { useState } from "react";
import { NavBar } from "./AdminApproval";
import { PopUp } from "./AdminApproval";
import { TableComponent } from "./AdminApproval";

export function AdminStudent() {
  
  const [popUp, setPopUp] = useState(false);
    function onConfirm() {
      setPopUp(!popUp);
    }
    function onCancel() {
      setPopUp(!popUp);
    }
  
    return (
      <>
        <div className="bg-gray-800 h-screen flex flex-col">
          <NavBar adminApproval={false} />
          <TableComponent
            adminApproval={false}
            popUp={popUp}
            setPopUp={setPopUp}
          />
          <div>
            {popUp && (
              <PopUp status={"Delete"} user={"rahul"} onConfirm={onConfirm} onCancel={onCancel} />
            )}
          </div>
        </div>
    </>
  );
}

