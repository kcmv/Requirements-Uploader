import fetch from 'node-fetch';

interface userLogin {
    email: string
    password: string
}

export const onPremiseLogin = async ({email,password}: userLogin) => {
    try {
        const result = await fetch(`${process.env.USERLOGIN}`, {
            method: 'post',
            body: `account=${email}&password=${password}&platform=${process.env.platform}&version=${process.env.version}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
        const profile = await result.json()

        return {
            success: true,
            message: '',
            result: profile
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error,
            result: ''
        }
    }
}

export const getProfile = async (session_code: string) => {
    try {
        const profile = await fetch(`${process.env.USERPROFILE}`, {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${session_code}`
            },
        });

          const data = await profile.json()
  
          if (data.error) {
            return {
                success: false,
                result: data
            }
          } else {

            return {
                success: true,
                result: data
            }
          }


    } catch (error) {
        return {
            success: false,
            message: error,
            result: ''
        }
    }
}


