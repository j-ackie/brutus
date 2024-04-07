const fetchData = async (endpoint: string) => {
  console.log(process.env.REACT_APP_API_URL, endpoint);
  return await (
    await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`)
  ).json();
};

export default fetchData;
