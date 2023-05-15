import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import FilterSection from "./components/FilterSection";
import ViewOptions from "./components/ViewOptions";
import CardsView from "./components/CardView";
import TableView from "./components/TableView";
import { deleteCountry, editCountry, fetchCountries } from "./service/service";
import Pagination from "./components/Pagination";
import { Country } from "./types/Country";
import DeleteCountryModal from "./components/DeleteContryModal";
import EditCountryModal from "./components/EditCountryModal";

const Countries: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [independentFilter, setIndependentFilter] = useState<boolean | null>(null);
  const [viewOption, setViewOption] = useState<"cards" | "table">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchCountriesData = async () => {
    const data = await fetchCountries(
      nameFilter,
      independentFilter,
      currentPage,
      pageSize
    );
    return data;
  };

  const { data: countries, refetch } = useQuery(
    ["countries", currentPage, pageSize],
    fetchCountriesData,
    { keepPreviousData: false, staleTime: Infinity, cacheTime: 0 }
  );

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const handleIndependentFilterChange = (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    const value =
      event.target.value === "true"
        ? true
        : event.target.value === "false"
        ? false
        : null;
    setIndependentFilter(value);
  };

  const handleFilterButtonClick = () => {
    setCurrentPage(1);
    refetch();
  };

  const handleClearButtonClick = () => {
    setCurrentPage(1);
    setNameFilter("");
    setIndependentFilter(null);
    refetch();
  };

  const handleViewOptionChange = (option: "cards" | "table") => {
    setViewOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsEditModalOpen(true);
  };

  const handleDeleteCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async (editedCountry: Country) => {
    await editCountry(editedCountry.id, editedCountry);
    setIsEditModalOpen(false);
    refetch();
  };

  const handleConfirmDelete = async () => {
    await deleteCountry(selectedCountry?.id!);
    setIsDeleteModalOpen(false);
    refetch();
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
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

      {viewOption === "cards" && (
        <CardsView
          countries={countries?.data || []}
          onEdit={handleEditCountry}
          onDelete={handleDeleteCountry}
        />
      )}
      {viewOption === "table" && (
        <TableView
          countries={countries?.data || []}
          onEdit={handleEditCountry}
          onDelete={handleDeleteCountry}
        />
      )}

      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={countries?.totalCount || 0}
        onPageChange={handlePageChange}
      />

      {isEditModalOpen && (
        <EditCountryModal
          country={selectedCountry!}
          onSave={handleSaveEdit}
          onClose={handleCloseModals}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCountryModal
          country={selectedCountry!}
          onDelete={handleConfirmDelete}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
};

export default Countries;
