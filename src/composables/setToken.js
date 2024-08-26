const setToken = (token, expiryDays) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  sessionStorage.setItem("token-TheBestRecords", token);
  sessionStorage.setItem(
    "tokenExpiry-TheBestRecords",
    expiryDate.toUTCString()
  );
};

export default setToken;
