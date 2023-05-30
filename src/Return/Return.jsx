import React, { useState } from 'react';
import db from '../firestore';
import '../Return/Return.css';

const vehiclesCollection = db.collection('vehicles');
const rentalsCollection = db.collection('rentals');

export function ReturnCar() {
  const [rentalNumber, setRentalNumber] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleReturn = async (e) => {
    e.preventDefault();

    try {
      const rentalQuerySnapshot = await rentalsCollection
        .where('rentalNumber', '==', parseInt(rentalNumber))
        .where('carPlate', '==', carPlate)
        .get();

      if (rentalQuerySnapshot.empty) {
        alert('Invalid rental number or car plate.');
        return;
      }

      const rentalDoc = rentalQuerySnapshot.docs[0];
      const rentalData = rentalDoc.data();
      const { startDate, endDate } = rentalData;

      const selectedReturnDate = new Date(returnDate);
      const selectedStartDate = new Date(startDate);
      const selectedEndDate = new Date(endDate);

      if (selectedReturnDate < selectedStartDate || selectedReturnDate > selectedEndDate) {
        alert('Invalid return date.');
        return;
      }

      const vehicleSnapshot = await vehiclesCollection.where('plate', '==', carPlate).get();

      if (!vehicleSnapshot.empty) {
        const vehicleDoc = vehicleSnapshot.docs[0];
        const vehicleData = vehicleDoc.data();

        if (vehicleData.status === 'No Available') {
          await vehicleDoc.ref.update({ status: 'Available' });

          alert(`Vehicle returned successfully!\n\nRental Number: ${rentalNumber}\nCar Plate: ${carPlate}`);

          // Restablecer los valores de los campos
          setRentalNumber('');
          setCarPlate('');
          setReturnDate('');
        } else {
          alert('The selected vehicle cannot be returned because it is already available.');
        }
      } else {
        alert('The selected vehicle does not exist.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Vehicles return</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="rentalNumber" className="form-label">
              Renting number
            </label>
            <input
              type="text"
              className="form-control"
              id="rentalNumber"
              value={rentalNumber}
              onChange={(e) => setRentalNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="carPlate" className="form-label">
              Plate number
            </label>
            <input
              type="text"
              className="form-control"
              id="carPlate"
              value={carPlate}
              onChange={(e) => setCarPlate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="returnDate" className="form-label">
              Return date
            </label>
            <input
              type="date"
              className="form-control"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleReturn}>
            Return
          </button>
        </form>
        <div className="mt-3">
          <span className="mx-2">
            <a href="/">Logout</a>
          </span>
        </div>
      </div>
    </>
  );
}

