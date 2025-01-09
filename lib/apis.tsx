import   _axios   from './axiosInstance';

export function login(username:string, password:string) {
    
    _axios.post('/User/LoginAdmin', {
      username,
      password

    }).then((res) => { 
        const { token } = res.data.authToken;  
        // Set token in cookies
        res.headers.setHeader("Set-Cookie", `authToken=${token}; HttpOnly; Path=/;`);
  
        //res.status=200.json({ message: "Login successful" });
        console.log(res.data)

    }).catch((error) => {
      if (error.code === 'ECONNABORTED') {
        console.error('Request timed out!');
      } else {
        console.error('Error:', error);
      }
    });
}
