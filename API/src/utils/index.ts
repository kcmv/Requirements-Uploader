export const checkUserBoosterCount = (vaccines: any[]) => {
  let count = 0;
  let boosters: any = [];

  vaccines.map(function (item: any) {
    if (item.vaccine_type["isbooster"] === true) {
      count++;
      boosters.push(item);
    }
  });

  return {
    count,
    boosters,
  };
};

export const checkIfBoosterExists = (vaccines: any, dose_name: any) => {
  let isFound = false;
  vaccines.map(function (item: any) {
    if (item.vaccine_type["id"] === dose_name) {
      isFound = true;
    }
  });

  return isFound;
};

export const checkUserDoseExists = (vaccination: any, dose_number: any) => {
  let isDoseExists = false;

  vaccination.map(function (item: any) {
    if (item.dose === parseInt(dose_number)) {
      isDoseExists = true;
    }
  });

  return isDoseExists;
};

export const checkDoseOneVaccineType = (vaccination: any) => {
  let vaccine_type;
  vaccination.map(function (item: any) {
    if (item.dose === 1 && !item["vaccine_type"].isbooster) {
      vaccine_type = item["vaccine_type"].id;
    }
  });
  return vaccine_type;
};

export const checkUploadedBoosterOrder = (booster: any) => {
  const uploaded_number = booster.split("")[booster.split("").length - 1];

  return uploaded_number;
};

export const checkif1Dosage = (vaccines: any) => {
  return vaccines[0]["vaccine_type"]["required_dosage"] === 1;
};

export const checkIfBoosterOrderExists = (boosters: any, dose_number: any) => {
  const dd = boosters.filter(function (item: any) {
    const current_dose_name = item["vaccine_type"]["dose_name"];
    const dose_num =
      current_dose_name.split("")[current_dose_name.split("").length - 1];

    return parseInt(dose_num) === parseInt(dose_number);
  });

  return dd;
};
