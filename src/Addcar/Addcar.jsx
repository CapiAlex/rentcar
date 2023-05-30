import React, { useState } from "react";
import '../Addcar/Addcar.css'
import db from "../firestore";

export function Addcar() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [vehicleData, setVehicleData] = useState({
    plate: "",
    brand: "",
    status: "",
    dailyValue: "",
  });

  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const onSave = (e) => {
    e.preventDefault();

    // Validar campos
    if (
      vehicleData.plate === "" ||
      vehicleData.brand === "" ||
      vehicleData.dailyValue === ""
    ) {
      setIsError(true);
      setMessage("All fields are mandatory");
      return;
    }

    db.collection("vehicles")
      .add({
        plate: vehicleData.plate,
        brand: vehicleData.brand,
        status: "Available",
        dailyValue: vehicleData.dailyValue,
      })
      .then(() => {
        setMessage("Vehicle added successfully");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setVehicleData({
          plate: "",
          brand: "",
          dailyValue: "",
        });
      })
      .catch((error) => {
        setIsError(true);
        setMessage("An error has occurred: " + error.message);
      });
  };

  return (
    <div className="container">
      <h3 className="add-vehicle-title">Add Vehicle</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="plate" className="form-label">
            Plate:
          </label>
          <input
            type="text"
            className="form-control"
            id="plate"
            name="plate"
            placeholder="Plate"
            required
            value={vehicleData.plate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand:
          </label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            placeholder="Brand"
            required
            value={vehicleData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dailyValue" className="form-label">
            Daily Value:
          </label>
          <input
            type="text"
            className="form-control"
            id="dailyValue"
            name="dailyValue"
            placeholder="Daily Value"
            required
            value={vehicleData.dailyValue}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSave}>
          Add Vehicle
        </button>
      </form>
      <div style={{ color: isError ? "red" : "green" }}>{message}</div>
    </div>
  );
}

