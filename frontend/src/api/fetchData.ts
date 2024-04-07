function getCookie(name: string): string | null {
  // Split document.cookie on semicolons into an array of all the cookies
  const cookieArray = document.cookie.split(";");

  // Iterate through the array elements
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    // Strip leading whitespace from the cookie, necessary for matching names
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    // If this cookie's name matches the requested name, return its value
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  // Return null if the cookie with given name is not found
  return null;
}

const fetchData = async (endpoint: string) => {
  console.log(process.env.REACT_APP_API_URL, endpoint);
  const token = getCookie("token");

  if (token) {
    return await (
      await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
  } else {
    return await (
      await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {})
    ).json();
  }
};

const postData = async (endpoint: string, body: any) => {
  const token = getCookie("token");

  if (token) {
    return await (
      await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).json();
  } else {
    await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      body: JSON.stringify(body),
      method: "POST",
    });
  }
};

export { fetchData, postData };
