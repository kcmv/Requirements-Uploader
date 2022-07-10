function getExtensionName(link: string) {
  return link ? link.split(".").pop() : null;
}

function getDate(date: string) {
  return date ? new Date(date).toLocaleDateString() : null;
}

function setHeaders(session: string) {
  return {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  };
}

function returnDiff(obj1: any, obj2: any) {
  if (obj1) {
    const flat_docs = obj1.map((item: any) => item.document_type);

    const uniqueResultOne = flat_docs.filter(function (obj: any) {
      return !obj2.some(function (obj2: any) {
        return obj.id == obj2.id;
      });
    });

    //Find values that are in result2 but not in result1
    const uniqueResultTwo = obj2.filter(function (obj: any) {
      return !flat_docs.some(function (obj2: any) {
        return obj.id == obj2.id;
      });
    });

    //Combine the two arrays of unique entries
    const result = uniqueResultOne.concat(uniqueResultTwo);

    return result;
  }
}

function getActionReasons(action: string) {
  const reason = [
    {
      action_reason: "DUPLICATE UPLOAD",
      description: "Document was uploaded twice",
    },
    {
      action_reason: "INCORRECT UPLOAD",
      description: "Erroneous uploaded",
    },
    {
      action_reason: "INVALID DOCUMENT",
      description: "Document is not valid",
    },
    {
      action_reason: "NO RELEASE DATE",
      description: "Receipt without release date",
    },
    {
      action_reason: "UNCLEAR DOCUMENT",
      description: "Unclear Document",
    },
  ];

  return reason.filter((item) => item.action_reason === action);
}

function getStatuses(status: number) {
  const statuses = [
    "Validated",
    "Not yet Validated",
    "Pending",
    "Rejected",
    "N/A",
  ];

  return statuses[status - 1];
}

function changeDoseName(name: string) {
  let dose_num = name;
  let dose_num_arr = dose_num.split("");

  dose_num_arr.pop();
  dose_num_arr.push("2");
  return dose_num_arr.join("");
}

function checkIfValidated(original: any) {
  const isBir = original.document_type.field_id === 9;
  const status = original.status;

  if (isBir && status === 1) {
    return true;
  } else {
    return false;
  }
}

function getAMPM(value: any) {
  var timeSplit = value.split(":"),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = "PM";
    hours -= 12;
  } else if (hours < 12) {
    meridian = "AM";
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = "PM";
  }
  return hours + ":" + minutes + " " + meridian;
}

export {
  checkIfValidated,
  changeDoseName,
  getStatuses,
  getActionReasons,
  getDate,
  returnDiff,
  getExtensionName,
  setHeaders,
  getAMPM,
};
