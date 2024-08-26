const getToken = () => {
  const token = sessionStorage.getItem("token-TheBestRecords");
  const expiryDate = new Date(
    sessionStorage.getItem("tokenExpiry-TheBestRecords")
  );

  if (token && new Date() < expiryDate) {
    return token;
  } else {
    // Token hết hạn, xóa token
    sessionStorage.removeItem("token-TheBestRecords");
    sessionStorage.removeItem("tokenExpiry-TheBestRecords");
    return null;
  }
};

export default getToken;
