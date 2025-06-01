import { InfinitySpin } from "react-loader-spinner";
export default function MySpinner() {
  return (
    <span className="m-auto flex justify-evenly" >
    <InfinitySpin  visible width="100" color="#1976d2" ariaLabel="loading" />
    </span>
  );
}
