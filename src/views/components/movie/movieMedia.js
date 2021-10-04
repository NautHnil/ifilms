import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import ModalVideo from "../modal/modalVideo";

const GetModalVideo = ({ showModalVideo, title, videoObj, onHide }) => (
  <ModalVideo
    show={showModalVideo}
    onHide={onHide}
    size="xl"
    title={title}
    video={videoObj}
  />
);

const MemoizedModalVideo = React.memo(
  GetModalVideo,
  (prevProps, nextProps) =>
    prevProps.showModalVideo === nextProps.showModalVideo
);

const MovieMedia = (props) => {
  const { title, type, videos, images, configs } = props;
  const [mostPopular, setMostPopular] = useState([]);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [videoObj, setVideoObj] = useState({});

  const loadMostPopular = () => {
    let video, backdrop, poster;

    if (!_.isEmpty(videos)) {
      let new_videos = videos.results.reverse();
      video = new_videos[0];
    }

    backdrop =
      !_.isEmpty(_.get(images, "backdrops")) &&
      _.get(images, "backdrops").reduce((acc, cur) =>
        acc.vote_average > cur.vote_average ? acc : cur
      );
    poster =
      !_.isEmpty(_.get(images, "posters")) &&
      _.get(images, "posters").reduce((acc, cur) =>
        acc.vote_average > cur.vote_average ? acc : cur
      );

    setMostPopular([
      { ...video, most_popular_type: "video" },
      { ...backdrop, most_popular_type: "backdrop" },
      { ...poster, most_popular_type: "poster" },
    ]);
  };

  useEffect(() => loadMostPopular(), [videos]);

  const handlePreviewVideo = (e, obj) => {
    e.preventDefault();
    const { key, name } = obj;

    setShowModalVideo(true);
    setVideoObj({ key, name });
  };

  let renderBody;
  if (type === "popular") {
    renderBody = (
      <div className={`position-relative`}>
        <div className={`overflow-x rounded-md`}>
          <div className={`d-flex ws-nowrap`}>
            {!_.isEmpty(mostPopular) &&
              mostPopular.map((popular) => (
                <div key={uuidv4()}>
                  {popular.most_popular_type === "video" && popular.key && (
                    <div className={`position-relative`}>
                      <img
                        src={`http://i3.ytimg.com/vi/${popular.key}/hqdefault.jpg`}
                        alt={popular.name}
                        style={{
                          minWidth: 400,
                          width: 400,
                          height: 300,
                        }}
                      />
                      <div
                        className={`d-flex cursor-pointer rounded-md text-white text-hover-movie-green`}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 67,
                          height: 67,
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          transition: "all 0.25s ease",
                        }}
                        onClick={(e) => handlePreviewVideo(e, popular)}
                      >
                        <i className={`fas fa-play fs-24 m-auto`} />
                      </div>
                    </div>
                  )}
                  {popular.most_popular_type === "backdrop" &&
                    popular.file_path && (
                      <img
                        src={`${_.get(configs, "images").secure_base_url}${
                          _.get(configs, "images").backdrop_sizes[1]
                        }${popular.file_path}`}
                        alt={`Posters`}
                        style={{
                          minWidth: 533,
                          width: 533,
                          minHeight: 300,
                        }}
                      />
                    )}
                  {popular.most_popular_type === "poster" && popular.file_path && (
                    <img
                      src={`${_.get(configs, "images").secure_base_url}${
                        _.get(configs, "images").poster_sizes[3]
                      }${popular.file_path}`}
                      alt={`Posters`}
                      style={{
                        minWidth: 200,
                        width: 200,
                        minHeight: 300,
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className={`scroll-fade`} />
      </div>
    );
  } else if (type === "videos") {
    renderBody = (
      <div className={`position-relative`}>
        <div className={`overflow-x rounded-md`}>
          <div className={`d-flex ws-nowrap`}>
            {!_.isEmpty(videos) &&
              _.get(videos, "results")
                .slice(0, 6)
                .map((video) => (
                  <div key={video.id}>
                    <div className={`position-relative`}>
                      <img
                        src={`http://i3.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        style={{
                          minWidth: 400,
                          width: 400,
                          height: 300,
                        }}
                      />
                      <div
                        className={`d-flex cursor-pointer rounded-md text-white text-hover-movie-green`}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: 67,
                          height: 67,
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          transition: "all 0.25s ease",
                        }}
                        onClick={(e) => handlePreviewVideo(e, video)}
                      >
                        <i className={`fas fa-play fs-24 m-auto`} />
                      </div>
                    </div>
                  </div>
                ))}

            {!_.isEmpty(videos) && _.get(videos, "results").length > 6 && (
              <div
                className={`px-10 align-self-center`}
                style={{ minWidth: 140 }}
              >
                <Link to={`#more`} className={`d-block text-center`}>
                  <span className={`mr-1`}>View More</span>
                  <i className={`far fa-long-arrow-right`} />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={`scroll-fade`} />
      </div>
    );
  } else if (type === "backdrops") {
    renderBody = (
      <div className={`position-relative`}>
        <div className={`overflow-x rounded-md`}>
          <div className={`d-flex ws-nowrap`}>
            {!_.isEmpty(_.get(images, "backdrops")) &&
              _.get(images, "backdrops")
                .slice(0, 6)
                .map((backdrop) => (
                  <div key={uuidv4()}>
                    <img
                      src={`${_.get(configs, "images").secure_base_url}${
                        _.get(configs, "images").backdrop_sizes[1]
                      }${backdrop.file_path}`}
                      alt={`Backdrop`}
                      style={{
                        minWidth: 533,
                        width: 533,
                        minHeight: 300,
                      }}
                    />
                  </div>
                ))}

            {!_.isEmpty(_.get(images, "backdrops")) &&
              _.get(images, "backdrops").length > 6 && (
                <div
                  className={`px-10 align-self-center`}
                  style={{ minWidth: 140 }}
                >
                  <Link to={`#more`} className={`d-block text-center`}>
                    <span className={`mr-1`}>View More</span>
                    <i className={`far fa-long-arrow-right`} />
                  </Link>
                </div>
              )}
          </div>
        </div>
        <div className={`scroll-fade`} />
      </div>
    );
  } else if (type === "posters") {
    renderBody = (
      <div className={`position-relative`}>
        <div className={`overflow-x rounded-md`}>
          <div className={`d-flex ws-nowrap`}>
            {!_.isEmpty(_.get(images, "posters")) &&
              _.get(images, "posters")
                .slice(0, 6)
                .map((poster) => (
                  <div key={uuidv4()}>
                    <img
                      src={`${_.get(configs, "images").secure_base_url}${
                        _.get(configs, "images").poster_sizes[3]
                      }${poster.file_path}`}
                      alt={`Posters`}
                      style={{
                        minWidth: 200,
                        width: 200,
                        minHeight: 300,
                      }}
                    />
                  </div>
                ))}

            {!_.isEmpty(_.get(images, "posters")) &&
              _.get(images, "posters").length > 6 && (
                <div
                  className={`px-10 align-self-center`}
                  style={{ minWidth: 140 }}
                >
                  <Link to={`#more`} className={`d-block text-center`}>
                    <span className={`mr-1`}>View More</span>
                    <i className={`far fa-long-arrow-right`} />
                  </Link>
                </div>
              )}
          </div>
        </div>
        <div className={`scroll-fade`} />
      </div>
    );
  } else {
    renderBody = <div>No media,</div>;
  }

  return (
    <>
      {renderBody}
      <MemoizedModalVideo
        title={title}
        showModalVideo={showModalVideo}
        videoObj={videoObj}
        onHide={() => setShowModalVideo(false)}
      />
    </>
  );
};

GetModalVideo.propTypes = {
  title: PropTypes.string,
  showModalVideo: PropTypes.bool,
  videoObj: PropTypes.object,
  onHide: PropTypes.func,
};

GetModalVideo.defaultProps = {
  title: "",
  showModalVideo: false,
  videoObj: {},
  onHide: null,
};

MovieMedia.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  videos: PropTypes.object.isRequired,
  images: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired,
};

MovieMedia.defaultProps = {
  title: "",
};

export default React.memo(MovieMedia);
