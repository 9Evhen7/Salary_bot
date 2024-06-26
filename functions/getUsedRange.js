const getUsedRange = async (client) => {
    try {
      const response = await client.get("/worksheets('main_data')/usedRange");
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error getting used range:', error.response.data);
      throw error;
    }
  };

  module.exports ={
    getUsedRange,
  }