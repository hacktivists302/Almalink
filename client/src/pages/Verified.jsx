import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../utility/api";

const Verified = () => {
  const params = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      fetch(`${API}/users/${params.userId}/verify-email/${params.token}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setValidUrl(true);
          console.log(validUrl);
        })
        .catch((error) => {
          console.log(error);
          setValidUrl(false);
          console.log(validUrl);
        });
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
