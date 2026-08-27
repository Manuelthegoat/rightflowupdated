// TODO: paste in the press coverage rows as:
// { reporter: 'Outlet or reporter name', title: 'Article title', date: 'Month Year', url: 'https://...' }
const articles = []

function Press() {
  return (
    <div className="press-page">
      <div className="press-hero">
        <span className="press-hero__stamp">Media Coverage</span>
        <h1 className="press-hero__title">Press Coverage</h1>
        <p className="press-hero__subhead">What the press is saying about Rightflow.</p>
      </div>

      {articles.length === 0 ? (
        <div className="press-empty">
          <p>Press list coming soon — check back shortly.</p>
        </div>
      ) : (
        <div className="press-table-wrap">
          <table className="press-table">
            <tbody>
              <tr>
                <th scope="row">Reporter</th>
                {articles.map((a, i) => (
                  <td key={i}>{a.reporter}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Title</th>
                {articles.map((a, i) => (
                  <td key={i}>
                    {a.url ? (
                      <a href={a.url} target="_blank" rel="noreferrer">
                        {a.title}
                      </a>
                    ) : (
                      a.title
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Date</th>
                {articles.map((a, i) => (
                  <td key={i}>{a.date}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Press