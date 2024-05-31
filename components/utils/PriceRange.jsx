import React from "react";
import { useState, useEffect, useRef } from "react";

function PriceRange({ minValue, maxValue, min, max, step, priceCap,setMin,setMax }) {
    const progressRef = useRef(null);

    const handleMin = (e) => {
        if (maxValue - minValue >= priceCap && maxValue <= max) {
          if (Number(e.target.value) > parseInt(maxValue)) {
          } else {
            setMin(Number(e.target.value))
          }
        } else {
          if (Number(e.target.value) < minValue) {
           
            setMin(Number(e.target.value))
          }
        }
      };
    
      const handleMax = (e) => {
        if (maxValue - minValue >= priceCap && maxValue <= max) {
          if (Number(e.target.value) < parseInt(minValue)) {
          } else {
            setMax(Number(e.target.value))
          }
        } else {
          if (Number(e.target.value) > maxValue) {
            setMax(Number(e.target.value))
          }
        }
      };
    
      useEffect(() => {
        progressRef.current.style.left = (minValue / max) * 100 + "%";
        progressRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
      }, [minValue, maxValue, max, step]);
    
      return (
        
          <div className="flex flex-col w-full bg-gray-200 dark:bg-neutral-900 rounded-lg px-6 py-4">
          
    
            <div className="flex justify-between items-center mb-6 ">
              <div className="rounded-md">
                <span className="p-2 font-semibold text-gray-800 dark:text-gray-200"> Min</span>
                <input
                  onChange={(e) => handleMin(e)}
                  type="number"
                  value={minValue}
                  max={20000}
                  min={100}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
              
              <div className=" ">
                <span className="p-2 font-semibold text-gray-800 dark:text-gray-200"> Max</span>
                <input
                  onChange={(e) => handleMax(e)}
                  type="number"
                  max={20000}
                  min={100}
                  value={maxValue}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>
    
            <div className="mb-4">
              <div className="slider relative h-1 rounded-md bg-gray-300">
                <div
                  className="progress absolute h-1 bg-rose-600 rounded "
                  ref={progressRef}
                ></div>
              </div>
    
              <div className="range-input relative  ">
                <input
                  onChange={handleMin}
                  type="range"
                  min={min}
                  step={step}
                  max={max}
                  value={minValue}
                  className="range-min absolute w-full  -top-1  h-1   bg-transparent  appearance-none pointer-events-none"
                />
    
                <input
                  onChange={handleMax}
                  type="range"
                  min={min}
                  step={step}
                  max={max}
                  value={maxValue}
                  className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
                />
              </div>
            </div>
          </div>
      
      );
    };
    


export default PriceRange;
