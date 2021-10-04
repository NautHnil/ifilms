import _ from "lodash";
import React from "react";
import { Helmet } from "react-helmet-async";
import moment from "moment";
import { CONFIGS } from "../../../configs";

export const SetMetaWeb = (data, custom = false) => {
  if (!_.isEmpty(data) && custom === false) {
    return (
      <Helmet>
        <title>
          {data.title}{" "}
          {data.release_date ? moment(data.release_date).format("YYYY") : ""} |{" "}
          {CONFIGS.PAGE_TITLE}
        </title>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>{data}</title>
    </Helmet>
  );
};
