import React from "react";

function TableRow({ name, email, enrollmentNumber, onDelete, adminApproval }) {

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{enrollmentNumber}</td>
      <td className="px-6 py-4">
        {
          adminApproval ?
          <div className="flex gap-5  justify-center" >
            <Button label={"Approved"} onDelete={onDelete} buttonClass={"text-green-500 "} /> 
            <Button label={"Pending"} onDelete={onDelete} buttonClass={"text-yellow-500 "} /> 

          </div>:
          <Button label={"Delete"} buttonClass={"text-red-500"} onDelete={onDelete}/>
        }
      </td>
    </tr>
  );
}
function Button({label,buttonClass,onDelete}){
 
return<>
<button
onClick={onDelete}
className={buttonClass}
>
{label}
</button>
  </> 
}


export default TableRow;
