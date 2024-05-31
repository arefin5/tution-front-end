import React from "react";
import { useEffect, useState } from "react";

function AreaSelector({
  division,
  district,
  setDivision,
  setDistrict,
  areas,
  setAreas,
}) {
  const ApiServer = process.env.NEXT_PUBLIC_API_URL;

  //after change parent
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areasArray, setAreasArray] = useState([]);


  const selectAreaToggle = (event, value) => {
    event.preventDefault();
    if (areas.includes(value)) {
      setAreas(areas.filter(e => e != value))
    } else {
      setAreas([...areas, value])
    }
  }



  useEffect(() => {
    const divisionFetch = async () => {
      const res = await fetch(`${ApiServer}/divisions`)
      const data = await res.json()
      console.log(data)
      setDivisions(data.divisions);
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
        setAreasArray(data.areas);
      }
    }
    areaFetch()
    return () => { };
  }, [district]);


  return (
    <div>
      <div className=" w-full">
        <div className="flex flex-col w-full flex-wrap mt-2 mb-2 border border-rose-600 rounded-lg p-6">
          <div className="flex w-full  p-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                Division
              </label>
              <div className="relative">
                <select
                  onChange={(event) => {
                    setDivision(event?.target?.value);
                    setDistrict('')
                    setAreas([])
                    setAreasArray([])
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
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-800 dark:text-gray-200 mb-1">
                District
              </label>

              <div className="relative">
                <select
                  onChange={(event) => {
                    setDistrict(event?.target?.value);
                    setAreas([])
                    setAreasArray([])
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
          </div>
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block text-gray-800 dark:text-gray-200 mb-1">
              Areas
            </label>

            <div className="flex flex-wrap w-full">

              {areasArray?.map((item, index) => (
                <button
                  key={index}
                  onClick={e => { selectAreaToggle(e, item?.name) }}
                  className={`${areas?.includes(item?.name) ? 'text-rose-600 ring-2 ring-rose-600' : 'text-gray-800 dark:text-gray-300'} cursor-pointer hover:ring-2  ring-rose-600  text-center flex items-center justify-center px-3 py-1  md:px-5 md:py-2 bg-neutral-200 dark:bg-neutral-900 m-2 rounded-full `}
                >
                  {item?.name}
                </button>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaSelector;
