import { useState } from "react";
import { ToggleGroup } from "./components/ToggleGroup";
import Dropdown from "./components/Dropdown";
import { AddressForm } from "./components/AddressForm";
import { CAR_DATA, HOUSE_TYPES } from "./constants/car";
import { checkEligibility } from "./utils";

const INITIAL_DATA = {
  brand: "",
  car: "",
  houseType: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
    fireAlarm: "Yes",
    ssn: "",
  },
};

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const handleBureauCheck = () => {
    setLoading(true);

    // Mock API success
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        bureauScore: 700,
      }));
      setLoading(false);
      next();
    }, 1500);
  };

  const isEligible = checkEligibility(data);

  const carOptions = data.brand ? CAR_DATA[data.brand] : [];

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return Boolean(data.brand);

      case 2:
        return Boolean(data.car);

      case 3:
        return Boolean(data.houseType);

      case 4:
        const { street, city, state, zip, ssn } = data.address;
        return Boolean(street && city && state && zip && ssn);

      default:
        return false;
    }
  };

  const STEP_MAPPER = [
    {
      id: 1,
      render: () => (
        <ToggleGroup
          id="brand-toggle"
          label="Select Brand"
          options={Object.keys(CAR_DATA)}
          selected={data.brand}
          onSelect={(v) =>
            setData((prev) => ({
              ...prev,
              brand: v,
              car: "",
            }))
          }
        />
      ),
    },
    {
      id: 2,
      render: () => (
        <ToggleGroup
          id="car-toggle"
          label="Select Car"
          options={carOptions}
          selected={data.car}
          onSelect={(v) => setData((prev) => ({ ...prev, car: v }))}
        />
      ),
    },
    {
      id: 3,
      render: () => (
        <Dropdown
          label="House Type"
          options={HOUSE_TYPES}
          value={data.houseType}
          onChange={(v) =>
            setData((prev) => ({
              ...prev,
              houseType: v,
            }))
          }
        />
      ),
    },
    {
      id: 4,
      render: () => (
        <AddressForm
          address={data.address}
          onChange={(key, value) =>
            setData((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                [key]: value,
              },
            }))
          }
        />
      ),
    },
    {
      id: 5,
      render: () => (
        <h2 className="text-xl font-semibold text-center">
          {isEligible
            ? "You are eligible for pre-own car loan"
            : "Your application is not eligible for loan"}
        </h2>
      ),
    },
  ];

  const currentStep = STEP_MAPPER.find((s) => s.id === step);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div
        className={`w-[600px]  p-5 space-y-5 ${
          isEligible ? "bg-green-400" : "bg-gray-200 "
        } rounded-lg`}
      >
        {currentStep?.render()}

        <div className="flex justify-between">
          {step > 1 && step < STEP_MAPPER.length && (
            <button type="button" onClick={back} className="text-sm underline">
              Back
            </button>
          )}

          {step < STEP_MAPPER.length && (
            <button
              type="button"
              disabled={!isStepValid(step) || loading}
              onClick={() => {
                if (step === 4) {
                  handleBureauCheck();
                } else {
                  next();
                }
              }}
              className={`border px-4 py-2 rounded ${
                isStepValid(step) ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              {step === 4 && loading ? "Checking credit score..." : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
