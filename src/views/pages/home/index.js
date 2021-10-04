import React from "react";
import { SetMetaWeb } from "../../components/common/setMetaWeb";

const HomePage = () => {
  return (
    <section className={`pt-30 pb-50`}>
      {SetMetaWeb("iFilms", true)}

      <div className={`container`}>
        <h2 className={`mb-0`}>Home page</h2>
      </div>
    </section>
  );
};

export default HomePage;
