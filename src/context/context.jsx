import { createContext, useState, useEffect } from "react";
import mockUser from "./Data/user";
import mockFollowers from "./Data/followers";
import axios from "axios";

export const GithubContext = createContext();
const baseUrl = "https://api.github.com";

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [errors, setErrors] = useState({ show: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const searchUser = async (user) => {
    setIsLoading(true)
    const url = `${baseUrl}/users/${user}`;

    // fetch req to the user url
    const {data} = await axios(url)
    if (data){
      // set up user
      setGithubUser(data)
      const {followers_url} = data
      const {data: followData} = await axios(`${followers_url}?per_pafe=100`)
      setFollowers(followData)
    }else{
      // display error
      setErrors ({show: true, msg:"There is no user with that name"})
    }
    // fetch req to the user followers url
    setIsLoading(false)
    checkReq()
  };

  const checkReq = async () => {
    try {
      const {
        data: {
          rate: { remaining },
        },
      } = await axios(`${baseUrl}/rate_limit`);
      setRequests(remaining);

      if (remaining === 0) {
        setErrors({
          show: true,
          msg: "Rate limit exceeded",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkReq();
  }, []);

  return (
    <GithubContext.Provider
      value={{ githubUser, followers, requests, errors, isLoading, searchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubProvider;
