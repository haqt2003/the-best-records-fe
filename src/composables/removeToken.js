const removeToken = () => {
  sessionStorage.removeItem("token-TheBestRecords");
  sessionStorage.removeItem("tokenExpiry-TheBestRecords");
};

export default removeToken;
