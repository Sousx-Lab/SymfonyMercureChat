import React from 'react';

const Field = ({ name, label, labelClass = null, divClass = null, value, placeholder = "", type = "text", error = "", onChange }) => {
    return (
        <div className="form-group">
        <label className={"font-weight-bold " + labelClass} htmlFor={name}>{label}</label>
        <div className={divClass}>
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
           </div>
     );
}
export default Field;