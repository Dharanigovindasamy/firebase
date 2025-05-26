import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { adminFields } from '../schemas/adminSchema';
import { deviceFields } from '../schemas/deviceSchema';
import { domainFields } from '../schemas/domainSchema';
import DeviceConfiguration from '../components/DeviceConfiguration';

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
    const [showDeviceConfig, setShowDeviceConfig] = useState(false);

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

    const handleNavigation = (path: string, name: string) => {
        navigate(path);
        if (name === 'device-config') {
            setShowDeviceConfig(true);
        } else {
            setShowDeviceConfig(false);
            const formData = constructDataForSchema(name);
            if (formData) {
                setCurrentForm(formData);
            }
        }
    };

    function constructDataForSchema(name: string): FormData | null {
        const specificSchema = navItems.find((item) => item.name === name);
        if (specificSchema) {
            let schema: any[] = [];
            switch (name) {
                case 'admin':
                    schema = adminFields;
                    break;
                case 'domain':
                    schema = domainFields;
                    break;
                default:
                    return null;
            }
            
            return {
                name,
                fields: schema.map(field => ({
                    id: field.id,
                    type: field.type,
                    value: field.type === 'checkbox' ? false : '',
                    required: field.required,
                    label: field.label
                }))
            };
        }
        return null;
    }

    return (
        <div>
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
            {showDeviceConfig ? (
                <DeviceConfiguration />
            ) : currentForm && (
                <div className="form-container">
                    {/* Render other forms here */}
                </div>
            )}
        </div>
    );
};

export default NavBar;


