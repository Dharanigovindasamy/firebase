import AdvancedConfiguration from "./tabs/AdvancedConfiguration";
import BasicDetails from "./tabs/BasicDetails";
import DeviceConfiguration from "./tabs/DeviceConfiguration";
import './DeviceConfigForm.css';

export default function DeviceConfigForm() {
  return (
    <div>
      <h1>Device Config Form</h1>
      <div>
        <BasicDetails />
        <DeviceConfiguration />
        <AdvancedConfiguration />
      </div>
    </div>
  );
}