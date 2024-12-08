import { useState } from "react";

function ProfileSearch() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const searchProfile = () => {
    if (!input) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${input}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setError("User not found.");
          setData({});
        } else {
          setData(data);
        }
      })
      .catch(() => {
        setError("Error fetching profile.");
        setData({});
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addToFavorites = () => {
    if (data.avatar_url && data.login) {
      const newFavorite = {
        avatar_url: data.avatar_url,
        login: data.login,
        bio: data.bio,
      };

      setFavorites((prevFavorites) => {
        if (!prevFavorites.some((fav) => fav.login === newFavorite.login)) {
          return [...prevFavorites, newFavorite];
        }
        return prevFavorites;
      });
    }
  };

  return (
    <div
      className="main"
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          paddingTop: "20px",
        }}
      >
        GitHub Profile Finder
      </h1>

      <div
        className="inputs"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter Username here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            height: "50px",
            width: "80%",
            maxWidth: "500px",
            marginTop: "50px",
            borderRadius: "20px",
            backgroundColor: "lightgray",
            color: "black",
            border: "none",
            paddingLeft: "20px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={searchProfile}
          style={{
            height: "50px",
            width: "80%",
            maxWidth: "200px",
            marginTop: "20px",
            borderRadius: "20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search Profile
        </button>
      </div>

      {loading && (
        <p style={{ fontSize: "18px", color: "orange", textAlign: "center" }}>
          Loading...
        </p>
      )}

      {error && (
        <p style={{ color: "red", fontSize: "18px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <div
        className="result"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
          flexDirection: "row",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {data.avatar_url && (
          <img
            src={data.avatar_url}
            alt="Profile Avatar"
            height="300px"
            width="300px"
            style={{
              marginTop: "20px",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}

        {data.login && (
          <div
            className="data"
            style={{ textAlign: "left", color: "white" }}
          >
            <h1 style={{ textDecoration: "uppercase", fontSize: "24px" }}>
              <b>Name: {data.login}</b>
            </h1>
            <h4>Bio: {data.bio || "No bio available"}</h4>
            <h4>Email: {data.email || "No email available"}</h4>
            <p>Location: {data.location || "No location specified"}</p>
            <p>
              Twitter Username:{" "}
              {data.twitter_username || "No Twitter username"}
            </p>
            <h5>Followers: {data.followers}</h5>
            <h6>Public Repos: {data.public_repos}</h6>
            <p>
              Account Created:{" "}
              {data.created_at
                ? new Date(data.created_at).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              Last Updated:{" "}
              {data.updated_at
                ? new Date(data.updated_at).toLocaleDateString()
                : "N/A"}
            </p>
            <button
              onClick={addToFavorites}
              style={{
                backgroundColor: "blue",
                color: "white",
                height: "50px",
                width: "200px",
                borderRadius: "30px",
              }}
            >
              Add to Favorites
            </button>
          </div>
        )}

        {!loading && !error && input.length > 0 && !data.login && (
          <p>No data found</p>
        )}
      </div>

      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {favorites.length > 0 ? (
          favorites.map((profile, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                padding: "6px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                width: "180px",
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img
                src={profile.avatar_url}
                alt={profile.login}
                height="50px"
                width="50px"
                style={{
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  marginBottom: "6px",
                }}
              />
              <h5 style={{ fontSize: "14px", margin: "5px 0", color: "black" }}>
                {profile.login}
              </h5>
              {profile.bio && (
                <p style={{ fontSize: "12px", color: "#555", margin: "0" }}>
                  {profile.bio}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No favorites available.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileSearch;
