import React, { memo } from "react";
import styled from "./FormInput.module.css";
const FormInput = ({
  name,
  email,
  phone,
  date,
  job,
  imageurl,
  location,
  handleChange,handleChangeImg,handleSubmit,edit,handleUpdate
}) => {
  return (
    <>
      <fieldset className={styled.field}>
        <legend>Registration</legend>
        <form onSubmit={edit ? handleSubmit : handleUpdate}>
          <div className={styled.container}>
            <div className={styled.row_1}>
              <div className={styled.col_1}>
                <span>Fullname</span>
                <input type="text" name="name" value={name} onChange={handleChange} />
              </div>
              <div className={styled.col_2}>
                <span>Profile Pic</span>
                <div>
                {imageurl && <img className={styled.img} src={imageurl} alt="blank"/>}
                <input  type='file' onChange={handleChangeImg}/>
                </div>
              </div>
            </div>
            <div className={styled.row_2}>
              <div className={styled.col_21}>
                <span>Mobile</span>
                <input type="tel" name="phone" value={phone} onChange={handleChange}  />
              </div>
              <div className={styled.col_22}>
                <span>Email Id</span>
                <input type="email" name="email" value={email} onChange={handleChange}  />
              </div>
            </div>
            <div className={styled.row_3}>
              <div className={styled.col_31}>
                <span>Job Type</span>
                <select name="job" value={job} onChange={handleChange} >
                  <option value='Full Time'>FT</option>
                  <option value='Part Time'>PT</option>
                  <option value='Consultant'>Consultant</option>
                </select>
              </div>
              <div className={styled.col_32}>
                <span>DOB</span>
                <input type="date" name="date" value={date} onChange={handleChange}  />
              </div>
            </div>
            <div className={styled.row_4}>
              <div className={styled.col_41}>
                <span>Pref. Location</span>
                <div>
                <input type="checkbox" name="location" value={location} checked={location} onChange={handleChange}  />
                <span>Chennai</span>
                </div>
              </div>
              <div className={styled.col_42}>
                {edit ? <input type="submit" value="Add" /> :<input type="submit" value="update" /> }
              </div>
            </div>
          </div>
        </form>
      </fieldset>
    </>
  );
};

export default memo(FormInput)