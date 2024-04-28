const FormRow = ({ type, name, labelText, defaultValue, onChange, id, required }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          type={type}
          id={id}
          name={name}
          className='form-input'
          defaultValue={defaultValue || ''}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  };
  export default FormRow;