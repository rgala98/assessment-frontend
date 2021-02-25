import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

import fetch from "isomorphic-fetch";
// import FormData from "form-data";

import axios from "axios";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const StudentDetails = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState("Please Select");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(
    "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"
  );

  const [values, setValues] = useState({
    s_id: 0,
    student_name: "",
    father_name: "",
    dob: "",
    gender: "Male",
    address: "",
    course: "Please Select",
    mobile_number: "",
    email: "",
    photo:
      "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png",
  });

  let formData  = new FormData();

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    if (name === "photo") {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    setValues({ ...values, [name]: value });
  };

  const resetAll = () => {
    // setStudentID("");
    // setStudentName("");
    // setFatherName("");
    // setDOB("");
    // setGender("");
    // setAddress("");
    // setCourse("");
    // setMobileNumber("");
    // setEmail("");
    // setImage("");
    setValues({
      s_id: 0,
      student_name: "",
      father_name: "",
      dob: "",
      gender: "Male",
      address: "",
      course: "Please Select",
      mobile_number: "",
      email: "",
      photo:
        "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png",
      formData: "",
    });
  };

  const onSumbit = (e) => {
    if (checkAllFields()) {
      if (values.s_id === 0) {
        setFormData(0);
        addStudent();
      } else {
        // Update Student
        setFormData(values.s_id)
        updateStudent();
      }
    }
  };

  const checkAllFields = () => {
    if (values.student_name === "") {
      alert("Please Enter Student Name");
      return false;
    } else if (values.father_name === "") {
      alert("Please enter Father Name");
      return false;
    } else if (values.dob === "") {
      alert("Please enter date of birth");
      return false;
    } else if (values.course === "Please Select") {
      alert("Please select a course");
      return false;
    } else if (
      values.mobile_number.length !== 10 ||
      !values.mobile_number.match(/\d/)
    ) {
      alert("Please enter 10 digit mobile number");
      return false;
    } else if (values.email === "" || !values.email.match(/.+@.+/)) {
      alert("Please Enter Correct Email");
      return false;
    } else if (values.address === "") {
      alert("Please Enter Address");
      return false;
    } else if (values.photo === "") {
      alert("Please Choose Photo");
      return false;
    }
    return true;
  };

  const addStudent = () => {
    fetch("http://localhost:5000/api/student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer",
      },
      body: formData,
    })
      .then(function (response) {
        console.log("Response" + response.json());
        alert("Data Added");
        // resetAll();
        // onGridReady();
      })
      .catch(function (error) {
        // alert("ERROR" + error);
        console.log("Error" + error);
      });
  };

  const getAllStudentData = () => {
    axios
      .get("http://localhost:5000/api/students", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response.data);
        setRowData(response.data);
      })
      .catch(function (error) {
        alert("Error getting data please refresh");
        console.log("Error" + error);
      });
  };

  const updateStudent = () => {
    // const params = JSON.stringify({
    //   s_id: studentID,
    //   student_name: studentName,
    //   father_name: fatherName,
    //   dob: DOB,
    //   gender: gender,
    //   course: course,
    //   mobile_number: mobileNumber,
    //   address: address,
    //   email: email,
    // });

    // axios
    //   .patch("http://localhost:5000/api/student", params, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then(function (response) {
    //     console.log("Response" + response.data);
    //     alert("Student Data Updated");
    //     resetAll();
    //     onGridReady();
    //   })

    //   .catch(function (error) {
    //     alert(error);
    //     console.log("Error" + error);
    //   });
    fetch("http://localhost:5000/api/student", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer",
      },
      body: formData,
    })
      .then(function (response) {
        console.log("Response" + response.json());
        alert("Student Data Updated");
        resetAll();
        onGridReady();
      })
      .catch(function (error) {
        // alert("ERROR" + error);
        console.log("Error" + error);
      });
  };

  const deleteStudent = () => {
    fetch("http://localhost:5000/api/student", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer",
      },
      body: formData,
    })
      .then(function (response) {
        console.log("Response" + response.json());
        alert("Student Deleted Successfully");
        resetAll();
        onGridReady();
      })
      .catch(function (error) {
        alert("ERROR" + error);
        console.log("Error" + error);
      });
  };

  const onGridReady = (params) => {
    // API CALL HERE

    if (!gridApi) {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
      gridOptions.columnApi.sizeColumnsToFit(1500);
    }

    getAllStudentData();

    // gridApi.sizeColumnsToFit(90)
  };

  // {
  //   s_id: "1",
  //   student_name: "Rahul Gala",
  //   father_name: "Viren Gala",
  //   dob: "1998-08-27",
  //   gender: "Male",
  //   course: "B. Tech IT",
  //   mobile_number: "9876543210",
  //   address: "709, Holy Aps, Mumbai",
  //   email: "rgala38@gmaiwl.com",
  //   submitted_on: "Today",
  // }

  const defaultColDef = {
    editable: true,
    resizable: true,
    filter: true,
    suppressKeyboardEvent: (params) => params.editing,
  };

  const getSelectedRowData = () => {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    return selectedData;
  };

  const setFormData = (s_id = 0) => {
    formData = new FormData();
    if (s_id !== 0) {
      formData.set("s_id", values.s_id);
    }
    formData.set("student_name", values.student_name);
    formData.set("father_name", values.father_name);
    formData.set("gender", values.gender);
    formData.set("dob", values.dob);
    formData.set("course", values.course);
    formData.set("mobile_number", values.mobile_number);
    formData.set("email", values.email);
    formData.set("address", values.address);
  };

  const onEditClicked = (e) => {
    e.preventDefault();
    if (getSelectedRowData().length) {
      let data = getSelectedRowData();
      setValues({
        s_id: data[0].s_id,
        student_name: data[0].student_name,
        father_name: data[0].father_name,
        gender: data[0].gender,
        dob: data[0].dob,
        course: data[0].course,
        mobile_number: data[0].mobile_number,
        email: data[0].email,
        address: data[0].address,
      });
      

      // setStudentID(data[0].s_id);
      // setStudentName(data[0].student_name);
      // setFatherName(data[0].father_name);
      // setGender(data[0].gender);
      // setDOB(data[0].dob);
      // setCourse(data[0].course);
      // setMobileNumber(data[0].mobile_number);
      // setEmail(data[0].email);
      // setAddress(data[0].address);
      window.scrollTo({ top: 20, behavior: "smooth" });
    } else {
      alert("Please Select A Row to Edit");
    }
  };

  const onDeleteClicked = (e) => {
    e.preventDefault();
    if (getSelectedRowData().length) {
      let data = getSelectedRowData();
      if (
        window.confirm(
          `Are you sure you want to delete ${data[0].student_name}'s data?`
        )
      ) {
        formData = new FormData();
        formData.set("s_id", data[0].s_id);
        deleteStudent();
      }
    } else {
      alert("Please Select A Row to Delete");
    }
  };

  const gridOptions = {
    columnDefs: defaultColDef,
    pagination: true,
    rowSelection: "single",

    // EVENTS
    // Add event handlers
    onRowClicked: (event) => console.log("ROW IS SELECTED"),
  };
  const [rowData, setRowData] = useState([]);

  const [columnData, setColumnData] = useState([
    { headerName: "S.No", field: "s_id", sortable: "true" },
    {
      headerName: "Student's Name",
      field: "student_name",
      sortable: "true",
      filter: "true",
    },
    { headerName: "Father's Name", field: "father_name", sortable: "true" },
    { headerName: "DOB", field: "dob" },
    { headerName: "Gender", field: "gender", sortable: "true" },
    { headerName: "Course", field: "course", sortable: "true" },
    { headerName: "Email", field: "email" },
    { headerName: "Mobile Number", field: "mobile_number" },
    { headerName: "Address", field: "address" },
    { headerName: "Submitted On", field: "createdAt", sortable: "true" },
  ]);


  return (
    <div className={`${styles.top}`}>
      <div className={`container ${styles.studentDetails}`}>
        <form className={`${styles.form}`}>
          <h1>Student details</h1>
          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.form__group}`}>
                <input
                  type="text"
                  value={values.student_name}
                  onChange={handleChange("student_name")}
                  className={`${styles.form__input}`}
                  placeholder="Student's Name"
                  id="student_name"
                  required
                />
                <label
                  htmlFor="student_name"
                  className={`${styles.form__label}`}
                >
                  Student's Name
                </label>
              </div>

              <div className={` ${styles.form__group}`}>
                <input
                  type="text"
                  className={`${styles.form__input}`}
                  value={values.father_name}
                  onChange={handleChange("father_name")}
                  placeholder="Father's Name"
                  id="father_name"
                  required
                />
                <label
                  htmlFor="father_name"
                  className={`${styles.form__label}`}
                >
                  Father's Name
                </label>
              </div>

              <div className={` ${styles.form__group}`}>
                <input
                  type="date"
                  className={`${styles.form__input}`}
                  placeholder="Date of Birth"
                  value={values.dob}
                  onChange={handleChange("dob")}
                  id="DOB"
                  required
                />
                <label htmlFor="DOB" className={`${styles.form__label}`}>
                  Date of Birth
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`${styles.form__group}`}>
                <img
                  id="uploadPreview"
                  src={image}
                  className={` ${styles.form__image}`}
                  alt="Upload Preview"
                />
                <input
                  type="file"
                  className={`${styles.form__input}`}
                  accept="image/*"
                  id="photo"
                  onChange={handleChange("photo")}
                  required
                />
                <label htmlFor="photo" className={`${styles.form__label}`}>
                  Photo
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.form__group}`}>
                <div className={`${styles.form__radio_group}`}>
                  <input
                    type="radio"
                    className={`${styles.form__radio_input}`}
                    id="male"
                    checked={values.gender === "Male"}
                    value="Male"
                    onChange={handleChange("gender")}
                    name="gender"
                  />
                  <label
                    htmlFor="male"
                    className={`${styles.form__radio_label}`}
                  >
                    <span className={`${styles.form__radio_button}`}></span>
                    Male
                  </label>
                </div>

                <div className={`${styles.form__radio_group}`}>
                  <input
                    type="radio"
                    className={`${styles.form__radio_input}`}
                    id="female"
                    checked={values.gender === "Female"}
                    value="Female"
                    onChange={handleChange("gender")}
                    name="gender"
                  />
                  <label
                    htmlFor="female"
                    className={`${styles.form__radio_label}`}
                  >
                    <span className={`${styles.form__radio_button}`}></span>
                    Female
                  </label>
                </div>
              </div>

              <div className={`${styles.form__group}`}>
                <select
                  className={`${styles.form__input}`}
                  id="course"
                  name="course"
                  value={values.course}
                  onChange={handleChange("course")}
                >
                  <option value="Please Select">--- Please Select ---</option>
                  <option value="B. Tech Computer Science">
                    B. Tech Computer Science
                  </option>
                  <option value="B. Tech Information Technology">
                    B. Tech Information Technology
                  </option>
                  <option value="B. Tech Mechanical">B. Tech Mechanical</option>
                  <option value="B. Tech Chemical">B. Tech Chemical</option>
                </select>
                <label htmlFor="course" className={`${styles.form__label}`}>
                  Course Applied
                </label>
              </div>

              <div className={`${styles.form__group}`}>
                <input
                  type="tel"
                  className={`${styles.form__input}`}
                  placeholder="Mobile Number"
                  value={values.mobile_number}
                  onChange={handleChange("mobile_number")}
                  id="mobile_number"
                  required
                />
                <label
                  htmlFor="mobile_number"
                  className={`${styles.form__label}`}
                >
                  Mobile Number
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className={`${styles.form__group}`}>
                <textarea
                  type="address"
                  cols="10"
                  rows="3"
                  className={`${styles.form__input}`}
                  value={values.address}
                  onChange={handleChange("address")}
                  placeholder="Address"
                  id="address"
                  required
                />
                <label htmlFor="email" className={`${styles.form__label}`}>
                  Address
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.form__group}`}>
                <input
                  type="email"
                  className={`${styles.form__input}`}
                  placeholder="Email ID"
                  value={values.email}
                  onChange={handleChange("email")}
                  id="email"
                  required
                />
                <label htmlFor="email" className={`${styles.form__label}`}>
                  Email ID
                </label>
              </div>
            </div>
            <div className="col-md-3">
              <button
                className={`${styles.form__button} ${styles.form__button_red} `}
                onClick={(e) => resetAll(e)}
              >
                Reset
              </button>
            </div>
            <div className="col-md-3">
              <button
                className={`${styles.form__button} ${styles.form__button_green} `}
                type="submit"
                onClick={(e) => onSumbit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <div className={`${styles.studentDatabase}`}>
          <h1>Student Database</h1>
          <button
            className={`${styles.button} ${styles.form__button_yellow} `}
            onClick={(e) => onEditClicked(e)}
          >
            EDIT
          </button>

          <button
            className={`${styles.button} ${styles.form__button_red} `}
            onClick={(e) => onDeleteClicked(e)}
          >
            DELETE
          </button>

          <div className={`ag-theme-material ${styles.database}`}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnData}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              gridOptions={gridOptions}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
