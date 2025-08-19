import { useEffect, useState } from "react";

export const Alert = ({ counter, threshold }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (counter === threshold) setVisible(true);
  }, [counter]);

  // if (!visible) return null;

  return (
    <div
      className={`alert alert-warning alert-dismissible ${
        visible ? "show" : "fade"
      }`}
      role="alert"
    >
      You have stayed here for <b>{counter} seconds!!</b>
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={(e) => setVisible(false)}
      ></button>
    </div>
  );
};
