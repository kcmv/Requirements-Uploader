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

export const dateCompleted = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const month = months[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();
  const hour = today.getHours();
  const min = today.getMinutes();
  const seconds = today.getSeconds();

  return `${month} ${date}, ${year} ${hour}:${min}:${seconds}`;
};

export const getOnePurpose = (result: any, purpose: any) => {
  let purpose_file: any = [];
  result.map((item: any) => {
    item.purposes.filter((p: any) => {
      if (p.id === Number(purpose)) {
        purpose_file.push(item);
      }
    });
  });

  return purpose_file;
};

export const filterAnswers = (result: any) => {
  const filterResult = result.map((item: any) => {
    const purpose_name = item.purposes[0].name;

    const answers = item.answers.map((ans: any) => {
      return {
        [ans.purpose_field_type.field_type[0].name]: ans.answer,
      };
    });

    delete item["answers"];
    delete item["purposes"];

    let obj: any = {};

    answers.map((item: any) => {
      obj[Object.keys(item)[0]] = Object.values(item)[0];
    });

    return {
      ...item,
      purpose: purpose_name,
      ...obj,
    };
  });

  return filterResult;
};
