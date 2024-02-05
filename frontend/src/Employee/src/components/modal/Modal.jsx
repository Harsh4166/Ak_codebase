import React, { useState } from 'react'


const Modal = ({ modalId, modalTitel, formFields }) => {
    const [formFieldsData, setFormFieldsData] = useState({});
    const [filePreview, setFilePreview] = useState('');
    const [files, setFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Update form data state
            setFormFieldsData({
                ...formFieldsData,
                [event.target.name]: file,
            });
        } else {
            setFilePreview('');

            // Remove file field from form data state
            const { [event.target.name]: removedField, ...updatedFormFieldsData } = formFieldsData;
            setFormFieldsData(updatedFormFieldsData);
        }
    };

    const handleInputChange = (event) => {
        // Update form data state for non-file fields
        setFormFieldsData({
            ...formFieldsData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            // Append each form field to the FormData
            formFields.forEach((field) => {
                if (field.type === 'file') {
                    // For file type, append the file from formFieldsData
                    formData.append('file', files);
                } else {
                    // For non-file types, append the value directly
                    formData.append(field.name, formFieldsData[field.name]);
                }
            });

            const response = await fetch(`http://localhost:3000/api/${modalId}/create`, {
                method: 'POST',
                body: formData,
            });


            if (!response.ok) {
                throw new Error('Error uploading data');
            }

            const result = await response.json();
            console.log('Upload successful:', result);

            // Clear form fields and reload the page
            clearFormFields();
            window.location.reload();

            // You may want to update the UI here instead of reloading the entire page
            // For example, close the modal or update a list of uploaded items
        } catch (error) {
            console.error('Error:', error);
        }


    };

    const clearFormFields = () => {
        setFormFieldsData({});
        setFilePreview('');
        setFile(null);
    };



    return (
        <>
            <div className="modal fade" id={modalId} tabIndex="-1" data-bs-backdrop="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitel}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="modal-body">
                                <div className="row g-3">
                                    {formFields.map((field, index) => (
                                        <div key={index} className={field.type === 'file' ? "col-md-12" : "col-md-12"}>
                                            {field.type === 'file' ? (
                                                <div className='row align-items-center'>
                                                    <label htmlFor={field.name} className='form-label'>{field.label}</label>
                                                    <div className={filePreview ? 'col-md-8' : 'col-md-12'}>
                                                        <input className='form-control shadow-none'
                                                            type="file"
                                                            id={field.name}
                                                            name={field.name}
                                                            onChange={handleFileChange} />
                                                    </div>
                                                    <div className="col-md-4">
                                                        {filePreview && <img src={filePreview} className='border rounded-1 ' alt="File Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                                                    </div>
                                                </div>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    placeholder={field.label}
                                                    className='form-control shadow-none'
                                                    name={field.name}
                                                    value={formFieldsData[field.name] || ''}
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Modal