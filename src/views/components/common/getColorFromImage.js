import React, { createRef, useState } from "react";
import PropTypes from "prop-types";
import ColorThief from "colorthief";

const GetColorFormImage = ({ image, children }) => {
  const [color, setColor] = useState([]);
  const [textColor, setTextColor] = useState("black");
  const imgRef = createRef();

  const loadColor = () => {
    const colorThief = new ColorThief();
    const img = imgRef.current;
    const RGB = colorThief.getColor(img);
    const brightness = Math.round(
      (parseInt(RGB[0]) * 255 +
        parseInt(RGB[1]) * 255 +
        parseInt(RGB[2]) * 255) /
        1000
    );
    const textRGB = brightness > 135 ? "black" : "white";

    setTextColor(textRGB);
    setColor(RGB);
  };

  return (
    <div
      className={`position-relative py-30 py-lg-50 filter-bg text-${textColor}`}
    >
      <span
        className="entry-header__backdrop"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${color}, 1) 150px, rgba(${color}, 0.7) 100%)`,
        }}
      />
      <img
        hidden
        crossOrigin={"anonymous"}
        ref={imgRef}
        src={image}
        alt="backdrop"
        onLoad={() => loadColor()}
      />
      {children}
    </div>
  );
};

GetColorFormImage.propTypes = {
  image: PropTypes.string,
  children: PropTypes.node.isRequired,
};

GetColorFormImage.defaultProps = {
  image: "",
};

export default React.memo(GetColorFormImage);
