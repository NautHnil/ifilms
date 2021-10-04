import React from "react";

export const voteAverage = (value, size = null, type = null) => {
  if (type === "simple") {
    return <>{Math.round(value * 10)}%</>;
  } else {
    return (
      <div className={`vote-average${size ? ` vote-average--${size}` : ""}`}>
        <div className={`progress--circle progress--${Math.round(value * 10)}`}>
          <div className="progress__number">
            {value ? (
              <>
                {Math.round(value * 10)}
                <span className="progress__unit">%</span>
              </>
            ) : (
              "NG"
            )}
          </div>
        </div>
      </div>
    );
  }
};
