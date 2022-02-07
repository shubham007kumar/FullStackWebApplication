import React, { useCallback, useEffect, useState } from "react";
import FormInput from "./FormInput/FormInput";
import FormList from "./FormList/FormList";
import axios from "axios";
import { v4 as uuid } from "uuid";
const init = {
  id: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  job: "",
  imageurl: "",
  location: "",
};

export const Form = () => {
  const [data, setData] = useState(init);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(true);
  const [fakeId, setFakeId] = useState("");
  const { name, email, phone, date, location, job, imageurl } = data;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;
    setData({ ...data, [name]: val });
  };
  const handleChangeImg = async (e) => {
    const url = e.target.files[0];
    const da = await base64(url);
    setData({ ...data, imageurl: da });
  };

  const base64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: uuid(),
      name: name,
      email: email,
      phone: phone,
      date: date,
      job: job,
      imageurl: imageurl,
      location: location,
    };
    axios.post("http://localhost:3001/create", payload).then((res) => {
      getUser();
    });
  };

  const getUser = useCallback(() => {
    axios
      .get("http://localhost:3001/user")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback((id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => {
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEdit = useCallback((id) => {
    setFakeId(id);
    axios.get(`http://localhost:3001/particularUser/${id}`).then((res) => {
      const time = res.data[0].date.split("T");
      console.log(time);
      const fetchdate = time[0];
      setData({
        id: fakeId,
        name: res.data[0].name,
        email: res.data[0].email,
        phone: res.data[0].phone,
        date: fetchdate,
        job: res.data[0].job,
        imageurl: res.data[0].imageurl,
        location: res.data[0].location === 0 ? "" : "checked",
      });
      setEdit(false);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = {
      id: fakeId,
      name: name,
      email: email,
      phone: phone,
      date: date,
      job: job,
      imageurl: imageurl,
      location: location,
    };
    axios
      .put(`http://localhost:3001/update/${fakeId}`, payload)
      .then((res) => {
        getUser()
        setEdit(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <FormInput
        edit={edit}
        {...data}
        handleChange={handleChange}
        handleChangeImg={handleChangeImg}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />
      <FormList
        list={list}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};
