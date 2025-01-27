import React, { useState } from 'react';

interface FormField {
    name: string;
    label: string;
    type: string;
    value: string;
}

const DynamicForm: React.FC = () => {
    const [fields, setFields] = useState<FormField[]>([
        { name: 'firstName', label: 'First Name', type: 'text', value: '' },
        { name: 'lastName', label: 'Last Name', type: 'text', value: '' },
        { name: 'email', label: 'Email', type: 'email', value: '' },
    ]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newFields = [...fields];
        newFields[index].value = event.target.value;
        setFields(newFields);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {} as { [key: string]: string });
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        id={field.name}
                        type={field.type}
                        value={field.value}
                        onChange={(event) => handleChange(index, event)}
                    />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;