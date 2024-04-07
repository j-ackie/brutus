import { FidgetSpinner, RotatingLines } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex flex-1 flex-col justify-center mb-20">
      <RotatingLines 
        width="96"
        // color="grey"
        strokeWidth="5"
        animationDuration="0.75"
      />
    </div>
  );
}

export default Loading;
