import React, { useState } from "react";
import TableRow from "../components/TableRow"; // Adjust the import path if necessary

import { Link} from "react-router-dom";
import { UserProfileDropdown } from "../components/NavBar";

export function AdminApproval() {
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
        <NavBar adminApproval={true} />
        <TableComponent
          adminApproval={true}
          popUp={popUp}
          setPopUp={setPopUp}
        />
        <div>
          {popUp && (
            <PopUp status={"Approve"} user={"rahul"} onConfirm={onConfirm} onCancel={onCancel} />
          )}
        </div>
      </div>
    </>
  );
}

export function NavBar() {
  return (
    <nav className="bg-gray-800 items-center  text-white shadow-md">
      <div className="container flex    w-full    p-4">
        <div className="flex max-w-screen-lg mx-auto    space-x-20">
          <Link
            to="/admin/student"
            className="text-white hover:text-gray-300 font-medium"
          >
            Student
          </Link>
          <Link
            to="/admin/alumni"
            className="text-white hover:text-gray-300 font-medium"
          >
            Alumni
          </Link>
          <Link
            to="/admin/approval"
            className="text-white hover:text-gray-300 font-medium"
          >
            Approval
          </Link>
        </div>
        <UserProfileDropdown
          email={"email@gmail.com"}
          name={"Institution"}
          nameClass={"text-white"}
        />
      </div>
    </nav>
  );
}

export function TableComponent({ adminApproval, popUp, setPopUp }) {
  const handleDelete = (id) => {
    // Implement your delete functionality here
    console.log(`Deleting user with ID: ${id}`);
  };

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      enrollmentNumber: "123456",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      enrollmentNumber: "654321",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      enrollmentNumber: "789012",
    },
  ];

  return (
    <div className="mt-12 h-[500px] relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Enrollment Number
            </th>
            <th scope="col" className="px-6 py-3  text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              name={user.name}
              email={user.email}
              enrollmentNumber={user.enrollmentNumber}
              onDelete={() => {
                console.log("Hellow ");
                setPopUp(!popUp);
              }}
              adminApproval={adminApproval}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Popup component to show confirmation
export function PopUp({ user, onConfirm, onCancel ,status}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h3 className="text-lg text-black font-semibold mb-4">
          Confirm {status}
        </h3>
        <p className="text-slate-500">Are you sure you want to {status} {user}</p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
