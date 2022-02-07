import React from "react";
import styled from './FormList.module.css';
const FormList = ({list,handleDelete,handleEdit }) => {
  return (
    <>
     <table className={styled.table}>
        <thead className={styled.thead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Job Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styled.tbody}>
          {
              list?.map((item)=>(
                <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.date}</td>
                <td>{item.job}</td>
                <td>
                <button onClick={()=>handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
              ))
          }
        </tbody>
   
    </table>
    </>
  );
};

export default React.memo(FormList)
