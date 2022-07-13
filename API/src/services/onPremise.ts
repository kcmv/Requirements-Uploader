import fetch from "node-fetch";
const crypto = require('crypto')

interface userLogin {
  email: string;
  password: string;
}

export const onPremiseLogin = async ({ email, password }: userLogin) => {
  try {
    const result = await fetch(`${process.env.USERLOGIN}`, {
      method: "post",
      body: `account=${email}&password=${password}&platform=${process.env.platform}&version=${process.env.version}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const user = await result.json();

    return {
      user,
      status: result.status,
    };
  } catch (error: any) {
    return error;
  }
};

export const getProfile = async (session_code: string) => {
  try {
    const profile = await fetch(`${process.env.USERPROFILE}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_code}`,
      },
    });

    const data = await profile.json();
   
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLoginToken = async (employee_id: string, password: string) => {
  const hash = crypto.createHash('sha1').update(password).digest('hex')

  try {
      const loginToken = await fetch(`${process.env.login_token_api}`, {
          method: 'post',
          body: `username=${employee_id}&password=${hash}&grant_type=password`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
      })

      const result = await loginToken.json()

      const isResultHaveAnError = result.hasOwnProperty("error")

      return {
        success: isResultHaveAnError,
        error: isResultHaveAnError ? result.error_description : '',
        accessToken: result.access_token
      }

      // if (result.hasOwnProperty("error")) {
      //     return {
      //         success: false,
      //         error: result.error_description
      //     }
      // } else {
      //     return {
      //         success: true,
      //         accessToken: result.access_token
      //     }
      // }

  } catch (error: any) {
      throw new Error(error)
  }
}

export const getAveMonthlyBonus = async (pass: string) => {
  const today = new Date()
  const month = today.getMonth()
  const day = today.getDate()
  const year = today.getFullYear()
  const lastYr = year - 1

  try {
      const ave = await fetch(`${process.env.monthly_ave_bonus}`, {
          method: 'post',
          body: `DateFrom=${month}/${day}/${lastYr}&DateTo=${month}/${day}/${year}`,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${pass}`
          },
      })

      const result = await ave.json()

      return result[0].AvgBonus
  } catch (error: any) {
      throw new Error(error)
  }
}