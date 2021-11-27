const getCurrentCity = async () => {
  try {
    return await new Promise((resolve) => {
      process.nextTick(() => resolve("London"));
    });
  } catch (e) {
    return null;
  }
};

export { getCurrentCity };
