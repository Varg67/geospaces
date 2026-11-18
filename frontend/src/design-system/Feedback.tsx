import { Button } from "./Button";
export function LoadingState({
  message = "Loading example data…",
}: {
  message?: string;
}) {
  return (
    <p role="status" className="feedback">
      {message}
    </p>
  );
}
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="feedback" role="alert">
      <h2>Example data is unavailable</h2>
      <p>Try loading the local example again.</p>
      <Button onClick={onRetry}>Try again</Button>
    </div>
  );
}
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
