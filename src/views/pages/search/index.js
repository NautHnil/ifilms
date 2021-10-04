import React from "react";
import SearchContextProvider from "../../../contexts/searchContext";
import { SetMetaWeb } from "../../components/common/setMetaWeb";
import SearchComponent from "../../components/search";
import { useQuery } from "../../../hooks";

const SearchPage = () => {
  const query = useQuery();

  return (
    <section className={`pt-30 pb-50`}>
      {SetMetaWeb(`Search result: ${query.get("s")}`, true)}

      <div className={`container`}>
        <SearchContextProvider>
          <SearchComponent query={query.get("s")} />
        </SearchContextProvider>
      </div>
    </section>
  );
};

export default SearchPage;
