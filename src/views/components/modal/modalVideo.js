import React from "react";
import PropTypes from "prop-types";
import Modal from ".";

const ModalVideo = (props) => {
  let { video, ...customProps } = props;

  return (
    <Modal {...customProps}>
      <div className={`d-flex`}>
        {customProps.show && (
          <iframe
            src={`https://www.youtube.com/embed/${video.key}?controls=0&autoplay=1`}
            title={video.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "100%",
              height: 640,
            }}
          />
        )}
      </div>
    </Modal>
  );
};

ModalVideo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default ModalVideo;
