import React from "react";
import TableRow from "../components/TableRow" // Adjust the import path if necessary


export function AdminDashboard() {
  return (
    <div>
      <NavBar />
    </div>
  );
}
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gray-800  text-white shadow-md">
      <div className="container mx-auto   max-w-screen-lg   p-4">
        <div className="flex justify-evenly space-x-4">
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
        <TableComponent />
      </div>
    </nav>
  );
}



function TableComponent() {
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
            <th scope="col" className="px-6 py-3">
              Delete
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
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableComponent;



