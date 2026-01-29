import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Component to display links to available conversation logs
 * Reads from manifest.json to show all available logs
 */
export const LogLinks = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/logs/manifest.json')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (logs.length === 0) return null;

  return (
    <section className="log-links mv4">
      <h3 className="f4 fw6 mb3">Conversation Logs</h3>
      <ul className="list pl0">
        {logs.map(log => (
          <li key={log.slug} className="mb2">
            <Link 
              to={`/logs/${log.slug}`}
              className="link blue hover-dark-blue"
            >
              {log.title}
            </Link>
            {log.description && (
              <p className="f6 gray mt1 mb0">{log.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};


