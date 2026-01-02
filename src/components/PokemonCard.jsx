import React from "react";

const PokemonCard = ({ name, image, types, stats, color }) => {
  return (
    <div
      className="poke-card"
      style={{
        "--accent": color,
      }}
    >
      <div className="poke-glow" />

      <div className="poke-img-wrapper">
        <img src={image} alt={name} />
      </div>

      <h2 className="poke-name">{name}</h2>

      <div className="poke-types">
        {types.map((type) => (
          <span key={type} className="poke-type">
            {type}
          </span>
        ))}
      </div>

      <div className="poke-stats">
        {stats.map((stat) => (
          <div key={stat.name} className="poke-stat">
            <span>{stat.name}</span>
            <div className="stat-track">
              <div
                className="stat-fill"
                style={{ width: `${stat.value}%` }}
              />
            </div>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
