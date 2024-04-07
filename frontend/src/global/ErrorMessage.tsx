import { FC } from "react";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  return <div>{error}</div>;
};

export default ErrorMessage;
