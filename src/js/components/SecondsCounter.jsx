import { useEffect, useState } from "react";

export const SecondsCounter = ({ seconds, threshold, setShared }) => {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  const increment = () => setCounter((c) => c + 1);

  useEffect(() => {
    let id;
    if (counter === threshold) setLoading(false);
    if (loading) id = setInterval(increment, seconds * 1000);
    setShared(counter);
    return () => clearInterval(id);
  }, [loading, counter]);

  return (
    <div className="d-flex flex-column vh-100 justify-content-evenly align-items-center">
      <div className="form-group row w-25 justify-content-center">
        <label
          htmlFor="startingPoint"
          className="text-nowrap col-4 col-form-label"
        >
          Start from:&nbsp;
        </label>
        <div className="col-4">
          <input
            type="number"
            className="form-control w-100"
            id="startingPoint"
            min={0}
            placeholder="0"
            onChange={(e) => setCounter(parseInt(e.target.value))}
          />
        </div>
      </div>
      <span>{isNaN(counter) ? setCounter(0) : counter}&nbsp;seconds</span>
      <div className="btn-group" role="group" aria-label="Button group">
        <button className="btn btn-secondary" onClick={() => setLoading(false)}>
          Stop
        </button>
        <button className="btn btn-danger" onClick={() => setCounter(0)}>
          Reset
        </button>
        <button className="btn btn-success" onClick={() => setLoading(true)}>
          Resume
        </button>
      </div>
    </div>
  );
};
