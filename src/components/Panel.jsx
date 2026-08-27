import Boom from "./Boom.jsx";

function Panel({ data }) {
  return (
    <article className={`panel ${data.color}`}>
      <span className="panel__num">{data.num}</span>
      <div className="panel__art">
        <img src={`/${data.img}`} alt={data.alt} loading="lazy" />
        {data.booms.map((b, i) => (
          <Boom key={i} {...b} />
        ))}
      </div>
      <div className="panel__text">
        <span className="cap-box">{data.name}</span>
        <span className="bubble">{data.bubble}</span>
        {data.button.type === "preview" ? (
          <button className="preview-btn" data-audio={data.button.audio}>
            ▶ Play Preview
          </button>
      ) : (
  <a className="tease" href={data.button.href} target="_blank" rel="noreferrer">
    {data.button.label}
  </a>
)}
      </div>
    </article>
  );
}

export default Panel;
