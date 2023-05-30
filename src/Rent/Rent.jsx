import React, { useState, useEffect } from 'react';
import db from '../firestore';
import '../Rent/Rent.css';

const vehiclesCollection = db.collection('vehicles');
const rentalsCollection = db.collection('rentals');

export function Rent() {
  const [carPlates, setCarPlates] = useState([]);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [rentalNumber, setRentalNumber] = useState(1);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    carPlate: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchCarPlates = async () => {
      try {
        const snapshot = await vehiclesCollection.get();
        const plates = snapshot.docs.map((doc) => ({
          id: doc.id,
          plate: doc.data().plate
        }));
        setCarPlates(plates);
      } catch (error) {
        console.log('Error fetching car plates:', error);
      }
    };

    const fetchRentalNumber = async () => {
      try {
        const snapshot = await rentalsCollection.get();
        const rentalNumbers = snapshot.docs.map((doc) => doc.data().rentalNumber);
        if (rentalNumbers.length > 0) {
          const maxRentalNumber = Math.max(...rentalNumbers);
          setRentalNumber(maxRentalNumber + 1); // Aumentar el número máximo en 1 para la siguiente renta
        }
      } catch (error) {
        console.log('Error fetching rental number:', error);
      }
    };

    fetchCarPlates();
    fetchRentalNumber();
  }, []);

  const handleSaveRental = async (e) => {
    e.preventDefault();

    const { carPlate, startDate, endDate } = formValues;

    // Validar la fecha inicial de la renta
    const currentDate = new Date();
    const selectedStartDate = new Date(startDate);

    if (selectedStartDate < currentDate.setHours(0, 0, 0, 0)) {
      setIsError(true);
      setMessage("The initial date can't be earlier than today");
      return;
    }

    // Validar la fecha final de la renta
    const selectedEndDate = new Date(endDate);

    if (selectedEndDate < selectedStartDate) {
      setIsError(true);
      setMessage("The end date must be equal to or later than the start date");
      return;
    }

    try {
      const vehicleDoc = await vehiclesCollection.doc(carPlate).get();

      if (vehicleDoc.exists) {
        const vehicleData = vehicleDoc.data();

        if (vehicleData.status === 'Available') {
          await vehiclesCollection.doc(carPlate).update({ status: 'No Available' });

          await rentalsCollection.add({
            rentalNumber,
            carPlate: vehicleData.plate,
            startDate,
            endDate,
          });

          setMessage(`Rental saved successfully! Rental number: ${rentalNumber}, Car plate: ${vehicleData.plate}`);
          setFormValues({
            carPlate: '',
            startDate: '',
            endDate: '',
          });
          setRentalNumber(rentalNumber + 1);
        } else {
          setIsError(true);
          setMessage('The selected vehicle is not available.');
        }
      } else {
        setIsError(true);
        setMessage('The selected vehicle does not exist.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('An error occurred: ' + error.message);
    }
  };

  const handleListAvailableVehicles = async (e) => {
    e.preventDefault();
    try {
      const snapshot = await vehiclesCollection.where('status', '==', 'Available').get();
      const availableVehiclesData = snapshot.docs.map((doc) => doc.data());
      setAvailableVehicles(availableVehiclesData);
    } catch (error) {
      console.log('Error fetching available vehicles:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container">
        <h2>Car renting</h2>
        {message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
        <form onSubmit={handleSaveRental}>
          <div className="mb-3">
            <label htmlFor="carPlate" className="form-label">
              Car plates
            </label>
            <select
              className="form-select"
              id="carPlate"
              name="carPlate"
              required
              value={formValues.carPlate}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {carPlates.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.plate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Initial date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={formValues.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={formValues.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rentalNumber" className="form-label">
              Renting number
            </label>
            <input
              type="number"
              className="form-control"
              id="rentalNumber"
              required
              value={rentalNumber}
              readOnly
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleListAvailableVehicles}>
            List Available cars
          </button>
        </form>
        <div className="mt-3">
          <span className="mx-2">
            <a href="/">Logout</a>
          </span>
        </div>
        <div>
          <h3>Available Cars</h3>
          {availableVehicles.map((vehicle) => (
            <div key={vehicle.id} className="card">
              <div className="card-body">
                <h5 className="card-title">Plate: {vehicle.plate}</h5>
                <p className="card-text">Brand: {vehicle.brand}</p>
                <p className="card-text">Daily Value: $COP {vehicle.dailyValue} </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
