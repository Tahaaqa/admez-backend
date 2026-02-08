
const fetchClientToken = async () => {
  const clientSecret = process.env.CLIENT_SECRET;
 
 
 
  try {
    console.log(clientSecret)
 
      return 'j9J7J9V196a2Bk_-ZDSEMYDwy_J5icyPjWDylpnBJKA';
  
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
};



const createSession = async ( token ,features, callback, vendor_data) => {
  const url = `https://verification.didit.me/v2/session/`;
 
  if (!token) {
    console.error('Error fetching client token');
  } else {
    const body = {
      vendor_data: vendor_data,
      callback: callback,
      workflow_id: features,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept' : 'application/json',
        'X-API-Key' : 'j9J7J9V196a2Bk_-ZDSEMYDwy_J5icyPjWDylpnBJKA',
      },
      body: JSON.stringify(body),
    };
 
    try {
      const response = await fetch(url, requestOptions);
 
      const data = await response.json();
      console.log(response)
 
      if (data) {
        return data;
      } else {
        console.error('Error creating session:', data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      throw error;
    }
  }
};







const getSessionDecision = async (token , sessionId) => {
  const endpoint = `https://verification.didit.me/v2/session/${sessionId}/decision/`;
   
 
  if (!token) {
    console.error('Error fetching client token');
  } else {
    const headers = {
      'Content-Type': 'application/json',    
      'accept': 'application/json',
      'X-API-Key' : 'j9J7J9V196a2Bk_-ZDSEMYDwy_J5icyPjWDylpnBJKA',
    };
 
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      });
 
      const data = await response.json();
 
      if (response.ok) {
        return data;
      } else {
        console.error('Error fetching session decision:', data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Network error:', err.message);
      throw err;
    }
  }
};


module.exports = {
  fetchClientToken , 
  createSession,
  getSessionDecision
}
