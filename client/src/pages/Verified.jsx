import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Verified = () => {
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API}/users/${params.userId}/verify-email/${params.token}`
        );

        console.log(response);

        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [params]);

  return (
    <>
      {validUrl ? (
        <div>
          <div>Your email is verified</div>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      ) : (
        <div>Invalid URL</div>
      )}
    </>
  );
};

export default Verified;
