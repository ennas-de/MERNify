// Get the access token from local storage
export const getAccessToken = () => localStorage.getItem("accessToken");

// Set the access token to local storage
export const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

// Get the refresh token from local storage
export const getRefreshToken = () => localStorage.getItem("refreshToken");

// Set the refresh token to local storage
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};
