import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { adminFields } from '../schemas/adminSchema';

interface NavItem {
    name: string;
    label: string;
    path: string;
}

interface FormField {
    id: string;
    type: string;
    value: string | boolean;
    required: boolean;
    label: string;
}

interface FormData {
    name: string;
    fields: FormField[];
}

const NavBar = () => {
    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState<FormData | null>(null);
    console.log(currentForm, 'dharani the great');
    const navItems: NavItem[] = [
        {
            name: 'admin',
            label: 'Admin',
            path: '/admin'
        },
        {
            name: 'domain',
            label: 'Domain',
            path: '/domain'
        },
        {
            name: 'device-config',
            label: 'Device Configuration',
            path: '/device-config'
        }
    ];

    const getEmptyField = (field: any): FormField => {
        return {
            id: field.id,
            type: field.type,
            value: field.type === 'checkbox' ? false : '',
            required: field.required,
            label: field.label
        };
    
    };

    const getEmptyFields = (schema: any[]): FormField[] => {
        return schema.map(field => getEmptyField(field));
    };

    const createCurrentForm = (name: string, schema: any[]): FormData => {
        return {
            name,
            fields: getEmptyFields(schema)
        };
    };

    const handleNavigation = (path: string, name: string) => {
        navigate(path);
        console.log("name", name);
        const formData = constructDataForSchema(name);
        if (formData) {
            setCurrentForm(formData);
        }
    };

    function constructDataForSchema(name: string): FormData | null {
        const specificSchema = navItems.find((item) => item.name === name);
        if (specificSchema) {
            // Get the schema based on the navigation item
            let schema: any[] = [];
            switch (name) {
                case 'admin':
                    schema = adminFields;
                    console.log("schema", schema);

                    break;
                case 'domain':
                    schema = [
                        { id: 'domainName', type: 'text', required: true, label: 'Domain Name' },
                        { id: 'description', type: 'text', required: false, label: 'Description' }
                    ];
                    break;
                case 'device-config':
                    schema = [
                        { id: 'deviceId', type: 'text', required: true, label: 'Device ID' },
                        { id: 'deviceName', type: 'text', required: true, label: 'Device Name' },
                        { id: 'deviceType', type: 'select', required: true, label: 'Device Type' }
                    ];
                    break;
                default:
                    return null;
            }
            
            return createCurrentForm(name, schema);
        }
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li 
                            key={item.name}
                            className="nav-item"
                            onClick={() => handleNavigation(item.path, item.name)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;


