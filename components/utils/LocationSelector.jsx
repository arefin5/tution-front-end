import React, { useEffect, useState } from "react";

function LocationSelector({
  division,
  district,
  area,
  setDivision,
  setDistrict,
  setArea,
}) {

  const ApiServer = process.env.NEXT_PUBLIC_API_URL;

  //after change parent
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [index, setIndex] = useState(0);


  const next = (txt) => {
    setIndex(index+1)
  }



  useEffect(() => {
    const divisionFetch = async () => {
      const res = await fetch(`${ApiServer}/divisions`)
      const data = await res.json()
      setDivisions(data?.divisions);

    }
    divisionFetch()
    return () => { };
  }, []);
  useEffect(() => {
    const districtFetch = async () => {
      if (division.length > 0) {
        const res = await fetch(`${ApiServer}/districts/${division}`)
        const data = await res.json()
        setDistricts(data.districts);
      }
    }
    districtFetch()
    return () => { };
  }, [division]);
  useEffect(() => {
    const areaFetch = async () => {
      if (district.length > 0) {
        const res = await fetch(`${ApiServer}/areas/${district}`)
        const data = await res.json()
        setAreas(data?.areas);
      }
    }
    areaFetch()
    return () => { };
  }, [district]);

  return (
    <div>
      <div className=" w-full">
        <div className="flex w-full flex-wrap mt-2 mb-2 border border-rose-600 rounded-lg p-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              Division
            </label>
            <div className="relative">
              <select
                onChange={(event) => {
                  setDivision(event?.target?.value);
                  setDistrict('')
                }}
                value={division}
                className="block appearance-none w-full bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-900 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {divisions?.map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name ? item?.name : "Select one"}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              District
            </label>

            <div className="relative">
              <select
                onChange={(event) => {
                  setDistrict(event?.target?.value);
                  setArea('')
                }}
                value={district}
                className="block appearance-none w-full bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-900 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {districts?.map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name ? item?.name : "Select one"}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              Next Location
            </label>

            <div className="relative">
              <select
                onChange={(event) => {
                  setArea(event?.target?.value);
                }}
                value={area}
                className="block appearance-none w-full bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-900 text-gray-700 dark:text-gray-200 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {areas?.map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name ? item?.name : "Select one"}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationSelector;
