// Press coverage ranked A or B in the shared press tracker.
const articles = [
  {
    outlet: "En Everybodywiki",
    title: "Rightflow History & Background",
    year: "2025",
    url: "https://en.everybodywiki.com/Marvin_Wonodi_(Musician)",
  },
  {
    outlet: "SaltWire",
    title: "20 Questions: Rap and Hip-Hop Music PEI Nominee Rightflow",
    year: "2025",
    url: "https://www.saltwire.com/prince-edward-island/20-questions-rap-and-hip-hop-music-pei-nominee-rightflow",
  },
  {
    outlet: "The BUZZ (PEI)",
    title: "Welcome to the Jungle",
    year: "2026",
    url: "https://buzzpei.com/welcome-to-the-jungle/",
  },
  {
    outlet: "NTV (Newfoundland)",
    title: "NL artists represent province at East Coast Music Awards",
    year: "2026",
    url: "https://ntv.ca/arts-and-entertainment/nl-artists-represent-province-at-east-coast-music-awards/",
  },
  {
    outlet: "Album Talks",
    title:
      "Rightflow Brings Nigeria's Underground to the Forefront with Album 'Welcome to the Jungle'",
    year: "2026",
    url: "https://albumtalks.com/rightflow-brings-nigerias-underground-to-the-forefront-with-album-welcome-to-the-jungle/",
  },
  {
    outlet: "The Guardian",
    title: "Meet Rightflow, the Port Harcourt rapper making waves in Canada",
    year: "2025",
    url: "https://guardian.ng/life/music/meet-rightflow-the-port-harcourt-rapper-making-waves-in-canada/",
  },
  {
    outlet: "Realnews Magazine",
    title:
      "Nigerian rapper Rightflow gains spotlight with Times Square billboard appearance",
    year: "2026",
    url: "https://realnewsmagazine.net/nigerian-rapper-rightflow-gains-spotlight-with-times-square-billboard-appearance/#1",
  },
  {
    outlet: "The News Chronicle",
    title:
      "Nigerian Rapper Rightflow Trends As 'Welcome To The Jungle' Billboard Lights Up New York's Times Square",
    year: "2026",
    url: "https://thenews-chronicle.com/nigerian-rapper-rightflow-trends-as-welcome-to-the-jungle-billboard-lights-up-new-yorks-times-square/",
  },
  {
    outlet: "HipHopAfrica Radio",
    title: "Rightflow Unites Nigerian Underground Stars on New Album",
    year: "2026",
    url: "https://hiphopafricaradio.net/news-view/2682250/rightflow-unites-nigerian-underground-stars-on-new-album-welcome-to-the-jungle",
  },
  {
    outlet: "Vanguard",
    title: "The New Face of Nigerian Rap in Diaspora: Rightflow",
    year: "2025",
    url: "https://www.vanguardngr.com/2025/10/the-new-face-of-nigerian-rap-in-diaspora-rightflow/",
  },
  {
    outlet: "Jukebox Music",
    title:
      "Meet Rightflow: The Nigerian Rap Voice Making Canada Catch the Vibe",
    year: "2025",
    url: "https://jukeboxmusic.com.ng/meet-rightflow-the-nigerian-rap-voice-making-canada-catch-the-vibe/",
  },
];

function Press() {
  return (
    <div className="press-page">
      <div className="press-hero">
        <span className="press-hero__stamp">Media Coverage</span>
        <h1 className="press-hero__title">Press Coverage</h1>
        <p className="press-hero__subhead">
          What the press is saying about Rightflow.
        </p>
      </div>

      <div className="press-table-wrap">
        <table className="press-table">
          <thead>
            <tr>
              <th scope="col">Outlet</th>
              <th scope="col">Feature</th>
              <th scope="col">Year</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={`${article.outlet}-${article.year}`}>
                <td>{article.outlet}</td>
                <td>
                  <a id={`press-link-${index + 1}`} href={article.url} target="_blank" rel="noreferrer" aria-label={`Read ${article.title} from ${article.outlet}`} data-meta-name={`Press - ${article.outlet}`}>
                    {article.title}
                  </a>
                </td>
                <td>{article.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Press;
