import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import { useAuthContext } from "../../../context/AuthContext";
import { ReportsContext } from "../../../context/ReportsContext";

const Markers = ({ data, loading }) => {
  // const [{ data, loading }, { getReports }] = ReportsContext();

  const getMarkerLocation = () => {
    const points = data
      .map((item) => item.location)
      .map((element) => {
        return {
          latitude: element.latitude.toFixed(9) * 1,
          longitude: element.longitude.toFixed(9) * 1,
        };
      });
    return points;
  };

  // useEffect(() => {
  //   getReports({ collection: "reports" });
  //   data &&
  //     getMarkerLocation().map((item) => console.log("item.latitude:", item));
  // }, []);

  return (
    !loading &&
    data &&
    getMarkerLocation().map((item, i) => <Marker key={i} coordinate={item} />)
  );
};

export default Markers;
