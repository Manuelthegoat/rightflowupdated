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
          <button
            type="button"
            className="preview-btn"
            data-audio={data.button.audio}
            aria-label={`Play preview for ${data.name}`}
            title={`Play preview for ${data.name}`}
          >
            ▶ Play Preview
          </button>
      ) : (
  <a className="tease" href={data.button.href} target="_blank" rel="noreferrer" aria-label={`${data.button.label} for ${data.name}`} data-meta-name={`${data.button.label} - ${data.name}`}>
    {data.button.label}
  </a>
)}
      </div>
    </article>
  );
}

export default Panel;
