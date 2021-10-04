import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ children, footer, show, onHide, title, size }) => {
  if (size) {
    size = `modal-${size}`;
  }

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
      document.body.classList.add("pr-8");

      let node = document.createElement("div");
      node.classList.add("modal-backdrop");
      node.classList.add("fade");
      node.classList.add("show");
      document.body.appendChild(node);
    } else {
      document.body.classList.remove("modal-open");
      document.body.classList.remove("pr-8");
      let node = document.querySelector(".modal-backdrop");
      if (node) {
        node.remove();
      }
    }
  }, [show]);

  return (
    <div
      className={`modal${show ? " show d-block pr-8" : " d-none"}`}
      tabIndex={-1}
      onClick={onHide}
    >
      <div
        className={`modal-dialog modal-dialog-scrollable modal-dialog-centered${
          size ? ` ${size}` : ""
        }`}
      >
        <div className="modal-content rounded-0">
          <div className="modal-header rounded-0">
            {title && <h5 className="modal-title">{title}</h5>}

            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onHide}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body p-0">{children}</div>

          {footer && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onHide}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  footer: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
};

export default React.memo(Modal);
