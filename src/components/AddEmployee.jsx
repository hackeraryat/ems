import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        image: "",
        category_id: "",
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/auth/category")
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Entered Data:", employee);
        const fromData = new FormData();
        fromData.append('name', employee.name);
        fromData.append('email', employee.email);
        fromData.append('password', employee.password);
        fromData.append('address', employee.address);
        fromData.append('salary', employee.salary);
        fromData.append('image', employee.image);
        fromData.append('category_id', employee.category_id);

        axios.post('http://localhost:3000/auth/add_employee', fromData)
        .then(result => {
            if (result.data.Status) {
                navigate('/dashboard/employee');
            } else {
                const errorMessage = result.data.Error.sqlMessage;
                alert(errorMessage);
            }
        })
    }
    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            onChange={(e) =>
                                setEmployee({ ...employee, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control rounded-0"
                            id="inputPassword4"
                            placeholder="Enter Password"
                            onChange={(e) =>
                                setEmployee({ ...employee, password: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
                            {category.map((c) => {
                                return <option key ={c.id} value={c.id}>{c.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label" htmlFor="inputGroupFile01">
                            Select Image
                        </label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            id="inputGroupFile01"
                            name="image"
                            onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;
