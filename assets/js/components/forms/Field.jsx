import React from 'react';

const Field = ({ name, label, value, placeholder = "", type = "text", error= "", onChange }) => {
    return (
        <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input 
           name={name}
            value={value}
             placeholder={placeholder || label}
              id={name}
               type={type}
                onChange={onChange}
                 className={"form-control " + (error && "is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
     );
}
export default Field;