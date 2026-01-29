import { useParams } from 'react-router-dom';
import { LogViewer } from '../components/CursorLog/LogViewer';
import '../styles/cursor-log.css';

/**
 * Page component for displaying Cursor conversation logs
 * Generic component that can display any log via URL slug
 * Route: /logs/:logSlug
 */
export const CursorLogPage = () => {
  const { logSlug } = useParams();
  
  // Map slug to log file path
  const logPath = `/logs/${logSlug}.md`;

  return (
    <div className="cursor-log-page">
      <LogViewer logPath={logPath} />
    </div>
  );
};

