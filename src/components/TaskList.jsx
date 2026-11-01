import './TaskList.css';

// Placeholder shown on pages that are still being built.
// Delete <TaskList /> from your page once every task is done.
export default function TaskList({ owner, branch, figma, data, tasks }) {
  return (
    <section className="section">
      <div className="container">
        <div className="task-list">
          <p className="eyebrow">Under construction</p>
          <h2>This page is still being built</h2>
          <dl className="task-list__meta">
            <div>
              <dt>Owner</dt>
              <dd>{owner}</dd>
            </div>
            <div>
              <dt>Branch</dt>
              <dd>
                <code>{branch}</code>
              </dd>
            </div>
            <div>
              <dt>Figma screen</dt>
              <dd>{figma}</dd>
            </div>
            <div>
              <dt>Data</dt>
              <dd>{data}</dd>
            </div>
          </dl>
          <ol className="task-list__tasks">
            {tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <p className="task-list__note">Full details: docs/TASKS.md</p>
        </div>
      </div>
    </section>
  );
}
