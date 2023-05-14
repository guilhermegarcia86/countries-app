import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import FilterSection from "./components/FilterSection";
import ViewOptions from "./components/ViewOptions";
import CardsView from "./components/CardView";
import TableView from "./components/TableView";
import { fetchCountries } from "./service/service";
import Pagination from "./components/Pagination";

const Countries: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [independentFilter, setIndependentFilter] = useState<boolean | null>(null);
  const [viewOption, setViewOption] = useState<"cards" | "table">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchCountriesData = async () => {
    const data = await fetchCountries(nameFilter, independentFilter, currentPage, pageSize);
    return data;
  };

  const { data: countries, refetch } = useQuery(
    ['countries', currentPage, pageSize],
    fetchCountriesData,
    { keepPreviousData: false, staleTime: 5000 }
  );

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value)
    setNameFilter(event.target.value);
  };

  const handleIndependentFilterChange = (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value === "true" ? true : event.target.value === "false" ? false : null;
    setIndependentFilter(value);
  };

  const handleFilterButtonClick = () => {
    setCurrentPage(1);
    refetch();
  };

  const handleClearButtonClick = () => {
    setCurrentPage(1);
    setNameFilter('');
    setIndependentFilter(null);
    refetch();
  }

  const handleViewOptionChange = (option: "cards" | "table") => {
    setViewOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <FilterSection
        nameFilter={nameFilter}
        independentFilter={independentFilter}
        onNameFilterChange={handleNameFilterChange}
        onIndependentFilterChange={handleIndependentFilterChange}
        onFilterButtonClick={handleFilterButtonClick}
        onClearButtonClick={handleClearButtonClick}
      />

      <ViewOptions
        viewOption={viewOption}
        onViewOptionChange={handleViewOptionChange}
      />

      {viewOption === "cards" ? (
        <CardsView countries={countries?.data || []} />
      ) : (
        <TableView countries={countries?.data || []} />
      )}

        <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={countries?.totalCount || 0}
            onPageChange={handlePageChange}
        />
    </div>
  );
};

export default Countries;
