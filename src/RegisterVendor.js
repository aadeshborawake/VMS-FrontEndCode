// VendorRegistrationForm.js Most Updated
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VendorRegistrationForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vendorName: '',
        contactPersonFirstName: '',
        contactPersonLastName: '',
        contactPersonEmail: '',
        contactPersonNumber: '',    
        vendorAddress: '',
        user: {
            username: '',
            password: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/vendors/register", formData);
            console.log('Registration successful:', response.data);
            alert("Registration successful.");
            setFormData({
                vendorName: '',
                contactPersonFirstName: '',
                contactPersonLastName: '',
                contactPersonEmail: '',
                contactPersonNumber: '',
                vendorAddress: '',
                user: {
                    username: '',
                    password: ''
                }
            });

            
            navigate("/");

        } catch (error) {
            console.error('Error registering:', error);
            alert("Error registering. Please try again.");
        }
    };

    return (
        <div className="vendor-registration-container">
            <h2>Vendor Registration Form</h2>
            <form className="vendor-registration-form" onSubmit={handleSubmit}>
                <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="Vendor Name" required />
                <input type="text" name="contactPersonFirstName" value={formData.contactPersonFirstName} onChange={handleChange} placeholder="Contact Person First Name" required />
                <input type="text" name="contactPersonLastName" value={formData.contactPersonLastName} onChange={handleChange} placeholder="Contact Person Last Name" required />
                <input type="email" name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} placeholder="Contact Person Email" required />
                <input type="tel" name="contactPersonNumber" value={formData.contactPersonNumber} onChange={handleChange} placeholder="Contact Person Number" required />
                <input type="text" name="vendorAddress" value={formData.vendorAddress} onChange={handleChange} placeholder="Vendor Address" required />
                <input type="text" name="username" value={formData.user.username} onChange={handleChange} placeholder="Username" required />
                <input type="password" name="password" value={formData.user.password} onChange={handleChange} placeholder="Password" required />
                <button type="submit">Register Vendor</button>
            </form>
        </div>
    );
}

export default VendorRegistrationForm;




// // VendorRegistrationForm.js
// import React, { useReducer } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const initialState = {
//     vendorName: '',
//     contactPersonFirstName: '',
//     contactPersonLastName: '',
//     contactPersonEmail: '',
//     contactPersonNumber: '',
//     vendorAddress: '',
//     user: {
//         username: '',
//         password: ''
//     }
// };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_FIELD':
//             return {
//                 ...state,
//                 [action.field]: action.value
//             };
//         case 'RESET':
//             return initialState;
//         default:
//             return state;
//     }
// };

// function VendorRegistrationForm() {
//     const navigate = useNavigate();
//     const [formData, dispatch] = useReducer(reducer, initialState);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         dispatch({ type: 'SET_FIELD', field: name, value: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/api/vendors/register", formData);
//             console.log('Registration successful:', response.data);
//             alert("Registration successful.");
//             dispatch({ type: 'RESET' });
//             navigate("/");
//         } catch (error) {
//             console.error('Error registering:', error);
//             alert("Error registering. Please try again.");
//         }
//     };

//     return (
//         <div className="vendor-registration-container">
//             <h2>Vendor Registration Form</h2>
//             <form className="vendor-registration-form" onSubmit={handleSubmit}>
//                 <input type="text" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="Vendor Name" required />
//                 <input type="text" name="contactPersonFirstName" value={formData.contactPersonFirstName} onChange={handleChange} placeholder="Contact Person First Name" required />
//                 <input type="text" name="contactPersonLastName" value={formData.contactPersonLastName} onChange={handleChange} placeholder="Contact Person Last Name" required />
//                 <input type="email" name="contactPersonEmail" value={formData.contactPersonEmail} onChange={handleChange} placeholder="Contact Person Email" required />
//                 <input type="tel" name="contactPersonNumber" value={formData.contactPersonNumber} onChange={handleChange} placeholder="Contact Person Number" required />
//                 <input type="text" name="vendorAddress" value={formData.vendorAddress} onChange={handleChange} placeholder="Vendor Address" required />
//                 <input type="text" name="username" value={formData.user.username} onChange={handleChange} placeholder="Username" required />
//                 <input type="password" name="password" value={formData.user.password} onChange={handleChange} placeholder="Password" required />
//                 <button type="submit">Register Vendor</button>
//             </form>
//         </div>
//     );
// }

// export default VendorRegistrationForm;


