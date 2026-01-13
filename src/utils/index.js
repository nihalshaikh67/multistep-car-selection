export function checkEligibility(data) {
  const brand = data.brand;
  const car = data.car;
  const houseType = data.houseType?.trim().toLowerCase();
  const state = data.address?.state;
  const fireAlarm = data.address?.fireAlarm;
  const bureauScore = data.bureauScore ?? 0;

  const validCar =
    (brand === "Toyota" && ["Land Cruiser", "Fortuner"].includes(car)) ||
    (brand === "Kia" && ["Seltos", "Carens"].includes(car));

  const validHouse = ["own", "mortgage"].includes(houseType);

  const validFireAlarm = state !== "FL" || fireAlarm === "Yes";

  const validBureauScore = bureauScore > 650;

  return validCar && validHouse && validFireAlarm && validBureauScore;
}
