
import React, { useEffect, useState } from "react";
import styles from './LocationSe.module.css';
function LocationSe({
  division,
  district,
  area,
  setDivision,
  setDistrict,
  setArea,
}) {
  const ApiServer = process.env.NEXT_PUBLIC_API_URL;

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showDivisionDropdown, setShowDivisionDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);

  useEffect(() => {
    const divisionFetch = async () => {
      const res = await fetch(`${ApiServer}/divisions`);
      const data = await res.json();
      setDivisions(data?.divisions);
    };
    divisionFetch();
  }, []);

  useEffect(() => {
    const districtFetch = async () => {
      if (division.length > 0) {
        const res = await fetch(`${ApiServer}/districts/${division}`);
        const data = await res.json();
        setDistricts(data.districts);
      }
    };
    districtFetch();
  }, [division]);

  useEffect(() => {
    const areaFetch = async () => {
      if (district.length > 0) {
        const res = await fetch(`${ApiServer}/areas/${district}`);
        const data = await res.json();
        setAreas(data?.areas);
      }
    };
    areaFetch();
  }, [district]);

  const handleDivisionClick = (division) => {
    setDivision(division);
    setDistrict('');
    setArea('');
    setShowDivisionDropdown(false);
  };

  const handleDistrictClick = (district) => {
    setDistrict(district);
    setArea('');
    setShowDistrictDropdown(false);
  };

  const handleAreaClick = (area) => {
    setArea(area);
    setShowAreaDropdown(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={() => setShowDivisionDropdown(!showDivisionDropdown)}>
          {division ? division : "Select Division"}
        </button>
        {showDivisionDropdown && (
          <div className={styles.dropdownContent}>
            {divisions.map((item, index) => (
              <a href="#" key={index} onClick={() => handleDivisionClick(item.name)}>
                {item.name}  {'>'}
              </a>
            ))}
          </div>
        )}
      </div>
      {division && (
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}>
            {district ? district : "Select District"}
          </button>
          {showDistrictDropdown && (
            <div className={styles.dropdownContent}>
              {districts.map((item, index) => (
                <a href="#" key={index} onClick={() => handleDistrictClick(item.name)}>
                  {item.name}  {'>'}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      {district && (
        <div className={styles.dropdown}>
          <button className={styles.dropbtn} onClick={() => setShowAreaDropdown(!showAreaDropdown)}>
            {area ? area : "Select Area"}
          </button>
          {showAreaDropdown && (
            <div className={styles.dropdownContent}>
              {areas.map((item, index) => (
                <a href="#" key={index} onClick={() => handleAreaClick(item.name)}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LocationSe;
