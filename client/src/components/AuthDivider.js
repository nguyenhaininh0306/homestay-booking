const AuthDivider = ({ text = 'hoặc' }) => (
  <div className="flex items-center gap-3">
    <span className="h-px flex-1 bg-line" />
    <span className="text-xs text-ink-muted">{text}</span>
    <span className="h-px flex-1 bg-line" />
  </div>
);

export default AuthDivider;
