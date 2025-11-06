"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Buffer } from "buffer";

const googleDriveApiUrl = "https://www.googleapis.com/drive/v3/files";
const serviceAccountCredentials = {
  clientEmail: "ohi-directory@ohi-dokan.iam.gserviceaccount.com",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuclkb6/wVzsDm\nccku7/c9qzUdo+W9PfDTHcVo8vzztIi4LAQcykVINY0IUHgIgbjlC+Qe3ggZbECU\njMRDq1+fVsU6a4BZrRxiI8E5vZGmnOXcjZUNXIptG77LW0YeWWRiQcLwkFj5+M5L\nJ+A4i0fMT2oE+zCoUv0w3pzJXhs56FFN5rlOBXTmYTl02J/DS8lZg0qvB+uBWA3D\n8DUrJHIT3UWLaPK+LRKQTI7Gsn9ZBb+vvNSrVQnFUVZ/c35sstQX3UlJy3DaoTmS\nvsdLdEs6QFBn1LhML7vGKYjVxU30g4ac0FrQL3MKe/g6DxyFeDDzNY9eRLRDa9Mf\n6wzjU8cJAgMBAAECggEAIvQXhcA5kPcN8L6w5H5BiHJDIM7DzDDajbqj4Pz7ESvF\nzz1Gj6w5yJeuTBGvk2jGruI8kbDEZ6+omvs/oh12+frNZwC+RXmpu8JVR6gDxKIg\nbppR2M0HkYgjKST/PjqEIinyEPijU2b2ktmJFFtYBgiNgjUAkWGbiMy6FqEMDIR6\nxJG7i6jipjdLMRrx5+dZTjqGSls53k0LmQxDc1Lh0zOKXpABgxci21MA/EULpsN5\nyAQOc6vK+wUtU0BtbccD3o8eR3vrhtj3hzYKuyZdbX5AGIEJ0rQR0QTvih7JWuQz\nX9ShGOfwelRt2JSA34GcaxqD68SWD7DhbjoIXsY3WQKBgQDj3w+th4XvWOcdRG//\nQbkpAEoQ1p6Gmd9ZFD6A6AIr8AGaS0fLEcnBWfgCsQotM2vot4Xubxp8pr+DLPbm\nGhU2iJ1yfy1E7ZzJcry5Nb90qjW57gIxfGmsgwYlteIwhlRWK22ka72qFA2yZRYP\nhUN9WHSYDMiTFEqh5CXdN0yzxQKBgQDD+wUDYoTRfm2Jnfpwvv8zRZri5kW7tKPD\nQdAMXmGtzb22nTiYrMZkdGVJl1kdIjdPggxLHjYS/Hg4vzS7huIW09La0zEbIqYE\nD2gVc0B16J+nyFYXu8iVdwADHqwPrtG7+AJNAshz6POiqF743LcgFLJsGSTVeC3Q\nItE2esMGdQKBgQDEnd+FN36VevxQAJEyip8dhaZiyQyXz4Ur84/K4mWdS8XWQEZ+\nLacMMnkQuXmybsAZWOEzTqJoE+kDYnTXLoJHP7G67Yk+BFhYaav1ky7Tl1osR/WU\nhWkY9SUEvN+iRwXWJDrCuEQ60HrRBu/2DGKjcQOJft5CKiwLbDRPoDuKkQKBgCde\nTIKCjuW6fOyRJJbzdzZofBWqZkWvotn9ZXqmlv6f/sUpTg41XuEdFJ+03Hziu7Oo\nDyoj1n734nqbxk8JaG9ne8rjc9Dco/ba1XDBpyhIY5IDx2+bFE8aCZGW3r+DwbP9\nvRCVR4kpOY/qPLHHPK4gGjtmzaRoMOPHqrlD7dtlAoGAAgsWBsWkz9KQEjgeSEcN\nDiDZ1+19dnPK2ZQyWSGXs4lq1OewCMU5uefLEtV2DGdogcl4DKE9I2M7WQiH47Am\nfEDS2ZAjaHoAliM9qcD46ZML8+Uo+Ri5Y+YLwI4d92rDxnySByuNGeOsb+iJBKlB\nMTtYxjEnVZYn7hRPVJWzt1c=\n-----END PRIVATE KEY-----\n",
  projectId: "ohi-dokan",
};

const generateJwtAssertion = () => {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const expirationTime = now + 3600; // 1 hour

  const payload = {
    iss: serviceAccountCredentials.clientEmail,
    scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token",
    exp: expirationTime,
    iat: now,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header), "utf8").toString(
    "base64url",
  );
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );

  const privateKey = serviceAccountCredentials.privateKey.replace(/\\n/g, "\n");
  const signature = Buffer.from(privateKey, "utf8").toString("base64url");

  const jwtAssertion = `${encodedHeader}.${encodedPayload}.${signature}`;

  return jwtAssertion;
};

const GoogleDriveFileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [folderId, setFolderId] = useState("insta");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${generateJwtAssertion()}`,
        });
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        setError(error);
      }
    };
    authenticate();
  }, []);

  const handleFolderIdChange = (event) => {
    setFolderId(event.target.value);
  };

  const handleFetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${googleDriveApiUrl}?q='${folderId}' in parents`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Drive File List</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="folderId">Folder ID:</Label>
        <Input id="folderId" value={folderId} onChange={handleFolderIdChange} />

        <Button onClick={handleFetchFiles}>Fetch Files</Button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                {file.name} ({file.size} bytes, modified {file.modifiedTime})
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleDriveFileList;
