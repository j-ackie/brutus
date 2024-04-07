import { FidgetSpinner } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex flex-1 flex-col justify-center mb-20">
      <FidgetSpinner height={160} width={160} />
    </div>
  );
}

export default Loading;
